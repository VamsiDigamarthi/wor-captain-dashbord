import { MessageCircleMore } from "lucide-react";

export default function ConversationHistoryItem({
  text,
  date,
  showLine = true,
}) {
  return (
    <div className="flex gap-2 ml-2">
      <div className="flex flex-col gap-1 items-center">
        <MessageCircleMore />
        {showLine && <div className="w-[4px] h-[50px] bg-black" />}
      </div>

      <div className="flex gap-0 text-sm flex-col">
        <p>{text}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
