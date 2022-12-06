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
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { actions } from '../../Redux';
export default function () {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const info = useAppSelector((state) => state.auth.info);
  const dispatch = useAppDispatch();
  const logoutAdmin = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/',
    });
    notification.success({ message: 'Đăng Xuất Thành Công' });
    dispatch(actions.authActions.logout());
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
        <span className="mr-4">
          {' '}
          Xin Chào {info.role == 1 ? null : info.role.roleName}{' '}
        </span>
        <span> {accounts[0].name?.slice(12, 29)}</span>
        <MenuHandler>
          <button className="rounded-[12rem] mx-2 bg-white shadow-none hover:shadow-none p-0 ">
            <Avatar size="sm" src={avatar} alt="avatar" variant="circular" />
          </button>
        </MenuHandler>
        <MenuList>
          <MenuItem className="font-customFont">Trang Cá Nhân</MenuItem>

          <MenuItem className="font-customFont" onClick={() => logoutAdmin()}>
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
