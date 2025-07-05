import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/url";

// Initial state
const initialState = {
  activeorder: [],
  loading: false,
  error: null,
};

// Async thunk to fetch active orders
export const fetchActiveOrders = createAsyncThunk(
  "supportChat/fetchSupportChats",
  async (token, { rejectWithValue }) => {
    try {
      const response = await API.get(
        "/manager/all-active-order-to-monitor-team",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("{[[", response?.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(
        error.response?.data || "Failed to fetch support chats"
      );
    }
  }
);

// Slice
const supportChatSlice = createSlice({
  name: "active-orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.activeorder = action.payload;
      })
      .addCase(fetchActiveOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supportChatSlice.reducer;
