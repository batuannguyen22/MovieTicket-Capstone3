import React, { useRef } from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getRegisterUser } from "../../Slices/userRegister";
import { NavLink } from "react-router-dom";

const Register = () => {
  const registerRef = useRef();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
      groupId: "",
      fullName: "",
    },
    mode: "onTouched",
  });
  const onSubmit = (values) => {
    const payload = {
      taiKhoan: values.userName,
      matKhau: values.password,
      email: values.email,
      soDt: values.phoneNumber,
      maNhom: values.groupId,
      hoTen: values.fullName,
    };
    console.log(payload);
    dispatch(getRegisterUser(payload));
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
            <p className={styles.login}>Đăng ký</p>
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
          <br />
          <input
            className={styles.info}
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "* Email không được để trống",
              },
            })}
            placeholder="Email *"
          />
          {errors.email && (
            <span className={styles.noticeInput}>{errors.email?.message}</span>
          )}
          <br />
          <input
            className={styles.info}
            type="text"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "* Số điện thoại không được để trống",
              },
            })}
            placeholder="Số điện thoại *"
          />
          {errors.phoneNumber && (
            <span className={styles.noticeInput}>
              {errors.phoneNumber?.message}
            </span>
          )}
          <br />
          <input
            className={styles.info}
            type="text"
            {...register("groupId", {
              required: {
                value: true,
                message: "* Mã nhóm không được để trống",
              },
            })}
            placeholder="Mã nhóm *"
          />
          {errors.groupId && (
            <span className={styles.noticeInput}>
              {errors.groupId?.message}
            </span>
          )}
          <br />
          <input
            className={styles.info}
            type="text"
            {...register("fullName", {
              required: {
                value: true,
                message: "* Họ và tên không được để trống",
              },
            })}
            placeholder="Họ và tên *"
          />
          {errors.fullName && (
            <span className={styles.noticeInput}>
              {errors.fullName?.message}
            </span>
          )}
          <br />
          <button
            className={styles.buttonLogin}
            onClick={() => registerRef.current.click()}
          >
            Đăng ký
          </button>
          <NavLink to="/" ref={registerRef} hidden>backtohome</NavLink>
        </div>
      </div>
    </form>
  );
};

export default Register;
