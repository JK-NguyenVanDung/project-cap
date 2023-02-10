import React, { useState } from 'react';
import { Form } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';
export default function TickAttendance({
  item,
  setItem,
  visible,
  setVisible,
}: {
  item: any;
  setItem: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [data, setData]: any = useState('No result');
  const items: any['items'] = [
    {
      key: 'Email',
      label: `Email`,
      // children: RenderEmail(),
    },
    {
      key: 'Code',
      label: `Code`,
      // children: RenderCode(),
    },
  ];
  const RenderEmail = () => {
    return <FormInput />;
  };
  // const RenderCode = () => {
  //   return null;
  //   // <QrReader
  //   //   className="w-full"
  //   //   onResult={(result: any, error: any) => {
  //   //     if (!!result) {
  //   //       setData(result?.text);
  //   //     }

  //   //     if (!!error) {
  //   //       console.info(error);
  //   //     }
  //   //   }}
  //   // />
  // };
  const handelOk = () => {
    form.validateFields().then(async () => {});
  };
  return (
    <CustomModal
      show={visible}
      handleOk={handelOk}
      setShow={setVisible}
      FormItem={<FormItem />}
      form={form}
      header={'Điểm Danh'}
    />
  );
}
