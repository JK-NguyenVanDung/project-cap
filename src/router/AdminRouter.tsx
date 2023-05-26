// eslint-disable-next-line import/newline-after-import
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from '../pages/landing page/LandingPage';

import apiService from '../api/apiService';

import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';
import Login from './Logined';
import { useMsal } from '@azure/msal-react';

const AdminRoute = React.lazy(() => import('./AdminRoute'));

import ClientRoute from './ClientRoute';

export default function MakePagesRouter() {
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  const userInfo = useAppSelector((state) => state.auth.info);
  const [info, setInfo] = useState(null);
  const dispatch = useAppDispatch();
  // const token = localStorage.getItem('Bearer');
  // console.count();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response: any = await apiService.getProfile();
        setInfo(response);
        if (userInfo && userInfo?.roleId !== response?.roleId) {
          dispatch(actions.authActions.setInfo(response));
        }
      } catch (err: any) {
        throw err.message;
      }
    };

    accounts.length > 0 && fetchInfo();
  }, []);
  const RouterLearner = () => {
    if (LoginParmas.id == 1 || info?.roleId === 1) {
      return (
        <React.Suspense fallback={<></>}>
          <ClientRoute />
        </React.Suspense>
      );
    }

    if (LoginParmas.id == 2) {
      // if (info?.roleId === 2) {
      return (
        <React.Suspense fallback={<></>}>
          <AdminRoute info={info} />
        </React.Suspense>
      );

      //} else if (info?.roleId === 3) {
      //   return (
      //     <Routes>
      //       {RouterCenter.map((router, index) => {
      //         return (
      //           <Route
      //             key={index}
      //             path={router.path}
      //             element={
      //               <SideBar
      //                 content={router.element}
      //                 noHeader={router.noHeader ? router.noHeader : false}
      //               />
      //             }
      //           />
      //         );
      //       })}
      //       <Route path="/admin/Survey/Question" element={<SurveyQuestion />} />

      //       <Route
      //         path="/admin/Program/Chapter/:number/Test/Question"
      //         element={<Question />}
      //       />
      //       <Route path="/admin/reviewDetail" element={<ReviewDetail />} />
      //       <Route path="/login" element={<Logined />} />
      //       <Route path="/" element={<LandingPage />} />
      //       <Route path="admin/Survey/:surveyId" element={<ClientSurvey />} />
      //       <Route
      //         path="/ProgramSurvey/:surveyName"
      //         element={<ProgramSurvey />}
      //       />
      //       <Route
      //         path="*"
      //         element={<NotFoundPage reRoute={reRoute + '/admin'} />}
      //       />
      //     </Routes>
      //   );
      // } else {
      //   return (
      //     <Routes>
      //       {RouterFaculty.map((router, index) => {
      //         return (
      //           <Route
      //             key={index}
      //             path={router.path}
      //             element={
      //               <SideBar
      //                 content={router.element}
      //                 noHeader={router.noHeader ? router.noHeader : false}
      //               />
      //             }
      //           />
      //         );
      //       })}
      //       <Route path="/admin/Survey/Question" element={<SurveyQuestion />} />

      //       <Route
      //         path="/admin/Program/Chapter/:number/Test/Question"
      //         element={<Question />}
      //       />
      //       <Route path="/admin/reviewDetail" element={<ReviewDetail />} />
      //       <Route path="/login" element={<Logined />} />
      //       <Route path="/" element={<LandingPage />} />
      //       <Route path="admin/Survey/:surveyId" element={<ClientSurvey />} />
      //       <Route
      //         path="/ProgramSurvey/:surveyName"
      //         element={<ProgramSurvey />}
      //       />
      //       <Route
      //         path="*"
      //         element={<NotFoundPage reRoute={reRoute + '/admin'} />}
      //       />
      //     </Routes>
      //   );
      // }
    }

    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  };
  return <RouterLearner />;
}
