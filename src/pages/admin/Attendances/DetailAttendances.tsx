import React, { useState, useEffect } from 'react';
import { DatePicker, Modal } from 'antd';
import apiService from '../../../api/apiService';
import TableConfig from '../../../components/admin/Table/Table';
import CustomButton from '../../../components/admin/Button';

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
  // useEffect(() => {
  //   const fetchNotAtt = async () => {
  //     const response: any = await apiService.getNotAttendance(
  //       item?.attendance.id,
  //     );
  //   };

  //   const fetchDetailAtt = async () => {
  //     const res: any = await apiService.getAttendanceId(item?.attendance?.id);
  //   };
  //   fetchDetailAtt();
  //   fetchNotAtt();
  // }, [item]);
  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '2%',
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
      {/* <TableConfig data={data} columns={Columns} loading={loading} /> */}
    </Modal>
  );
}
