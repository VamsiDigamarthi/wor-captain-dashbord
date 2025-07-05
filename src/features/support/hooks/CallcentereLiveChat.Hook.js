import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSocket } from "../../../SocketProvider";
import {
  fetchSupportChats,
  moveChatToTop,
} from "../../../Redux/slice/supportChat";
import { updateChatUnreadCount } from "../../../Redux/slice/underMessages";
import {
  fetchSingleSupportChatMessages,
  handleSendImage,
  handleUnreadMessage,
} from "../services/supportChat";
import { imageUrl } from "../../../Core/url";
// import {
//   fetchSingleSupportChatMessages,
//   handleSendImage,
//   handleUnreadMessage,
// } from "../../Service/supportChat";

export const useCallcentereLiveChatHook = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { data } = useSelector((state) => state.profile);
  // console.log("data", data);

  const { supportChats, loading, error } = useSelector(
    (state) => state.supportChats
  );

  const { socket, isConnected } = useSocket();
  const specificChatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [selectChat, setSelectChat] = useState("");
  const [imageSources, setImageSources] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [audioSource, setAudioSource] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchSupportChats(token));
  }, [data, dispatch, token]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleNewMessage = ({ chatId, message, unreadCount }) => {
    dispatch(updateChatUnreadCount({ chatId, unreadCount }));
    dispatch(moveChatToTop(chatId));
  };

  useEffect(() => {
    specificChatRef.current = io(`${imageUrl}/new-support-chat`);

    specificChatRef.current.on("message", ({ message, chatId }) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket?.on("newSupportMessage", handleNewMessage);

    return () => {
      socket?.off("newSupportMessage", handleNewMessage);
    };
  }, [socket, isConnected, data]);

  const socketConnectSpecificChat = async ({ chatId }) => {
    if (specificChatRef.current && data) {
      specificChatRef?.current.emit("support-chat-connected", {
        userId: data?._id,
        chatId,
        userType: "support",
      });

      if (socket) {
        socket.emit("support-real-notification", {
          chatId,
          newUserId: data?._id,
        });
      }
    }
    if (!data) return;

    await handleUnreadMessage({ chatId, userId: data._id });
  };

  useEffect(() => {
    if (supportChats?.length) {
      socketConnectSpecificChat({ chatId: supportChats[0]?._id });
      setMessages(supportChats[0]?.messages);
      setSelectChat(supportChats[0]?._id);
    }
  }, [specificChatRef, supportChats]);

  const handleSelectSpecificChat = async (chatId) => {
    socketConnectSpecificChat({ chatId: chatId });
    const data = await fetchSingleSupportChatMessages({ chatId, token });
    if (data?.apiData) {
      setMessages(data?.apiData?.messages);
    } else {
      setMessages([]);
    }
    setSelectChat(chatId);
  };

  const handleSubmit = () => {
    if (message) {
      handleSendMessage();
    } else if (imageSources) {
      handleSendMedias({ type: "image", mediaSource: imageSources });
    } else {
      handleSendMedias({ type: "audio", mediaSource: audioSource });
    }
  };

  const handleSendMessage = () => {
    const newMessage = {
      chatId: selectChat,
      message,
      sender: "supportteam",
      userId: data?._id,
      type: "text",
      _id: new Date().toISOString(),
      imageUrl: "",
      read: false,
    };

    specificChatRef.current?.emit("sendMessage", newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const handleSendMedias = async ({ type, mediaSource }) => {
    if (!data && !selectChat) return;

    const formData = new FormData();

    console.log("mediaSource", mediaSource);

    if (type === "image") {
      formData.append("image", mediaSource);
    } else if (type === "audio") {
      formData.append("image", mediaSource, "recording.webm");
    }

    formData.append("chatId", selectChat);
    formData.append("sender", "supportteam");
    formData.append("userId", data?._id);
    formData.append("type", type);

    const resData = await handleSendImage(formData);

    if (resData.status) {
      if (type === "image") {
        setImageSources(null);
        setSelectedImage(null);
      } else {
        setAudioSource(null);
        setAudioBlob(null);
      }
      setMessages((prev) => [...prev, resData?.msg]);
    }
  };

  return {
    messages,
    selectChat,
    handleSubmit,
    handleSelectSpecificChat,
    message,
    setMessage,
    //
    setImageSources,
    setAudioSource,
    //
    setSelectedImage,
    selectedImage,
    messagesEndRef,
    setAudioBlob,
    audioBlob,
  };
};
