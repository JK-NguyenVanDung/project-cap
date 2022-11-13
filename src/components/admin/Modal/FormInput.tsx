import React, { useRef } from 'react';
import { Input, Form, message, Select } from 'antd';
const { Option } = Select;

export default function FormInput({
  label,
  name,
  rules,
  type,
  options,
  disabled = false,
  focusHandle,
}: {
  label?: string;
  name?: any;
  rules?: any;
  type?: string;
  options?: any;
  disabled?: boolean;
  focusHandle?: React.FC | Function;
}) {
  return (
    <div className="w-full mb-6 z-1">
      <label className="text-black font-bold font-customFont ">{label}</label>
      <Form.Item name={name} rules={rules}>
        {type === 'select' ? (
          <Select
            disabled={disabled}
            dropdownStyle={{ zIndex: 20000 }}
            defaultValue={options[0]?.value}
            className="text-black font-customFont h-10 font-bold min-w-[20rem] mt-4"
            options={options}
            onFocus={() => focusHandle(true)}
            onBlur={() => focusHandle(false)}
          ></Select>
        ) : (
          <Input
            disabled={disabled}
            type="text"
            id="simple-search"
            className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Nhập ${label}`}
            required
          />
        )}
      </Form.Item>
    </div>
  );
}
