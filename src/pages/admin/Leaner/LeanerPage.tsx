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
import { Breadcrumb } from '../../../components/sharedComponents';
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
  useEffect(() => {
    async function getLeaner() {
      try {
        let response: any = await apiService.getLeaner_id(item.programId);
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          console.log(item);
          return {
            ...item,
            index: index + 1,
            emailAccount: item.accountIdLearnerNavigation.email,
          };
        });
        setLoading(!loading);
        setConfirmLoading(!confirmLoading);
        if (response) {
          setLoading(false);
          setConfirmLoading(false);
        }
        setData(res);
        setTimeout(() => {
          setFilterData(res);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaner();
  }, [loading, confirmLoading]);
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
      title: 'Email',
      dataIndex: 'emailAccount',
      key: 'emailAccount',
    },
    {
      title: 'Nhận Xét',
      dataIndex: 'comment',
      key: 'comment',
      render: (item: any) => {
        return <p>{item ? item : 'không có nhận xét'}</p>;
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (item: any) => {
        return (
          <p>
            {item == 'Attending' ? (
              <span className="text-green-600">Đang Tham Gia</span>
            ) : item == 'Stop Attending' ? (
              <span className="text-error">Ngưng Tham Gia</span>
            ) : item == 'Not Complete' ? (
              <span className="text-yellow-600">Chưa Hoàn Thành</span>
            ) : item == 'Complete' ? (
              <span className="text-blue-gray-600">Hoàn Thành</span>
            ) : (
              ''
            )}
          </p>
        );
      },
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
    setLoading(!loading);
  }
  function handelImport() {
    setImportFile(true);
    setProgram(item);
  }
  return (
    <>
      <Breadcrumb
        router1={'/admin/Published'}
        name={'Học Viên'}
        name2={`${item.programName}`}
      />
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
              text="Thêm Mới Học Viên"
              key={`${uniqueId()}`}
              onClick={() => handelAdd()}
            />
            <CustomButton
              size="md"
              text="Định Dạng Tập Tin"
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
        program={program}
        loading={confirmLoading}
        setLoading={setConfirmLoading}
        showModal={importFile}
        setShowModal={setImportFile}
      />
    </>
  );
}
