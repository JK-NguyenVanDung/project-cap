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
    (state) => state.test.selectedTest,
  );
  const breadCrumb: string = useAppSelector(
    (state) => state.product.contentBreadcrumb,
  );

  const questions: Array<IQuestion> = useAppSelector(
    (state) => state.test.currentQuestions,
  );
  const listAllQuestions: Array<IQuestion> = useAppSelector(
    (state) => state.test.listQuestions,
  );
  const range: any = useAppSelector((state) => state.test.range);
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  useEffect(() => {
    // executeScroll(0);
    // console.log(1);
  }, []);

  useEffect(() => {
    // executeScroll(0);
    // console.log(1);
    dispatch(
      actions.testActions.setListCurrentQuestions(
        listAllQuestions.slice(range.base, range.limit),
      ),
    );
  }, [range]);
  return (
    <>
      <div className="w-full h-24 flex items-center justify-between ">
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
          <div className="flex flex-col justify-center items-start w-full">
            <p className="ml-2 text-black text-lg font-bold font-customFont">
              Bài kiểm tra chương
            </p>
            <div className="w-full  bg-white">
              <Breadcrumb
                router1={'/Programs/'}
                router2={`/Programs/${
                  program ? program?.programId : 'N/A'
                }/Chapters`}
                name={'Chương Trình'}
                name2={program ? program?.programName : 'N/A'}
                name3={'Bài kiểm tra: ' + selectedTest?.testTitle}
              />
            </div>
          </div>
          <HeaderClient />
        </div>
      </div>

      {/* <Loading loading={loading} /> */}
      <div
        ref={ref}
        className={`flex w-full justify-between min-h-screen h-full bg-gray-50 ${
          loading ? 'visible' : 'visible'
        }`}
      >
        <div className="flex flex-col">
          {questions?.map((item: IQuestion) => {
            return <QuestionItem question={item} index={item.index} />;
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
