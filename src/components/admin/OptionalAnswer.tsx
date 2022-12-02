import { Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { errorText } from '../../helper/constant';
import { useAppSelector } from '../../hook/useRedux';
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
  onChange,

  handleDelete,
}: {
  onChange: Function;

  handleDelete: Function;
}) => {
  const options = useAppSelector((state: any) => state.question.radioOptions);
  const value = useAppSelector((state: any) => state.question.radioValue);
  const values = useAppSelector((state: any) => state.question.selectedOptions);
  const type: number = useAppSelector(
    (state: any) => state.question.selectedType,
  );
  function getStyle(item: any) {
    return type != 2
      ? value === item.value
      : values.length > 0
      ? values.find((e: any) => e === item.value) !== undefined
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
                getStyle(item) ? 'border-primary' : 'border-border-gray'
              } h-full justify-between items-center`}
              onClick={() => onChange(item.value)}
            >
              <p
                className={`text-3xl font-bold ${
                  getStyle(item) ? 'text-primary' : 'text-border-gray'
                }`}
              >
                {getChar(item.value)}
              </p>
              {getStyle(item) ? (
                <FullCircle className="ml-4" />
              ) : (
                <UnselectedCircle className="ml-4" />
              )}
            </button>
            <div className="w-full mb-6 z-1 ">
              <Form.Item
                name={item.value - 1}
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
                  type="text"
                  className={`z-[0] h-14 text-black h-full font-customFont  font-bold min-w-[20rem] mt-4 bg-white border  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500
              ${getStyle(item) ? 'border-primary' : 'border-border-gray'} `}
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
