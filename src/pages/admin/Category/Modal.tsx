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
import CustomButton from '../../../components/admin/Button'

import { IoClose } from 'react-icons/io5'
import { useAppSelector, useAppDispatch } from '../../../hook/useRedux'
import { actions } from '../../../redux'
import apiService from '../../../api/apiService'

export default function Modal(props: any) {
  const [loading, setLoading] = useState(false)
  const show = useAppSelector((state) => state.form.show)
  const dispatch = useAppDispatch()
  const loadData = useAppSelector((state) => state.form.loadData)

  const dataItem = useAppSelector((state) => state.category.detail)
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
    console.log(dataItem)
    const setForm = () => {
      form.setFieldsValue({
        CategoryName: dataItem.CategoryName,
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
  const handleShow = () => dispatch(actions.formActions.setForm(!show))

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true)
        const temp = []
        if (dataItem) {
          await apiService.editCategory({
            ID: dataItem.CategoryId,
            Name: values.CategoryName,
          })
          handleShow()
          dispatch(actions.formActions.changeLoad(!loadData))
          message.success('Thay đổi thành công')

          setLoading(false)
        } else {
          // const rawResponse = await fetch(
          //   'https://cntttest.vanlanguni.edu.vn:18081/CP25Team02/api/categories/create',
          //   {
          //     method: 'POST',
          //     headers: {
          //       Accept: 'application/json',
          //       'Content-Type': 'application/json',
          //       'Access-Control-Allow-Origin': '*',
          //       'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          //       'Access-Control-Allow-Headers':
          //         'Content-Type, Authorization, X-Requested-With',
          //     },
          //     body: JSON.stringify({ Name: 'xyz' }),
          //   }
          // )

          await apiService.addCategory({
            Name: values.CategoryName,
          })
          handleShow()
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
      <Dialog className="text-black font-bold" open={show} handler={handleShow}>
        <DialogHeader>
          <div className="flex flex-row w-full justify-between items-center mb-6">
            <p className="font-bold font-mono text-2xl text-black">
              {dataItem ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
            </p>
            <IconButton
              variant="text"
              className="text-black"
              onClick={handleShow}
            >
              <IoClose className="text-xl" />
            </IconButton>
          </div>
        </DialogHeader>
        <Form form={form} className="formCategory">
          <DialogBody>
            <div className=" w-full px-20   flex flex-col  justify-evenly">
              <div className="w-full mb-6">
                <label className="text-black font-bold">{labels.title}</label>
                <Form.Item
                  name="CategoryName"
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
                    className="text-black font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Nhập ${labels.title}`}
                    required
                  />
                </Form.Item>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <div className=" mb-6 flex flex-row justify-evenly w-full">
              <CustomButton
                size="md"
                onClick={handleOk}
                fullWidth={true}
                className="mx-2"
                noIcon={true}
                text={!dataItem ? 'Thêm' : 'Sửa'}
              />

              <CustomButton
                size="md"
                fullWidth={true}
                noIcon={true}
                type="cancel"
                color="blue"
                onClick={handleShow}
              />
            </div>
          </DialogFooter>
        </Form>
      </Dialog>
    </>
  )
}
