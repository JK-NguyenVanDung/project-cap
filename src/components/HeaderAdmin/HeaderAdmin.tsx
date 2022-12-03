import React from 'react';
import { Avatar } from '@material-tailwind/react';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import avatar from '../../assets/img/test.jpg';
import Color from '../constant/Color';
import { IoNotifications } from 'react-icons/io5';
import { useMsal } from '@azure/msal-react';
import { IconButton } from '@material-tailwind/react';
import { useAppSelector } from '../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
export default function () {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const info = useAppSelector((state) => state.auth.info);
  console.log(info);

  const logoutAdmin = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/',
    });
  };
  return (
    <div className="flex items-center justify-center max-w-full mr-2 ">
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
          <button className="rounded-[12rem] mx-2 bg-white shadow-none hover:shadow-none p-0 ">
            <Avatar size="sm" src={avatar} alt="avatar" variant="circular" />
          </button>
        </MenuHandler>
        <MenuList>
          <MenuItem disabled className="font-customFont">
            Xin Chào {info.role.roleName}
            <br />
            <br />
            {accounts[0].name?.slice(12, 29)}
          </MenuItem>

          <MenuItem className="font-customFont">Trang Cá Nhân</MenuItem>

          <MenuItem className="font-customFont" onClick={() => logoutAdmin()}>
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
