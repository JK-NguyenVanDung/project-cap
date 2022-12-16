import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import CourseCard from '../../../components/client/Card/CourseCard';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import { BsFilter } from 'react-icons/bs';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';

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
    <>
      <div className="bg-white py-4 pb-8 flex w-full  items-center justify-between">
        <div className="w-fit mx-4">
          <SearchBar
            onSearch={{}}
            className="shadow-none min-w-[22rem] h-[2.7rem] border-2 rounded-xl border-gray-300"
            prefix
          />
        </div>
        <div className="w-fit mx-4 cursor-pointer	">
          <div className="  shadow-none border flex items-center p-2 rounded-lg border-gray-300">
            <BsFilter className="text-xl mx-2" />
            <div className="pr-2">Lọc bởi: Thời gian</div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <ul className=" grid  grid-cols-3 ">
          {data?.map((item: IProgramItem) => {
            return (
              <li className="m-8 inline-block ">
                <CourseCard
                  onClick={() => handelDataProgram(item)}
                  item={item}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
