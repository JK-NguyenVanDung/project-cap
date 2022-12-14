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
    <DatePicker showTime onChange={onChange} onOk={onOk} />
  </Space>
);

export default DateTimePicker;
