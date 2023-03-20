import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

const onChange = (
  value: DatePickerProps['value'] | RangePickerProps['value'],
  dateString: [string, string] | string,
) => {};

const onOk = (
  value: DatePickerProps['value'] | RangePickerProps['value'],
) => {};

const DateTimePicker = () => (
  <Space className="mt-3" direction="vertical" size={12}>
    <DatePicker
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      className={`  font-customFont  font-bold  w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
      onBlur={() => {}}
    />
  </Space>
);

export default DateTimePicker;
