import React, { useEffect, useState } from 'react';
import apiService from '../../../../api/apiService';
import CustomButton from '../../../../components/admin/Button';
import CustomModal from '../../../../components/admin/Modal/Modal';
import TableConfig from '../../../../components/admin/Table/Table';
import { removeVietnameseTones } from '../../../../utils/uinqueId';
import { notification } from 'antd';
import { GIRD12 } from '../../../../helper/constant';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { Form, Space } from 'antd';
import { FaEye } from 'react-icons/fa';

import FormInput from '../../../../components/admin/Modal/FormInput';
import { IAccountItem } from '../../../../Type';
import ShowDetail from './ShowDetail';
import { Breadcrumb } from '../../../../components/sharedComponents';
import { actions } from '../../../../Redux';
import { MdRemoveCircle } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
export default function Application() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [approving, setApproving] = useState(false);

  const [dataDetail, setDataDetail]: any = useState();
  const [showDetail, setShowDetail] = useState(false);

  // function getComment(item: any) {
  //   let text = '';
  //   if (!item) {
  //     return 'Chưa có nhận xét';
  //   }
  //   if (item.reasonRefusal) {
  //     text += 'Lý do từ chối: ';
  //     text += item.reasonRefusal;
  //     text += `\n`;
  //   }
  //   if (item.comment) {
  //     text += item.comment;
  //   }
  //   return text;
  // }
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
        setFilterData(res);
      } catch (error) {
        console.log(error);
      }
    }
    getApplication().finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, [loading]);

  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '2%',
    },
    {
      title: 'Email đăng ký',

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
      title: 'Trạng Thái Đăng Ký',
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
      title: 'Lý do từ chối',
      key: 'reasonRefusal',
      dataIndex: 'reasonRefusal',
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
            onClick={() => handelRefulse(data)}
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
          const data = apiService
            .refulseApplication(dataDetail.learnerId, values)
            .finally(() => {
              setLoading(true);
            });
          if (data) {
            notification.success({ message: 'Từ Chối Đơn Thành Công' });
          }
          setShowModal(false);
          form.resetFields();
        } catch (error) {
          notification.error({ message: 'Từ Chối Đơn Không Thành Công' });
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  const handelRefulse = (item: any) => {
    setShowModal(true);
    setDataDetail(item);
  };
  const handelApprove = (item: any) => {
    const approveApplication = async () => {
      try {
        const data = await apiService
          .approveApplication(item.learnerId)
          .finally(() => {
            setLoading(true);
          });

        if (data) {
          setApproving(false);
          notification.success({ message: 'Đăng Ký Thành Công' });
        }
      } catch (error) {
        notification.error({ message: 'Đăng Ký Không Thành Công' });
      }
    };
    setApproving(true);
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

  return (
    <>
      <Breadcrumb
        router1={'/admin/Published'}
        name={'Học viên'}
        name2={`${item?.programName}`}
      />
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={Columns}
        loading={loading || approving}
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
