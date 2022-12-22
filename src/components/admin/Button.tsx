import React, { useEffect, useState, FC } from 'react';
import { Button } from '@material-tailwind/react';
import { FaPencilAlt, FaTrashAlt, FaPlus, FaEye } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { HiOutlineTrash } from 'react-icons/hi';

import { color, size } from '@material-tailwind/react/types/components/button';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Tooltip } from 'antd';
import { ImBook } from 'react-icons/im';
import { MdGroupAdd } from 'react-icons/md';

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
  disabled,
  style,
  tip,
}: {
  size?: size;
  color?: color;
  className?: string;
  iconClass?: string;
  onClick?: React.MouseEventHandler | Function;
  Icon?: IconType;
  noIcon?: boolean;
  text?: string;
  type?: string;
  fullWidth?: boolean;
  variant?: any;
  htmlType?: string;
  textClassName?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  tip?: string;
}) {
  let defaultText = '';
  let typeClassName = '';
  switch (type) {
    case 'delete':
      defaultText = 'Xoá';
      color = 'red';
      Icon = HiOutlineTrash;
      tip = tip ? tip : 'Xoá';
      break;
    case 'cancel':
      defaultText = 'Huỷ';
      variant = 'outlined';
      tip = tip ? tip : 'Huỷ';
      break;
    case 'edit':
      defaultText = '';
      Icon = FaPencilAlt;
      color = 'blue';
      // variant = 'text'
      variant = 'outlined';
      tip = tip ? tip : 'Chỉnh sửa';

      break;
    case 'add':
      defaultText = 'Thêm mới';
      Icon = FaPlus;
      color = 'green';
      tip = tip ? tip : 'Thêm mới';

      iconClass = 'mx-2 text-base ';
      typeClassName += 'mx-0 px-2 pr-8';

      break;
    case 'detail':
      defaultText = '';
      Icon = FaEye;
      color = 'brown';
      tip = tip ? tip : 'Chi tiết';

      iconClass = 'mx-2 text-base ';
      variant = 'outlined';

      break;

    case 'chapter':
      defaultText = '';
      Icon = ImBook;
      color = 'orange';
      tip = tip ? tip : 'Quản lý nội dung';

      iconClass = 'mx-2 text-base ';
      variant = 'outlined';

      break;
    case 'auth':
      defaultText = '';
      tip = tip ? tip : 'Phân quyền';

      Icon = BsFillPeopleFill;
      variant = 'outlined';
      break;
    case 'addReviewer':
      defaultText = '';
      tip = tip ? tip : 'Giao người duyệt';
      iconClass = 'text-xl';

      Icon = MdGroupAdd;
      variant = 'outlined';
      break;
    default:
      defaultText = '';
      Icon = Icon ? Icon : FaPlus;
      iconClass = 'mx-2 text-base';

      break;
  }

  return (
    <Tooltip title={!noIcon && tip}>
      <Button
        disabled={disabled}
        fullWidth={fullWidth}
        size={size ? size : `sm`}
        color={color ? color : 'blue'}
        className={` flex flex-row justify-center  items-center ${typeClassName} ${className} ${
          size === 'sm' && 'px-1/2'
        }`}
        onClick={(e) => onClick(e)}
        variant={variant}
        // {...style}
      >
        {!noIcon && <Icon className={`mx-2  text-base ${iconClass}`} />}
        <p className={`font-customFont  font-semibold ${textClassName}`}>
          {text ? text : defaultText}
        </p>
      </Button>
    </Tooltip>
  );

  //className="mx-2 text-base
}
