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
  const [filterError, setFilterError] = useState(null);

  const [showReason, setReason] = useState(false);
  const [reload, setReload] = useState(false);
  const [unRegisterProgram, setUnRegisterProgram] =
    useState<IProgramItem>(null);
  const [refusalProgram, setRefusalProgram] = useState<any>(null);
  const [filter, setFilter] = useState('Tất cả');

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: <a onClick={() => handleFilter('All')}>Tất cả</a>,
    },
    {
      key: '1',
      label: <a onClick={() => handleFilter('UnApproved')}>Chưa được duyệt</a>,
    },
    {
      key: '2',
      label: <a onClick={() => handleFilter('Approved')}>Đã duyệt</a>,
    },
    {
      key: '3',
      label: <a onClick={() => handleFilter('Refuse')}>Bị từ chối</a>,
    },
    // {
    //   key: '3',
    //   label: <a onClick={() => setFilter('Từ A-Z')}>Từ A-Z</a>,
    // },
  ];
  function handleFilter(filter: string) {
    switch (filter) {
      case 'All':
        setFilter('Tất cả');
        setToDoList(filterData);
        setFilterError(null);
        break;
      case 'UnApproved':
        setFilter('Chưa được duyệt');

        setToDoList(filterData.filter((e) => e.registerStatus == 'UnApproved'));
        setFilterError(
          'Bạn đang không đăng ký chương trình nào chưa được duyệt.',
        );
        break;

      case 'Approved':
        setFilter('Đã duyệt');

        setToDoList(filterData.filter((e) => e.registerStatus == 'Approved'));
        setFilterError('Bạn đang không có chương trình nào được duyệt.');

        break;
      case 'Refuse':
        setFilter('Bị từ chối');
        setToDoList(
          filterData.filter((e: any) => e.registerStatus === 'Refuse'),
        );
        setFilterError('Bạn đang không có chương trình nào bị từ chối.');

        break;
    }
  }
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
  function getRefusalReason(item: any) {
    setRefusalProgram(item);
    setReason(true);
  }
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
  function closeModal() {}
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

  async function navToDetail(programId: number, status: string) {
    try {
      let res: any = await apiService.getProgram(programId);
      dispatch(actions.formActions.setProgramForm(res));
      (status === 'Refuse' || status === 'UnApproved') &&
        navigate(`/Programs/${res.programId}`);
      status === 'Approved' && navigate(`/MyCourses/${res.programId}`);
    } catch (err) {}
  }
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
      <ConfirmModal
        show={showReason}
        setShow={setReason}
        type="popup"
        handler={() => closeModal()}
        title={`Lý do từ chối`}
      >
        <p className="font-customFont text-xl font-[500]">
          {refusalProgram?.reasonRefusal}
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
      <p className="bg-white mx-4 pb-4">
        Lưu ý: Nếu khoá học đã được duyệt và muốn hủy đăng ký, thì vui lòng gửi
        email tới trung tâm để được huỷ.
      </p>

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
                    seeReason={() => getRefusalReason(item)}
                    onNavToDetail={() =>
                      navToDetail(item?.programId, item.registerStatus)
                    }
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-full h-[60vh] flex justify-center items-center text-xl font-bold">
              {filterError !== null
                ? ' Bạn đang không đăng ký chương trình nào cả.'
                : filterError}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
