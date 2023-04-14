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
import { useMsal } from '@azure/msal-react';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { actions } from '../../Redux';
import NotificationDropDown from '../sharedComponents/NotificationDropDown';
import { exitPath } from '../../../onBuild';
import { API_URL } from '../../api/api';
export default function () {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const info = useAppSelector((state) => state.auth.info);
  const dispatch = useAppDispatch();
  const logoutAdmin = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: exitPath,
      mainWindowRedirectUri: exitPath,
    });
    notification.success({ message: 'Đăng Xuất Thành Công' });
    dispatch(actions.authActions.logout());
  };

  return (
    <div className="flex items-center justify-center max-w-full mr-2 no-scroll max-sm:max-w-fit">
      <Menu>
        <NotificationDropDown />
        <span className="mr-1 eclipse">
          Xin Chào {info.role == 1 ? null : info?.role?.roleName}{' '}
        </span>
        <span className="eclipse"> {accounts[0].name}</span>
        <MenuHandler>
          <button className="rounded-[12rem] mx-2 bg-white shadow-none hover:shadow-none p-0 ">
            <Avatar
              size="sm"
              src={info.avatar ? `${API_URL}/images/${info.avatar}` : avatar}
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

          <MenuItem className="font-customFont" onClick={() => logoutAdmin()}>
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
