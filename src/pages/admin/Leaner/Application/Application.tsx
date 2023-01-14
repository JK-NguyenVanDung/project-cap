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
import FormInput from '../../../../components/admin/Modal/FormInput';
import { BiLock, BiLockOpen } from 'react-icons/bi';
export default function Application() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [dataDetail, setDataDetal]: any = useState();
  useEffect(() => {
    async function getApplication() {
      try {
        let response: any = await apiService.getApplication_program(
          item.programId,
        );
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
          setFilterData(res);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

    getApplication();
  }, []);

  const Columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '7%',
    },

    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

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
        </Space>
      ),
    },
  ];
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
            setLoading(false);
            notification.success({ message: 'Hủy Đơn Thành Công' });
          }
          setShowModal(false);
          form.resetFields();
        } catch (error) {
          notification.error({ message: 'Hủy Đơn Không Thành Công' });
        }
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
        const data = await apiService.approveApplication(item.learnerId);
        setLoading(true);
        if (data) {
          setLoading(false);
          notification.success({ message: 'Đăng Ký Thành Công' });
        }
      } catch (error) {
        notification.error({ message: 'Đăng Ký Không Thành Công' });
      }
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
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={Columns}
        loading={loading}
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
    </>
  );
}
