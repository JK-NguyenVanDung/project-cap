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
  ITest,
} from '../../Type';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../Redux';
import CustomButton from '../admin/Button';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import useTimer from './Timer';
// import ChapterItem from './ChapterItem';

interface Content {
  title: string;
  subject: string | number;
  icon?: any;
}

const QuestionBar = (props: any) => {
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
  const selectedTest: ITest = useAppSelector(
    (state) => state.test.selectedTest,
  );
  const answers: Array<IAnswer> = useAppSelector((state) => state.test.answers);
  const listQuestions: Array<IQuestion> = useAppSelector(
    (state) => state.test.listQuestions,
  );
  const initTime: { minutes: number; seconds: number } = useAppSelector(
    (state) => state.test.time,
  );
  let time = useTimer({
    initialMinute: initTime.minutes,
    initialSeconds: initTime.seconds,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(
        actions.testActions.setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1,
        }),
      );
    };
  }, []);

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

  const isViewing = (index: number) => {
    let listQuestionLength = listQuestions.length;
    let length = listQuestionLength >= 5 ? 5 : listQuestionLength;

    if (index + 1 <= range.limit && index + 1 > range.base) {
      // console.log(range.base, range.limit, index);

      return true;
    }
    return false;
  };

  function navToReview() {
    dispatch(
      actions.testActions.setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1,
      }),
    );
    navigate(`/Test/Review/${selectedTest.testId}`);
  }
  function isSelected(questionId: number) {
    let isAnswer = answers?.find(
      (ids: IAnswer) => ids.questionId == questionId,
    );
    return isAnswer ? true : false;
  }

  useEffect(() => {}, []);

  return (
    <div className="fixed right-0 overflow-y-scroll rounded-xl w-fit text-black bg-white h-fit min-h-[80vh]    max-w-[25rem] m-4 p-2 px-8 border flex flex-col justify-start items-start">
      <p className="my-6 text-xl font-bold  text-gray-900 text-center  flex w-full justify-start items-start">
        Danh sách câu hỏi
      </p>
      <div className="flex flex-wrap justify-start items-center w-full border-b-2 border-gray-200 pb-4">
        {listQuestions?.map((item: IQuestion, index: number) => {
          return (
            <div
              className={`${
                isViewing(index)
                  ? 'bg-primary bg-opacity-20'
                  : 'bg-white bg-opacity-100'
              }`}
            >
              <CustomButton
                color={isSelected(item.questionId) ? 'blue' : 'gray'}
                noIcon
                text={index + 1}
                className={'min-w-[2rem] py-2 m-3  text-md'}
                onClick={() => setCurrent(index)}
              />
            </div>
          );
        })}
      </div>
      <div className=" min-w-[20rem] w-full my-2">
        <div className="flex w-full items-center justify-between my-6">
          <p className="text-lg font-semibold  text-gray-900 text-center   items-start">
            Tổng thời gian làm bài:
          </p>
          <p className=" font-semibold  text-gray-900 text-center   items-start">
            {selectedTest.time} phút
          </p>
        </div>
        <div className="flex w-full justify-between my-6">
          <p className="text-lg font-semibold  text-gray-900 text-center   items-start">
            Thời gian còn lại:
          </p>
          <p className=" font-semibold   text-gray-900 text-center   items-start">
            <div>
              <>
                {time.minutes === 0 && time.seconds === 0 ? (
                  <> {'00:00'} </>
                ) : (
                  <>
                    {' '}
                    {time.minutes}:
                    {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
                  </>
                )}
              </>
            </div>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full h-full ">
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
          text="Hoàn thành"
          className="mx-10 py-3 mb-4"
          onClick={navToReview}
        />
      </div>
    </div>
  );
};

export default QuestionBar;
