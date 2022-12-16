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
import ReviewDetail from '../pages/admin/ReviewProgram/ReviewDetail';
import apiService from '../api/apiService';

import ClientSideBar from '../pages/client/';
import Homepage from '../pages/client/Homepage/Homepage';

import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';
import AcedemicYear from '../pages/admin/AcedemicYear/AcedemicYear';
import Position from '../pages/admin/Position/Position';
import ListReviewPrograms from '../pages/admin/ReviewProgram/ListReviewProgram';
import Courses from '../pages/client/Courses/Courses';
import CourseDetail from '../pages/client/Courses/CourseDetail';

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
    path: '/admin/MyProgram',
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
    path: '/admin/AcedemicYear',
    element: <AcedemicYear />,
  },
  {
    path: '/admin/Postions',
    element: <Position />,
  },
  {
    path: '/admin/reviewProgram',
    element: <ListReviewPrograms />,
  },
  {
    path: '/home',
    element: <Homepage />,
  },
];
const Leaner = [
  {
    path: '/home',
    element: <Homepage />,
  },
  {
    path: '/Courses',
    element: <Courses />,
  },
  {
    path: '/Courses/:courseName',
    element: <CourseDetail />,
  },
];
export default function MakePagesRouter() {
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  const info = useAppSelector((state) => state.auth.info);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('Bearer');

  useEffect(() => {
    const fetchInfo = async () => {
      const response: any = await apiService.getProfile();
      dispatch(actions.authActions.setInfo(response));
    };
    fetchInfo();
  }, [token]);
  const RouterLeaner = () => {
    if (LoginParmas.id == 1) {
      return (
        <Routes>
          {Leaner.map((router, index) => {
            return (
              <Route
                key={index}
                path={router.path}
                element={<ClientSideBar content={router.element} />}
              />
            );
          })}
          <Route path="/login" element={<Logined />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      );
    }

    if (LoginParmas.id == 2) {
      if (info?.roleId != 1) {
        return (
          <Routes>
            {RouterPages.map((router, index) => {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={<SideBar content={router.element} />}
                />
              );
            })}
            <Route
              path="/admin/Program/Chapter/:number/Test/Question"
              element={<Question />}
            />

            <Route path="/admin/reviewDetail" element={<ReviewDetail />} />

            <Route path="/login" element={<Logined />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        );
      } else {
        return (
          <Routes>
            {Leaner.map((router, index) => {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={router.element}
                />
              );
            })}
            <Route path="/login" element={<Logined />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        );
      }
    }
  };
  return <RouterLeaner />;
}
