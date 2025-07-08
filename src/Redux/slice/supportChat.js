import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../Core/url";

export const fetchSupportChats = createAsyncThunk(
  "supportChat/fetchSupportChats",
  async ({ token, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/manager/support-chats?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);

      return response.data; // Ensure it returns { data: [...], hasMore: true }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch support chats"
      );
    }
  }
);

const initialState = {
  supportChats: [],
  notSupportChats: [],

  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const supportChatSlice = createSlice({
  name: "supportChat",
  initialState,
  reducers: {
    moveChatToTop: (state, action) => {
      const chatId = action.payload;
      const index = state.supportChats.findIndex((chat) => chat._id === chatId);
      if (index !== -1) {
        const [chat] = state.supportChats.splice(index, 1);
        state.supportChats.unshift(chat);
      }
    },
    resetSupportChats: (state) => {
      state.supportChats = [];
      state.page = 1;
      state.hasMore = true;
    },
    filterSupportChats: (state, action) => {
      const search = action.payload.toLowerCase();

      state.supportChats = state.notSupportChats.filter(
        (sup) =>
          sup?.userData?.name?.toLowerCase()?.includes(search) ||
          sup?.userData?.mobile?.toLowerCase()?.includes(search)
      );
    },

    setUnreadCountForChat: (state, action) => {
      const { chatId, userId } = action.payload;
      console.log("==", action.payload);

      const chat = state.supportChats.find((chat) => chat._id === chatId);
      console.log("chat", chat);

      if (chat) {
        const participant = chat.participants.find(
          (p) => String(p.participantId) === String(userId)
        );
        console.log("participant", participant);

        if (participant) {
          participant.unreadCount = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupportChats.fulfilled, (state, action) => {
        state.loading = false;
        const newChats = action.payload.data;

        const existingIds = new Set(state.supportChats.map((chat) => chat._id));

        const filteredNewChats = newChats.filter(
          (chat) => !existingIds.has(chat._id)
        );

        state.supportChats.push(...filteredNewChats);
        state.notSupportChats.push(...filteredNewChats);

        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchSupportChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  moveChatToTop,
  resetSupportChats,
  filterSupportChats,
  setUnreadCountForChat,
} = supportChatSlice.actions;
export default supportChatSlice.reducer;
