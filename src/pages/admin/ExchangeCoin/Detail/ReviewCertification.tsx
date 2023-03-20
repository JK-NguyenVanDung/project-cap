import React, { useEffect, useState } from 'react';

import { notification, Image } from 'antd';
import { Form, Space } from 'antd';
import { FaEye } from 'react-icons/fa';

import { MdRemoveCircle } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { IAccountItem } from '../../../../Type';
import apiService from '../../../../api/apiService';
import CustomButton from '../../../../components/admin/Button';
import FormInput from '../../../../components/admin/Modal/FormInput';
import CustomModal from '../../../../components/admin/Modal/Modal';
import TableConfig from '../../../../components/admin/Table/Table';
import { GIRD12 } from '../../../../helper/constant';
import { removeVietnameseTones } from '../../../../utils/uinqueId';
import ShowDetail from './ShowDetail';
import { actions } from '../../../../Redux';
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../../../api/api';
import moment from 'moment';
export default function () {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [dataDetail, setDataDetail]: any = useState();
  const [showDetail, setShowDetail] = useState(false);
  let location = useLocation();
  let exchangeId = location.pathname.split('/')[3]?.toString()
    ? Number(location.pathname.split('/')[3]?.toString())
    : 0;
  async function getApplication() {
    try {
      let response: any = await apiService.getCertifications(exchangeId);
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
      if (response) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApplication();
  }, [showModal, loading]);

  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '2%',
    },
    {
      title: 'Người gửi',

      width: '12%',
      render: (data: any) => (
        <>
          {
            accounts.find(
              (item: IAccountItem) => item.accountId === data.creatorId,
            )?.email
          }
        </>
      ),
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '2%',
      render: (data: any) => {
        return (
          <>
            <Image width={50} src={`${API_URL}/images/${data}`} />
          </>
        );
      },
    },
    {
      title: 'Thời gian gửi',
      dataIndex: 'sentDate',
      key: 'sentDate',
      width: '12%',
      render: (data: any) => {
        return <>{moment(data).format('HH:mm - DD/MM/YYYY').toString()}</>;
      },
    },
    {
      title: 'Người duyệt',
      dataIndex: 'reviewerAccount',
      key: 'reviewerAccount',
      width: '15%',
      render: (data: any) => <>{data ? data.email : 'Chưa có người duyệt'}</>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: GIRD12.COL2,

      render: (item: string) => {
        return (
          <>
            <p>
              {item == 'Approved' ? (
                <p className="text-green-600">Đã Được Duyệt</p>
              ) : item == 'pending' ? (
                <p className="text-yellow-800">Chưa Được Duyệt</p>
              ) : (
                <p className="text-error">Bị Từ Chối</p>
              )}
            </p>
          </>
        );
      },
    },

    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

      render: (data: any) => (
        <Space>
          <CustomButton
            tip="Từ chối đăng ký"
            size="sm"
            color="red"
            Icon={MdRemoveCircle}
            onClick={() => handelRefusal(data)}
          />
          <CustomButton
            tip="Duyệt đơn đăng ký"
            size="sm"
            color="green"
            Icon={AiFillCheckCircle}
            onClick={() => handelApprove(data)}
          />
          <CustomButton
            tip="xem chi tiết"
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
    setShowDetail(true);
    setDetail(item);
  };
  const FormApplicationRef = () => {
    return (
      <FormInput
        type="textArea"
        label="Lý Do Hủy Đơn"
        name="reasonRefusal"
        rules={[
          {
            required: true,
            message: 'Vui Lòng Nhập Lý Do Huỷ Đơn',
          },
        ]}
      />
    );
  };
  const dispatch = useAppDispatch();

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          dispatch(actions.reloadActions.setReload());

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
        let timeout = setTimeout(() => {
          setLoading(false);
          dispatch(actions.reloadActions.setReload());
        }, 500);
        clearTimeout(timeout);
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  const handelRefusal = (item: any) => {
    setShowModal(true);
    setDataDetail(item);
  };
  const handelApprove = (item: any) => {
    const approveApplication = async () => {
      try {
        setLoading(true);
        const data = await apiService.approveApplication(item.learnerId);
        setLoading(true);
        if (data) {
          setLoading(false);
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
        const emailMatch = removeVietnameseTones(
          record.accountIdLearnerNavigation?.email,
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
    setDetail(null);
  }
  function handelImport() {}
  return (
    <>
      <TableConfig
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
        label="Từ chối Đơn Đăng Ký"
        header="Từ chối Đơn Đăng Ký"
        FormItem={<FormApplicationRef />}
        form={form}
        notAdd={true}
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
