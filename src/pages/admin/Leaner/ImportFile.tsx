import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText } from '../../../helper/constant';
import { Select } from 'antd';
import { useAppSelector } from '../../../hook/useRedux';
import { IProgramItem } from '../../../Type';
import Input from '../../../components/sharedComponents/Input';
import CustomButton from '../../../components/admin/Button';
import { HiOutlineTrash } from 'react-icons/hi';

export default function ImportFile({
  showModal,
  setShowModal,
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const data = apiService.importFileLeaner(values);
        setLoading(true);
        if (data) {
          setLoading(false);
          notification.success({ message: 'Thêm tập tin thành công' });
        }
        setShowModal(false);
        form.resetFields();
      })

      .catch((info) => {});
  };
  const handelReadFile = (value: any) => {
    console.log(value.target.files);
  };
  const FormItem = () => {
    return (
      <>
        <Input type="file" onChange={(value: any) => handelReadFile(value)} />
      </>
    );
  };
  return (
    <CustomModal
      show={showModal}
      handleOk={handleOk}
      setShow={setShowModal}
      label={'Người Học'}
      FormItem={<FormItem />}
      form={form}
      header={'Xuất Tập Tin'}
      confirmLoading={loading}
    />
  );
}
