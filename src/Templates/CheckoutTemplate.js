import React from "react";
import { Outlet } from "react-router-dom";

const CheckoutTemplate = () => {
  return (
    <div>
      {/* <h1>CheckoutTemplate</h1> */}
      <Outlet />
    </div>
  );
};

export default CheckoutTemplate;
