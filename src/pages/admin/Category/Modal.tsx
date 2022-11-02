import React, { useEffect, useState } from 'react'
import {
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

import { Input, Form, message } from 'antd'

import { IoClose } from 'react-icons/io5'
import { useAppSelector, useAppDispatch } from '../../../hook/useRedux'
import { actions } from '../../../redux'

export default function Modal(props: any) {
  const [loading, setLoading] = useState(false)
  const show = useAppSelector((state) => state.form.show)
  const dispatch = useAppDispatch()
  const loadData = useAppSelector((state) => state.form.loadData)

  const dataItem = useAppSelector((state) => state.category.detail)
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()

    const setForm = () => {
      form.setFieldsValue({
        categoryName: dataItem.categoryName,
      })
    }

    if (dataItem) {
      setForm()
    }
  }, [dataItem])
  // //test
  // const [input, setInput] = useState('')
  // const [error, setError] = useState(false)
  const handleClose = () => dispatch(actions.formActions.closeForm())
  const handleOpen = () => dispatch(actions.formActions.setForm(!show))

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true)
        const temp = []
        if (dataItem) {
          // await collections.editCategory({
          //   _id: dataItem._id,
          //   body: {
          //     name: values.name,
          //     category_type_id: values.category_type_id,
          //   },
          // });
          handleClose()
          dispatch(actions.formActions.changeLoad(!loadData))
          message.success('Thay đổi thành công')

          setLoading(false)
        } else {
          // await collections.addCategory({
          //   name: values.name,
          //   category_type_id: values.category_type_id,
          // });
          handleClose()
          dispatch(actions.formActions.changeLoad(!loadData))
          message.success('Thêm thành công')

          setLoading(false)
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())

        setLoading(false)
      })
  }
  const labels = {
    title: 'Tên Danh Mục',
  }

  return (
    <>
      <Dialog open={show} handler={handleOpen}>
        <DialogHeader>
          <div className="flex flex-row w-full justify-between items-center mb-6">
            <p className="text-xl text-black">
              {!dataItem ? 'Thêm Danh Mục' : 'Sửa Danh Mục'}
            </p>
            <IconButton
              variant="text"
              className="text-black"
              onClick={handleOpen}
            >
              <IoClose className="text-xl" />
            </IconButton>
          </div>
        </DialogHeader>
        <Form form={form} className="formCategory">
          <DialogBody>
            <div className=" w-full px-20   flex flex-col  justify-evenly">
              <div className="w-full mb-6">
                <label>{labels.title}</label>
                <Form.Item
                  name="categoryName"
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống tên danh mục`,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    id="simple-search"
                    className="min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Nhập ${labels.title}`}
                    required
                  />
                </Form.Item>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <div className=" mb-6 flex flex-row justify-evenly w-full">
              <Button fullWidth className="mx-2" color="red" variant="filled">
                Xoá
              </Button>
              <Button
                onClick={() => handleOk()}
                fullWidth
                className="mx-2"
                color={`${!dataItem ? 'green' : 'blue'}`}
                variant="filled"
              >
                {!dataItem ? 'Thêm' : 'Sửa'}
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </Dialog>
    </>
  )
}
