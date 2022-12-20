import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import AddPosition from './AddPosition';
export default function Position() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [addPosition, setAddPosition] = useState(false);
  const [detail, setDetail] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    async function getPosition() {
      try {
        let response: any = await apiService.getPositions();
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
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
      } catch (error) {
        console.log(error);
      }
    }
    getPosition();
  }, [loading, confirmLoading]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddPosition(true);
  };
  async function handleDelete(item: any) {
    try {
      await apiService.delPositions(item.positionId);
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
      dataIndex: 'index',
      key: 'index',
      width: '7%',
    },
    {
      title: 'Năm Học',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

      render: (data: any) => (
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
        const emailMatch = removeVietnameseTones(record.positionName).match(
          reg,
        );

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  function handelAdd() {
    setAddPosition(true);
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
      <AddPosition
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        item={detail}
        setItem={setDetail}
        visible={addPosition}
        setVisible={setAddPosition}
      />
    </>
  );
}
