import {
  CircleStop,
  Image,
  Mic,
  Paperclip,
  Phone,
  Play,
  Send,
  StopCircle,
  Ticket,
  X,
} from "lucide-react";
import IconBtn from "../../../utils/IconBtn";
import { useRef, useState } from "react";

const ChatInputs = ({
  handleSubmit,
  message,
  setMessage,
  setImageSources,
  setAudioSource,
  //
  setSelectedImage,
  selectedImage,
  setAudioBlob,
  audioBlob,
}) => {
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log("files", files);

    if (files && files[0]) {
      const file = files[0];
      setImageSources(file);
      const imageUrl = URL.createObjectURL(file);
      console.log("imageUrl", imageUrl);

      setSelectedImage(imageUrl);
      // reset audio
      setAudioBlob(null);
      setAudioSource(null);
      setIsPlaying(false);
      setAudioProgress(0);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageSources(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMicClick = async () => {
    if (isRecording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
        mediaRecorder.stream.getTracks().forEach((track) => {
          track.stop(); // 🔴 This stops the browser mic icon
        });
      }
    } else {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Reset image input
          setSelectedImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const recorder = new MediaRecorder(stream);
          const chunks = [];

          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          recorder.onstop = () => {
            if (chunks.length > 0) {
              const audioBlob = new Blob(chunks, { type: "audio/webm" });
              const audioUrl = URL.createObjectURL(audioBlob);

              setAudioBlob(audioUrl);
              setAudioSource(audioBlob);
            }
          };

          recorder.start();
          setMediaRecorder(recorder);
          setIsRecording(true);
        } catch (err) {
          console.error("Error accessing audio stream:", err);
        }
      } else {
        console.error("Audio recording is not supported.");
      }
    }
  };

  const handleAudioPlayback = () => {
    if (audioBlob && !isPlaying) {
      const audio = new Audio(audioBlob); // Use the stored URL
      audioRef.current = audio; // Store the reference

      audio.play();
      setIsPlaying(true);

      const updateProgress = () => {
        if (audioRef.current && !audioRef.current.ended) {
          const progress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setAudioProgress(progress);
          requestAnimationFrame(updateProgress);
        } else {
          setIsPlaying(false);
          setAudioProgress(0);
        }
      };

      requestAnimationFrame(updateProgress);

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setAudioProgress(0);
      });
    }
  };

  const handleStopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setAudioProgress(0);
    }
  };

  const clearAudio = () => {
    setAudioBlob(null);
    setAudioSource(null);
    handleStopPlayback();
  };

  return (
    <div className="absolute bottom-0 w-full p-2 z-40 flex items-center bg-white">
      <div className="flex items-center gap-2 w-[60%]">
        <button className="cursor-pointer" onClick={handleImageClick}>
          <Image color="gray" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <button className="cursor-pointer" onClick={handleMicClick}>
          {isRecording ? <StopCircle color="red" /> : <Mic color="gray" />}
        </button>
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="w-[90%] border outline-none border-gray-500 p-1 rounded-lg"
        />
      </div>

      <div className="w-[40%] flex items-center gap-2">
        <IconBtn
          customStyles="w-full"
          text="Send"
          bgColor="bg-[#3B82F6]"
          icon={Send}
          iconBg="bg-[#3B82F6]"
          onClick={handleSubmit}
        />
        <IconBtn
          customStyles="w-full"
          text="Call"
          bgColor="bg-[#22C55E]"
          icon={Phone}
          iconBg="bg-[#22C55E]"
        />
        <IconBtn
          customStyles="w-full"
          text="Rise Ticket"
          bgColor="bg-[#FDF2F8]"
          icon={Ticket}
          iconBg="bg-[#FDF2F8]"
          textColor="text-[#FF0000]"
        />
      </div>
      {selectedImage && (
        <div className="w-full h-[300px] flex justify-center items-center absolute z-50 bottom-16 left-0 right-0 bg-gray-100 ">
          <div className="w-[50%] h-[250px] flex items-start">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-[97%] h-[250px] object-cover rounded-md shadow-md"
            />
            <button onClick={clearImage} className=" bg-red-300">
              <X />
            </button>
          </div>
        </div>
      )}
      {audioBlob && (
        <div className="w-full h-[300px] flex flex-col justify-center items-center absolute bottom-16 left-0 right-0 bg-gray-100">
          <div className="flex gap-2 items-start">
            <button
              onClick={isPlaying ? handleStopPlayback : handleAudioPlayback}
              className="bg-blue-500 text-white p-2 rounded-lg mb-4 cursor-pointer"
            >
              {isPlaying ? <CircleStop size={30} /> : <Play size={30} />}
            </button>
            <button
              onClick={clearAudio}
              className=" bg-red-300 rounded-full p-1 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInputs;
