import React, { Fragment, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import style from "./Checkout.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getListTicketRoom,
  addChairtoList,
  completeBooked,
} from "../../Slices/listTicketRoom";
import { getBookTicketInfo } from "../../Slices/bookTicketInfo";
import { getUserInfo } from "../../Slices/userInfo";
import { bookTicketInfo } from "../../_core/models/BookTicketInfo";
import moment from "moment";
import checkoutCss from "./checkout.css";
import _ from "lodash";
import { CloseOutlined, UserOutlined, CheckOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import store from '../../configStore';

const CheckoutPage = () => {
  const { id } = useParams();
  const { ticketRoom, isLoading, error, listBookingTicket } = useSelector(
    (state = store.reducer) => state.ticket
  );
  const { userLogin } = useSelector((state = store.reducer) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTicketRoom(id));
  }, []);

  if (isLoading) {
    // TODO: Loading component
    return <h1>Loading...</h1>;
  }

  if (error) {
    // TODO: Error component
    return <h1>{error}</h1>;
  }

  const renderSeats = () => {
    return ticketRoom.danhSachGhe?.map((chair, index) => {
      let classVipChair = chair.loaiGhe === "Vip" ? "vipChair" : "";
      let classBookedChair = chair.daDat === true ? "bookedChair" : "";
      let classBookingChair = "";
      let indexBookingChair = listBookingTicket.findIndex(
        (bookingChair) => bookingChair.maGhe === chair.maGhe
      );
      let classYourBookedChair = "";
      if (userLogin.taiKhoan === chair.taiKhoanNguoiDat) {
        classYourBookedChair = "yourBookedChair";
      }
      if (indexBookingChair !== -1) {
        classBookedChair = "bookingChair";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(addChairtoList(chair));
            }}
            disabled={chair.daDat}
            className={`chair ${classVipChair} ${classBookedChair} ${classBookingChair} ${classYourBookedChair}`}
            key={index}
          >
            {chair.daDat ? (
              classYourBookedChair != "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : (
              chair.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="mt-3" style={{ minHeight: "100vh" }}>
      <div className="d-flex col-sm-12">
        <div className="col-sm-8">
          <div className="d-flex flex-column align-items-center mt-2">
            <div className="bg-dark" style={{ width: "80%", height: 15 }}></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h5 className="mt-3 text-danger fw-bold">Màn hình</h5>
            </div>
            <div className="mt-5">{renderSeats()}</div>
          </div>
          <div
            className="mt-5 d-flex"
            style={{ width: "80%", marginLeft: "10%" }}
          >
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế mình đặt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button className="chair text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="chair bookingChair text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="chair vipChair text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="chair bookedChair text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="chair yourBookedChair text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-4 text-center fs-4">
          <h3 className="text-success fs-3">
            {listBookingTicket
              .reduce((totalFee, ticket) => {
                return (totalFee += ticket.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3>
          <hr />
          <h3 className="fs-4 fw-bold text-primary">
            {ticketRoom.thongTinPhim?.tenPhim}
          </h3>
          <p className="fs-5">
            Địa điểm: {ticketRoom.thongTinPhim?.tenCumRap} -{" "}
            {ticketRoom.thongTinPhim?.tenRap}
          </p>
          <p className="fs-5">
            Ngày chiếu: {ticketRoom.thongTinPhim?.ngayChieu} -{" "}
            {ticketRoom.thongTinPhim?.gioChieu}
          </p>
          <hr />
          <div className="d-flex my-5">
            <div className="d-flex flex-wrap justify-content-start align-items-center col-sm-8">
              <span className="text-danger fw-bold pe-3">Ghế</span>
              {_.sortBy(listBookingTicket, ["stt"]).map(
                (bookingTicket, index) => {
                  return (
                    <span className="text-warning fw-bold pe-2" key={index}>
                      {bookingTicket.stt}
                    </span>
                  );
                }
              )}
            </div>
            <div className="d-flex flex-wrap justify-content-end col-sm-4">
              <span className="text-danger fs-2 fw-bold ">đã chọn</span>
            </div>
          </div>
          <hr />
          <div>
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <br />
          <div>
            <i>Phone</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div
            className="justify-content-end align-items-center"
            style={{ marginBottom: 0 }}
          >
            <div
              className="bg-success text-white w-100 text-center py-3 fw-bold fs-4 "
              style={{ cursor: "pointer" }}
              onClick={async () => {
                const thongTinDatVe = new bookTicketInfo();
                thongTinDatVe.maLichChieu = id;
                thongTinDatVe.danhSachVe = listBookingTicket;
                dispatch(getBookTicketInfo(thongTinDatVe));
                await dispatch(getListTicketRoom(id));
                await dispatch(completeBooked());
              }}
            >
              Đặt vé
            </div>
            <NavLink to="/">
              <div className="bg-danger text-white w-100 text-center mt-5 py-3 fw-bold fs-4 ">
                Trở về trang chủ
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default CheckoutPage;

const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

const BookedTicketHistory = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state = store.reducer) => state.userInfo);
  useEffect(() => {
    dispatch(getUserInfo());
  });
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const renderTicketItem = () => {
    return userInfo.thongTinDatVe?.map((ticket, index) => {
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src="https://dummyimage.com/80x80"
            />
            <div className="flex-grow">
              <h2 className="text-blue-500 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-orange-700">
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")} - Ngày
                chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <i className="text-green-700">
                Địa điểm: {_.first(ticket.danhSachGhe).tenHeThongRap}
              </i>
              <br />
              <b>Tên rạp: {_.first(ticket.danhSachGhe).tenCumRap}</b>
              <p>
                Ghế:{" "}
                {ticket.danhSachGhe?.map((ghe, index) => {
                  return (
                    <span
                      className="text-lg"
                      style={{ color: "red" }}
                      key={index}
                    >
                      [{ghe.tenGhe}]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-orange-500">
              Lịch sử đặt vé của khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Quý khách vui lòng xem lại thông tin địa điểm và thời gian phim
              trước khi đến rạp.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
};

const checkoutPage = () => {
  return (
    <div className="p-3">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <CheckoutPage />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <BookedTicketHistory />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default checkoutPage;
