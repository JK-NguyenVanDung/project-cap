import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import { BsFillPersonBadgeFill, BsPeopleFill } from 'react-icons/bs';
import { AiFillIdcard, AiOutlineFileProtect } from 'react-icons/ai';
import { IoPersonAdd } from 'react-icons/io5';
export default function ProgramPublish() {
  const [data, setData] = useState([]);

  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProgramPublish() {
      try {
        let response: any = await apiService.getProgramPublish();

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
          setFilterData(res);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(actions.formActions.setNameMenu(`Quản Lý Học Viên`));
    getProgramPublish();
  }, [loading, confirmLoading]);
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên chương trình',
      dataIndex: 'programName',
      width: GIRD12.COL2,
    },
    {
      title: 'Giảng Viên',
      dataIndex: 'lecturers',
      width: GIRD12.COL1,
    },
    {
      title: 'Số Lượng Học Viên',
      dataIndex: 'countLearner',
      width: '12%',
    },
    {
      title: 'Đơn Đăng Ký Chờ Duyệt',
      dataIndex: 'countApplication',
      width: '12%',
    },
    {
      width: GIRD12.COL1,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <Space>
            <CustomButton
              tip="Xem Học Viên"
              size="sm"
              color="red"
              Icon={BsPeopleFill}
              onClick={() => goLearner(item)}
            />
            <CustomButton
              tip="Xem Đơn Đăng Ký"
              size="sm"
              color="brown"
              Icon={IoPersonAdd}
              onClick={() => goApplication(item)}
            />
            <CustomButton
              tip="Xem Danh Sách Điểm Danh"
              size="sm"
              color="cyan"
              Icon={BsFillPersonBadgeFill}
              onClick={() => goAttendances(item)}
            />
          </Space>
        );
      },
    },
  ];

  function goAttendances(item: any) {
    dispatch(actions.formActions.setProgramForm(item));

    navigate('/admin/Attendance');
  }

  function goLearner(item: any) {
    dispatch(actions.formActions.setProgramForm(item));

    navigate('/admin/ListLearner');
  }
  const goApplication = (item: any) => {
    dispatch(actions.formActions.setProgramForm(item));
    navigate('/admin/Application');
  };
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.programName).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);

    setData(value.trim() !== '' && filteredData ? filteredData : filterData);
  };
  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        loading={loading || confirmLoading}
      />
    </>
  );
}
