import { Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { errorText } from '../../helper/constant';
import CustomButton from './Button';
import PopOverAction from './PopOver';

const UnselectedCircle = (props: any) => {
  return (
    <div {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="9" stroke="#F0F0F0" stroke-width="2" />
      </svg>
    </div>
  );
};
const SelectedCircle = (props: any) => {
  return (
    <div {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="8" stroke="#3649F9" stroke-width="4" />
      </svg>
    </div>
  );
};
const FullCircle = (props: any) => {
  return (
    <div {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="#3649F9"
          stroke="#3649F9"
          stroke-width="4"
        />
      </svg>
    </div>
  );
};
function getChar(c: number) {
  let n = (c + 9).toString(36).toUpperCase();
  return n;
}

const OptionalAnswer = ({
  options,
  onChange,
  value,
  values,
  type,
  handleDelete,
}: {
  options: any;
  onChange: Function;
  value?: number;
  values?: any;
  type?: string;
  handleDelete: Function;
}) => {
  function getStyle(type: string, value: number, values: [], item: any) {
    return type != 'multiple'
      ? value === item.value
      : values.length > 0
      ? values.find((e) => e === item.value) !== undefined
      : false;
  }
  return (
    <ul className="w-full mb-4 relative h-auto">
      {options.map((item: any, index: number) => {
        return (
          <li className="w-full flex flex-row justify-between h-14 mb-6  ">
            <button
              type="button"
              formNoValidate
              className={`w-[8rem]  mr-8 my-4 px-6 flex border rounded-[10px] ${
                getStyle(type, value, values, item)
                  ? 'border-primary'
                  : 'border-border-gray'
              } h-full justify-between items-center`}
              onClick={() => onChange(item.value)}
            >
              <p
                className={`text-3xl font-bold ${
                  getStyle(type, value, values, item)
                    ? 'text-primary'
                    : 'text-border-gray'
                }`}
              >
                {getChar(item.value)}
              </p>
              {getStyle(type, value, values, item) ? (
                <FullCircle className="ml-4" />
              ) : (
                <UnselectedCircle className="ml-4" />
              )}
            </button>
            <div className="w-full mb-6 z-1 ">
              <Form.Item
                name={item.value}
                rules={[
                  {
                    required: true,
                    message: `Vui Lòng Nhập Vào Đáp án ${getChar(item.value)}`,
                  },
                  {
                    pattern: new RegExp(/^(?!\s*$|\s).*$/),
                    message: errorText.space,
                  },
                ]}
              >
                <Input
                  defaultValue={item.text}
                  type="text"
                  className={`z-[0] h-14 text-black h-full font-customFont  font-bold min-w-[20rem] mt-4 bg-white border  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500
              ${
                getStyle(type, value, values, item)
                  ? 'border-primary'
                  : 'border-border-gray'
              } `}
                  placeholder={`Nhập đáp án ${getChar(item.value)}`}
                  suffix={
                    index > 3 && (
                      <PopOverAction
                        variant="text"
                        handleDelete={() => handleDelete(item.value)}
                        deleteItem={'câu ' + getChar(item.value)}
                        size="sm"
                      />
                    )
                  }
                />
              </Form.Item>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default OptionalAnswer;
