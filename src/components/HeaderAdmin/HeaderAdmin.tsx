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
import { useMsal } from '@azure/msal-react'
import { IconButton } from '@material-tailwind/react'
export default function () {
  const { instance } = useMsal()
  const logoutAdmin = () => {
    instance.logout({
      postLogoutRedirectUri: '/',
    })
  }
  return (
    <div className="flex items-center justify-center ">
      <Menu>
        <IconButton
          variant="text"
          className="text-black"
          color="gray"
          size="md"
        >
          <IoNotifications className="text-xl" />
        </IconButton>

        <MenuHandler>
          <Button className="bg-white shadow-none hover:shadow-none p-0 ml-4">
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

          <MenuItem className="font-customFont" onClick={() => logoutAdmin()}>
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
