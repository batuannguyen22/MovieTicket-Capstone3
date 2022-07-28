import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  details: {},
  isLoading: false,
  error: null,
  
};

// thunk actions
export const getMovieTime = createAsyncThunk(
  "movie/getMovieTime",
  async (id) => {
    try {
      const data = await movieAPI.getMovieTime(id);
      return data;
    } catch (error) {
      throw error
    }
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieTime.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieTime.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.details = payload;
    });
    builder.addCase(getMovieTime.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions

// export reducer
export default movieDetailSlice.reducer;
