import { useLocation, useNavigate } from 'react-router-dom';
import CourseDetail from '../../../../components/Course/CourseDetail';
import RightSection from '../../../../components/Course/RightSection';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/sharedComponents/Loading';
import ScrollToTop from '../../../../utils/scrollToTop';
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb';
import { IProgramItem } from '../../../../Type';
import { useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useAppDispatch } from '../../../../hook/useRedux';
import apiService from '../../../../api/apiService';
import HeaderClient from '../../../../components/Header/HeaderClient';
import logo from '../../../../assets/logo.svg';
import QuestionItem from '../../../../components/Test/QuestionItem';
import TestBar from '../../../../components/Test/TestBar';

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
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const breadCrumb: string = useAppSelector(
    (state) => state.product.contentBreadcrumb,
  );
  async function getData() {
    try {
      let current = location.pathname.split('/')[1].toString();
      let res: any = await apiService.getProgram(Number(current));
      dispatch(actions.formActions.setProgramForm(res));
      dispatch(
        actions.formActions.setNameMenu(`${res ? res?.programName : 'N/A'}`),
      );
    } catch (err) {}
  }
  useEffect(() => {
    // executeScroll(0);
    // console.log(1);
    // !program && getData();
    dispatch(
      actions.formActions.setNameMenu(
        `${program ? program?.programName : 'N/A'}`,
      ),
    );
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
        <Breadcrumb
          router1={'/Test/'}
          router2={`/Test/${program ? program?.programName : 'N/A'}`}
          name={'Chương Trình'}
          name2={program ? program?.programName : 'N/A'}
          name3={breadCrumb ? breadCrumb : 'N/A'}
        />
      </div>

      {/* <Loading loading={loading} /> */}
      <div
        ref={ref}
        className={`flex w-full justify-between bg-gray-50 ${
          loading ? 'visible' : 'visible'
        }`}
      >
        <QuestionItem
          question={{
            questionId: 0,
            testsId: 0,
            typeId: 0,
            questionTitle: '1',
            score: 0,
            questionContents: [
              {
                questionContentId: 0,
                questionId: 0,
                content: 'yrs',
                isAnswer: false,
              },
            ],
          }}
        />
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
