import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { actions } from '../../Redux';
import {
  ITest,
  IQuestion,
  IProgramItem,
  ISurveyProgram,
  ISurveyItem,
  ISurveyQuestion,
} from '../../Type';
import { useAppSelector, useAppDispatch } from '../../hook/useRedux';
import HeaderClient from '../Header/HeaderClient';
import QuestionItem from './QuestionItem';
import SurveyBar from './SurveyBar';
import useTimer from '../Test/Timer';
import logo from '../../assets/logo.svg';
import Breadcrumb from '../sharedComponents/Breadcrumb';
import apiService from '../../api/apiService';
export default function (props: any) {
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
  const selectedSurvey: ISurveyItem = useAppSelector(
    (state) => state.survey.selectedSurvey,
  );

  const questions: Array<ISurveyQuestion> = useAppSelector(
    (state) => state.survey.currentQuestions,
  );
  const listAllQuestions: Array<ISurveyQuestion> = useAppSelector(
    (state) => state.survey.listQuestions,
  );
  const range: any = useAppSelector((state) => state.survey.range);

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
  // function goBack() {
  //   setReview(false);
  // }
  function goForward() {
    navigate(-1);
  }
  return (
    <>
      <>
        <div className="w-full h-24 flex items-center justify-between ">
          <div className="z-0 max-sm:hidden  overflow-hidden bg-white relative flex flex-col justify-center content-center items-center w-1/5">
            <a
              onClick={() => {
                navigate('/home');
                dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
              }}
              className=" hover:text-primary text-black relative my-2  px-2 w-full flex flex-row items-center justify-center"
            >
              <img className="w-[14%] h-fit " src={logo} />
              <p className="text-lg font-bold text-center mx-2">
                L&D VLG TRAINING
              </p>
            </a>
          </div>

          <div className="w-full h-14 flex items-center justify-between ">
            <div className="flex flex-col justify-center items-start w-full">
              <p className="ml-2 max-sm:text-[12px] max-sm:hidden  text-black text-lg font-bold font-customFont">
                Bảng khảo sát: {selectedSurvey?.title}
              </p>
              <div className="w-full  bg-white ">
                <Breadcrumb
                  router1={-1}
                  name={
                    location.pathname.split('/')[1] === 'admin'
                      ? 'Khảo sát'
                      : 'Trang chủ'
                  }
                  name2={'Bảng khảo sát: ' + selectedSurvey?.title}
                />
              </div>
            </div>
            <HeaderClient />
          </div>
        </div>

        {/* <Loading loading={loading} /> */}
        <div
          ref={ref}
          className={`flex w-full justify-between min-h-screen h-full max-sm:flex-col max-sm:items-start  bg-gray-50 ${
            loading ? 'visible' : 'visible'
          }`}
        >
          <div className="flex flex-col w-full">
            {questions?.map((item: ISurveyQuestion) => {
              return (
                <QuestionItem
                  question={item}
                  index={item.index}
                  isSurvey={true}
                />
              );
            })}
          </div>

          <div className="  flex w-full justify-center items-start">
            {
              <SurveyBar
                enable={true}
                goBack={() => navigate(`/${location.pathname.split('/')[1]}/`)}
                goForward={goForward}
              />
            }
          </div>
        </div>
      </>
    </>
  );
}
