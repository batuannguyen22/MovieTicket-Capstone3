import React from "react";
import style from "./Footer.module.css";
import zalo from "../../Assets/img/zalo.png";
import zion from "../../Assets/img/zion.jpg";
import notice from "../../Assets/img/congthuong.png";
import cgv from "../../Assets/img/cgv.png";
import bhd from "../../Assets/img/bhd.png";
import galaxy from "../../Assets/img/galaxy.png";
import cinestar from "../../Assets/img/cinestar.png";

const FooterPage = () => {
  return (
    <div className={style.footer}>
      <div className={style.row}>
        <div className={style.col_1}>
          <h1>TIX</h1>
          <ul>
            <li>
              <a href="">FAQ</a>
            </li>
            <li>
              <a href="">Brand Guidelines</a>
            </li>
          </ul>
        </div>
        <div className={style.col_2}>
          <h1>Invisible</h1>
          <ul>
            <li>
              <a href="">Thỏa thuận sử dụng</a>
            </li>
            <li>
              <a href="">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        <div className={style.col_3}>
          <h1>ĐỐI TÁC</h1>
          <div className={style.logo_cine}>
            <div className={style.logo}>
              <img src={cgv} alt="cgv" />
            </div>
            <div className={style.logo}>
              <img src={bhd} alt="bhd" />
            </div>
            <div className={style.logo}>
              <img src={galaxy} alt="galaxy" />
            </div>
            <div className={style.logo}>
              <img src={cinestar} alt="cinestar" />
            </div>
          </div>
        </div>
        <div className={style.col_4}>
          <h1>MOBILE APP</h1>
          <div className={style.logoOS}>
            <div className={style.apple_logo}>
              <i className="fab fa-apple"></i>
            </div>
            <div className={style.android_logo}>
              <i className="fab fa-android"></i>
            </div>
          </div>
        </div>
        <div className={style.col_5}>
          <h1>SOCIAL</h1>
          <div className={style.logoSocial}>
            <div className={style.fb_logo}>
              <i className="fab fa-facebook"></i>
            </div>
            <div className={style.zalo_logo}>
              <img src={zalo} alt="zalo" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={style.row_2}>
        <div>
          <img src={zion} alt="" />
        </div>
        <div className={style.middle}>
          <p>TIX - SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</p>
          <br />
          <p>
            Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí
            Minh, Việt Nam.
            <br /> Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
            <br />
            đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
            hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            <br /> Số Điện Thoại (Hotline): 1900 545 436
          </p>
        </div>
        <div className={style.right}>
          <img src={notice} alt="Thông báo bộ công thương" />
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
