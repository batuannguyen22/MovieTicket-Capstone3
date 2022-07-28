import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../configStore";
import { getBannersShowing } from "../../Slices/banners";
import styles from "./Banners.module.css";
import css from './Banners.css'
import Slider from "react-slick";

const BannersShowing = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { banners, isLoading, error } = useSelector(
    (state = store.reducer) => state.banner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannersShowing());
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
    <div className={styles.row}>
      <Slider {...settings}>
        {banners.map((banner) => {
          return (
            <div key={banner.maBanner} className={styles.col}>
              <div>
                <img src={banner.hinhAnh} alt="hinh anh phim" />
              </div>
              <div className={styles.playButton}>
                <a href='' data-fancybox>
                  <i className="fa fa-play-circle"></i>
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BannersShowing;
