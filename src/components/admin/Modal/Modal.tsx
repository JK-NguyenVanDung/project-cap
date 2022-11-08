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
import { actions } from '../../../Redux'
import apiService from '../../../api/apiService'
export default function Modal({
  show,
  setShow,
  dataItem,
  label,
  name,
  handelOk,
}: {
  handelOk?: () => void
  name?: any
  label?: string
  dataItem?: any
  show?: boolean
  setShow?: (show: boolean) => void
}) {
  const handleShow = () => {
    setShow(!show)
  }
  const [form] = Form.useForm()
  return (
    <Dialog className="text-black font-bold" open={show} handler={handleShow}>
      <DialogHeader>
        <div className="flex flex-row w-full justify-between items-center mb-6">
          <p className="font-bold font-customFont text-2xl text-black">
            {dataItem ? `Sửa ${label}` : `Thêm ${label}`}
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
      <Form form={form} className="formCategory w-full">
        <DialogBody>
          <div className=" w-full px-8 flex flex-col  justify-evenly">
            <div className="w-full mb-6">
              <label className="text-black font-bold font-customFont ">
                {label}
              </label>
              <Form.Item
                name={name}
                rules={[
                  {
                    required: true,
                    message: `Không được để trống tên ${label}`,
                  },
                ]}
              >
                <Input
                  type="text"
                  id="simple-search"
                  className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Nhập ${label}`}
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
              onClick={() => handelOk}
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
  )
}
