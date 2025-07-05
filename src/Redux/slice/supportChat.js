import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../Core/url";

export const fetchSupportChats = createAsyncThunk(
  "supportChat/fetchSupportChats",
  async (token, { rejectWithValue }) => {
    try {
      const response = await API.get("/manager/support-chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch support chats"
      );
    }
  }
);

// Initial state
const initialState = {
  supportChats: [],
  loading: false,
  error: null,
};

// Slice
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportChats.fulfilled, (state, action) => {
        state.loading = false;
        state.supportChats = action.payload;
      })
      .addCase(fetchSupportChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { moveChatToTop } = supportChatSlice.actions;
export default supportChatSlice.reducer;
