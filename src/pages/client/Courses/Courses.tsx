import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import CourseCard from '../../../components/client/Card/CourseCard';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';

export default function Homepage() {
  const [data, setData] = useState<Array<IProgramItem>>(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data: any = await apiService.getPrograms();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/Courses/${item.programName}`);
  }
  return (
    <div className="w-full flex justify-center">
      <ul className=" grid  grid-cols-3 ">
        {data?.map((item: IProgramItem) => {
          return (
            <li className="m-8 inline-block ">
              <CourseCard onClick={() => handelDataProgram(item)} item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
