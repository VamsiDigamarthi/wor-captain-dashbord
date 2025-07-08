import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchSupportChats,
  filterSupportChats,
} from "../../../Redux/slice/supportChat";
import { debounce } from "lodash";

export default function CallCentereChatList({
  selectChat,
  handleSelectSpecificChat,
}) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  const { supportChats, page, hasMore, notSupportChats, loading, error } =
    useSelector((state) => state.supportChats);
  const { unreadMessages } = useSelector((state) => state.unreadMessages);
  const [search, setSearch] = useState("");

  // Debounced search handler to reduce API calls
  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 300);

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

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchSupportChats({ token, page }));
    }
  };

  useEffect(() => {
    dispatch(filterSupportChats(search));
  }, [search]);

  return (
    <div className="bg-[#F9FAFB] p-4 rounded-2xl h-full space-y-2">
      <div className="flex items-center bg-white border gap-2 border-gray-600 p-2 rounded-lg">
        <Search />
        <input
          type="search"
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search users"
          className="outline-none bg-none border-none w-full"
        />
      </div>

      {error && <p className="text-center text-red-600">Error: {error}</p>}

      <InfiniteScroll
        dataLength={supportChats.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <h4 className="text-center text-gray-600 h-[200px]">Loading...</h4>
        }
        height={550}
      >
        {supportChats.length === 0 && !loading && !hasMore ? (
          <p className="text-center text-gray-600">No chats found</p>
        ) : (
          supportChats.map((sup, index) => (
            <TicketCard
              key={`${sup._id}-${index}`}
              status={
                sup?.userData?.aadharCarVerificaation ? "Verified" : "Pending"
              }
              accent={sup?.userData?.aadharCarVerificaation ? "green" : "red"}
              name={sup?.userData?.name || "Unknown"}
              email={sup?.userData?.mobile || "No mobile"}
              active={selectChat === sup._id}
              onClick={() => handleSelectSpecificChat(sup._id)}
              unreadCount={getUnreadCount(sup._id)}
            />
          ))
        )}
      </InfiniteScroll>
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

  const styles = accent === "red" ? red : accent === "yellow" ? yellow : green;

  return (
    <div
      onClick={onClick}
      className={`w-full p-2 flex items-center justify-between cursor-pointer bg-[#F9FAFB] ${
        active ? "border-l-[2px] border-blue-600" : ""
      }`}
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
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>

      <div className={styles}>{status}</div>
    </div>
  );
}
