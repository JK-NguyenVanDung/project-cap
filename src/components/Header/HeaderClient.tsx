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
import { exitPath } from '../../onBuild';
import { API_URL } from '../../api/api';
import NotificationDropDown from '../sharedComponents/NotificationDropDown';
export default function () {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutAdmin = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: exitPath,
      mainWindowRedirectUri: exitPath,
    });
    notification.success({ message: 'Đăng Xuất Thành Công' });
    dispatch(actions.authActions.logout());
  };
  const info = useAppSelector((state) => state.auth.info);
  function navIsLike() {
    dispatch(actions.navActions.setIsLike(true));
    navigate('/Programs/Like');
  }
  return (
    <div className="flex items-center justify-center max-w-full mr-2 max-sm:mr-0 max-sm:justify-center  max-sm:w-fit max-md:mr-0 max-md:justify-center  max-md:w-fit ">
      <Menu>
        <IconButton
          variant="text"
          className="text-dark-blue"
          color="gray"
          size="md"
          onClick={() => navIsLike()}
        >
          <AiOutlineHeart className="text-xl " />
        </IconButton>

        <div className="mx-4">
          <NotificationDropDown />
        </div>
        <span className="mr-1 max-sm:text-xs max-sm:w-[30%] w-fit text-black ">
          Xin Chào{' '}
          {accounts[0].name?.split(' - ') && accounts[0].name?.split(' - ')[1]}
        </span>

        <MenuHandler>
          <button className="rounded-[12rem] mx-2 bg-white shadow-none hover:shadow-none p-0  ">
            <Avatar
              size="sm"
              src={info?.avatar ? `${API_URL}/images/${info.avatar}` : avatar}
              alt="avatar"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = avatar;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
              }}
              variant="circular"
            />
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
