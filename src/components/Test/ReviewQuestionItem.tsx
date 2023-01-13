import autoAnimate from '@formkit/auto-animate';
import { useState, useRef, useEffect } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { HiCheckCircle, HiClipboardCheck } from 'react-icons/hi';
import { IChapterItem, IQuestion, ITest } from '../../Type';
import apiService from '../../api/apiService';
import ActiveArrow from '../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../assets/svg/NonActiveArrow';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IChapter } from '../../api/apiInterface';
import Answer from './Answer';

const ReviewQuestionItem = ({
  question,
  index,
  hasAnswer,
}: {
  question?: IQuestion;
  index?: number;
  hasAnswer?: boolean;
}) => {
  return (
    <>
      <div className="w-full items-center flex justify-between h-fit bg-gray-200 text-black  my-4 p-2 px-4 rounded-xl">
        <div className="flex w-fit items-center ">
          <div className="bg-gray-400 text-black rounded-3xl py-1 px-3 mr-4 text-center">
            <p className="text-lg text-bold">{index ? index : '0'}</p>
          </div>
          <p className="text-lg text-bold">
            {!hasAnswer ? 'Chưa có đáp án' : 'Đã có đáp án'}
          </p>
        </div>
        <p className="text-lg text-bold text-primary">
          {question?.questionTitle ? question?.score + ' điểm' : 'N/A'}
        </p>
      </div>
    </>
  );
};
export default ReviewQuestionItem;
