// eslint-disable-next-line import/newline-after-import
import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SideBar from '../pages/admin';
import HomePage from '../pages/admin/HomePage/HomePage';
import LandingPage from '../pages/landing page/LandingPage';
import { useAppSelector } from '../hook/useRedux';
import apiService from '../api/apiService';

//shared

import { useAppSelector } from '../hook/useRedux';
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

//admin
const Category = React.lazy(() => import('../pages/admin/Category/Category'));
const Account = React.lazy(() => import('../pages/admin/account/Account'));
const Program = React.lazy(() => import('../pages/admin/Program/Program'));
const ProgramDetail = React.lazy(
  () => import('../pages/admin/Program/ProgramDetail'),
);
const Faculties = React.lazy(
  () => import('../pages/admin/Faculties/Faculties'),
);
const FormProgram = React.lazy(
  () => import('../pages/admin/Program/FormProgram'),
);
const ChapterInfo = React.lazy(
  () => import('../pages/admin/Program/Chapter/ChapterInfo'),
);
const Question = React.lazy(
  () => import('../pages/admin/Program/Test/Question'),
);
const Test = React.lazy(() => import('../pages/admin/Program/Test/Test'));
const ReviewDetail = React.lazy(
  () => import('../pages/admin/ReviewProgram/ReviewDetail'),
);
const UserTest = React.lazy(() => import('../pages/client/Programs/Test/Test'));
const UserReviewTest = React.lazy(
  () => import('../pages/client/Programs/Test/ReviewTest'),
);
const ClientSideBar = React.lazy(() => import('../pages/client/'));

const AcademicYear = React.lazy(
  () => import('../pages/admin/AcademicYear/AcademicYear'),
);
const Position = React.lazy(() => import('../pages/admin/Position/Position'));
const ListReviewPrograms = React.lazy(
  () => import('../pages/admin//ReviewProgram/ListReviewProgram'),
);
const Attendance = React.lazy(
  () => import('../pages/admin/Attendances/Attendance'),
);
const Survey = React.lazy(() => import('../pages/admin/Survey/General/Survey'));
const SurveyDetail = React.lazy(
  () => import('../pages/admin/Survey/General/SurveyDetail'),
);
const Application = React.lazy(
  () => import('../pages/admin/Learner/Application/Application'),
);

const SurveyQuestion = React.lazy(
  () => import('../pages/admin/Survey/General/SurveyQuestion/Question'),
);
const CourseSurvey = React.lazy(
  () => import('../pages/admin/Survey/Program/ProgramSurvey'),
);
const ProgramSurveyDetail = React.lazy(
  () => import('../pages/admin/Survey/Program/ProgramSurveyDetail'),
);
const ProgramResult = React.lazy(
  () => import('../pages/admin/ProgramResult/ProgramResult'),
);
const StatisticFaculty = React.lazy(
  () => import('../pages/admin/Statistics/StatisticFaculty'),
);
const StatisticCategory = React.lazy(
  () => import('../pages/admin/Statistics/StatisticCategory'),
);
const ManagerGiftScreen = React.lazy(
  () => import('../pages/admin/ManagerGift/ManagerGiftScreen'),
);
const SupportProgram = React.lazy(
  () => import('../pages/admin/SupportProgram/SupportProgram'),
);
const Supporters = React.lazy(
  () => import('../pages/admin/SupportProgram/Supporters'),
);
const Guide = React.lazy(() => import('../pages/admin/Guide/Guide'));
const ExchangeGift = React.lazy(
  () => import('../pages/admin/ExchangeGift/ExchangeGift'),
);
const ExchangeCoin = React.lazy(
  () => import('../pages/admin/ExchangeCoin/ExchangeCoin'),
);
const ReviewCertification = React.lazy(
  () => import('../pages/admin/ExchangeCoin/Detail/ReviewCertification'),
);

const Dashboard = React.lazy(
  () => import('../pages/admin/Dashboard/Dashboard'),
);

const CommentManagement = React.lazy(
  () => import('../pages/admin/Comment/Comment'),
);
const CommentDetailManagement = React.lazy(
  () => import('../pages/admin/Comment/CommentDetail'),
);

//client

const LearnerPage = React.lazy(
  () => import('../pages/admin/Learner/LearnerPage'),
);
const Published = React.lazy(
  () => import('../pages/admin/Learner/ProgramPublish'),
);
const UserProgram = React.lazy(
  () => import('../pages/client/Programs/Programs'),
);
const UserProgramDetail = React.lazy(
  () => import('../pages/client/Programs/ProgramDetail'),
);
const UserChapters = React.lazy(
  () => import('../pages/client/Programs/Chapters/Chapters'),
);
const RegisteredPrograms = React.lazy(
  () => import('../pages/client/Programs/RegisteredPrograms'),
);

const MyCourses = React.lazy(
  () => import('../pages/client/Programs/MyProgram'),
);
const Homepage = React.lazy(() => import('../pages/client/Homepage/Homepage'));

const ClientSurvey = React.lazy(() => import('../pages/client/Survey/Survey'));
const ProgramSurvey = React.lazy(
  () => import('../pages/client/Survey/ProgramSurvey'),
);

const ResultProgram = React.lazy(
  () => import('../pages/client/Programs/ResultProgram'),
);

const Badge = React.lazy(() => import('../pages/client/Badge'));
const DetailBade = React.lazy(() => import('../pages/client/Badge/DetailBade'));
const GiftScreen = React.lazy(() => import('../pages/client/Gift'));

