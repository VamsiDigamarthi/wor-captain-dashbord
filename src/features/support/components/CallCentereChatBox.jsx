import { useRef, useState } from "react";
import { CircleStop, Play } from "lucide-react";
import { imageUrl } from "../../../Core/url";

export default function CallCentereChatBox({ messages, messagesEndRef }) {
  return (
    <div className="overflow-y-scroll w-full space-y-2  z-10 h-[100vh] p-2.5 mb-14 border-y border-gray-200">
      {messages?.length > 0 ? (
        <>
          {messages?.map((msg, index) => (
            <>
              <ChatItem
                image={msg.mediaUrl}
                text={msg.message}
                sender={msg.sender}
                type={msg.type}
                key={index}
              />
              <div ref={messagesEndRef} />
            </>
          ))}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center ">
          <h2 className="text-lg font-semibold">Conversation not started</h2>
        </div>
      )}
    </div>
  );
}

function ChatItem({ sender, text, time, type, image }) {
  const isSupportTeam = sender === "supportteam";
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioPlayback = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`w-full flex gap-2 items-start ${
        isSupportTeam ? "justify-end" : ""
      }`}
    >
      <div
        className={`p-2 rounded-2xl text-sm w-fit max-w-[75%] break-words ${
          isSupportTeam ? "bg-[#3B82F6] text-white" : "bg-[#F3F4F5]"
        }`}
      >
        {type === "text" && <p>{text}</p>}
        {type === "image" && image && (
          <div className="w-[300px] h-[350px] rounded-md overflow-hidden bg-[#f7f7f7] p-1">
            <img
              className="w-full h-full rounded-md object-cover"
              alt="chat-image"
              src={`${imageUrl}/${image}`}
            />
          </div>
        )}
        {type === "audio" && (
          <div className="w-[250px] h-[50px] bg-red-200 rounded-md flex justify-between items-center px-2">
            <audio
              ref={audioRef}
              src={`${imageUrl}/${image}`}
              onEnded={() => setIsPlaying(false)}
            />
            <span className="text-base font-semibold">Audio File</span>
            <button
              onClick={isPlaying ? handleStopPlayback : handleAudioPlayback}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              {isPlaying ? <CircleStop size={30} /> : <Play size={30} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

//  <p
//           className={`text-xs mt-1 ${
//             isSupportTeam ? "text-white/80" : "text-gray-500"
//           }`}
//         >
//           {time}
//         </p>
