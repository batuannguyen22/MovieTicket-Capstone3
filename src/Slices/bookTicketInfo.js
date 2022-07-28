import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  bookTicket: {
    maLichChieu : 0,
    danhSachVe: [
        {
            "maGhe": 0,
            "giaVe": 0,
        }
    ],
  },
  isLoading: false,
  error: null,
  
};

// thunk actions
export const getBookTicketInfo = createAsyncThunk(
  "movie/getBookTicketInfo",
  async (bookTicketInfo) => {
    try {
      const data = await movieAPI.getBookTicketInfo(bookTicketInfo);
      return data;
    } catch (error) {
      throw error
    }
  }
);

const bookTicketSlice = createSlice({
  name: "bookTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookTicketInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBookTicketInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.bookTicket = payload;
    });
    builder.addCase(getBookTicketInfo.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions

// export reducer
export default bookTicketSlice.reducer;