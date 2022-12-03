import React, { ReactElement, useRef } from 'react';
import {
  Input,
  Form,
  message,
  Select,
  DatePicker,
  Space,
  InputNumber,
} from 'antd';
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
  placeholder,
  className,
  IconRight,
  areaHeight,
  getSelectedValue,
  defaultValue,
  value,
}: {
  label?: string;
  name?: any;
  rules?: any;
  type?: string;
  options?: any;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  IconRight?: any;
  areaHeight?: number;
  getSelectedValue?: Function;
  defaultValue?: any;
  value?: any;
}) {
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
            onSelect={(e: any) => (getSelectedValue ? getSelectedValue(e) : {})}
          ></Select>
        );
        break;
      case 'date':
        cp = <DateTimePicker />;
        break;
      case 'upload':
        cp = <Uploader />;
        break;
      case 'inputNumber':
        cp = (
          <InputNumber
            className="mt-4 h-11 rounded-lg font-bold text-black font-customFont"
            min="1"
            placeholder={`${placeholder ? placeholder : 'Nhập ' + label}`}
            style={{
              width: '100%',
            }}
          />
        );
        break;
      case 'textArea':
        cp = (
          <TextArea
            disabled={disabled}
            className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows={areaHeight ? areaHeight : 6}
            placeholder={`${placeholder ? placeholder : 'Nhập ' + label}`}
          />
        );

        break;

      default:
        cp = (
          <Input
            value={value}
            disabled={disabled}
            type="text"
            className={`text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
            placeholder={`${placeholder ? placeholder : 'Nhập ' + label}`}
            required
            suffix={IconRight && <IconRight className="w-fit" />}
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
