import React, { useEffect } from "react";
import { Tabs, Rate } from "antd";
import store from "../../configStore";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovieTime } from "../../Slices/movieDetails";
import moment from "moment";
import "antd/dist/antd.min.css";
import circleCss from "../../Assets/styles/circle.css";
import style from "./detail.module.css";
const { TabPane } = Tabs;

const Detail = () => {
  const { id } = useParams();
  const { details, isLoading, error } = useSelector(
    (state = store.reducer) => state.detail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieTime(id));
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
      <div className="d-flex container mb-5" style={{ paddingTop: "150px" }}>
        <div className="d-flex justify-content-center text-center col-sm-6">
          <img
            className={style.hinhAnh}
            src={details.hinhAnh}
            atl="image"
          />
          <div className={style.moTa}>
            <p className="fst-italic">
              Ngày chiếu: {moment(details.ngayKhoiChieu).format("DD.MM.YYYY")}
            </p>
            <p className={style.tenPhim}>{details.tenPhim}</p>
            <p className={style.moTaPhim}>{details.moTa}</p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center text-center col-sm-6">
          <p className={style.danhGia}>
            Đánh giá
          </p>
          <p className={style.rate}>
            <Rate
              allowHalf
              value={details.danhGia / 2}
              style={{ color: "#78ed78", fontSize: 30 }}
            />
          </p>
          <div
            style={{ margin: 0 }}
            className={`c100 p${details.danhGia * 10} big`}
          >
            <span>{details.danhGia * 10}%</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
            <div>
              <Tabs tabPosition={"left"}>
                {details.heThongRapChieu?.map((htr, index) => {
                  return (
                    <TabPane
                      tab={
                        <div>
                          <img
                            src={htr.logo}
                            alt="logo"
                            width={65}
                            height={50}
                            style={{ paddingRight: 15 }}
                          />
                          {htr.tenHeThongRap}
                        </div>
                      }
                      key={index}
                    >
                      {htr.cumRapChieu?.map((cumRap,index)=>{
                        return <div className="mt-5" key={index}>
                          <div className="d-flex">
                            <img style={{width:60,height:60}} src={cumRap.hinhAnh}/>
                            <div className="ms-2">
                              <p style={{fontSize:20,fontWeight:'bold',lineHeight:1}}>{cumRap.tenCumRap}</p>
                              <p className="text-danger" style={{marginTop:0}}>{cumRap.diaChi}</p>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            {cumRap.lichChieuPhim?.slice(0,12).map((lichChieu,index)=>{
                              return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='col-sm-1 fw-bold ps-3'>
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                          </div>
                        </div>
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
            Thông tin
          </TabPane>
          <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
            Đánh giá
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Detail;
