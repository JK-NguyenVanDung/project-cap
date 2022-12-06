// eslint-disable-next-line import/newline-after-import
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../pages/admin';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import LandingPage from '../pages/landing page/LandingPage';
import Category from '../pages/admin/Category/Category';
import Account from '../pages/admin/account/Account';
import Program from '../pages/admin/Program/Program';
import ProgramDetail from '../pages/admin/Program/ProgramDetail';
import Faculties from '../pages/admin/Faculties/Faculties';
import EditProgram from '../pages/admin/Program/EditProgram';
import Logined from './Logined';
import ChapterInfo from '../pages/admin/Program/Chapter/ChapterInfo';
import Question from '../pages/admin/Program/Test/Question';
import Test from '../pages/admin/Program/Test/Test';
import Home from '../pages/client';
import apiService from '../api/apiService';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';

export const RouterPages = [
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
    path: `/admin/Program/showDetail`,
    element: <ProgramDetail />,
  },
  {
    path: `/admin/Program/Chapter/:number`,
    element: <ChapterInfo />,
  },
  {
    path: '/admin/Program/Chapter/:number/Test',
    element: <Test />,
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
    element: <EditProgram />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];
const Leaner = [
  {
    path: '/home',
    element: <Home />,
  },
];
export default function MakePagesRouter() {
  const [roleId, setRoleId] = useState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async () => {
      const response: any = await apiService.getProfile();
      setRoleId(response.roleId);
      dispatch(actions.authActions.setInfo(response));
    };
  }, []);
  return (
    <Routes>
      <Route
        path="/admin/Program/Chapter/:number/Test/Question"
        element={<Question />}
      />
      {roleId == 1
        ? Leaner.map((router, index) => {
            return (
              <Route key={index} path={router.path} element={router.element} />
            );
          })
        : RouterPages.map((router, index) => {
            return (
              <Route
                key={index}
                path={router.path}
                element={<SideBar content={router.element} />}
              />
            );
          })}
      <Route path="/login" element={<Logined />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
