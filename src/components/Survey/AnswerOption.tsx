import { Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { errorText } from '../../helper/constant';
import { useAppSelector } from '../../hook/useRedux';
import PopOverAction from '../admin/PopOver';

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
        <circle cx="10" cy="10" r="9" stroke="#9e9e9e" stroke-width="2" />
      </svg>
    </div>
  );
};

function getChar(c: number) {
  let n = (c + 9).toString(36).toUpperCase();
  return n;
}

const AnswerOption = ({
  onChange,

  handleDelete,
}: {
  onChange: Function;

  handleDelete: Function;
}) => {
  const options = useAppSelector((state: any) => state.survey.radioOptions);

  return (
    <ul className="w-full  mb-4 relative h-auto text-gray-500">
      {options.map((item: any, index: number) => {
        return (
          <li className="w-full flex flex-row justify-between h-14 mb-6  ">
            <button
              type="button"
              formNoValidate
              className={`w-fit  mr-8 my-4 px-6 flex border rounded-[10px] border-gray-500
            h-full justify-between items-center`}
              onClick={() => onChange(item.value)}
            >
              <p className={`text-3xl font-bold border-gray-500`}>
                {getChar(item.value)}
              </p>
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
                  className={`z-[0] text-black h-14 font-customFont  font-bold min-w-[20rem] mt-4 bg-white border  text-sm rounded-lg focus:ring-gray-500 focus:gray-500-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:gray-500-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:gray-500-500
                  border-gray-500 `}
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
export default AnswerOption;
