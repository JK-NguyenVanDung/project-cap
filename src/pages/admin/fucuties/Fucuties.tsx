import React, { useEffect, useState } from 'react';
import { IFuculties } from '../../../api/apiInterface';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId from '../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import AddFucuties from './AddFucuties';
export default function Fucuties() {
  const [data, setData] = useState<Array<IFuculties>>([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [addFuculties, setAddFucuties] = useState(false);
  const [detail, setDetail] = useState<IFuculties>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    async function getFuculties() {
      try {
        const reponse: any = await apiService.getFuculties();
        setToDoList(
          reponse.map((item: any, index: number) => {
            return {
              facultyId: item.facultyId,
              stt: index + 1,
              facultyName: item.facultyName,
            };
          }),
        );
        setTimeout(() => {
          setLoading(false);
          setFilterData(reponse);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    getFuculties();
  }, [loading, confirmLoading]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddFucuties(true);
  };
  async function handleDelete(item: IFuculties) {
    console.log(item.facultyId);
    try {
      await apiService.delFuculties(item.facultyId);
      setLoading(!loading);
      notification.success({
        message: MESSAGE.SUCCESS.DELETE,
      });
    } catch (err: any) {
      throw err.message();
    }
  }
  const Columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
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

      render: (data: IFuculties) => (
        <PopOverAction
          data={data}
          handleEdit={() => handelEdit(data)}
          handleDelete={() => handleDelete(data)}
        />
      ),
    },
  ];
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(value, 'gi');
    let temp = data;
    const filteredData = temp
      .map((record: IFuculties) => {
        const emailMatch = record.facultyName.match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };
  function handelAdd() {
    setAddFucuties(true);
    setDetail(null);
  }
  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={toDoList}
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
      <AddFucuties
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        detail={detail}
        setDetail={setDetail}
        showModal={addFuculties}
        setShowModal={setAddFucuties}
      />
    </>
  );
}
