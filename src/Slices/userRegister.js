import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  userRegister: JSON.parse(localStorage.getItem("userRegister")) || null,
  isLoading: false,
  error: null,
};

// thunk actions
export const getRegisterUser = createAsyncThunk(
  "movie/getRegisterUser",
  async (userRegister) => {
    try {
      const data = await movieAPI.getRegisterUser(userRegister);
      localStorage.setItem("userRegister",JSON.stringify(data));
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRegisterUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRegisterUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userRegister = payload;
    });
    builder.addCase(getRegisterUser.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions

// export reducer
export default userRegisterSlice.reducer;
