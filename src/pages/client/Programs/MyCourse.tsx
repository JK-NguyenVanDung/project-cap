import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import { RiTimerFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api/api';
import apiService from '../../../api/apiService';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import CourseCard from '../../../components/client/Card/CourseCard';
import Color from '../../../components/constant/Color';
import Loading from '../../../components/sharedComponents/Loading';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import { removeVietnameseTones } from '../../../utils/uinqueId';
import RegisterCard from '../../../components/client/Card/RegisterCard';
import ConfirmModal from '../../../components/admin/Modal/ConfirmModal';
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
  const [filterData, setFilterData] = useState<Array<IProgramItem>>(null);
  const [data, setData] = useState<Array<IProgramItem>>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [reload, setReload] = useState(false);
  const [unRegisterProgram, setUnRegisterProgram] =
    useState<IProgramItem>(null);
  useEffect(() => {
    const fetchMyProgram = async () => {
      const data: any = await apiService.getMyProgram();
      setToDoList(data);
      let temp = data;
      temp = temp.reverse();
      console.log(data);
      setData(temp);
      setFilterData(temp);
    };
    fetchMyProgram();
  }, [reload]);
  const [loading, setLoading] = useState(false);

  function handelDataProgram(item: IProgramItem) {
    setUnRegisterProgram(item);
    setShowConfirm(true);
  }
  useEffect(() => {}, []);
  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: IProgramItem) => {
        const nameMatch = removeVietnameseTones(record.programName).match(reg);

        const descMatch = removeVietnameseTones(record.descriptions).match(reg);
        const cateMatch = removeVietnameseTones(
          record.category.categoryName,
        ).match(reg);

        if (!nameMatch && !descMatch && !cateMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(filteredData ? filteredData : filterData);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };

  const handelRegister = (item: IProgramItem) => {
    const fetchRegister = async () => {
      const value = {
        programId: item.programId,
        isRegister: item.isRegister,
      };
      const data: any = await apiService.registerOrUn(value);
      if (data) {
        setLoading(true);
        setReload(!reload);
      }
    };
    fetchRegister();
    setTimeout(() => {
      setLoading(false);
    }, 900);
  };
  return (
    <>
      <Loading loading={loading} />
      <ConfirmModal
        show={showConfirm}
        setShow={setShowConfirm}
        type="cancel"
        handler={() => handelRegister(unRegisterProgram)}
        title={`huỷ đăng ký`}
      >
        <p className="font-customFont text-xl font-[500]">
          Huỷ đăng ký chương trình {unRegisterProgram?.programName}
        </p>
      </ConfirmModal>
      <div
        className={`bg-white py-4 pb-8 flex  w-full  items-center justify-between
${loading ? 'hidden' : 'visible'}`}
      >
        <div className="w-fit mx-4">
          <SearchBar
            onSearch={onChangeSearch}
            className="
      
      box-border	shadow-none min-w-[22rem] h-[2.8rem] border-2 rounded-[14px] border-[#F5F5F7]"
            prefix
          />
        </div>
      </div>

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
              console.log(item.program?.category);
              return (
                <li className="m-8 inline-block " key={item?.programId}>
                  <RegisterCard
                    onClick={() => handelDataProgram(item?.program)}
                    item={item?.program}
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
