import worUsers from "./slice/worUsersSlice";
import activeOrder from "./slice/activeOrderSlice";
import profile from "./slice/profileSlice";
import supportChats from "./slice/supportChat";
import unreadMessages from "./slice/underMessages";

const RootReducer = {
  worUsers,
  activeOrder,
  profile,
  supportChats,
  unreadMessages,
};

export default RootReducer;
