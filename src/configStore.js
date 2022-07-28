import { configureStore } from "@reduxjs/toolkit";
import movie from "./Slices/movie";
import banner from './Slices/banners';
import theater from './Slices/theater';
import detail from './Slices/movieDetails';
import ticket from './Slices/listTicketRoom';
import user from './Slices/userLogin';
import bookTicket from './Slices/bookTicketInfo';
import userInfo from './Slices/userInfo';
import userRegister from "./Slices/userRegister";

const store = configureStore({
  reducer: {
    movie,
    banner,
    theater,
    detail,
    ticket,
    user,
    bookTicket,
    userInfo,
    userRegister,
  },
});

export default store;