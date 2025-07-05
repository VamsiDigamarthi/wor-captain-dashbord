import { useSelector } from "react-redux";
import { useCallcentereLiveChatHook } from "../hooks/CallcentereLiveChat.Hook";
import StatusWrapper from "../../../utils/StatusWrapper";
import CallCentereChatList from "../components/CallcentereChatList";
import CallCentereChatBox from "../components/CallCentereChatBox";
import ChatInputs from "../components/ChatInputs";

const CallcentereLiveChat = () => {
  const { supportChats, loading, error } = useSelector(
    (state) => state.supportChats
  );

  const {
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
  } = useCallcentereLiveChatHook();

  return (
    <>
      <StatusWrapper error={error} loading={loading}>
        <div className="w-full flex flex-col shadow rounded-lg">
          <div className="w-full flex justify-between items-center h-[50px] px-4">
            <h3 className="text-lg font-semibold">Live Chat & Support</h3>
          </div>
          <div className="flex w-full gap-2 ">
            <div className="w-[30%]  overflow-y-scroll">
              <CallCentereChatList
                selectChat={selectChat}
                handleSelectSpecificChat={handleSelectSpecificChat}
              />
            </div>

            <div className="w-[70%] relative">
              <CallCentereChatBox
                messages={messages}
                messagesEndRef={messagesEndRef}
              />
              <ChatInputs
                message={message}
                setMessage={setMessage}
                handleSubmit={handleSubmit}
                setAudioSource={setAudioSource}
                setImageSources={setImageSources}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                setAudioBlob={setAudioBlob}
                audioBlob={audioBlob}
              />
            </div>
          </div>
        </div>
      </StatusWrapper>
    </>
  );
};

export default CallcentereLiveChat;
