import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  userLogin: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
};

// thunk actions
export const getUserLogin = createAsyncThunk(
  "movie/getUserLogin",
  async (userLogin) => {
    try {
      const data = await movieAPI.getUserLogin(userLogin);
      localStorage.setItem("user",JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    signOut: (state, { payload }) => {
      return { ...state, userLogin: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userLogin = payload;
    });
    builder.addCase(getUserLogin.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

// export actions
export const { signOut } = userLoginSlice.actions;
// export reducer
export default userLoginSlice.reducer;
