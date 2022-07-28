import React from "react";
import AboutApp from "../Pages/AboutApp/AboutApp";
import BannersShowing from "../Pages/Banners/BannersShowing";
import MovieShowing from "../Pages/HomePage/MovieShowing";
import TheaterShowing from "../Pages/Theaters/TheaterShowing";

const HomePage = () => {
  return (
    <div>
      <BannersShowing />
      <MovieShowing />
      <TheaterShowing />
      <AboutApp />
    </div>
  );
};

export default HomePage;
