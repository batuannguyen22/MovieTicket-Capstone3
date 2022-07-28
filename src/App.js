import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutApp from "./Pages/AboutApp/AboutApp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeTemplate from "./Templates/HomeTemplate";
import HomePage from "./HomePage/HomePage";
import BannersShowing from "./Pages/Banners/BannersShowing";
import MovieShowing from "./Pages/HomePage/MovieShowing";
import TheaterShowing from "./Pages/Theaters/TheaterShowing";
import Detail from "./Pages/Detail/detail";
import CheckoutTemplate from "./Templates/CheckoutTemplate";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import Login from "./Pages/Login/Login";
import Register from './Pages/Register/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="banner" element={<BannersShowing />} />
          <Route path="movie" element={<MovieShowing />} />
          <Route path="theater" element={<TheaterShowing />} />
          <Route path="about" element={<AboutApp />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route index element={<HomePage />} />
        </Route>
        <Route path="" element={<CheckoutTemplate />}>
          <Route path="checkout/:id" element={<CheckoutPage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
