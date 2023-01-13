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
import AddLeaner from './AddLeaner';
import ImportFile from './ImportFile';
export default function LeanerPage() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLeaner, setAddLeaner] = useState(false);
  const [detail, setDetail] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const item = useAppSelector((state) => state.form.setProgram);
  const [program, setProgram] = useState(item);
  const [importFile, setImportFile] = useState(false);
  const [showLeaner, setShowLeaner] = useState(false);
  useEffect(() => {
    async function getLeaner() {
      try {
        let response: any = await apiService.getLeaner_id(item.programId);
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        });
        setData(res);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setConfirmLoading(false);
          setFilterData(res);
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaner();
  }, [addLeaner]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddLeaner(true);
  };
  async function handleDelete(item: any) {
    try {
      await apiService.delLeaner(item.learnerId);
      setLoading(!loading);
      notification.success({
        message: MESSAGE.SUCCESS.DELETE,
      });
    } catch (err: any) {
      console.log(err);
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
        <PopOverAction
          size="sm"
          handleEdit={() => handelEdit(data)}
          handleShowDetail={() => handelShow(data)}
          handleDelete={() => handleDelete(data)}
        />
      ),
    },
  ];
  const handelShow = (item: any) => {
    setShowLeaner(true);
  };
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
    setAddLeaner(true);
    setDetail(null);
    setProgram(item);
  }
  function handelImport() {
    setImportFile(true);
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
      <AddLeaner
        detail={detail}
        setShowModal={setAddLeaner}
        showModal={addLeaner}
        program={program}
        loading={confirmLoading}
        setLoading={setConfirmLoading}
      />
      <ImportFile
        loading={confirmLoading}
        setLoading={setConfirmLoading}
        showModal={importFile}
        setShowModal={setImportFile}
      />
    </>
  );
}
