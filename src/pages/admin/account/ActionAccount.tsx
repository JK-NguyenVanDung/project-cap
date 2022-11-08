import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
} from 'antd'
import React, { useEffect, useState } from 'react'

export default function ActionAccount({
  addAccount,
  setAddAccount,
}: {
  addAccount: boolean
  setAddAccount: (addAccount: boolean) => void
}) {
  console.log(addAccount)
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setAddAccount(false)
        setConfirmLoading(true)
      })
      .catch((info) => {
        console.log('Validate Failed', info)
      })
  }

  const handelCancel = () => {
    form.resetFields()
    setAddAccount(false)
  }
  return (
    <Modal
      title={'thêm tài khoản'}
      open={addAccount}
      onOk={handelOk}
      onCancel={handelCancel}
      confirmLoading={confirmLoading}
      okText={'thêm mới'}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          midifier: 'public',
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Tên Tài Khoản"
          name={'UserName'}
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào User Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
