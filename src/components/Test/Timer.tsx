import React from 'react';
import { useState, useEffect } from 'react';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IAnswer, IProgramItem } from '../../Type';
import apiService from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const useTimer = (props?: {
  initialMinute?: number;
  initialSeconds?: number;
}) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const info = useAppSelector((state) => state.auth.info);

  const dispatch = useAppDispatch();
  let answers: Array<IAnswer> = useAppSelector((state) => state.test.answers);
  const navigate = useNavigate();
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  async function submit() {
    let output = answers.map((item) => {
      return {
        questionId: item.questionId,
        questionContentId: item.questionContentId,
      };
    });
    try {
      await apiService.doTest({
        accountId: info.accountId,
        body: output,
      });
    } catch (err) {
      notification.success({
        message: 'Bài làm không được chấp nhận do chưa có đáp án',
      });
    }
    navigate(`/Programs/${program.programId}/Chapters`);
  }
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          submit();

          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return { minutes: minutes, seconds: seconds };
};

export default useTimer;
