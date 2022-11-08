import React from 'react'
import { Avatar } from '@material-tailwind/react'
import { BsBellFill } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react'

import avatar from '../../assets/img/test.jpg'
import Color from '../constant/Color'
export default function () {
  return (
    <div className="flex items-center justify-center ">
      <Menu>
        <BsBellFill />

        <MenuHandler>
          <Button className="bg-white shadow-none hover:shadow-none p-0 ">
            <Avatar
              className="mx-2"
              size="sm"
              src={avatar}
              alt="avatar"
              variant="circular"
            />
            <span className="text-black">Admin</span>
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>Đăng Xuất</MenuItem>
          <MenuItem>Trang Cá Nhân</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
