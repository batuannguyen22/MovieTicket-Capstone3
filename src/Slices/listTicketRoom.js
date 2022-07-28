import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  ticketRoom: {},
  isLoading: false,
  error: null,
  listBookingTicket: [],
};

// thunk actions
export const getListTicketRoom = createAsyncThunk(
  "movie/getListTicketRoom",
  async (ticketId) => {
    try {
      const data = await movieAPI.getListTicketRoom(ticketId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const ticketRoomSlice = createSlice({
  name: "ticketRoom",
  initialState,
  reducers: {
    addChairtoList: (state, { payload }) => {
      let listUpdatedChair = [...state.listBookingTicket];
      let index = listUpdatedChair.findIndex(
        (bookingChair) => bookingChair.maGhe === payload.maGhe
      );
      if (index !== -1) {
        listUpdatedChair.splice(index, 1);
      } else {
        listUpdatedChair.push(payload);
      }
      return { ...state, listBookingTicket: listUpdatedChair };
    },
    completeBooked: (state, { payload }) => {
      return { ...state, listBookingTicket: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListTicketRoom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListTicketRoom.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ticketRoom = payload;
    });
    builder.addCase(getListTicketRoom.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions
export const { addChairtoList , completeBooked} = ticketRoomSlice.actions;
// export reducer
export default ticketRoomSlice.reducer;
