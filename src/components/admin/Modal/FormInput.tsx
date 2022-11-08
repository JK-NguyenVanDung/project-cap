import React from 'react'
import { Input, Form, message } from 'antd'
import { Select } from '@material-tailwind/react'

export default function FormInput({
  label,
  name,
  rule,
}: {
  label?: string
  name?: any
  rule?: {}
}) {
  console.log(rule)
  return (
    <div className="w-full mb-6">
      <label className="text-black font-bold font-customFont ">{label}</label>
      <Form.Item name={name} rules={[rule]}>
        <Input
          type="text"
          id="simple-search"
          className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Nhập ${label}`}
          required
        />
      </Form.Item>
    </div>
  )
}
