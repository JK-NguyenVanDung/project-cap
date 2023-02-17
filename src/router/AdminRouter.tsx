// eslint-disable-next-line import/newline-after-import
import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../pages/admin';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import LandingPage from '../pages/landing page/LandingPage';
import Category from '../pages/admin/Category/Category';
import Account from '../pages/admin/account/Account';
import Program from '../pages/admin/Program/Program';
import ProgramDetail from '../pages/admin/Program/ProgramDetail';
import Faculties from '../pages/admin/Faculties/Faculties';
import FormProgram from '../pages/admin/Program/FormProgram';
import Logined from './Logined';
import ChapterInfo from '../pages/admin/Program/Chapter/ChapterInfo';
import Question from '../pages/admin/Program/Test/Question';
import Test from '../pages/admin/Program/Test/Test';
import ReviewDetail from '../pages/admin/ReviewProgram/ReviewDetail';
import UserTest from '../pages/client/Programs/Test/Test';
import UserReviewTest from '../pages/client/Programs/Test/ReviewTest';

import apiService from '../api/apiService';

import ClientSideBar from '../pages/client/';
import Homepage from '../pages/client/Homepage/Homepage';

import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';
import AcademicYear from '../pages/admin/AcademicYear/AcademicYear';
import Position from '../pages/admin/Position/Position';
import ListReviewPrograms from '../pages/admin/ReviewProgram/ListReviewProgram';
import LearnerPage from '../pages/admin/Learner/LearnerPage';
import Published from '../pages/admin/Learner/ProgramPublish';
import UserProgram from '../pages/client/Programs/Programs';
import UserProgramDetail from '../pages/client/Programs/ProgramDetail';
import UserChapters from '../pages/client/Programs/Chapters/Chapters';
import RegisteredPrograms from '../pages/client/Programs/RegisteredPrograms';
import Application from '../pages/admin/Learner/Application/Application';
import MyCourses from '../pages/client/Programs/MyProgram';
import Attendance from '../pages/admin/Attendances/Attendance';
import Survey from '../pages/admin/Survey/General/Survey';
import SurveyDetail from '../pages/admin/Survey/General/SurveyDetail';

import SurveyQuestion from '../pages/admin/Survey/General/SurveyQuestion/Question';
import CourseSurvey from '../pages/admin/Survey/Program/ProgramSurvey';
import ProgramSurveyDetail from '../pages/admin/Survey/Program/ProgramSurveyDetail';

import ClientSurvey from '../pages/client/Survey/Survey';
import ProgramSurvey from '../pages/client/Survey/ProgramSurvey';

import CommentManagement from '../pages/admin/Comment/Comment';
import CommentDetailManagement from '../pages/admin/Comment/CommentDetail';

export const RouterPages = [
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Navigate replace to="/admin" />,
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
    path: '/admin/FormProgram',
    element: <FormProgram />,
  },
  {
    path: '/admin/AcademicYear',
    element: <AcademicYear />,
  },
  {
    path: '/admin/Position',
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
  {
    path: '/admin/ListLearner',
    element: <LearnerPage />,
  },
  {
    path: '/admin/Published',
    element: <Published />,
  },
  {
    path: '/admin/Application',
    element: <Application />,
  },
  {
    path: '/admin/Attendance',
    element: <Attendance />,
  },
  {
    path: '/admin/Survey',
    element: <Survey />,
  },
  {
    path: '/admin/Survey/Detail',
    element: <SurveyDetail />,
  },
  {
    path: '/admin/CourseSurvey',
    element: <CourseSurvey />,
  },
  {
    path: '/admin/CourseSurvey/Detail',
    element: <ProgramSurveyDetail />,
  },
  {
    path: '/admin/Comment',
    element: <CommentManagement />,
  },
  {
    path: '/admin/Comment/Detail',
    element: <CommentDetailManagement />,
  },
];

export const RouterCenter = [
  {
    path: '/admin/Attendance',
    element: <Attendance />,
  },
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Navigate replace to="/admin" />,
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
    path: '/admin/FormProgram',
    element: <FormProgram />,
  },
  {
    path: '/admin/AcademicYear',
    element: <AcademicYear />,
  },
  {
    path: '/admin/Position',
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

  {
    path: '/admin/ListLearner',
    element: <LearnerPage />,
  },
  {
    path: '/admin/Published',
    element: <Published />,
  },
  {
    path: '/admin/Application',
    element: <Application />,
  },
];
export const RouterFaculty = [
  {
    path: '/admin/Application',
    element: <Application />,
  },
  {
    path: '/admin/Attendance',
    element: <Attendance />,
  },
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Navigate replace to="/admin" />,
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
    path: '/admin/FormProgram',
    element: <FormProgram />,
  },
  {
    path: '/admin/AcademicYear',
    element: <AcademicYear />,
  },
  {
    path: '/admin/Position',
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

  {
    path: '/admin/ListLearner',
    element: <LearnerPage />,
  },

  {
    path: '/admin/Published',
    element: <Published />,
  },
];
const Learner = [
  {
    path: '/home',
    element: <Homepage />,
  },

  {
    path: '*',
    element: <Navigate replace to="/home" />,
  },
  {
    path: '/Programs',
    element: <UserProgram />,
  },
  {
    path: '/Programs/:programName',
    element: <UserProgramDetail />,
  },
  {
    path: '/Programs/:programName/Chapters',
    element: <UserChapters />,
  },
  {
    path: '/RegisteredPrograms',
    element: <RegisteredPrograms />,
  },
  {
    path: '/MyCourses',
    element: <MyCourses />,
  },
  {
    path: '/MyCourses/:programName',
    element: <UserProgramDetail />,
  },
  {
    path: '/MyCourses/:programName/Chapters',
    element: <UserChapters />,
  },
];
export default function MakePagesRouter() {
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  const info = useAppSelector((state) => state.auth.info);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('Bearer');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response: any = await apiService.getProfile();
        dispatch(actions.authActions.setInfo(response));
      } catch (err: any) {
        throw err.message;
      }
    };
    try {
      fetchInfo();
    } catch (err: any) {
      throw err.message;
    }
    // dispatch(
    //   actions.authActions.setInfo({
    //     accountId: 64,
    //   }),
    // );
  }, [token]);
  const RouterLearner = () => {
    if (LoginParmas.id == 1) {
      return (
        <Routes>
          {Learner.map((router, index) => {
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
          <Route key={'test'} path={'/Test/:testId'} element={<UserTest />} />
          <Route
            key={'reviewTest'}
            path={'/Test/Review/:testId'}
            element={<UserReviewTest />}
          />
          <Route path="/Survey/:surveyId" element={<ClientSurvey />} />
          <Route
            path="/ProgramSurvey/:surveyName"
            element={<ProgramSurvey />}
          />
        </Routes>
      );
    }

    if (LoginParmas.id == 2) {
      if (info?.roleId === 2) {
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
            <Route path="/admin/Survey/Question" element={<SurveyQuestion />} />

            <Route path="/admin/reviewDetail" element={<ReviewDetail />} />

            <Route path="/login" element={<Logined />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="admin/Survey/:surveyId" element={<ClientSurvey />} />
            <Route
              path="/ProgramSurvey/:surveyName"
              element={<ProgramSurvey />}
            />
          </Routes>
        );
      } else {
        return (
          <Routes>
            {RouterCenter.map((router, index) => {
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
            <Route path="admin/Survey/:surveyId" element={<ClientSurvey />} />
            <Route
              path="/ProgramSurvey/:surveyName"
              element={<ProgramSurvey />}
            />
          </Routes>
        );
      }
    }
  };
  return <RouterLearner />;
}
