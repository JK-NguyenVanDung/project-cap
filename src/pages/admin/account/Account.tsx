import React, { useState } from 'react'
import TableConfig from '../../../components/admin/Table/Table'
import { Space } from 'antd'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Button from '../../../components/sharedComponents/Button'
import uniqueId from '../../../utils/uinqueId'
import CustomButton from '../../../components/admin/Button'
import Modal from '../../../components/admin/Modal/Modal'
const IAccount = {
  id: '',
  name: '',
}
export default function Account() {
  const [addAccount, setAddAccount] = useState(false)
  const data = [
    {
      id: '1',
      key: '1',
      userName: 'String 1',
      Email: 'string@vanlanguni.vn',
      address: 'TP HCM',
      fullName: 'Nguyễn Văn A',
    },
    {
      id: '2',
      key: '2',
      userName: 'String 1',
      Email: 'string@vanlanguni.vn',
      address: 'TP HCM',
      fullName: 'Nguyễn Văn A',
    },
    {
      id: '3',
      key: '3',
      userName: 'String 1',
      Email: 'string@vanlanguni.vn',
      address: 'TP HCM',
      fullName: 'Nguyễn Văn A',
    },
  ]
  const columns = [
    {
      title: 'Tên Tài Khoản',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Họ Và Tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: () => (
        <Space size="middle">
          <BiEditAlt
            className="cursor-pointer"
            size={20}
            onClick={() => console.log('edit')}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={20}
            color="#FF3333"
            style={{ marginLeft: 12 }}
            onClick={() => console.log('edit')}
          />
        </Space>
      ),
    },
  ]
  const handelOk = () => {
    setAddAccount(false)
  }
  return (
    <>
      <TableConfig
        search={true}
        data={data}
        columns={columns}
        extra={[
          <div
            className="cursor-pointer"
            onClick={() => {
              setAddAccount(true), console.log('hello')
            }}
            key={`${uniqueId()}`}
          >
            Thêm Mới
          </div>,
        ]}
      />
      <Modal
        show={addAccount}
        setShow={setAddAccount}
        dataItem={IAccount}
        label={'Thêm Mới Tài Khoản'}
        name={IAccount}
        handelOk={() => handelOk}
      />
    </>
  )
}
