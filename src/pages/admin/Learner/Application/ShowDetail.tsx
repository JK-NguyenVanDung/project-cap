import React, { useState, useEffect } from 'react';
import { Form, notification, Image } from 'antd';
import CustomModal from '../../../../components/admin/Modal/Modal';
import FormInput from '../../../../components/admin/Modal/FormInput';
export default function ShowDetail({
  visible,
  setVisible,
  item,
  setItem,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: any;
  setItem: any;
}) {
  const [form] = Form.useForm();

  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      item,
      programName: item?.program.programName,
      statusProgram:
        item?.program.status == 'public' ? 'Đang Công Khai' : 'Riêng Tư',
      emailLeaner: item?.accountIdLearnerNavigation?.email,
      fullName: item?.accountIdLearnerNavigation?.fullName,
      statusLeaner:
        item.status == 'Attending'
          ? 'Đang Tham Gia'
          : item.status == 'Stop Attending'
          ? 'Ngưng Tham Gia'
          : item.status == 'Not Complete'
          ? 'Chưa Hoàn Thành'
          : item.status == 'Complete'
          ? 'Hoàn Thành'
          : '',
    });
    setLoading(true);
    if (item) {
      setLoading(false);
    }
  }, [item, loading]);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <div className="w-full p-6">
          <FormInput
            placeholder="Chương Trình"
            disabled
            label="Tên Chương Trình"
            name="programName"
          />
          <FormInput
            placeholder="Trạng Thái Chương Trình"
            disabled
            label="Trạng Thái Chương Trình"
            name="statusProgram"
          />
        </div>
        <div className="w-full p-6">
          <FormInput
            placeholder="Email"
            disabled
            label="Email"
            name="emailLeaner"
          />
          <FormInput
            placeholder="Họ Và Tên"
            disabled
            label="Họ Và Tên"
            name="fullName"
          />
          <FormInput
            placeholder="Trạng Thái"
            disabled
            label="Trạng Thái"
            name="statusLeaner"
          />
          <FormInput
            placeholder="Nhận xét"
            disabled
            label="Nhận Xét"
            name="comment"
            type="textArea"
          />
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      label={'Đơn Đăng Ký'}
      dataItem={item}
      name={item}
      FormItem={<FormItem />}
      form={form}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      width={900}
    />
  );
}
