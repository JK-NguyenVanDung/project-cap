import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';

export default function Homepage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getPrograms();
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
    <div>
      <p>Thêm video trong asset</p>
      <button onClick={() => handelDataProgram()}>test </button>
    </div>
  );
}
