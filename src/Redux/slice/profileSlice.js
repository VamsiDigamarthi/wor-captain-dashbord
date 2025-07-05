import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../Core/url";

// Thunk to fetch user profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await API.get("/manager/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log("error", err);

      return rejectWithValue(
        err.response?.data?.message || "Profile fetch failed"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
