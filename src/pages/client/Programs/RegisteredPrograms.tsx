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
import Dropdown from 'antd/lib/dropdown/dropdown';
import { BsFilter } from 'react-icons/bs';
import { MenuProps } from 'antd/lib/menu';
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
  const [filter, setFilter] = useState('Chưa đăng ký');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => setFilter('Chưa đăng ký')}>Chưa đăng ký</a>,
    },
    {
      key: '2',
      label: <a onClick={() => setFilter('Hết hạn')}>Hết hạn</a>,
    },
    {
      key: '3',
      label: <a onClick={() => setFilter('Hoàn thành')}>Hoàn thành</a>,
    },
    // {
    //   key: '3',
    //   label: <a onClick={() => setFilter('Từ A-Z')}>Từ A-Z</a>,
    // },
  ];
  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`${'Khóa Học Đã Đăng Ký '}`));
  }, []);
  useEffect(() => {
    const fetchMyProgram = async () => {
      const data: any = await apiService.getMyApplications();
      setToDoList(data);
      let temp = data;
      temp = temp.reverse();
      setFilterData(temp);
    };

    fetchMyProgram();
  }, [reload]);
  const [loading, setLoading] = useState(false);

  function handelDataProgram(item: IProgramItem) {
    setUnRegisterProgram(item);
    setShowConfirm(true);
  }
  function getRefusalReason() {}
  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: any) => {
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
        className={`bg-white py-4 pb-8 flex max-sm:flex-wrap  w-full  items-center justify-between
${loading ? 'hidden' : 'visible'}`}
      >
        <div className="w-fit mx-4">
          <SearchBar
            onSearch={onChangeSearch}
            className="
            max-sm:min-w-[21rem]

      box-border	shadow-none min-w-[22rem] h-[2.8rem] border-2 rounded-[14px] border-[#F5F5F7]"
            prefix
          />
        </div>
        <div className="w-fit mx-4 cursor-pointer	max-sm:mt-4">
          <div className="  shadow-none border flex items-center p-2 rounded-lg border-[#F5F5F7]">
            <Dropdown menu={{ items }} placement="bottomRight">
              <button className="flex justify-center items-center">
                <BsFilter className="text-xl mx-2" />
                <div className="pr-2">Lọc bởi: {filter}</div>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <p>Ghi chú cô đọc trong buổi học ngày 19/1</p>

      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        {toDoList?.length > 0 ? (
          <ul className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
            {toDoList?.map((item) => {
              return (
                <li className="m-8 inline-block " key={item?.programId}>
                  <RegisterCard
                    onClick={() => handelDataProgram(item?.program)}
                    item={item?.program}
                    registerStatus={item?.registerStatus}
                    seeReason={() => getRefusalReason()}
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
