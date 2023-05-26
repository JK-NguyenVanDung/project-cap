// eslint-disable-next-line import/newline-after-import
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from '../pages/client/Homepage/Homepage';
import SideBar from '../pages/admin';

import HomePage from '../pages/admin/HomePage/HomePage';
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

import AcademicYear from '../pages/admin/AcademicYear/AcademicYear';
import Position from '../pages/admin/Position/Position';
import ListReviewPrograms from '../pages/admin/ReviewProgram/ListReviewProgram';
import LearnerPage from '../pages/admin/Learner/LearnerPage';
import Published from '../pages/admin/Learner/ProgramPublish';

import Application from '../pages/admin/Learner/Application/Application';
import Attendance from '../pages/admin/Attendances/Attendance';
import Survey from '../pages/admin/Survey/General/Survey';
import SurveyDetail from '../pages/admin/Survey/General/SurveyDetail';

import SurveyQuestion from '../pages/admin/Survey/General/SurveyQuestion/Question';
import CourseSurvey from '../pages/admin/Survey/Program/ProgramSurvey';
import ProgramSurveyDetail from '../pages/admin/Survey/Program/ProgramSurveyDetail';

import ClientSurvey from '../pages/client/Survey/Survey';

import CommentManagement from '../pages/admin/Comment/Comment';
import CommentDetailManagement from '../pages/admin/Comment/CommentDetail';
import ProgramResult from '../pages/admin/ProgramResult/ProgramResult';
import StatisticFaculty from '../pages/admin/Statistics/StatisticFaculty';
import StatisticCategory from '../pages/admin/Statistics/StatisticCategory';

import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Badge from '../pages/client/Badge';
import DetailBade from '../pages/client/Badge/DetailBade';
import ManagerGiftScreen from '../pages/admin/ManagerGift/ManagerGiftScreen';

import ExchangeGift from '../pages/admin/ExchangeGift/ExchangeGift';
import ExchangeCoin from '../pages/admin/ExchangeCoin/ExchangeCoin';
import ReviewCertification from '../pages/admin/ExchangeCoin/Detail/ReviewCertification';

import NotFoundPage from '../NotFoundPage';
import SupportProgram from '../pages/admin/SupportProgram/SupportProgram';
import Supporters from '../pages/admin/SupportProgram/Supporters';
import Guide from '../pages/admin/Guide/Guide';
import { reRoute } from '../../onBuild';

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
export default function AdminRoute({ info }: { info: any }) {
  return (
    <>
      <Routes>
        {RouterPages.map((router, index) => {
          return (
            <Route
              key={index}
              path={router.path}
              element={
                <SideBar
                  content={
                    <CheckRole path={router.path} roleId={info?.roleId}>
                      {router.element}
                    </CheckRole>
                  }
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
    </>
  );
}

const CheckRole = ({
  children,
  roleId,
  path,
}: {
  children: any;
  roleId: number;
  path: string;
}) => {
  const navigate = useNavigate();
  if (roleId === 3) {
    if (!RouterCenter.find((route) => route.path === path)) {
      navigate('/admin');
      return <NoAccessPage />;
    }
  } else if (roleId === 4) {
    if (!RouterFaculty.find((route) => route.path === path)) {
      navigate('/admin');
      return (
        <>
          <NoAccessPage />
        </>
      );
    }
  }

  return <>{children}</>;
};

const NoAccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      Bạn không có quyền truy cập tới trang này, vui lòng liên hệ tới admin để
      trao quyền truy cập
      <button
        className="btn btn-primary m-4"
        onClick={() => navigate('/admin')}
      >
        Quay lại
      </button>
    </div>
  );
};
