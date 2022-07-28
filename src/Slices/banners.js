import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  banners: [],
  isLoading: false,
  error: null,
};

// thunk actions
export const getBannersShowing = createAsyncThunk(
  "movie/getBannersShowing",
  async () => {
    try {
      const data = await movieAPI.getMovieBanners();
      return data;
    } catch (error) {
      throw error
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBannersShowing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBannersShowing.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.banners = payload;
    });
    builder.addCase(getBannersShowing.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions

// export reducer
export default bannerSlice.reducer;
