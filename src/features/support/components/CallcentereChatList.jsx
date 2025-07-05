import { Search } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function CallCentereChatList({
  selectChat,
  handleSelectSpecificChat,
}) {
  const { data } = useSelector((state) => state.profile);

  const { supportChats, loading, error } = useSelector(
    (state) => state.supportChats
  );

  const { unreadMessages } = useSelector((state) => state.unreadMessages);

  const getUnreadCount = (chatId) => {
    const apiUnreadCount =
      supportChats
        ?.find((chat) => chat._id === chatId)
        ?.participants?.find((p) => p.participantId === data?._id)
        ?.unreadCount || 0;

    const reduxUnreadCount =
      unreadMessages.find((chat) => chat.chatId === chatId)?.unreadCount ?? 0;

    return Math.max(apiUnreadCount, reduxUnreadCount);
  };
  return (
    <div className="bg-[#F9FAFB] p-4 rounded-2xl  h-full space-y-2">
      <div className="flex items-center bg-white border gap-2 border-gray-600 p-2 rounded-lg">
        <Search />
        <input
          type="search"
          placeholder="search users"
          className="outline-none bg-none border-none w-full"
        />
      </div>

      <div className="h-[70vh] space-y-2 overflow-y-scroll">
        {supportChats?.map((sup, index) => (
          <TicketCard
            status={
              sup?.userData?.aadharCarVerificaation ? "Verified" : "pending"
            }
            accent={sup?.userData?.aadharCarVerificaation ? "green" : "red"}
            name={sup?.userData?.name}
            email={sup?.userData?.mobile}
            active={selectChat === sup?._id}
            onClick={() => handleSelectSpecificChat(sup?._id)}
            unreadCount={getUnreadCount(sup._id)}
          />
        ))}
      </div>
    </div>
  );
}

function TicketCard({
  name = "Sarah",
  email = "sarah@email.com",
  status = "New",
  accent = "red",
  active = false,
  onClick,
  unreadCount = 0,
}) {
  const yellow =
    "bg-[#FEF9C3] text-[#854D0E] w-fit text-center h-fit rounded-full p-2 text-xs";
  const green =
    "bg-[#DCFCE7] text-[#166534] w-fit text-center h-fit rounded-full p-2 text-xs";

  const red =
    "bg-[#FEE2E2] text-[#DC2626] w-fit text-center h-fit rounded-full p-2 text-xs";

  const styles = accent == "red" ? red : accent == "yellow" ? yellow : green;

  return (
    <div
      onClick={onClick}
      className={`w-full p-2 flex items-center justify-between cursor-pointer bg-[#F9FAFB] *:

        ${active && "border-l-[2px] border-blue-600"}
        `}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-red-100"></div>
          {unreadCount > 0 && (
            <span className="flex justify-center items-center text-white text-sm w-[18px] h-[18px] rounded-full bg-yellow-800 absolute top-0.5 right-1">
              {unreadCount}
            </span>
          )}
        </div>
        <div>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>

      <div
        className={`
        ${styles}
        `}
      >
        {status}
      </div>
    </div>
  );
}
