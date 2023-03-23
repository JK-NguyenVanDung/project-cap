import React, { useEffect, useState } from 'react';

import { notification, Image } from 'antd';
import { Form, Space } from 'antd';
import { FaEye } from 'react-icons/fa';

import { MdRemoveCircle } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, ICertification } from '../../../Type';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import { GIRD12 } from '../../../helper/constant';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import ShowDetail from './ShowDetail';
import { actions } from '../../../Redux';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api/api';
import moment from 'moment';
import ConfirmModal from '../../../components/admin/Modal/ConfirmModal';
export default function () {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ICertification>(null);
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [dataDetail, setDataDetail] = useState<ICertification>();

  const [showDetail, setShowDetail] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [exchange, setExchange] = useState<ICertification>(null);

  let location = useLocation();
  let exchangeId = location.pathname.split('/')[3]?.toString()
    ? Number(location.pathname.split('/')[3]?.toString())
    : 0;
  async function getApplication() {
    try {
      let response: any = await apiService.getExchanges();
      let accounts: any = await apiService.getAccounts();
      // let exchange: any = await apiService.getDetailExchange(
      //   exchangeId,
      //   info.accountId,
      // );
      // exchange && setExchange(exchange);

      // accounts && setAccounts(accounts);

      response = response.reverse();
      dispatch(
        actions.formActions.setNameMenu(
          `${'Quản Lý Đổi Quà: ' + exchange?.title}`,
        ),
      );

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
      title: 'Email đổi quà',

      width: '12%',
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
      title: 'Quà tặng',
      key: 'gift',
      dataIndex: 'gift',
    },
    {
      title: 'Ngày đặt',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'registerStatus',
      key: 'registerStatus',
      width: GIRD12.COL2,

      render: (item: string) => {
        return (
          <>
            <p>
              {item == 'Approved' ? (
                <p className="text-green-600">Đã Được Duyệt</p>
              ) : item == 'UnApproved' ? (
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
    setDetail({
      ...item,

      ...exchange,
      program: exchange.title,
      exchanger: accounts.find(
        (acc: IAccountItem) => acc.accountId === item.creatorId,
      )?.email,
    });
  };
  const FormApplicationRef = () => {
    return (
      <FormInput
        type="textArea"
        label="Lý Do Từ Chối Đơn"
        name="comment"
        rules={[
          {
            required: true,
            message: 'Vui Lòng Nhập Lý Do Từ Chối Đơn',
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

          const data = apiService.denyExchange({
            id: dataDetail.id,
            reviewerId: info.accountId,
            comment: values.comment,
          });
          setLoading(true);
          if (data) {
            notification.success({
              message: 'Từ Chối Đơn Đổi Coin Thành Công',
            });
          }
          setShowModal(false);
          form.resetFields();
        } catch (error) {
          notification.error({
            message: 'Từ Chối Đơn Đổi Coin Không Thành Công',
          });
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
  const navigate = useNavigate();

  const handelRefusal = (item: any) => {
    setShowModal(true);
    setDataDetail(item);
  };
  const handelApprove = (item: any) => {
    setShowConfirmModal(true);
    setDataDetail(item);
  };
  const info = useAppSelector((state) => state.auth.info);

  const approveApplication = async () => {
    try {
      setLoading(true);
      const data = await apiService.approveExchange({
        id: dataDetail.id,
        reviewerId: info.accountId,
      });
      setLoading(true);
      if (data) {
        setLoading(false);
        notification.success({ message: 'Chấp Thuận Thành Công' });
      }
    } catch (error) {
      notification.error({ message: 'Chấp Thuận Không Thành Công' });
    }
    let timeOut = setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(
          accounts.find(
            (acc: IAccountItem) => acc.accountId === record.creatorId,
          )?.email,
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
        extra={[
          <CustomButton
            noIcon
            size="md"
            variant="outlined"
            className="w-32 "
            text="Quay lại"
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(-1);
              dispatch(actions.formActions.setProgramForm(null));
            }}
          />,
        ]}
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
      <ConfirmModal
        show={showConfirmModal}
        setShow={setShowConfirmModal}
        handler={approveApplication}
        type="approve"
        title="duyệt chứng chỉ"
      >
        {dataDetail && (
          <>
            <p>
              Cấp {exchange?.coin} Coins cho{' '}
              {
                accounts.find(
                  (acc: IAccountItem) => acc.accountId === dataDetail.creatorId,
                )?.email
              }{' '}
            </p>
          </>
        )}
      </ConfirmModal>
      <ShowDetail
        item={detail}
        setItem={setDetail}
        visible={showDetail}
        setVisible={setShowDetail}
      />
    </>
  );
}
