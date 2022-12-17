import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fectData = async () => {
      try {
        const data = await apiService.getProgram(17);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fectData();
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram() {
    dispatch(actions.formActions.setProgramForm(data));
    navigate('/admin/reviewDetail');
  }
  return (
    <div>
      {/* <p>Thêm video trong asset</p>
      <button onClick={() => handelDataProgram()}>test </button> */}
    </div>
  );
}
