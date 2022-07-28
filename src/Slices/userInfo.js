import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  isLoading: false,
  error: null,
};

// thunk actions
export const getUserInfo = createAsyncThunk("movie/getUserInfo", async () => {
  try {
    const data = await movieAPI.getUserInfo();
    localStorage.setItem("userInfo",JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userInfo = payload;
    });
    builder.addCase(getUserInfo.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions

// export reducer
export default userInfoSlice.reducer;
