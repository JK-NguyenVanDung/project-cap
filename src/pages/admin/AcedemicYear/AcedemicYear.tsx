import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import DetailAcedemicYear from './DetailAcedemicYear';
export default function AcedemicYear() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [addAcedemicYear, setAddAcedemicYear] = useState(false);
  const [detail, setDetail] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    async function getAcedemicYear() {
      try {
        let response: any = await apiService.getAcedemicYear();
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
    getAcedemicYear();
  }, [loading, confirmLoading]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddAcedemicYear(true);
  };
  async function handleDelete(item: any) {
    try {
      await apiService.delAcedemicYear(item.id);
      setLoading(!loading);
      notification.success({
        message: MESSAGE.SUCCESS.DELETE,
      });
    } catch (err: any) {
      notification.error({
        message:
          'Năm học này đang được lưu trong 1 chương trình, xin vui lòng xoá hoặc chọn năm học khác trong chương trình đó để xoá năm học này',
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
      title: 'Năm Học',
      dataIndex: 'year',
      key: 'year',
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
        const emailMatch = removeVietnameseTones(record.year).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);

    setData(value.trim() !== '' && filteredData ? filteredData : filterData);
  };

  function handelAdd() {
    setAddAcedemicYear(true);
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
      <DetailAcedemicYear
        item={detail}
        setItem={setDetail}
        visible={addAcedemicYear}
        setVisible={setAddAcedemicYear}
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
      />
    </>
  );
}
