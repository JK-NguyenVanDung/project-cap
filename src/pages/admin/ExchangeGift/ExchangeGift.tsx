import React, { useEffect, useState } from 'react';

import { notification, Image } from 'antd';
import { Form, Space } from 'antd';
import { FaEye } from 'react-icons/fa';

import { MdRemoveCircle } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, IGiftExchange } from '../../../Type';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import { GIRD12 } from '../../../helper/constant';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import ShowDetail from './ExchangeGiftDetail';
import { actions } from '../../../Redux';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api/api';
import moment from 'moment';
import ConfirmModal from '../../../components/admin/Modal/ConfirmModal';
import { IGift } from '../../../api/apiInterface';
export default function () {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<IGiftExchange>(null);
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [dataDetail, setDataDetail] = useState<IGiftExchange>();

  const [showDetail, setShowDetail] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [exchange, setExchange] = useState<IGiftExchange>(null);

  let location = useLocation();
  let exchangeId = location.pathname.split('/')[3]?.toString()
    ? Number(location.pathname.split('/')[3]?.toString())
    : 0;
  async function getApplication() {
    try {
      let response: any = await apiService.getGiftExchange();
      let accounts: any = await apiService.getAccounts();

      // let exchange: any = await apiService.getDetailExchange(
      //   exchangeId,
      //   info.accountId,
      // );
      // exchange && setExchange(exchange);

      accounts && setAccounts(accounts);

      response = response.reverse();
      dispatch(actions.formActions.setNameMenu(`${'Quản Lý Đổi Quà'}`));

      let res = response.map((item: any, index: number) => {
        return {
          ...item,
          index: index + 1,
          email: item?.account?.email,
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
      dataIndex: 'email',
      key: 'email',
      width: '12%',
    },
    {
      title: 'Quà tặng',
      key: 'gift',
      dataIndex: 'gift',

      render: (item: IGift) => {
        return (
          <>
            <div className="flex">
              <Image width={50} src={`${API_URL}/images/${item?.image}`} />
              <p className="ml-4 font-semibold">{item?.name}</p>
            </div>
          </>
        );
      },
    },
    {
      title: 'Ngày đặt',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (item: any) => {
        return <>{moment(item).format('HH:mm - DD/MM/YYYY')}</>;
      },
      width: '16%',
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
              ) : item == 'Pending' ? (
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
            disabled={data?.status === 'Approved'}
            Icon={MdRemoveCircle}
            onClick={() => handelRefusal(data)}
          />
          <CustomButton
            tip="Duyệt đơn đăng ký"
            size="sm"
            color="green"
            disabled={data?.status === 'Approved'}
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
      gift: item.gift?.name,
      quantity: item.gift?.quantity,
      exchanger: item.account?.email,
      phone: item.account?.phoneNumber,
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

          const data = apiService.changeGiftStatus({
            accountGiftId: dataDetail.id,
            status: 'Denied',
            reason: values.comment,
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
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
    let timeout = setTimeout(() => {
      setLoading(false);
      dispatch(actions.reloadActions.setReload());
    }, 500);
    clearTimeout(timeout);
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
      dispatch(actions.reloadActions.setReload());

      const data = apiService.changeGiftStatus({
        accountGiftId: dataDetail.id,
        status: 'Approved',
      });
      setLoading(true);
      if (data) {
        notification.success({
          message: 'Chấp Thuận Đơn Đổi Coin Thành Công',
        });
      }
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Chấp Thuận Đơn Đổi Coin Không Thành Công',
      });
    }
    let timeout = setTimeout(() => {
      setLoading(false);
      dispatch(actions.reloadActions.setReload());
    }, 500);
    clearTimeout(timeout);
  };

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(
          accounts.find(
            (acc: IAccountItem) => acc.accountId === record.account.accountId,
          )?.email,
        )?.match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

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
      <ConfirmModal
        show={showConfirmModal}
        setShow={setShowConfirmModal}
        handler={approveApplication}
        type="approve"
        title="gửi quà"
      >
        {dataDetail && (
          <>
            <p>
              Cấp món quà {dataDetail?.gift?.name} cho{' '}
              {
                accounts.find(
                  (acc: IAccountItem) => acc.accountId === dataDetail.accountId,
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
