import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

const onChange = (
  value: DatePickerProps['value'] | RangePickerProps['value'],
  dateString: [string, string] | string,
) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

const StartEndDatePicker = ({
  //   onChangeHandle,
  onOkHandle,
}: {
  // onChangeHandle: Function;
  onOkHandle?: any;
}) => {
  const [dates, setDates] = useState(null);

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    onOkHandle(value);
  };

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    setDates(value);
  };

  return (
    <>
      <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        className={`  font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        onOk={onOk}
      />
    </>
  );
};

export default StartEndDatePicker;
