import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing page/LandingPage';
import 'antd/dist/antd.css';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

import Login from './pages/authentication/Login';
import MakePagesRouter from './router/AdminRouter';
import NotFoundPage from './NotFoundPage';
import { reRoute } from '../onBuild';

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
          <Route path="*" element={<NotFoundPage reRoute={reRoute} />} />
        </Routes>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
