import React, { useState } from 'react'
import TableConfig from '../../../components/admin/Table/Table'
import { message, Space } from 'antd'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
// import Button from '../../../components/sharedComponents/Button'
import uniqueId from '../../../utils/uinqueId'
import CustomButton from '../../../components/admin/Button'
import Modal from '../../../components/admin/Modal/Modal'
import FormInput from '../../../components/admin/Modal/FormInput'
import apiService from '../../../api/apiService'
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux'
import { GIRD12, MESSAGE } from '../../../helper/constant'
import { actions } from '../../../Redux'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react'
import { IoTrashOutline } from 'react-icons/io5'
const IAccount = {
  id: '',
  name: '',
}
function PopOver(props: any) {
  const [openAction, setOpenAction] = useState(false)
  const dispatch = useAppDispatch()
  const load = useAppSelector((state) => state.category.loadData)

  const [deleteAction, setDeleteAction] = useState(false)
  function handleAction() {
    // setDeleteAction(!deleteAction)
    setOpenAction(!openAction)
  }
  async function handleDelete() {
    handleAction()

    try {
      await apiService.removeCategory(props.CategoryId)

      dispatch(actions.categoryActions.changeLoad(!load))

      message.success(MESSAGE.SUCCESS.DELETE)
    } catch (err: any) {
      throw err.message()
    }
  }
  const openEdit = () => {
    dispatch(actions.categoryActions.setDetail(props.CategoryId))
    dispatch(actions.formActions.showForm())
  }
  return (
    <>
      <div className="flex w-max items-center gap-4">
        <CustomButton type="edit" onClick={openEdit} />
        <Popover
          handler={handleAction}
          open={openAction}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="bottom-end"
        >
          <PopoverHandler>
            <Button
              size="sm"
              className="flex flex-row justify-center items-center"
              color="red"
            >
              <IoTrashOutline className="mx-2 text-base " />
              {/* <p className="font-serif">{'Xoá'}</p> */}
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div className="flex w-max items-center flex-col gap-4">
              Xác nhận xoá {props.CategoryName}?
              <div className="flex w-max items-center flex-row gap-4">
                <CustomButton
                  type="delete"
                  onClick={handleDelete}
                  text="Xác nhận"
                  noIcon={true}
                />
                <CustomButton
                  type="cancel"
                  noIcon={true}
                  onClick={handleAction}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
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
      width: GIRD12.COL2,

      render: (data: any) => <PopOver {...data} />,
    },
  ]
  const handelOk = () => {
    setAddAccount(false)
  }
  function configAccount() {
    setAddAccount(true)
  }
  const FormItem = () => {
    return (
      <>
        <FormInput
          name="email"
          label="email"
          rule={{
            requied: true,
            message: 'Vui Lòng Nhập Vào Email',
          }}
        />
        <FormInput
          name="role"
          label="Phân Quyền"
          rule={{
            requied: true,
            message: 'Vui Lòng Nhập Vào Phân Quyền',
          }}
        />
      </>
    )
  }

  return (
    <>
      <TableConfig
        search={true}
        data={data}
        columns={columns}
        extra={[
          <CustomButton
            size="md"
            key={`${uniqueId()}`}
            onClick={configAccount}
          />,
        ]}
      />
      <Modal
        show={addAccount}
        setShow={setAddAccount}
        dataItem={IAccount}
        label={'Tài Khoản'}
        name={IAccount}
        handelOk={() => handelOk}
        FormItem={<FormItem />}
      />
    </>
  )
}
