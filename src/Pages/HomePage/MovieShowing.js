import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import store from "../../configStore";
import {
  getMovieShowing,
  playingMovieShowing,
  upcomingMovieShowing,
  allMovieShowing,
} from "../../Slices/movie";
import style from "./MovingShowing.module.css";

const MovieShowing = () => {
  const { movies, isLoading, error } = useSelector(
    (state = store.reducer) => state.movie
  );
  const { allMovie } = useSelector((state = store.reducer) => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieShowing());
  }, []);

  if (isLoading) {
    // TODO: Loading component
    return <h1>Loading...</h1>;
  }

  if (error) {
    // TODO: Error component
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <div className={style.movie}>
        <button
          className={style.movie3}
          onClick={() => dispatch(allMovieShowing(allMovie))}
        >
          TẤT CẢ PHIM
        </button>
        <button
          className={style.movie1}
          onClick={() => dispatch(playingMovieShowing(allMovie))}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          className={style.movie2}
          onClick={() => dispatch(upcomingMovieShowing(allMovie))}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>
      <div className={style.row}>
        {movies.map((movie) => {
          return (
            <div key={movie.maPhim} className={style.col}>
              <img src={movie.hinhAnh} alt={movie.tenPhim} />
              <div className={style.details}>
                <div className={style.logo_movieName}>
                  <span className={style.logo}>C18</span>
                  <p className={style.movieName}>{movie.tenPhim}</p>
                </div>
                <div className={style.buyTicket}>
                  <NavLink to={`detail/${movie.maPhim}`}>Mua vé</NavLink>
                </div>
                <div className={style.playButton}>
                  <a href={movie.trailer} data-fancybox>
                    <i className="fa fa-play-circle"></i>
                  </a>
                </div>
              </div>
              <p className={style.moTa}>{movie.moTa}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieShowing;
