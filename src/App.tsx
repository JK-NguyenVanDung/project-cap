import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LandingPage from './pages/landing page/LandingPage';
import 'antd/dist/antd.css';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

import Login from './pages/authentication/Login';
import MakePagesRouter from './router/AdminRouter';

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <MakePagesRouter />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
