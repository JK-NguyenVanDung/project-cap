import { useState, useRef, useEffect } from 'react';
import { IChapterItem, IQuestion, ITest } from '../../Type';
import apiService from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import Answer from './Answer';

const QuestionItem = ({
  question,

  index = 'N/A',
}: {
  question?: IQuestion;

  index?: number | string;
}) => {
  return (
    <>
      <div className="w-fit min-w-[60rem] max-w-[60rem] max-sm:min-w-fit max-sm:max-w-fit h-fit bg-white m-4 py-6 px-8 rounded-xl">
        <div className="flex w-full max-sm:flex-col max-sm:hidden  justify-end text-primary font-bold text-lg ">
          {question?.score} điểm
        </div>
        <div className="flex w-full justify-start max-sm:flex-col max-sm:items-start  items-center mx-2">
          <div className="flex flex-col max-sm:flex-row max-sm:justify-between max-sm:w-full max-sm:items-center   justify-start items-start w-fit my-4  mr-12">
            <div className="CIRCLE max-sm:min-w-[3.2rem] max-sm:py-2 py-4 px-2 min-w-[4.2rem] bg-gray-400 rounded-[20rem] text-black text-center text-3xl font-bold">
              {index}
            </div>
            <div className="flex w-full hidden max-sm:visible max-sm:items-start  justify-end text-primary font-bold text-lg ">
              {question?.score} điểm
            </div>
          </div>
          <div className=" w-full flex ">
            <p className="text-black text-lg">{question?.questionTitle}</p>
          </div>
        </div>
        {question.typeId == 2 && (
          <p className="text-red-500 pl-2 mb-2 ">{'(Nhiều lựa chọn)'}</p>
        )}
        <Answer
          isMultiple={question.typeId != 2 ? false : true}
          contents={question.questionContents}
          questionId={question.questionId}
        />
      </div>
    </>
  );
};
export default QuestionItem;
