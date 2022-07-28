import React, { useRef } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { getUserLogin } from "../../Slices/userLogin";
import { useDispatch } from "react-redux";

const Login = () => {
  const loginRef = useRef();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "onTouched",
  });
  const onSubmit = (values) => {
    const payload = {
      taiKhoan: values.userName,
      matKhau: values.password,
    };
    console.log(payload);
    dispatch(getUserLogin(payload));
  };

  const onError = (error) => {
    console.log(error);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={styles.parentLogin}>
        <div className={styles.row}>
          <div className={styles.logoLogin}>
            <div className={styles.logo}>
              <i className="fa fa-user-circle"></i>
            </div>
            <p className={styles.login}>Đăng nhập</p>
          </div>
          <input
            className={styles.info}
            type="text"
            {...register("userName", {
              required: {
                value: true,
                message: "* Tài khoản không được để trống",
              },
            })}
            placeholder="Tài khoản *"
          />
          {errors.userName && (
            <span className={styles.noticeInput}>
              {errors.userName?.message}
            </span>
          )}
          <br />
          <input
            className={styles.info}
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "* Mật khẩu không được để trống",
              },
            })}
            placeholder="Mật khẩu *"
          />
          {errors.password && (
            <span className={styles.noticeInput}>
              {errors.password?.message}
            </span>
          )}
          <button
            className={styles.buttonLogin}
            onClick={() => loginRef.current.click()}
          >
            Đăng nhập
          </button>
          <NavLink to="/register" className={styles.nouser}>
            Bạn chưa có tài khoản? Đăng ký
          </NavLink>
          {/* <NavLink to="/" ref={loginRef} hidden>
            backtohome
          </NavLink> */}
          ;
        </div>
      </div>
    </form>
  );
};

export default Login;
