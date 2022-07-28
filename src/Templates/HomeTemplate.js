import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderHome from '../Components/HeaderHome/HeaderHome';
import FooterPage from '../Pages/Footer/FooterPage';

const HomeTemplate = () => {
  return (
    <div>
        <HeaderHome/>
        <Outlet/>
        <FooterPage/>
    </div>
  )
}

export default HomeTemplate