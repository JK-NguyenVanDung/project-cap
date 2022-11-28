import React, { FC, useEffect, useState } from 'react';

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

const RadioGroup = ({
  options,
  onChange,
  value,
}: {
  options: any;
  onChange: Function;
  value: boolean;
}) => {
  return (
    <div className="w-full flex my-4">
      {options.map((item: any) => {
        return (
          <button
            type="button"
            formNoValidate
            className={`w-fit mr-4 px-6 flex border rounded-[10px] ${
              value === item.value ? 'border-primary' : 'border-border-gray'
            } h-12 justify-center items-center`}
            onClick={() => onChange(item.value)}
          >
            <p className="text-md">{item.label}</p>
            {value === item.value ? (
              <SelectedCircle className="ml-4" />
            ) : (
              <UnselectedCircle className="ml-4" />
            )}
          </button>
        );
      })}
    </div>
  );
};
export default RadioGroup;
