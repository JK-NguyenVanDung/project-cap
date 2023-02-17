import React, { useState, useEffect } from 'react';
import { DatePicker, Modal } from 'antd';
import apiService from '../../../api/apiService';
import TableConfig from '../../../components/admin/Table/Table';
import CustomButton from '../../../components/admin/Button';
import { removeVietnameseTones } from '../../../utils/uinqueId';

export default function DetailAttendances({
  visible,
  setVisible,
  item,
  setItem,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: any;
  setItem: any;
}) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [loading, setLoading] = useState(false);

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.account.email).match(
          reg,
        );

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await apiService.getNotAttendance(
        item?.attendance.id,
      );

      const res: any = await apiService.getAttendanceId(item?.attendance?.id);

      let resArr = res.accountAttendances.map((item: any) => {
        return {
          account: item.account,
          isAttending: true,
        };
      });
      let newArr = response.map((item: any) => {
        return {
          account: item,
          isAttending: false,
        };
      });
      let final = [...newArr, ...resArr];
      final = final.map((item: any, index: number) => {
        return {
          index: index + 1,

          ...item,
        };
      });
      setFilterData(final);
      setData(final);
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '1 %',
    },
    {
      title: 'Email',

      render: (data: any) => <p>{data ? data.account?.email : 0}</p>,
    },
    {
      title: 'Trạng thái',

      width: '22%',
      render: (data: any) => (
        <p>{data && data.isAttending ? 'Đã điểm danh' : 'Chưa điểm danh'}</p>
      ),
    },
  ];
  const handelCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      title="Điểm Danh"
      open={visible}
      onCancel={() => handelCancel()}
      style={{ top: 20 }}
      width={'80%'}
      footer={
        <div className=" my-5 flex flex-row justify-evenly w-full">
          <CustomButton
            size="md"
            fullWidth={true}
            noIcon={true}
            type="cancel"
            color="blue-gray"
            onClick={() => handelCancel()}
            text="Hủy"
          />
        </div>
      }
    >
      <TableConfig
        onSearch={onChangeSearch}
        data={data}
        columns={Columns}
        loading={loading}
      />
    </Modal>
  );
}
