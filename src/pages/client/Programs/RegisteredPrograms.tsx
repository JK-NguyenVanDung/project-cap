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

export default function RegisteredPrograms() {
  const [toDoList, setToDoList] = useState<Array<MyCourse>>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState<Array<MyCourse>>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [reload, setReload] = useState(false);
  const [unRegisterProgram, setUnRegisterProgram] =
    useState<IProgramItem>(null);

  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`${'Khóa Học Đã Đăng Ký '}`));
  }, []);
  useEffect(() => {
    const fetchMyProgram = async () => {
      const data: any = await apiService.getMyProgram();
      setToDoList(data);
      let temp = data;
      temp = temp.reverse();
      console.log(data);
      setFilterData(temp);
    };

    fetchMyProgram();
  }, [reload]);
  const [loading, setLoading] = useState(false);

  function handelDataProgram(item: IProgramItem) {
    setUnRegisterProgram(item);
    setShowConfirm(true);
  }
  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: any) => {
        console.log(record);
        const nameMatch = removeVietnameseTones(
          record.program?.programName,
        ).match(reg);

        if (!nameMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);

    setToDoList(filteredData ? filteredData : filterData);
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

      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        {toDoList?.length > 0 ? (
          <ul className=" grid lg:grid-cols-3 grid-cols-3 md:grid-cols-2 sm:grid-cols-1 	">
            {toDoList?.map((item) => {
              return (
                <li className="m-8 inline-block " key={item?.programId}>
                  <RegisterCard
                    onClick={() => handelDataProgram(item?.program)}
                    item={item?.program}
                    registerStatus={item?.registerStatus}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-full h-[60vh] flex justify-center items-center text-xl font-bold">
              Bạn đang không đăng ký chương trình nào cả.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
