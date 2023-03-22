import React, { useState, useEffect } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import { Form, Upload } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { IGift } from '../../../../api/apiInterface';
import avatarSq from '../../../../assets/img/avatarSq.png';
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function DetailManagerGift({
  showModal,
  setShowModal,
  detail,
  setDetail,
}: {
  showModal: boolean;
  setShowModal: any;
  detail: IGift;
  setDetail: any;
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (detail) {
      form.setFieldsValue(detail);
    }
  }, []);
  const FormItem = () => {
    return (
      <>
        <div className="flex justify-between content-center">
          <div>
            <img src={detail.image ? detail.image : avatarSq} />
          </div>

          <div className="w-full pr-10 pl-10">
            <FormInput
              className="w-full"
              name="name"
              label="Tên Quà Tặng"
              disabled
            />
            <FormInput
              className="w-full"
              name="description"
              label="Mô Tả"
              disabled
            />
            <FormInput
              className="w-full"
              name="coin"
              label="Giá Đổi"
              disabled
            />
            <FormInput
              className="w-full"
              name="quantity"
              label="Số Lượng Còn Lại"
              disabled
            />
          </div>
        </div>
      </>
    );
  };
  return (
    <CustomModal
      centered={true}
      show={showModal}
      setShow={setShowModal}
      dataItem={detail}
      name={detail}
      showButton={true}
      label={'Năm học'}
      FormItem={<FormItem />}
      form={form}
      width={900}
    />
  );
}
