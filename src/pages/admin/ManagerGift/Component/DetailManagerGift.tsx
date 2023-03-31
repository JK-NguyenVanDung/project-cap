import React, { useState, useEffect } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import { Form, Upload } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { IGift } from '../../../../api/apiInterface';
import { API_URL } from '../../../../api/api';

export default function DetailManagerGift({
  showModal,
  setShowModal,
  detail,
}: {
  showModal: boolean;
  setShowModal: any;
  detail: IGift;
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
          <img
            src={`${API_URL}/images/${detail?.image}`}
            alt="ảnh quà tặng"
            className="object-cover w-[300px] h-[300px] rounded-lg"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
              // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
            }}
          />
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
              type="textArea"
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
      header={'Xem Chi Tiết Quà Tặng'}
      FormItem={<FormItem />}
      form={form}
      width={900}
    />
  );
}
