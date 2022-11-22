import React, { useRef } from 'react';
import { Input, Form, message, Select, DatePicker, Space } from 'antd';
import Uploader from '../Upload';
import DateTimePicker from '../DateTimePicker';
const { Option } = Select;
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function FormInput({
  label,
  name,
  rules,
  type,
  options,
  disabled = false,
  focusHandle,
  placeholder,
}: {
  label?: string;
  name?: any;
  rules?: any;
  type?: string;
  options?: any;
  disabled?: boolean;
  focusHandle?: React.FC | Function;
  placeholder?: string;
}) {
  function onChange() {}
  function onOk() {}
  const FormComponent = () => {
    let cp;
    switch (type) {
      case 'select':
        cp = (
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
        break;
      case 'date':
        cp = <DateTimePicker />;
        break;
      case 'upload':
        cp = <Uploader></Uploader>;
        break;

      case 'textArea':
        cp = (
          <TextArea
            className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows={6}
            placeholder={`Nhập ${label}`}
            maxLength={6}
          />
        );
        break;

      default:
        cp = (
          <Input
            disabled={disabled}
            type="text"
            id="simple-search"
            className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`${placeholder ? placeholder : 'Nhập ' + label}`}
            required
          ></Input>
        );
        break;
    }
    return (
      <Form.Item name={name} rules={rules}>
        {cp}
      </Form.Item>
    );
  };
  return (
    <div className="w-full mb-6 z-1">
      <label className="text-black font-bold font-customFont ">{label}</label>
      <FormComponent />
    </div>
  );
}
