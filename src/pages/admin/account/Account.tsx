import React, { useEffect, useState } from 'react'
import TableConfig from '../../../components/admin/Table/Table'
import { Form, message, Space } from 'antd'
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
import { IAccountItem, IRoleItem } from '../../../Type'

function PopOverAction({
  data,
  handleDelete,
  handleEdit,
  setLoading,
}: {
  data: any
  handleDelete?: Function
  handleEdit?: Function
  setLoading?: React.MouseEventHandler
}) {
  const [openAction, setOpenAction] = useState(false)

  function handleAction() {
    // setDeleteAction(!deleteAction)
  }
  async function handleDel() {
    handleAction()
    handleDelete
  }
  return (
    <>
      <div className="flex w-max items-center gap-4">
        {handleEdit ? (
          <CustomButton type="edit" onClick={() => handleEdit()} />
        ) : null}
        {handleDelete && (
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
                Xác nhận xoá {data.Email}?
                <div className="flex w-max items-center flex-row gap-4">
                  <CustomButton
                    type="delete"
                    onClick={() => handleDel}
                    text="Xác nhận"
                    noIcon={true}
                  />
                  <CustomButton
                    type="cancel"
                    noIcon={true}
                    onClick={() => handleAction}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  )
}

export default function Account() {
  const [showModal, setShowModal] = useState(false)
  const [detail, setDetail] = useState<IAccountItem>()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<Array<IRoleItem>>()
  const [reload, setReload] = useState(false)

  const [form] = Form.useForm()

  const [data, setData] = useState<Array<IAccountItem>>([])
  const [filterData, setFilterData] = useState([])
  const handleEdit = (item: any) => {
    // dispatch(actions.categoryActions.setDetail(data.ID))
    // dispatch(actions.formActions.showForm())
    setDetail(item)
    setShowModal(true)
  }
  function getRoleTitle(roleId: any) {
    if (role) {
      return role.find((e) => e.roleId === roleId)?.roleName
    }
  }
  const columns = [
    // {
    //   title: 'Tên Tài Khoản',
    //   dataIndex: 'userName',
    //   key: 'userName',
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: GIRD12.COL6,
    },
    // {
    //   title: 'Địa Chỉ',
    //   dataIndex: 'address',
    //   key: 'address',
    // },

    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: any) => (
        <p>{roleId ? getRoleTitle(roleId) : 'Chưa có vai trò'}</p>
      ),
    },
    // {
    //   title: 'Họ Và Tên',
    //   dataIndex: 'fullName',
    //   key: 'fullName',
    // },
    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

      render: (data: IAccountItem) => (
        <PopOverAction data={data} handleEdit={() => handleEdit(data)} />
      ),
    },
  ]

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(value, 'gi')
    let temp = data
    const filteredData = temp
      .map((record: IAccountItem) => {
        const emailMatch = record.email.match(reg)

        if (!emailMatch) {
          return null
        }
        return record
      })
      .filter((record) => !!record)
    setData(value.trim() !== '' ? filteredData : filterData)
  }

  async function getData() {
    try {
      setLoading(true)
      let res: any = await apiService.getAccounts()
      console.log(res)
      // dispatch(actions.categoryActions.setListAll(res))
      // dispatch(actions.categoryActions.changeLoad(!loadData))
      setData(res)
      setFilterData(res)

      setLoading(false)
    } catch (err: any) {
      throw err.message()
    }
  }
  function openAdd() {
    setShowModal(true)
    setDetail(null)
  }
  useEffect(() => {
    async function getRoles() {
      let res: any = await apiService.getRoles()
      setRole(res)
    }
    getRoles()
    getData()
  }, [])

  useEffect(() => {
    async function getRoles() {
      let res: any = await apiService.getRoles()
      setRole(res)
    }
    getRoles()
    getData()
  }, [reload])

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true)
        const temp = []
        if (detail) {
          await apiService.editAccount({
            accountId: detail.accountId,
            roleId: values.roleId,
          })
          setShowModal(false)
          // dispatch(actions.categoryActions.changeLoad(!loadData))
          message.success('Thay đổi thành công')
          setReload(!reload)

          setLoading(false)
          form.resetFields()
        } else {
          await apiService.addAccount({
            email: values.email,
            roleId: values.roleId,
          })
          setShowModal(false)
          setReload(!reload)
          // dispatch(actions.categoryActions.changeLoad(!loadData))
          message.success('Thêm thành công')

          setLoading(false)
          form.resetFields()
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())

        setLoading(false)
      })
  }
  function getOptions() {
    let arr = []
    arr.push({
      value: 0,
      label: 'Chưa có vai trò',
    })
    if (role) {
      for (let i = 0; i < role.length; i++) {
        arr.push({
          value: role[i].roleId,
          label: role[i].roleName,
        })
      }
    }
    return arr
  }
  function configAccount() {
    setShowModal(true)
  }
  const FormItem = () => {
    return (
      <>
        <FormInput
          disabled={detail ? true : false}
          name="email"
          label="Email"
          rule={{
            required: true,
            message: 'Vui Lòng Nhập Vào Email',
          }}
        />
        <FormInput
          name="roleId"
          options={getOptions()}
          type="select"
          label="Vai trò"
          rule={{
            required: true,
            message: 'Vui Lòng Chọn Vai trò',
          }}
        />
      </>
    )
  }
  function getDataFields() {
    if (detail) {
      return {
        email: detail.email,
        roleId: detail.roleId ? detail.roleId : 0,
      }
    }
  }

  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        extra={[
          <CustomButton
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => openAdd()}
          />,
        ]}
      />
      <Modal
        show={showModal}
        setShow={setShowModal}
        dataItem={detail}
        label={'Tài Khoản'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        dataFields={getDataFields()}
        form={form}
      />
    </>
  )
}
