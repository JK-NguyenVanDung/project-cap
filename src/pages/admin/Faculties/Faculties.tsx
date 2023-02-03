import React, { useEffect, useState } from 'react';
import { IFaculties } from '../../../api/apiInterface';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import AddFaculties from './AddFaculties';
export default function Faculties() {
  const [data, setData] = useState<Array<IFaculties>>([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [addFaculties, setAddFaculties] = useState(false);
  const [detail, setDetail] = useState<IFaculties>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    async function getFaculties() {
      try {
        let response: any = await apiService.getFaculties();
        response = response.reverse();
        let res = response.map((item: IFaculties, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        });
        setData(res);

        setTimeout(() => {
          setLoading(false);
          setFilterData(res);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {}
    }
    getFaculties();
  }, [loading, confirmLoading]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddFaculties(true);
  };
  async function handleDelete(item: IFaculties) {
    try {
      await apiService.delFaculties(item.facultyId);
      setLoading(!loading);
      notification.success({
        message: MESSAGE.SUCCESS.DELETE,
      });
    } catch (err: any) {
      notification.error({
        message:
          'Khoa ban này đang được lưu trong 1 chương trình, xin vui lòng xoá hoặc chọn khoa ban khá trong chương trình đó để xoá khoa ban này',
      });
    }
  }
  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '7%',
    },
    {
      title: 'Tên',
      dataIndex: 'facultyName',
      key: 'facultyName',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

      render: (data: IFaculties) => (
        <PopOverAction
          size="sm"
          handleEdit={() => handelEdit(data)}
          handleDelete={() => handleDelete(data)}
        />
      ),
    },
  ];
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
    setAddFaculties(true);
    setDetail(null);
  }
  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={Columns}
        loading={loading || confirmLoading}
        extra={[
          <CustomButton
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => handelAdd()}
          />,
        ]}
      />
      <AddFaculties
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        detail={detail}
        setDetail={setDetail}
        showModal={addFaculties}
        setShowModal={setAddFaculties}
      />
    </>
  );
}
