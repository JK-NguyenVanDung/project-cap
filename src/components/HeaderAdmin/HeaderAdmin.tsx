import React from 'react'
import { Avatar } from '@material-tailwind/react'

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react'
import avatar from '../../assets/img/test.jpg'
import Color from '../constant/Color'
import { IoNotifications } from 'react-icons/io5'
import { IconButton } from '@material-tailwind/react'
export default function () {
  return (
    <div className="flex items-center justify-center mr-2 ">
      <Menu>
        <IconButton
          variant="text"
          className="text-dark-blue"
          color="gray"
          size="md"
        >
          <IoNotifications className="text-xl" />
        </IconButton>

        <MenuHandler>
          <Button className="bg-white shadow-none hover:shadow-none p-0 ">
            <Avatar
              className="mx-2"
              size="sm"
              src={avatar}
              alt="avatar"
              variant="circular"
            />
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem className="font-customFont">Trang Cá Nhân</MenuItem>

          <MenuItem className="font-customFont">Đăng Xuất</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
