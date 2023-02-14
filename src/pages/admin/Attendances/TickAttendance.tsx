import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import { QrReader } from 'react-qr-reader';
import { Tabs } from 'antd';
import './index.css';
export default function TickAttendance({
  // item,
  // setItem,
  visible,
  setVisible,
}: {
  // item: any;
  // setItem: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [data, setData]: any = useState('No result');
  const items: any['items'] = [
    {
      key: 'Email',
      label: `Email`,
      children: <RenderEmail />,
    },
    {
      key: 'Code',
      label: `QR Code`,
      children: <RenderCode />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  function RenderEmail() {
    return (
      <Form form={form}>
        <FormInput name="email" placeholder="Nhập Email" />
      </Form>
    );
  }
  function RenderCode() {
    return (
      <QrReader
        className="w-full"
        onResult={(result: any, error: any) => {
          if (!!result) {
            console.log(result);
            setData(result?.text);
          }
        }}
        constraints={undefined}
      />
    );
  }
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      // if(values.email){
      //   const data = await api
      // }
    });
  };
  return (
    <Modal title="Điểm Danh" open={visible} onOk={handleOk}>
      <Tabs defaultActiveKey="Email" items={items} onChange={onChange} />
    </Modal>
  );
}
