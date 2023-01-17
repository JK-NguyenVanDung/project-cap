import React, { useEffect, useState } from 'react';
import apiService from '../../../../api/apiService';
import CustomButton from '../../../../components/admin/Button';
import CustomModal from '../../../../components/admin/Modal/Modal';
import TableConfig from '../../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../../utils/uinqueId';
import { Button, message, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../../helper/constant';
import PopOverAction from '../../../../components/admin/PopOver';
import { useAppSelector } from '../../../../hook/useRedux';
import { Form, Space } from 'antd';
import { FaEye } from 'react-icons/fa';

import FormInput from '../../../../components/admin/Modal/FormInput';
import { BiLock, BiLockOpen } from 'react-icons/bi';
import { IAccountItem } from '../../../../Type';
import ShowDetail from './ShowDetail';
export default function Application() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [dataDetail, setDataDetal]: any = useState();
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    async function getApplication() {
      try {
        let response: any = await apiService.getApplication_program(
          item.programId,
        );
        let accounts: any = await apiService.getAccounts();
        accounts && setAccounts(accounts);
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        });
        setData(res);
        setLoading(true);
        setFilterData(res);
      } catch (error) {
        console.log(error);
      }
    }
    let timeOut = setTimeout(() => {
      setLoading(false);
    }, 1000);
    getApplication();
    return () => {
      clearTimeout(timeOut);
    };
  }, [showModal]);

  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '2%',
    },
    {
      title: 'Email đăng ký',

      width: '7%',
      render: (data: any) => (
        <>
          {
            accounts.find(
              (item: IAccountItem) => item.accountId === data.accountIdLearner,
            )?.email
          }
        </>
      ),
    },
    {
      title: 'Trạng Thái Đăng Ký',
      dataIndex: 'registerStatus',
      key: 'registerStatus',
      render: (item: string) => {
        return (
          <>
            <p>
              {item == 'Approve' ? (
                <p className="text-green-600">Đã Được Duyệt</p>
              ) : (
                <p className="text-error">Không Được Duyệt</p>
              )}
            </p>
          </>
        );
      },
    },
    {
      title: 'Nhận Xét',
      dataIndex: 'comment',
      key: 'comment',
      render: (item: any) => {
        return <p>{item ? 'không có nhận xét' : item}</p>;
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
      width: GIRD12.COL0,

      render: (data: any) => (
        <Space>
          <CustomButton
            tip="Hủy Đăng Ký"
            size="sm"
            color="red"
            Icon={BiLock}
            onClick={() => handelRefulse(data)}
          />
          <CustomButton
            tip="Nhận Đơn Đăng Ký"
            size="sm"
            color="green"
            Icon={BiLockOpen}
            onClick={() => handelApprove(data)}
          />
          <CustomButton
            tip="Xem Chi Tiết"
            size="sm"
            color="deep-orange"
            Icon={FaEye}
            onClick={() => handelShowDetail(data)}
          />
        </Space>
      ),
    },
  ];
  const handelShowDetail = (item: any) => {
    console.log(item);
    setShowDetail(true);
    setDetail(item);
  };
  const FormApplicationRef = () => {
    return (
      <FormInput type="textArea" label="Lý Do Hủy Đơn" name="reasonRefusal" />
    );
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        try {
          const data = apiService.refulseApplication(
            dataDetail.learnerId,
            values,
          );
          setLoading(true);
          if (data) {
            notification.success({ message: 'Hủy Đơn Thành Công' });
          }
          setShowModal(false);
          form.resetFields();
        } catch (error) {
          notification.error({ message: 'Hủy Đơn Không Thành Công' });
        }
        let timeOut = setTimeout(() => {
          setLoading(false);
        }, 1000);
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  const handelRefulse = (item: any) => {
    setShowModal(true);
    setDataDetal(item);
  };
  const handelApprove = (item: any) => {
    const approveApplication = async () => {
      try {
        setLoading(true);

        const data = await apiService.approveApplication(item.learnerId);
        if (data) {
          notification.success({ message: 'Đăng Ký Thành Công' });
        }
      } catch (error) {
        notification.error({ message: 'Đăng Ký Không Thành Công' });
      }
      let timeOut = setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    approveApplication();
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
    setDetail(null);
  }
  function handelImport() {}
  return (
    <>
      <TableConfig
        key={data[0]?.programId}
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={Columns}
        loading={loading}
      />
      <CustomModal
        show={showModal}
        handleOk={handleOk}
        setShow={setShowModal}
        label="Hủy Đơn"
        FormItem={<FormApplicationRef />}
        form={form}
        header={'Hủy Đơn Đăng Ký'}
        confirmLoading={loading}
      />
      <ShowDetail
        item={detail}
        setItem={setDetail}
        visible={showDetail}
        setVisible={setShowDetail}
      />
    </>
  );
}
