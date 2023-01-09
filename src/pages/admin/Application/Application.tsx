import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import { useAppSelector } from '../../../hook/useRedux';
export default function Application() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  //   useEffect(() => {
  //     async function getApplication() {
  //       try {
  //         let response: any = await apiService.getApplication();
  //         response = response.reverse();
  //         let res = response.map((item: any, index: number) => {
  //           return {
  //             ...item,
  //             index: index + 1,
  //           };
  //         });
  //         setData(res);
  //         setLoading(true);
  //         setTimeout(() => {
  //           setLoading(false);
  //           setFilterData(res);
  //         }, 1000);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     getApplication();
  //   }, []);

  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '7%',
    },
    {
      title: 'Nhận Xét',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Trạng Thái Đăng Ký',
      dataIndex: 'registerStatus',
      key: 'registerStatus',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

      render: (data: any) => (
        <PopOverAction size="sm" handleShowDetail={() => handelShow(data)} />
      ),
    },
  ];
  const handelShow = (item: any) => {};
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.facultyName).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  function handelAdd() {
    setDetail(null);
  }
  function handelImport() {}
  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={Columns}
        loading={loading}
        extra={[
          <div className="flex">
            <CustomButton
              className="mx-3"
              type="add"
              size="md"
              key={`${uniqueId()}`}
              onClick={() => handelAdd()}
            />
            <CustomButton
              size="md"
              text="Thêm Tập Tin"
              noIcon={true}
              key={`${uniqueId()}`}
              onClick={() => handelImport()}
            />
          </div>,
        ]}
      />
    </>
  );
}
