import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../Core/url";

// Async thunk to fetch users with optional filters
export const fetchWorUserSlice = createAsyncThunk(
  "adminUsers/fetchWorUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await API.get(
        `/user-dashboard/new-captain-filter?${query}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    loading: false,
    users: [],
    totalCount: 0,
    page: 1,
    pages: 1,
    todaySignUpCount: 0,
    error: null,
  },
  reducers: {
    clearAdminUserErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorUserSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorUserSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalCount = action.payload.totalCount;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.todaySignUpCount = action.payload.todaySignUpCount;
      })
      .addCase(fetchWorUserSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { clearAdminUserErrors } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