const CoinExchanges = React.lazy(
  () => import('../pages/client/CoinExchanges/CoinExchanges'),
);
const HistoryRedeem = React.lazy(
  () => import('../pages/client/Gift/Component/HistoryRedeem'),
);
const CoinExchangesDetail = React.lazy(
  () => import('../pages/client/CoinExchanges/CoinExchangesDetail'),
);
const NotFoundPage = React.lazy(() => import('../NotFoundPage'));

const UserGuide = React.lazy(() => import('../pages/client/Guide/Guide'));
import { reRoute } from '../../onBuild';
import Loading from '../components/sharedComponents/Loading';

export const RouterPages = [
  {
    path: '/admin',
    element: <HomePage />,
    noHeader: true,
  },
  {
    path: '/admin/Dashboard',
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
    path: '/admin/SupportProgram',
    element: <SupportProgram />,
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
  {
    path: '/admin/Program/Result',
    element: <ProgramResult />,
  },
  {
    path: '/admin/Statistic/Faculty',
    element: <StatisticFaculty />,
  },

  {
    path: '/admin/Statistic/Category',
    element: <StatisticCategory />,
  },
  {
    path: '/admin/Gift',
    element: <ManagerGiftScreen />,
  },
  {
    path: '/Badge',
    element: <Badge />,
  },
  {
    path: '/admin/ExchangeGift',
    element: <ExchangeGift />,
  },
  {
    path: '/admin/ExchangeCoin',
    element: <ExchangeCoin />,
  },
  {
    path: '/admin/ExchangeCoin/:id/ReviewCertification',
    element: <ReviewCertification />,
  },
  {
    path: '/admin/Published/:id/Supporters',
    element: <Supporters />,
  },
  {
    path: '/admin/Guide',
    element: <Guide />,
  },
];

export const RouterCenter = [
  {
    path: '/admin/Program/Result',
    element: <ProgramResult />,
  },
  {
    path: '/admin/Guide',
    element: <Guide />,
  },
  {
    path: '/admin/ExchangeCoin',
    element: <ExchangeCoin />,
  },
  {
    path: '/admin/Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/ExchangeGift',
    element: <ExchangeGift />,
  },
  {
    path: '/admin/Statistic/Faculty',
    element: <StatisticFaculty />,
  },
  {
    path: '/admin/Statistic/Category',
    element: <StatisticCategory />,
  },
  {
    path: '/admin/SupportProgram',
    element: <SupportProgram />,
  },
  {
    path: '/admin/Attendance',
    element: <Attendance />,
  },
  {
    path: '/admin',
    element: <HomePage />,
    noHeader: true,
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
    path: '/admin/Gift',
    element: <ManagerGiftScreen />,
  },
  {
    path: '/Badge',
    element: <Badge />,
  },
  {
    path: '/detailBadge',
    element: <DetailBade />,
  },
  {
    path: '/admin/Guide',
    element: <Guide />,
  },
];
export const RouterFaculty = [
  {
    path: '/admin/Program/Result',
    element: <ProgramResult />,
  },
  {
    path: '/admin/Guide',
    element: <Guide />,
  },
  {
    path: '/admin/Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/Statistic/Faculty',
    element: <StatisticFaculty />,
  },
  {
    path: '/admin/Statistic/Category',
    element: <StatisticCategory />,
  },
  {
    path: '/admin/Guide',
    element: <Guide />,
  },
  {
    path: '/admin/SupportProgram',
    element: <SupportProgram />,
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
    path: '/admin',
    element: <HomePage />,
    noHeader: true,
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
    path: '/admin/Gift',
    element: <ManagerGiftScreen />,
  },
  {
    path: '/Badge',
    element: <Badge />,
  },
  {
    path: '/detailBadge',
    element: <DetailBade />,
  },
];
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
export default function MakePagesRouter() {
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  // const info = useAppSelector((state) => state.auth.info);
  const [info, setInfo] = useState(null);
  // const dispatch = useAppDispatch();
  // const token = localStorage.getItem('Bearer');
  // console.count();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response: any = await apiService.getProfile();
        // if (info && info?.roleId && info?.roleId !== response?.roleId) {
        setInfo(response);
        // }
      } catch (err: any) {
        throw err.message;
      }
    };

    fetchInfo();
  }, []);
  const RouterLearner = () => {
    if (LoginParmas.id == 1 || info?.roleId === 1) {
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
          <Route
            path="/ProgramSurvey/:surveyName"
            element={<ResultProgram />}
          />
          <Route path="*" element={<NotFoundPage reRoute={reRoute} />} />
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
                  element={
                    <SideBar
                      content={router.element}
                      noHeader={router.noHeader ? router.noHeader : false}
                    />
                  }
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
            <Route
              path="*"
              element={<NotFoundPage reRoute={reRoute + '/admin'} />}
            />
            <Route path="admin/Survey/:surveyId" element={<ClientSurvey />} />
          </Routes>
        );
      } else if (info?.roleId === 3) {
        return (
          <Routes>
            {RouterCenter.map((router, index) => {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={
                    <SideBar
                      content={router.element}
                      noHeader={router.noHeader ? router.noHeader : false}
                    />
                  }
                />
              );
            })}
            <Route path="/admin/Survey/Question" element={<SurveyQuestion />} />

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
            <Route
              path="*"
              element={<NotFoundPage reRoute={reRoute + '/admin'} />}
            />
          </Routes>
        );
      } else {
        return (
          <Routes>
            {RouterFaculty.map((router, index) => {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={
                    <SideBar
                      content={router.element}
                      noHeader={router.noHeader ? router.noHeader : false}
                    />
                  }
                />
              );
            })}
            <Route path="/admin/Survey/Question" element={<SurveyQuestion />} />

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
            <Route
              path="*"
              element={<NotFoundPage reRoute={reRoute + '/admin'} />}
            />
          </Routes>
        );
      }
    }
  };
  return <RouterLearner />;
}
