import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  theaters: [],
  isLoading: false,
  error: null,
};

// thunk actions
export const getMovieTheater = createAsyncThunk(
  "movie/getMovieTheater",
  async () => {
    try {
      const data = await movieAPI.getMovieTheather();
      return data;
    } catch (error) {
      throw error
    }
  }
);

const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieTheater.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieTheater.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaters = payload;
    });
    builder.addCase(getMovieTheater.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions

// export reducer
export default theaterSlice.reducer;
