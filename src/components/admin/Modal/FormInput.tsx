import React, { useRef } from 'react';
import { Input, Form, message, Select, DatePicker, Space } from 'antd';
const { Option } = Select;
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
const { RangePicker } = DatePicker;

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
  function onChange() {}
  function onOk() {}
  let FormComponent = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            disabled={disabled}
            dropdownStyle={{ zIndex: 20000 }}
            defaultValue={options[0]?.value}
            className="text-black font-customFont h-10 font-bold min-w-[20rem] mt-4"
            options={options}
            onFocus={() => focusHandle(true)}
            onBlur={() => focusHandle(false)}
          ></Select>
        );
      case 'date':
        return (
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChange} onOk={onOk} />
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        );
      case 'upload':
    }
  };
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
