import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import CustomModal from '../../../components/admin/Modal/Modal';
import Input from '../../../components/sharedComponents/Input';
import * as XLSX from 'xlsx';
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
  const [listEmail, setListEmail] = useState([]);
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
    const readFileExcel = async () => {
      const file = value.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const wsName = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        data.map((item: any, index) => {
          console.log(item.Email);
        });
      };
    };
    readFileExcel();
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
