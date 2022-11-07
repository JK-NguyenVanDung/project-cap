import React, { useEffect, useState, FC } from 'react'
import { Button } from '@material-tailwind/react'
import {
  IoEllipsisVertical,
  IoTrashOutline,
  IoHammerOutline,
  IoSearch,
  IoAddOutline,
} from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import { color, size } from '@material-tailwind/react/types/components/button'
interface CustomButton {
  size?: size
  color?: color
  className?: string
  onClick?: FC | Function
  Icon?: IconType
  noIcon?: boolean
  text?: string
  type?: string
  fullWidth?: boolean
}
export default function CustomButton(props: CustomButton) {
  let text = ''
  let color = props.color
  let Icon = props.Icon
  let variant: any
  let iconClass

  switch (props.type) {
    case 'delete':
      text = 'Xoá'
      color = 'red'
      Icon = IoTrashOutline
      break
    case 'cancel':
      text = 'Huỷ'
      color = 'red'
      variant = 'outlined'
      break
    case 'edit':
      text = 'Sửa'
      Icon = IoHammerOutline
      break
    default:
      text = 'Thêm'
      Icon = IoAddOutline
      iconClass = 'mx-2 text-base  bg-white text-blue-500 rounded'
      break
  }

  return (
    <Button
      fullWidth={props.fullWidth}
      size={props.size ? props.size : `sm`}
      color={props.color ? props.color : color}
      className={` flex flex-row justify-center items-center ${props.className}`}
      onClick={(e) => props.onClick(e)}
      variant={variant}
    >
      {!props.noIcon && <Icon className={`mx-2 text-base ${iconClass}`} />}
      <p className="font-serif  font-semibold">
        {props.text ? props.text : text}
      </p>
    </Button>
  )

  //className="mx-2 text-base
}
