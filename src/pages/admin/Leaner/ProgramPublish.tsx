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
import { BsPeopleFill } from 'react-icons/bs';
import { AiFillIdcard } from 'react-icons/ai';
export default function ProgramPublish() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const info = useAppSelector((state) => state.auth.info);

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
        console.log(response);
        setData(res);

        setTimeout(() => {
          setLoading(false);
          setFilterData(res);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
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
      width: GIRD12.COL2,
    },
    {
      width: GIRD12.COL2,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <Space>
            <CustomButton
              tip="Xem Học Viên"
              size="sm"
              color="red"
              Icon={BsPeopleFill}
              onClick={() => goLeaner(item)}
            />
            <CustomButton
              tip="Xem Đơn Đăng Ký"
              size="sm"
              color="brown"
              Icon={AiFillIdcard}
              onClick={() => goApplication(item)}
            />
          </Space>
        );
      },
    },
  ];
  function goLeaner(item: any) {
    dispatch(actions.formActions.setProgramForm(item));

    navigate('/admin/ListLeaner');
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
        const emailMatch = removeVietnameseTones(record.year).match(reg);

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
