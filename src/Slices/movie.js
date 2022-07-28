import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  movies: [],
  allMovie: [],
  isLoading: false,
  error: null,
  moviesDefault: [],
};

// thunk actions
export const getMovieShowing = createAsyncThunk(
  "movie/getMovieShowing",
  async () => {
    try {
      const data = await movieAPI.getMovieShowing();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    allMovieShowing: (state,{payload})=>{
      state.movies = payload;
    },
    playingMovieShowing: (state, { payload }) => {
      state.moviesDefault = payload;
      state.movies = state.moviesDefault.filter(
        (film) => film.dangChieu === true
      );
      console.log(state.moviesDefault);
      console.log('movie dangChieu', state.movies);
    },
    upcomingMovieShowing: (state, { payload }) => {
      state.moviesDefault = payload;
      state.movies = state.moviesDefault.filter(
        (film) => film.sapChieu === true
      );
      console.log(state.moviesDefault);
      console.log('movie sapChieu', state.movies);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieShowing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieShowing.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload;
      state.allMovie = payload;
    });
    builder.addCase(getMovieShowing.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions
export const { playingMovieShowing, upcomingMovieShowing, allMovieShowing } = movieSlice.actions;
// export reducer
export default movieSlice.reducer;
