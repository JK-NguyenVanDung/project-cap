import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import Banner from './Banner';

export default function Homepage() {
  const [data, setData] = useState([]);
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await apiService.getMySurveys(info.accountId);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram() {
    dispatch(actions.formActions.setProgramForm(data));
    navigate('/admin/reviewDetail');
  }
  return (
    <div className="flex w-full items-center justify-center ">
      <div className="w-[84vw]">
        <Banner data={data} />
      </div>
    </div>
  );
}
