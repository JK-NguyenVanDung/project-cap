import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing page';
import MakeAdminRouter from './router/AdminRouter';
import 'antd/dist/antd.css';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

import Login from './pages/authentication/Login';

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <MakeAdminRouter />
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
