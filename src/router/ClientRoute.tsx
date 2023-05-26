// eslint-disable-next-line import/newline-after-import
import { Navigate, Route, Routes } from 'react-router-dom';

import LandingPage from '../pages/landing page/LandingPage';

import Logined from './Logined';

import UserTest from '../pages/client/Programs/Test/Test';
import UserReviewTest from '../pages/client/Programs/Test/ReviewTest';

import ClientSideBar from '../pages/client/';
import Homepage from '../pages/client/Homepage/Homepage';

import UserProgram from '../pages/client/Programs/Programs';
import UserProgramDetail from '../pages/client/Programs/ProgramDetail';
import UserChapters from '../pages/client/Programs/Chapters/Chapters';
import RegisteredPrograms from '../pages/client/Programs/RegisteredPrograms';
import MyCourses from '../pages/client/Programs/MyProgram';
import Attendance from '../pages/admin/Attendances/Attendance';
import Survey from '../pages/admin/Survey/General/Survey';
import SurveyDetail from '../pages/admin/Survey/General/SurveyDetail';

import ClientSurvey from '../pages/client/Survey/Survey';
import ProgramSurvey from '../pages/client/Survey/ProgramSurvey';

import ResultProgram from '../pages/client/Programs/ResultProgram';

import Badge from '../pages/client/Badge';
import DetailBade from '../pages/client/Badge/DetailBade';
import GiftScreen from '../pages/client/Gift';

import CoinExchanges from '../pages/client/CoinExchanges/CoinExchanges';
import HistoryRedeem from '../pages/client/Gift/Component/HistoryRedeem';
import CoinExchangesDetail from '../pages/client/CoinExchanges/CoinExchangesDetail';
import NotFoundPage from '../NotFoundPage';

import UserGuide from '../pages/client/Guide/Guide';
import { reRoute } from '../../onBuild';

const Learner = [
  {
    path: '/Guide',
    element: <UserGuide />,
  },
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
    path: '/Programs/Like',
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
  {
    path: '/ResultProgram/:programId',
    element: <ResultProgram />,
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
    path: '/Badge',
    element: <Badge />,
  },
  {
    path: '/historyRedeem',
    element: <HistoryRedeem />,
  },
  {
    path: '/detailBadge',
    element: <DetailBade />,
  },

  {
    path: '/CoinExchanges/',
    element: <CoinExchanges />,
  },
  {
    path: '/CoinExchanges/:id',
    element: <CoinExchangesDetail />,
  },
  {
    path: '/Gift',
    element: <GiftScreen />,
  },
];
export default function ClientRoute() {
  return (
    <>
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
        <Route path="/ProgramSurvey/:surveyName" element={<ProgramSurvey />} />
        <Route path="/ProgramSurvey/:surveyName" element={<ResultProgram />} />
        <Route path="*" element={<NotFoundPage reRoute={reRoute} />} />
      </Routes>
    </>
  );
}
