import axiosClient from "./axiosClient";
import { bookTicketInfo } from "../_core/models/BookTicketInfo";

const movieAPI = {
  getMovieShowing: () => {
    // Khai báo hàm call API dữ liệu trả về là Movie[]
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  getMovieDetails: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },
  getMovieBanners: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },
  getMovieTheather: () => {
    return axiosClient.get(
      "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01"
    );
  },
  getMovieTime: (movieId) => {
    return axiosClient.get(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`
    );
  },
  getListTicketRoom: (ticketId) => {
    return axiosClient.get(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${ticketId}`
    );
  },
  getUserLogin: async (userLogin) => {
    const res = await axiosClient.post(`QuanLyNguoiDung/DangNhap`, userLogin);
    return res;
  },
  getBookTicketInfo: async (bookTicket = new bookTicketInfo()) => {
    const res = await axiosClient.post(`QuanLyDatVe/DatVe`, bookTicket);
    return res;
  },
  getUserInfo: async () => {
    return await axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  getRegisterUser: async (userRegister) =>{
    return await axiosClient.post("QuanLyNguoiDung/DangKy", userRegister);
  },
};
export default movieAPI;
