import { Form } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';

export default function DetailAccount({
  item,
  setItem,
  visible,
  setVisible,
}: {
  item: any;
  setItem: (item: any) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [lastLogin, setLastLogin]: any = useState();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(item);
    setLastLogin(moment(item.lastLogin).format('HH:mm:ss MM-DD-YYYY'));
  }, []);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <div>
          <FormInput label="Họ Và Tên" disabled name="fullName" />
          <FormInput label="Email" disabled name="email" />
          <FormInput label="Chức Vụ" disabled name="position" />
          <FormInput label="Đăng Nhập Gần Đây" disabled value={lastLogin} />
        </div>
        <div>
          <FormInput label="Địa Chỉ" disabled name="address" />
          <FormInput label="Thuộc Khoa" disabled name="faculty" />
          <FormInput label="Phân Quyền" disabled name="roleId" />
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      dataItem={item}
      form={form}
      show={visible}
      setShow={setVisible}
      header={'Xem Chi Tiết Tài Khoản'}
      width={900}
      name={item}
      FormItem={<FormItem />}
      showButton={true}
    />
  );
}
