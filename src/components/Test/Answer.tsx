import { Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { errorText } from '../../helper/constant';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import CustomButton from '../admin/Button';
import PopOverAction from '../admin/PopOver';
import { IAnswer, IQuestionContent } from '../../Type';
import { actions } from '../../Redux';

const UnselectedCircle = (props: any) => {
  return (
    <div {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="9" stroke="#BDBDBD" stroke-width="2" />
      </svg>
    </div>
  );
};

const FullCircle = (props: any) => {
  return (
    <div {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="#3649F9"
          stroke="#3649F9"
          stroke-width="4"
        />
      </svg>
    </div>
  );
};
function getChar(c: number) {
  let n = (c + 9).toString(36).toUpperCase();
  return n;
}

const OptionalAnswer = ({
  isMultiple,
  contents,
  questionId,
}: {
  isMultiple: boolean;
  contents: Array<IQuestionContent>;
  questionId: number;
}) => {
  const answers: Array<IAnswer> = useAppSelector((state) => state.test.answers);

  const dispatch = useAppDispatch();

  function chooseAnswer(questionContentId: number | string) {
    dispatch(
      actions.testActions.addAnswers({
        questionId: questionId,
        questionContentId: questionContentId,
        isMultiple: isMultiple,
      }),
    );
  }

  function getStyle(contentId: any, answers: Array<IAnswer>) {
    let isAnswer = answers?.find(
      (ids: IAnswer) => ids.questionContentId == contentId,
    );
    return isAnswer ? true : false;
  }
  return (
    <ul className="w-full relative h-auto">
      {contents.map((item: IQuestionContent, index: number) => {
        return (
          <li className="w-full flex flex-row justify-between min-h-[3rem] mb-0  ">
            <button
              type="button"
              formNoValidate
              className={`w-[6rem]  mr-8 my-4  flex border rounded-[10px] ${
                getStyle(item.questionContentId, answers)
                  ? 'border-primary'
                  : 'border-gray-400'
              } min-h-[3rem] h-full justify-center items-center`}
              onClick={() => chooseAnswer(item.questionContentId)}
            >
              <p
                className={`text-3xl font-bold ${
                  getStyle(item.questionContentId, answers)
                    ? 'text-primary'
                    : 'text-gray-400'
                }`}
              >
                {getChar(index + 1)}
              </p>
              {getStyle(item.questionContentId, answers) ? (
                <FullCircle className="ml-4" />
              ) : (
                <UnselectedCircle className="ml-4" />
              )}
            </button>
            <div className="w-full mb-2 z-1 ">
              <div
                className={`z-[0] min-h-[3rem] flex items-center text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border  text-sm rounded-lg focus:ring-gray-500 focus:gray-400-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:gray-400-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:gray-400-500
              ${
                getStyle(item.questionContentId, answers)
                  ? 'border-primary'
                  : 'border-gray-400'
              } `}
              >
                {item.content}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default OptionalAnswer;
