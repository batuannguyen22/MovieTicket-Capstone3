import React from "react";
import logo from "../../Assets/img/logo.png";
import style from "./HeaderHome.module.css";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {signOut} from '../../Slices/userLogin';
import store from '../../configStore';

const HeaderHome = () => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state = store.reducer) => state.user);
  const logOut = () =>{
    dispatch(signOut());
  }
  const renderLogin = () => {
    if (userLogin === null) {
      return (
        <div className={style.right}>
          <div className={style.right_left}>
            <div className={style.leftLogo}>
              <i className="fa fa-user-circle"></i>
            </div>
            <NavLink className={style.loginFont} to="/login">Đăng Nhập</NavLink>
          </div>
          <hr style={{ height: "50px" }} />
          <div className={style.right_right}>
            <div className={style.leftLogo}>
              <i className="fa fa-user-circle"></i>
            </div>
            <NavLink className={style.loginFont} to="/register">Đăng Ký</NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.right}>
          <div className={style.loginName}>Hi! {userLogin.taiKhoan}</div>
          <button className={style.loginName} onClick={()=>logOut()}>Đăng xuất</button>
        </div>
      );
    }
  };
  return (
    <div className={style.header}>
      <div className={style.left}>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className={style.middle}>
        <p>Lịch Chiếu</p>
        <p>Cụm Rạp</p>
        <p>Tin Tức</p>
        <NavLink to="/about">
          <p>Ứng Dụng</p>
        </NavLink>
      </div>
      <div className={style.right}>{renderLogin()}</div>
    </div>
  );
};

export default HeaderHome;
