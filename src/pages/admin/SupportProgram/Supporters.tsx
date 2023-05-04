import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IAccountItem, IProgramItem, IRoleItem } from '../../../Type';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Space, notification } from 'antd';
import {
  BsFillPersonBadgeFill,
  BsPeopleFill,
  BsPersonFillUp,
} from 'react-icons/bs';
import { AiFillIdcard, AiOutlineFileProtect } from 'react-icons/ai';
import { IoPersonAdd } from 'react-icons/io5';
import AddSupporter from './AddSupporter';
import PopOverAction from '../../../components/admin/PopOver';
export default function ProgramPublish() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});

  const [addLearner, setAddLearner] = useState(false);
  const location = useLocation();
  const programId = location.pathname.split('/')[3];
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const program = useAppSelector((state) => state.form.programId);
  useEffect(() => {
    async function getSupporters() {
      try {
        let response: any = await apiService.getSupporters(Number(programId));

        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        });
        setData(res);
        setFilterData(res);
        setTimeout(() => {
          setLoading(false);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(actions.formActions.setNameMenu(`Quản Lý Học Viên`));
    getSupporters();
  }, [loading, confirmLoading]);
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên người hỗ trợ',
      dataIndex: 'account',
      width: GIRD12.COL2,
      render: (item: IAccountItem) => {
        return <p>{item?.fullName}</p>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'account',
      width: GIRD12.COL1,
      render: (item: IAccountItem) => {
        return <p>{item?.email}</p>;
      },
    },
    {
      title: 'SĐT',
      dataIndex: 'account',
      width: GIRD12.COL1,
      render: (item: IAccountItem) => {
        return <p>{item?.phoneNumber ? item?.phoneNumber : 'N/A'}</p>;
      },
    },
    {
      width: GIRD12.COL1,

      title: 'Thao tác',
      render: (item: any) => {
        return (
          <PopOverAction
            size="sm"
            handleDelete={() => handleDelete(item)}
            deleteItem={item.programName}
          />
        );
      },
    },
  ];

  async function handleDelete(supporter: any) {
    try {
      await apiService.deleteSupporter(supporter.id);
      setLoading(!loading);
      notification.success({
        message: MESSAGE.SUCCESS.DELETE,
      });
    } catch (err: any) {
      notification.error({
        message: 'Không thể xoá người hỗ trợ này',
      });
    }
  }

  const openAddLearner = () => {
    setDetail(program);
    setAddLearner(true);
  };
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.account.fullName).match(
          reg,
        );

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);

    setData(value.trim() !== '' && filteredData ? filteredData : filterData);
  };

  return (
    <div className="max-sm:w-fit max-sm:mr-12 max-md:mr-12">
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        loading={loading || confirmLoading}
        extra={
          <CustomButton
            tip="Thêm Người Hỗ Trợ"
            size="md"
            color="green"
            Icon={BsPersonFillUp}
            text="Thêm Người Hỗ Trợ"
            onClick={() => openAddLearner()}
          />
        }
      />
      {addLearner ? (
        <AddSupporter
          detail={null}
          setShowModal={setAddLearner}
          showModal={addLearner}
          loading={confirmLoading}
          setLoading={setConfirmLoading}
          programId={Number(programId)}
        />
      ) : null}
    </div>
  );
}
