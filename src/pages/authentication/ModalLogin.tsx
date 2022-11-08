import { Button, Form, Input, Modal } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import React, { useState } from 'react'
import { ILogin } from '../../Type'

export default function ModalLogin({ open, setOpen }: any) {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    console.log('ok')
    setOpen(false)
  }
  const handleCancel = () => {
    console.log('cancel')
    setOpen(false)
  }
  return (
    <Modal
      title="ĐĂNG NHẬP"
      open={open}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          style={{
            backgroundColor: '#28a745',
            borderColor: '#28a745',
          }}
        >
          Đăng Nhập
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          label="Tên Người Dùng"
          name="userName"
          className="formItem"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Tên Người Dùng!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật Khẩu"
          name="password"
          className="formItem"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Mật Khẩu!',
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
