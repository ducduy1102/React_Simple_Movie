import React, { Fragment } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

// 212
const Main = () => {
  return (
    <Fragment>
      <Header></Header>
      {/* Outlet lấy những thằng trong Main ở file app.js */}
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Main;
