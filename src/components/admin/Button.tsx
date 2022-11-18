import React, { useEffect, useState, FC } from 'react';
import { Button } from '@material-tailwind/react';
import { FaPencilAlt, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { color, size } from '@material-tailwind/react/types/components/button';
interface CustomButton {
  size?: size;
  color?: color;
  className?: string;
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
  onClick,
  Icon,
  noIcon,
  text,
  type,
  fullWidth,
}: {
  size?: size;
  color?: color;
  className?: string;
  onClick?: React.MouseEventHandler;
  Icon?: IconType;
  noIcon?: boolean;
  text?: string;
  type?: string;
  fullWidth?: boolean;
}) {
  let variant: any;
  let iconClass;
  let defaultText = '';
  switch (type) {
    case 'delete':
      defaultText = 'Xoá';
      color = 'red';
      Icon = FaTrash;

      break;
    case 'cancel':
      defaultText = 'Huỷ';
      color = 'red';
      variant = 'outlined';
      break;
    case 'edit':
      defaultText = '';
      Icon = FaPencilAlt;
      // variant = 'text'
      break;
    case 'add':
      defaultText = 'Thêm mới';
      Icon = FaPlus;
      iconClass = 'mx-2 text-base ';
      className += ' mx-0 px-2 pr-6';
      break;
    case 'detail':
      defaultText = '';
      Icon = FaEye;
      iconClass = 'mx-2 text-base ';
      variant = 'outlined';

      break;
    default:
      defaultText = 'Thêm';
      Icon = FaPlus;
      iconClass = 'mx-2 text-base';

      break;
  }

  return (
    <Button
      fullWidth={fullWidth}
      size={size ? size : `sm`}
      color={color ? color : color}
      className={` flex flex-row justify-center  items-center ${className}`}
      onClick={(e) => onClick(e)}
      variant={variant}
    >
      {!noIcon && <Icon className={`mx-2 text-base ${iconClass}`} />}
      <p className="font-customFont  font-semibold">
        {text ? text : defaultText}
      </p>
    </Button>
  );

  //className="mx-2 text-base
}
