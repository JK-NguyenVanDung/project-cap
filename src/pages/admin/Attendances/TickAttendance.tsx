import React, { useState } from 'react';
import { Form, Modal, notification } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import { QrReader } from 'react-qr-reader';
import { Tabs } from 'antd';
import apiService from '../../../api/apiService';
import './index.css';
import CustomButton from '../../../components/admin/Button';
import { errorText } from '../../../helper/constant';

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
  const [dataQrCode, setDataQrCode]: any = useState('Chưa có kết quả');
  const [confirmLoading, setConfirmLoading] = useState(false);
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
        <FormInput
          name="email"
          placeholder="Nhập Email"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Email',
            },
            {
              pattern: new RegExp(
                /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/,
              ),
              message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU',
            },

            {
              pattern: new RegExp(
                /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/,
              ),
              message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU ',
            },
            {
              pattern: new RegExp(/^\w/),
              message: errorText.email,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
      </Form>
    );
  }
  function RenderCode() {
    return (
      <>
        <QrReader
          onResult={(result: any, error: any) => {
            if (!!result) {
              setDataQrCode(result?.text);
            }
          }}
          constraints={undefined}
        />
        {dataQrCode ? <p>Kết Quả Mã QR: {dataQrCode}</p> : null}
      </>
    );
  }
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        setConfirmLoading(true);
        if (values.email) {
          const params = {
            email: values.email,
            attendanceId: item.id,
          };
          await apiService.AttdendanceEmail(params);
          notification.success({ message: 'Điểm Danh thành công' });
        }
        if (dataQrCode) {
          const params = {
            code: dataQrCode,
            attendanceId: item.id,
          };
          await apiService.AttdendanceCode(params);
          notification.success({ message: 'Điểm Danh thành công' });
        }
        setVisible(false);
        setConfirmLoading(false);
        setDataQrCode('');
      } catch (error) {
        setVisible(false);
        setConfirmLoading(false);
        setDataQrCode('');
        notification.error({ message: 'Điểm Danh không thành công' });
      }
      form.resetFields();
    });
  };

  const handelCancel = () => {
    form.resetFields();
    setVisible(false);
    setConfirmLoading(false);
    setDataQrCode('');
  };
  return (
    <Modal
      title="Điểm Danh"
      open={visible}
      onOk={handleOk}
      onCancel={handelCancel}
      confirmLoading={confirmLoading}
      footer={
        <div className=" my-5 flex flex-row justify-evenly w-full">
          <CustomButton
            size="md"
            fullWidth={true}
            noIcon={true}
            type="cancel"
            color="blue-gray"
            onClick={() => handelCancel()}
            text="Hủy"
          />
          <CustomButton
            size="md"
            onClick={() => handleOk()}
            fullWidth={true}
            className="mx-2"
            noIcon={true}
            color="blue-gray"
            text="Lưu"
          />
        </div>
      }
    >
      <Tabs defaultActiveKey="Email" items={items} onChange={onChange} />
    </Modal>
  );
}
