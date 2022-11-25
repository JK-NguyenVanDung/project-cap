// eslint-disable-next-line import/newline-after-import
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../pages/admin';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import LandingPage from '../pages/landing page/LandingPage';
import Category from '../pages/admin/Category/Category';
import Account from '../pages/admin/account/Account';
import Program from '../pages/admin/Program/Program';
import ProgramDetail from '../pages/admin/Program/ProgramDetail';

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { loginRequest } from '../pages/authentication/loginconfig';
import { callMsGraph } from '../pages/authentication/graph';
import Faculties from '../pages/admin/Faculties/Faculties';
import EditProgram from '../pages/admin/Program/EditProgram';

export const AdminRouter = [
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/Account',
    element: <Account />,
  },
  {
    path: '/admin/Category',
    element: <Category />,
  },
  {
    path: '/admin/Program',
    element: <Program />,
  },
  {
    path: `/admin/Program/:ProgramId`,
    element: <ProgramDetail />,
  },

  {
    path: '/admin/Learner',
    element: <Account />,
  },
  {
    path: '/admin/Test',
    element: <Account />,
  },
  {
    path: '/admin/Faculties',
    element: <Faculties />,
  },
  {
    path: '/admin/EditProgram',
    element: <EditProgram type="Thêm" />,
  },
];
export default function MakeAdminRouter() {
  return (
    <Routes>
      {AdminRouter.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            element={<SideBar content={router.element} />}
          />
        );
      })}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
