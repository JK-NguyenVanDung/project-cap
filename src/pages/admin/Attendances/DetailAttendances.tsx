import React, { useState, useEffect } from 'react';
import { DatePicker, Modal } from 'antd';
import apiService from '../../../api/apiService';
import TableConfig from '../../../components/admin/Table/Table';
import CustomButton from '../../../components/admin/Button';
import { removeVietnameseTones } from '../../../utils/uinqueId';
import { ExportCSV } from '../../../components/Statistic/ExportButton';
import moment from 'moment';

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

      const res: any = await apiService.getAttendances(item?.attendance?.id);
      // console.log(res);
      let resArr = res.map((item: any, index: number) => {
        return {
          account: item.account,
          isAttending: item.status === 'Attendance' ? true : false,
          index: index + 1,
        };
      });
      let newArr = response.map((item: any, index: number) => {
        return {
          account: item,
          isAttending: false,
          index: index + 1,
        };
      });

      setFilterData(res.length > 0 ? resArr : newArr);
      setData(res.length > 0 ? resArr : newArr);
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
        <p>
          {data && data.isAttending ? (
            <p className="font-bold text-green-500">Đã điểm danh</p>
          ) : (
            <p className="font-bold text-red-500">Chưa điểm danh</p>
          )}
        </p>
      ),
    },
  ];
  const handelCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      title={'Điểm Danh ' + item?.attendance?.title}
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
        extra={
          <ExportCSV
            csvData={data.map((item) => {
              return {
                STT: item?.index,
                Email: item?.account?.email,
                ThamGia: item?.isAttending ? 'Đã điểm danh' : 'Chưa điểm danh',
              };
            })}
            fileName={`Kết quả điểm danh ${item?.attendance?.title} từ ${moment(
              item?.attendance?.startTime,
            )
              .local()
              .format('HH-MM DD-MM-YYYY')} đến ${moment(
              item?.attendance?.endTime,
            )
              .local()
              .format('HH-MM DD-MM-YYYY')} `}
          />
        }
      />
    </Modal>
  );
}
