import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../Core/url";

// ✅ Async thunk to fetch users with optional filters
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

// ✅ Async thunk to fetch single user by ID
export const fetchSingleUserSlice = createAsyncThunk(
  "adminUsers/fetchSingleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user-dashboard/single-user/${userId}`);
      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// ✅ Slice
const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    loading: false,
    users: [],
    singleUser: null, // store the single user here
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
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all users
      .addCase(fetchWorUserSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorUserSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
        state.totalCount = action.payload.totalCount;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.todaySignUpCount = action.payload.todaySignUpCount;

        // ✅ Automatically set the first user as singleUser
        state.singleUser = action.payload.users?.[0] || null;
      })
      .addCase(fetchWorUserSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      })

      // ✅ Fetch single user
      .addCase(fetchSingleUserSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUserSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(fetchSingleUserSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

// ✅ Exports
export const { clearAdminUserErrors, setSingleUser } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
