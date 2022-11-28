// eslint-disable-next-line import/newline-after-import
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../pages/admin';
import LandingPage from '../pages/landing page/LandingPage';
import Home from '../pages/client';
import Logined from './Logined';

export const UserRouter = [
  {
    path: '/home',
    element: <Home />,
  },
];
export default function MakeUserRouter() {
  return (
    <Routes>
      {UserRouter.map((router, index) => {
        return (
          <Route key={index} path={router.path} element={router.element} />
        );
      })}
      <Route path="/login" element={<Logined />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
