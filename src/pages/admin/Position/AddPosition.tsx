import React, { useState, useEffect } from 'react';
import CustomButton from '../../../components/admin/Button';
import { Form, notification } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import apiService from '../../../api/apiService';
export default function AddPosition({
  visible,
  setVisible,
  item,
  setItem,
  confirmLoading,
  setConfirmLoading,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: any;
  setItem: any;
  confirmLoading: boolean;
  setConfirmLoading: (confirmLoading: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    form.setFieldsValue(item);
  }, []);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <FormInput
          label="Chức Vụ"
          name="positionName"
          placeholder="Chức Vụ"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Chọn Chức Vụ',
            },
          ]}
        />
      </div>
    );
  };
  const handelok = () => {
    form.validateFields().then(async (values) => {
      if (item) {
        await apiService.putPositions(item.positionId, {
          name: values.positionName,
        });
        setVisible(false);
        notification.success({ message: 'thay đổi thành công' });
        setConfirmLoading(!confirmLoading);
        form.resetFields();
      } else {
        await apiService.postPositions({ name: values.positionName });
        setVisible(false);
        notification.success({ message: 'Thêm thành công' });
        setConfirmLoading(!confirmLoading);
        form.resetFields();
      }
    });
  };
  return (
    <CustomModal
      show={visible}
      handleOk={handelok}
      setShow={setVisible}
      dataItem={item}
      label={'Phòng/Khoa'}
      name={item}
      FormItem={<FormItem />}
      form={form}
      header={showDetail ? 'Thêm' : 'Sửa'}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    />
  );
}
