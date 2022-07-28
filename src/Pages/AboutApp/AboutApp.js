import React from "react";
import styles from "./AboutApp.module.css";
import firstscreen from "../../Assets/img/firstscreen.jpg";
import secondscreen from "../../Assets/img/secondscreen.jpg";
import thirdscreen from "../../Assets/img/thirdscreen.jpg";
import fourthscreen from "../../Assets/img/fourthscreen.jpg";
import fifthscreen from "../../Assets/img/fifth.jpg";
import Slider from "react-slick";

const AboutApp = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows:false,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <h1>
          Ứng dụng tiện lợi dành cho <br /> người yêu điện ảnh
        </h1>
        <p>
          Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm <br /> rạp
          và đổi quà hấp dẫn.
        </p>
        <button className={styles.buttonDownload}>
          APP MIỄN PHÍ - TẢI VỀ NGAY!
        </button>
        <p>
          TIX có hai phiên bản <u>IOS</u>&<u>Android</u>
        </p>
      </div>
      <div className={styles.right}>
        <Slider {...settings}>
          <div>
            <img
              className={styles.firstScreen}
              src={firstscreen}
              alt="film screen"
            />
          </div>
          <div>
            <img
              className={styles.firstScreen}
              src={secondscreen}
              alt="film screen"
            />
          </div>
          <div>
            <img
              className={styles.firstScreen}
              src={thirdscreen}
              alt="film screen"
            />
          </div>
          <div>
            <img
              className={styles.firstScreen}
              src={fourthscreen}
              alt="film screen"
            />
          </div>
          <div>
            <img
              className={styles.firstScreen}
              src={fifthscreen}
              alt="film screen"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default AboutApp;
