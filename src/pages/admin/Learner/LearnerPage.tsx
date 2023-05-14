import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import AddLearner from './AddLearner';
import ImportFile from './ImportFile';
import { Breadcrumb } from '../../../components/sharedComponents';
import { actions } from '../../../Redux';
export default function LearnerPage() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [addLearner, setAddLearner] = useState(false);
  const [detail, setDetail] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const item = useAppSelector((state) => state.form.setProgram);
  const [program, setProgram] = useState(item);
  const [importFile, setImportFile] = useState(false);
  const reload = useAppSelector((state: any) => state.reload.reload);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getLearner() {
      try {
        let response: any = await apiService.getLearner_id(item.programId);
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
            emailAccount: item.accountIdLearnerNavigation?.email,
          };
        });

        setData(res);
        setFilterData(res);
      } catch (error) {
        console.log(error);
      }
    }
    getLearner().finally(() => {
      setLoading(false);
      setConfirmLoading(false);
    });
  }, [reload]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddLearner(true);
  };
  async function handleDelete(item: any) {
    async function deleting() {
      try {
        await apiService.delLearner(item.learnerId);
        notification.success({
          message: MESSAGE.SUCCESS.DELETE,
        });
      } catch (err: any) {
        console.log(err);
      }
    }
    deleting().finally(() => {
      setLoading(false);
      setConfirmLoading(false);
      dispatch(actions.reloadActions.setReload());
    });
  }
  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '4%',
    },
    {
      title: 'Email',
      dataIndex: 'emailAccount',
      key: 'emailAccount',
      width: '20%',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
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
              'Chưa có trạng thái'
            )}
          </p>
        );
      },
    },
    {
      title: 'Nhận Xét',
      dataIndex: 'comment',
      key: 'comment',
      width: '15%',
      render: (item: any) => {
        return <p>{item ? item : 'Chưa có nhận xét'}</p>;
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
        const emailMatch = removeVietnameseTones(
          record.accountIdLearnerNavigation.email,
        ).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  function handelAdd() {
    setAddLearner(true);
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
        name2={`${item?.programName}`}
      />
      <TableConfig
        key={'table'}
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
              text="Thêm Bằng Tập Tin"
              noIcon={true}
              key={`${uniqueId()}`}
              onClick={() => handelImport()}
            />
          </div>,
        ]}
      />
      {addLearner && (
        <AddLearner
          detail={detail}
          setShowModal={setAddLearner}
          showModal={addLearner}
          program={program}
          loading={confirmLoading}
          setLoading={setConfirmLoading}
        />
      )}
      {importFile && (
        <ImportFile
          program={program}
          loading={confirmLoading}
          setLoading={setConfirmLoading}
          showModal={importFile}
          setShowModal={setImportFile}
        />
      )}
    </>
  );
}
