import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import { Tabs } from "antd";
import moment from 'moment';
import React, { useState } from "react";
const { TabPane } = Tabs;
import store from "../../configStore";
import { getMovieTheater } from "../../Slices/theater";
import "antd/dist/antd.min.css";
import cssStyles from "./TheaterShowing.css";

const TheaterShowing = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const { theaters, isLoading, error } = useSelector(
    (state = store.reducer) => state.theater
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieTheater());
  }, []);

  if (isLoading) {
    // TODO: Loading component
    return <h1>Loading...</h1>;
  }

  if (error) {
    // TODO: Error component
    return <h1>{error}</h1>;
  }

  const renderTheater = () => {
    return theaters.map((theater, index) => {
      return (
        <TabPane
          tab={<img src={theater.logo} className="rounded-circle" width="50" />}
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {theater.lstCumRap.map((theaterAddress, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "400px", display: "flex" }}>
                      <img src={theater.logo} className="rounded-circle" width="65" />
                      <br />
                      <div className="text-left ms-2" style={{width:"250px"}}>
                        {theaterAddress.tenCumRap}
                        <p>{theaterAddress.diaChi}</p>
                        <p className="text-danger">[Chi tiết]</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {theaterAddress.danhSachPhim.map((movie, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="mb-4" style={{ display: "flex" }}>
                          <div style={{ display: "flex" }}>
                            <img
                              width={75}
                              height={75}
                              src={movie.hinhAnh}
                              alt={movie.tenPhim}
                              onError={(e)=>{e.target.onerror= null;e.target.src="https://picsum.photos/75/75"}}
                            />
                            <div className="ms-2">
                              <h5 className="text-success font-weight-bold">
                                {movie.tenPhim}
                              </h5>
                              <div className="row row-cols-2 row-cols-lg-3">
                                {movie.lstLichChieuTheoPhim.slice(0,12).map((movieTime,index)=>{
                                  return <NavLink className='text-success' key={index} to={`/checkout/${movieTime.maLichChieu}`}>
                                    {moment(movieTime.ngayChieuGioChieu).format('hh:mm A')} {moment(movieTime.ngayChieuGioChieu).format('DD/MM/YYYY')}
                                  </NavLink>
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <div>
      <Tabs tabPosition={tabPosition} className="tabContentTheater">{renderTheater()}</Tabs>
    </div>
  );
};
export default TheaterShowing;
