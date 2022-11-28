import React, { useEffect, useState, FC } from 'react';
import { Button } from '@material-tailwind/react';
import { FaPencilAlt, FaTrashAlt, FaPlus, FaEye } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { HiOutlineTrash } from 'react-icons/hi';

import { color, size } from '@material-tailwind/react/types/components/button';
import { BsFillPeopleFill } from 'react-icons/bs';
interface CustomButton {
  size?: size;
  color?: color;
  className?: string;
  textClassName?: string;
  onClick?: FC | Function;
  Icon?: IconType;
  noIcon?: boolean;
  text?: string;
  type?: string;
  fullWidth?: boolean;
}

export default function CustomButton({
  size,
  color,
  className,
  iconClass,
  onClick,
  Icon,
  noIcon,
  text,
  type,
  fullWidth,
  variant,
  htmlType,
  textClassName,
}: {
  size?: size;
  color?: color;
  className?: string;
  iconClass?: string;
  onClick?: React.MouseEventHandler;
  Icon?: IconType;
  noIcon?: boolean;
  text?: string;
  type?: string;
  fullWidth?: boolean;
  variant?: any;
  htmlType?: string;
  textClassName?: string;
}) {
  let defaultText = '';
  let typeClassName = '';
  switch (type) {
    case 'delete':
      defaultText = 'Xoá';
      color = 'red';
      Icon = HiOutlineTrash;

      break;
    case 'cancel':
      defaultText = 'Huỷ';
      variant = 'outlined';
      break;
    case 'edit':
      defaultText = '';
      Icon = FaPencilAlt;
      color = 'blue';
      // variant = 'text'
      variant = 'outlined';

      break;
    case 'add':
      defaultText = 'Thêm mới';
      Icon = FaPlus;
      color = 'green';

      iconClass = 'mx-2 text-base ';
      typeClassName += 'mx-0 px-2 pr-8';

      break;
    case 'detail':
      defaultText = '';
      Icon = FaEye;
      color = 'purple';

      iconClass = 'mx-2 text-base ';
      variant = 'outlined';

      break;
    case 'auth':
      defaultText = '';

      Icon = BsFillPeopleFill;
      variant = 'outlined';

    default:
      defaultText = '';
      Icon = Icon ? Icon : FaPlus;
      iconClass = 'mx-2 text-base';

      break;
  }

  return (
    <Button
      fullWidth={fullWidth}
      size={size ? size : `sm`}
      color={color ? color : color}
      className={` flex flex-row justify-center  items-center ${typeClassName} ${className} ${
        size === 'sm' && 'px-1/2'
      }`}
      onClick={(e) => onClick(e)}
      variant={variant}
    >
      {!noIcon && <Icon className={`mx-2 text-base ${iconClass}`} />}
      <p className={`font-customFont  font-semibold ${textClassName}`}>
        {text ? text : defaultText}
      </p>
    </Button>
  );

  //className="mx-2 text-base
}
