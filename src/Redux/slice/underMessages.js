import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unreadMessages: [],
};

const unreadMessages = createSlice({
  name: "unreadMessages",
  initialState,
  reducers: {
    setSupportChats: (state, action) => {
      state.unreadMessages = action.payload;
    },

    updateChatUnreadCount: (state, action) => {
      const { chatId, unreadCount } = action.payload;
      const chat = state.unreadMessages.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.unreadCount = unreadCount;
      } else {
        state.unreadMessages.push({ chatId, unreadCount });
      }
    },

    clearUnreadCountByChatId: (state, action) => {
      const chatId = action.payload;
      const chat = state.unreadMessages.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
  },
});

export const {
  setSupportChats,
  updateChatUnreadCount,
  clearUnreadCountByChatId,
} = unreadMessages.actions;
export default unreadMessages.reducer;
