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
  role,
}: {
  item: any;
  setItem: (item: any) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  role?: any;
}) {
  const [lastLogin, setLastLogin]: any = useState();
  const [roleName, setRoleName] = useState();

  const [form] = Form.useForm();
  function getRoleName() {
    for (let i = 0; i < role.length; i++) {
      if (item.roleId == role[i].roleId) {
        console.log(role[i]);

        setRoleName(role[i].roleName);
        break;
      }
    }
  }
  useEffect(() => {
    getRoleName();
    form.setFieldsValue(item);
    setLastLogin(moment(item.lastLogin).format('HH:mm:ss MM-DD-YYYY'));
  }, []);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <div className="w-full p-5">
          <FormInput
            label="Họ Và Tên"
            disabled
            name="fullName"
            placeholder="Không có tên"
          />
          <FormInput
            label="Email"
            disabled
            name="email"
            placeholder="Không có Email"
          />
          <FormInput
            label="Chức Vụ"
            disabled
            name="position"
            placeholder="Không có chức vụ"
          />
          <FormInput
            label="Đăng Nhập Gần Đây"
            disabled
            value={lastLogin}
            placeholder="Chưa đăng nhập"
          />
        </div>
        <div className="w-full p-5">
          <FormInput
            label="Địa Chỉ"
            disabled
            name="address"
            placeholder="Không có địa chỉ"
          />
          <FormInput
            label="Thuộc Khoa"
            disabled
            name="faculty"
            placeholder="Không có thông tin này"
          />
          <FormInput
            label="Vai trò"
            disabled
            value={roleName}
            placeholder="Không có vai trò"
          />
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
