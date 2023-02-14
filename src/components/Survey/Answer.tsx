import { Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { errorText } from '../../helper/constant';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import CustomButton from '../admin/Button';
import PopOverAction from '../admin/PopOver';
import { IAnswer, IQuestionContent, ISurveyQuestionContent } from '../../Type';
import { actions } from '../../Redux';
const { TextArea } = Input;

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
  isChoice,
  isAnswer,
  contentQuestions,
  questionSurveyId,
  accountSurveys,
}: {
  isChoice: boolean;
  isAnswer?: boolean;
  contentQuestions: Array<ISurveyQuestionContent>;
  questionSurveyId: number;
  accountSurveys: any;
}) => {
  const answers: Array<ISurveyQuestionContent> = useAppSelector(
    (state) => state.survey.answers,
  );
  const isReviewing: boolean = useAppSelector(
    (state) => state.survey.isReviewing,
  );

  const dispatch = useAppDispatch();

  function chooseAnswer(contentSurveyId: number | string, text?: string) {
    {
      !isReviewing &&
        dispatch(
          actions.surveyActions.addAnswers({
            questionSurveyId: questionSurveyId,
            contentSurveyId: contentSurveyId,
            isChoice: isChoice,
            content: text,
          }),
        );
    }
  }

  function getStyle(
    item: ISurveyQuestionContent,
    answers: Array<ISurveyQuestionContent>,
  ) {
    if (item.accountSurveys.length > 0) {
      return true;
    }
    let isAnswer = answers?.find(
      (ids: ISurveyQuestionContent) =>
        ids.contentSurveyId == item.contentSurveyId,
    );
    return isAnswer ? true : false;
  }
  return (
    <ul className="w-full relative h-auto">
      {isChoice ? (
        contentQuestions.map((item: ISurveyQuestionContent, index: number) => {
          return (
            <li className="w-full flex flex-row justify-between min-h-[3rem] max-sm:min-h-fit mb-0  ">
              <button
                type="button"
                formNoValidate
                className={`w-[6rem]  mr-8 max-sm:mr-2 my-4  flex border rounded-[10px] ${
                  isAnswer || getStyle(item, answers)
                    ? 'border-primary'
                    : 'border-gray-400'
                } min-h-[3rem] h-full justify-center items-center`}
                onClick={() => chooseAnswer(item.contentSurveyId)}
              >
                <p
                  className={`text-3xl font-bold ${
                    isAnswer || getStyle(item, answers)
                      ? 'text-primary'
                      : 'text-gray-400'
                  }`}
                >
                  {getChar(index + 1)}
                </p>
                {isAnswer || getStyle(item, answers) ? (
                  <FullCircle className="ml-4" />
                ) : (
                  <UnselectedCircle className="ml-4" />
                )}
              </button>
              <div className="w-full mb-2 z-1 ">
                <div
                  className={`z-[0] min-h-[3rem] flex items-center text-black font-customFont  font-bold min-w-[20rem] max-sm:min-w-[4rem] mt-4 bg-white border  text-sm rounded-lg focus:ring-gray-500 focus:gray-400-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:gray-400-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:gray-400-500
              ${
                getStyle(item, answers) ? 'border-primary' : 'border-gray-400'
              } `}
                >
                  {item.content}
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <>
          <div className="w-full mb-6 z-1 ">
            <TextArea
              rows={12}
              className={`z-[0] text-black h-14 font-customFont  font-bold min-w-[20rem] mt-4 bg-white border  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500
                border-border-gray `}
              placeholder={`Nhập Câu Trả Lời`}
              disabled={accountSurveys ? true : false}
              defaultValue={accountSurveys ? accountSurveys[0]?.content : ''}
              onBlur={(item) =>
                chooseAnswer(
                  contentQuestions[0]?.contentSurveyId,
                  item.target.value,
                )
              }
            />
          </div>
        </>
      )}
    </ul>
  );
};
export default OptionalAnswer;
