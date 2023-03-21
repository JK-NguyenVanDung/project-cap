import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import { Form, Space } from 'antd';
import { FaEye } from 'react-icons/fa';

import { MdRemoveCircle } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, IExchangeCoin } from '../../../Type';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import TableConfig from '../../../components/admin/Table/Table';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { actions } from '../../../Redux';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import moment from 'moment';
import PopOverAction from '../../../components/admin/PopOver';
import ExchangeCoinModal from './ExchangeCoinModal';
import { useNavigate } from 'react-router-dom';
export default function () {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();

  async function getExchanges() {
    try {
      let response: any = await apiService.getExchanges();
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
    dispatch(actions.formActions.setNameMenu(`${'Quản Lý Đổi Quà'}`));
  }, []);

  useEffect(() => {
    getExchanges();
  }, [showModal, loading]);

  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '2%',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: GIRD12.COL2,
    },
    {
      title: 'Coin',
      key: 'coin',
      dataIndex: 'coin',
      width: GIRD12.COL1,
    },
    {
      title: 'Người tạo',
      key: 'creatorAccount',
      dataIndex: 'creatorAccount',
      width: GIRD12.COL2,
      render: (data: IAccountItem) => <>{data.email}</>,
    },

    {
      title: 'Ngày kết thúc',
      key: 'endDate',
      dataIndex: 'endDate',
      width: GIRD12.COL2,
      render: (data: any) => (
        <>
          {data ? moment(data).format('HH:MM - DD/MM/YYYY').toString() : 'N/A'}
        </>
      ),
    },
    {
      width: GIRD12.COL1,

      title: 'Thao tác',
      render: (item: IExchangeCoin) => {
        return (
          <>
            <PopOverAction
              size="sm"
              handleShowDetail={() => handleDetail(item)}
              handleEdit={() => handleEdit(item)}
              handleDelete={() => handleDelete(item)}
              deleteItem={item.title}
            />
          </>
        );
      },
    },
  ];
  async function handleDetail(item: IExchangeCoin) {
    dispatch(
      actions.formActions.setNameMenu(`${'Quản Lý đổi coin: ' + item.title}`),
    );

    navigate(`/admin/ExchangeCoin/${item.exchangeId}/ReviewCertification`);
  }
  async function handleDelete(item: IExchangeCoin) {
    try {
      await apiService.deleteExchange(item.exchangeId);
      setLoading(!loading);
      notification.success({ message: MESSAGE.SUCCESS.DELETE });
    } catch (err: any) {
      notification.error({
        message: 'Đơn đổi coin hiện tại không thể xoá do đã có người đổi coin ',
      });
    }
  }

  const handleEdit = (item: IExchangeCoin) => {
    setShowDetail(true);
    setDetail({
      ...item,
      endDate: moment(item.endDate),
    });
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

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.title).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  function openAdd() {
    setShowDetail(true);
    setDetail(null);
  }
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
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => openAdd()}
          />,
        ]}
      />

      <ExchangeCoinModal
        confirmLoading={loading}
        setConfirmLoading={setLoading}
        item={detail}
        setItem={setDetail}
        visible={showDetail}
        setVisible={setShowDetail}
      />
    </>
  );
}
