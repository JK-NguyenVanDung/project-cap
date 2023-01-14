import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import { RiTimerFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api/api';
import apiService from '../../../api/apiService';
import CourseCard from '../../../components/client/Card/CourseCard';
import Color from '../../../components/constant/Color';
import Loading from '../../../components/sharedComponents/Loading';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
export enum Register {
  unApproved = 'UnApproved',
  Approved = 'Approved',
}
export type MyCourse = {
  learnerId: number;
  accountIdLearner: number;
  programId: number;
  program: IProgramItem;
  isRegister: boolean;
  accountIdApprover: number;
  status: string;
  reasonRefusal: string;
  registerStatus: Register;
  comment: string;
  accountIdApproverNavigation: number;
  accountIdLearnerNavigation: number;
};

export default function MyCourse() {
  const [toDoList, setToDoList] = useState<Array<MyCourse>>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProgram = async () => {
      const data: any = await apiService.getMyProgram();
      setToDoList(data);
      console.log(data);
    };
    fetchMyProgram();
  }, []);
  const [loading, setLoading] = useState(false);

  function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/Programs/${item.programId}`);
  }
  useEffect(() => {}, []);
  return (
    <>
      <div className="container p-6 flex items-center">
        <div className="w-2 h-10 bg-blue-gray-500 m-3 rounded-lg" />
        <h1 className="font-semibold text-lg">Khóa Học Đã Đăng Ký</h1>
      </div>
      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        <ul className=" grid lg:grid-cols-3 grid-cols-3 md:grid-cols-2 sm:grid-cols-1 	">
          {toDoList?.length > 0 ? (
            toDoList?.map((item) => {
              console.log(item.program.category);
              return (
                <li className="m-8 inline-block " key={item.programId}>
                  <CourseCard
                    onClick={() => handelDataProgram(item.program)}
                    item={item.program}
                  />
                </li>
              );
            })
          ) : (
            <div className="w-full ml-[80%] h-[60vh] grid content-center text-xl font-bold">
              Không có dữ liệu
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
