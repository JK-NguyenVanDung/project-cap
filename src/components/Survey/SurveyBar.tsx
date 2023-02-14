import moment from 'moment';
import { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import {
  IAccountItem,
  IAnswer,
  IChapterItem,
  IProgramItem,
  IQuestion,
  ISurveyItem,
  ISurveyQuestion,
  ISurveyQuestionContent,
  ITest,
} from '../../Type';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../Redux';
import CustomButton from '../admin/Button';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
// import ChapterItem from './ChapterItem';
import { notification } from 'antd';

interface Content {
  title: string;
  subject: string | number;
  icon?: any;
}

const SurveyBar = (props: any) => {
  const programNav: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const navigate = useNavigate();
  const [program, setProgram] = useState<IProgramItem>();
  const [user, setUser] = useState<IAccountItem>(null);
  const [like, setLike]: any = useState();
  // <Timer />
  const [current, setCurrent] = useState(0);

  const [range, setRange] = useState({ base: 0, limit: 5 });
  const selectedSurvey: ISurveyItem = useAppSelector(
    (state) => state.survey.selectedSurvey,
  );
  const answers: Array<ISurveyQuestionContent> = useAppSelector(
    (state) => state.survey.answers,
  );
  const listQuestions: Array<ISurveyQuestion> = useAppSelector(
    (state) => state.survey.listQuestions,
  );
  // const initTime: { minutes: number; seconds: number } = useAppSelector(
  //   (state) => state.survey.time,
  // );
  // let time = useTimer({
  //   initialMinute: initTime.minutes,
  //   initialSeconds: initTime.seconds,
  // });

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(
  //       actions.testActions.setTime({
  //         minutes: time.minutes,
  //         seconds: time.seconds - 1,
  //       }),
  //     );
  //   };
  // }, []);

  useEffect(() => {
    let base = current;
    let limit = current + 1;

    while (base % 5 !== 0 && base > 0) {
      base--;
    }
    while (limit % 5 !== 0 && limit > 0) {
      limit++;
    }
    let tempRange = { base: base, limit: limit };
    setRange(tempRange);
    dispatch(actions.testActions.setRange(tempRange));
  }, [current]);

  // async function getData() {
  //   try {
  //     const data: any = await apiService.getProgram(programNav?.programId);
  //     let content: any = await apiService.getContentProgram(
  //       programNav?.programId,
  //     );
  //     if (content) {
  //       setChapters(content);
  //       dispatch(actions.productActions.setInitSelectedChapter(content[0]));
  //       dispatch(actions.productActions.setSelectedChapter(content[0]));
  //     }

  //     setProgram(data);

  //     let res: any = await apiService.getAccounts();
  //     res = res.reverse();

  //     const temp = res.map((v: any, index: number) => ({
  //       ...v,
  //       index: index + 1,
  //     }));
  //     if (temp) {
  //       let acc = temp.find(
  //         (item: any) => data.accountIdCreator == item.accountId,
  //       );
  //       setUser(acc);
  //     }
  //   } catch (err: any) {
  //     throw err.message;
  //   }
  // }
  const info = useAppSelector((state) => state.auth.info);

  const isReviewing = useAppSelector((item) => item.survey.isReviewing);
  const isViewing = (index: number) => {
    let listQuestionLength = listQuestions.length;
    let length = listQuestionLength >= 5 ? 5 : listQuestionLength;

    if (index + 1 <= range.limit && index + 1 > range.base) {
      // console.log(range.base, range.limit, index);

      return true;
    }
    return false;
  };

  async function completeSurvey() {
    if (!isReviewing) {
      let allAnswered = answers.length === listQuestions.length;
      if (!allAnswered) {
        notification.error({
          message: 'Xin vui lòng hoàn thành hết các câu hỏi',
          duration: 1,
        });
      } else {
        console.log({
          surveyId: selectedSurvey.surveyId,
          accountId: info.accountId,
          contentAnswers: answers.map((item) => {
            let out = item.isChoice
              ? {
                  ...item,
                }
              : {
                  questionSurveyId: item.questionSurveyId,
                  content: item.content,
                };
            return out;
          }),
        });
        await apiService.doSurvey({
          surveyId: selectedSurvey.surveyId,
          accountId: info.accountId,
          contentAnswers: answers.map((item) => {
            let out = item.isChoice
              ? {
                  ...item,
                }
              : {
                  questionSurveyId: item.questionSurveyId,
                  content: item.content,
                };
            return out;
          }),
        });
      }
    }
    navigate(-1);
  }
  function isSelected(questionId: number) {
    let isAnswer = answers?.find(
      (ids: ISurveyQuestionContent) => ids.questionSurveyId == questionId,
    );
    return isAnswer ? true : false;
  }

  return (
    <div className="fixed  max-sm:relative  right-0 overflow-y-scroll rounded-xl  text-black bg-white h-fit min-h-[80vh]   max-sm:w-fit w-[27rem] m-4 p-2 px-8 border flex flex-col justify-start items-start">
      <p className="my-6 text-xl font-bold  text-gray-900 text-center  flex w-full justify-start items-start">
        Danh sách câu hỏi
      </p>
      <div className="flex flex-wrap justify-center items-center w-full border-b-2 border-gray-200 pb-4">
        {listQuestions?.map((item: ISurveyQuestion, index: number) => {
          return (
            <div
              className={`${
                isViewing(index)
                  ? 'border-primary border-b-[5px]  border-opacity-40'
                  : 'border-none'
              }`}
            >
              <CustomButton
                color={isSelected(item.questionSurveyId) ? 'blue' : 'gray'}
                noIcon
                text={index + 1}
                className={'min-w-[2rem] py-2 m-3  text-md'}
                onClick={() => setCurrent(index)}
              />
            </div>
          );
        })}
      </div>
      <p className="text-red-500 mt-4">* Mọi câu hỏi đều bắt buộc</p>
      <div
        className={`flex flex-col w-full h-full ${
          props.isSurvey && 'mt-[20%]'
        }`}
      >
        <CustomButton
          noIcon
          disabled={range.base === 0}
          text={
            <>
              <div className="flex items-center justify-center pr-5">
                <HiOutlineChevronLeft className="mr-2" /> Quay lại
              </div>
            </>
          }
          className="mx-10 py-3 mb-4"
          variant={'outlined'}
          onClick={() => setCurrent(current - 5)}
        />
        <CustomButton
          noIcon
          disabled={range.limit >= listQuestions.length}
          text={
            <>
              <div className="flex items-center justify-center pl-4">
                Đi tiếp <HiOutlineChevronRight className="ml-4" />
              </div>
            </>
          }
          onClick={() => setCurrent(current + 5)}
          className="mx-10 py-3 mb-4"
          variant={'outlined'}
        />
        <CustomButton
          noIcon
          text={isReviewing ? 'Hoàn thành' : 'Gửi đáp án'}
          className="mx-10 py-3 mb-4"
          onClick={completeSurvey}
        />
      </div>
    </div>
  );
};

export default SurveyBar;
