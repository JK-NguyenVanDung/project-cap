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
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant'
import { actions } from '../../../Redux'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react'
import { IoTrashOutline } from 'react-icons/io5'
import { ICategoryItem, IRoleItem } from '../../../Type'
import PopOverAction from '../../../components/admin/PopOver'
import { AxiosResponse } from 'axios'

export default function Category() {
  const [showModal, setShowModal] = useState(false)
  const [detail, setDetail] = useState<ICategoryItem>()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<Array<IRoleItem>>()
  const [reload, setReload] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const [form] = Form.useForm()

  const [data, setData] = useState<Array<ICategoryItem>>([])
  const [filterData, setFilterData] = useState([])
  const handleEdit = (item: ICategoryItem) => {
    // dispatch(actions.categoryActions.setDetail(data.ID))
    // dispatch(actions.formActions.showForm())
    setDetail(item)
    setShowModal(true)
  }
  async function handleDelete(item: ICategoryItem) {
    try {
      await apiService.removeCategory(item.categoryId)

      setReload(!reload)
      message.success(MESSAGE.SUCCESS.DELETE)
    } catch (err: any) {
      throw err.message()
    }
  }

  function getRoleTitle(roleId: any) {
    if (role) {
      return role.find((e) => e.roleId === roleId)?.roleName
    }
  }
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      width: GIRD12.COL10,
    },

    // {
    //   title: 'Tạo vào',
    //   dataIndex: 'createdAt',
    //   // render: (text) => <a>{text}</a>,
    //   width: GIRD12.COL1,
    // },

    // {
    //   title: 'Cập nhật vào',
    //   dataIndex: 'updatedAt',
    //   // render: (text) => <a>{text}</a>,
    //   width: GIRD12.COL1,
    // },
    {
      width: GIRD12.COL2,

      title: 'Thao tác',
      render: (item: ICategoryItem) => {
        return (
          <>
            <PopOverAction
              data={item}
              handleEdit={() => handleEdit(item)}
              handleDelete={() => handleDelete(item)}
              deleteItem={item.categoryName}
            />
          </>
        )
      },
    },
  ]

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(value, 'gi')
    let temp = data
    const filteredData = temp
      .map((record: ICategoryItem) => {
        const emailMatch = record.categoryName.match(reg)

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
      let res: any = await apiService.getCategories()
      res = res.reverse()
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
    getData()
  }, [])

  useEffect(() => {
    async function getRoles() {
      let res: any = await apiService.getRoles()
      setRole(res)
    }
    getData()
  }, [reload])

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true)
        const temp = []
        if (detail) {
          await apiService.editCategory({
            name: values.name,
            ID: detail.categoryId,
          })
          setShowModal(false)
          // dispatch(actions.categoryActions.changeLoad(!loadData))
          message.success('Thay đổi thành công')
          setReload(!reload)

          setLoading(false)
          form.resetFields()
        } else {
          await apiService.addCategory({
            name: values.name,
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

  const FormItem = () => {
    return (
      <>
        <FormInput
          disabled={false}
          name="name"
          label="Tên Danh Mục"
          rules={[
            {
              required: true,
              message: `Không được để trống tên danh mục`,
            },
            {
              pattern: new RegExp(/^\w/),
              message: errorText.space,
            },
          ]}
        />
      </>
    )
  }
  function getDataFields() {
    if (detail) {
      return {
        name: detail.categoryName,
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
        isFocused={isFocused}
        show={showModal}
        setShow={setShowModal}
        dataItem={detail}
        label={'Danh Mục'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        dataFields={getDataFields()}
        form={form}
      />
    </>
  )
}
