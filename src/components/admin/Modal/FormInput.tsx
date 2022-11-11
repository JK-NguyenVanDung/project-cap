import React from 'react'
import { Input, Form, message, Select } from 'antd'
const { Option } = Select

export default function FormInput({
  label,
  name,
  rule,
  type,
  options,
}: {
  label?: string
  name?: any
  rule?: {}
  type?: string
  options?: any
}) {
  console.log(rule)
  return (
    <div className="w-full mb-6 z-1">
      <label className="text-black font-bold font-customFont ">{label}</label>
      <Form.Item name={name} rules={[rule]}>
        {type === 'select' ? (
          <Select
            dropdownStyle={{ zIndex: 20000 }}
            defaultValue={options[0]?.value}
            className="text-black font-customFont h-10 font-bold min-w-[20rem] mt-4"
            options={options}
          ></Select>
        ) : (
          <Input
            type="text"
            id="simple-search"
            className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Nhập ${label}`}
            required
          />
        )}
      </Form.Item>
    </div>
  )
}
