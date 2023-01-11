import { useLocation, useNavigate } from 'react-router-dom';
import CourseDetail from '../../../../components/Course/CourseDetail';
import RightSection from '../../../../components/Course/RightSection';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/sharedComponents/Loading';
import ScrollToTop from '../../../../utils/scrollToTop';
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb';
import { IProgramItem, IQuestion, ITest } from '../../../../Type';
import { useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useAppDispatch } from '../../../../hook/useRedux';
import apiService from '../../../../api/apiService';
import HeaderClient from '../../../../components/Header/HeaderClient';
import logo from '../../../../assets/logo.svg';
import QuestionItem from '../../../../components/Test/QuestionItem';
import TestBar from '../../../../components/Test/TestBar';
import { AxiosResponse } from 'axios';

export default function UserTest(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Array<IQuestion>>(null);
  let ref = useRef(null);
  const location = useLocation();
  // const executeScroll = (i: number) => {
  //   setTimeout(() => {
  //     ref.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'nearest',
  //     });
  //   }, 50);
  // };

  const dispatch = useAppDispatch();
  const selectedTest: ITest = useAppSelector(
    (state) => state.product.selectedTest,
  );
  const breadCrumb: string = useAppSelector(
    (state) => state.product.contentBreadcrumb,
  );
  async function getData() {
    try {
      let res: any = await apiService.getQuestions(selectedTest.testId);
      res && setQuestions(res);
      dispatch(
        actions.formActions.setNameMenu(
          `${selectedTest ? selectedTest.testTitle : 'N/A'}`,
        ),
      );
    } catch (err) {}
  }
  useEffect(() => {
    // executeScroll(0);
    // console.log(1);
    getData();
  }, []);
  return (
    <>
      <div className="w-full h-14 flex items-center justify-between ">
        <div className="z-0  overflow-hidden bg-white relative flex flex-col justify-center content-center items-center w-1/5">
          <a
            onClick={() => {
              navigate('/home');
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
            }}
            className=" hover:text-primary text-black relative my-2  px-2 w-full flex flex-row items-center justify-center"
          >
            <img className="w-[14%] h-fit " src={logo} />
            <p className="text-lg font-bold text-center mx-2">VLG TRAINING</p>
          </a>
        </div>

        <div className="w-full h-14 flex items-center justify-between ">
          <p className="text-black text-lg font-bold font-customFont">
            Bài kiểm tra chương
          </p>
          <HeaderClient />
        </div>
      </div>

      <div className="w-full  px-4 pb-2 bg-white">
        {/* <Breadcrumb
          router1={'/Test/'}
          router2={`/Test/${program ? program?.programName : 'N/A'}`}
          name={'Chương Trình'}
          name2={program ? program?.programName : 'N/A'}
          name3={breadCrumb ? breadCrumb : 'N/A'}
        /> */}
      </div>

      {/* <Loading loading={loading} /> */}
      <div
        ref={ref}
        className={`flex w-full justify-between bg-gray-50 ${
          loading ? 'visible' : 'visible'
        }`}
      >
        <div className="flex flex-col">
          {questions?.map((item: IQuestion, index: number) => {
            return <QuestionItem question={item} index={index + 1} />;
          })}
        </div>

        <div className=""></div>
        {
          /* <ChapterDetail {...props} setLoading={setLoading} />
        <ChapterBar enable={true} goBack={() => navigate('/Programs/')} /> */
          <TestBar enable={true} goBack={() => navigate('/Programs/')} />
        }
      </div>
    </>
  );
}
