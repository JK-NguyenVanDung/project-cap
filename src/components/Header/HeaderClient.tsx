import React from 'react';
import { Avatar } from '@material-tailwind/react';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import avatar from '../../assets/img/default.png';
import Color from '../constant/Color';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useMsal } from '@azure/msal-react';
import { IconButton } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { actions } from '../../Redux';
import { AiOutlineHeart } from 'react-icons/ai';
export default function () {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
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
    <div className="flex items-center justify-center max-w-full mr-2 max-sm:mr-0 max-sm:justify-center  max-sm:w-fit">
      <Menu>
        <IconButton
          variant="text"
          className="text-dark-blue"
          color="gray"
          size="md"
        >
          <AiOutlineHeart className="text-xl " />
        </IconButton>

        <IconButton
          variant="text"
          className="text-dark-blue"
          color="gray"
          size="md"
        >
          <IoNotificationsOutline className="text-xl" />
        </IconButton>
        <span className="mr-1 max-sm:text-xs max-sm:w-[30%] ">
          Xin Chào{' '}
          {accounts[0].name?.split(' - ') && accounts[0].name?.split(' - ')[1]}
        </span>

        <MenuHandler>
          <button className="rounded-[12rem] mx-2 bg-white shadow-none hover:shadow-none p-0  ">
            <Avatar size="sm" src={avatar} alt="avatar" variant="circular" />
          </button>
        </MenuHandler>
        <MenuList>
          <MenuItem
            onClick={() => navigate('/Badge')}
            className="font-customFont"
          >
            Trang Cá Nhân
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/historyRedeem')}
            className="font-customFont"
          >
            Lịch Sử Nhận Quà
          </MenuItem>
          <MenuItem className="font-customFont" onClick={() => logoutAdmin()}>
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
