import React, { useEffect, useRef, useState } from 'react';
import { IconBase, IconType } from 'react-icons';
import { useNavigate, useNavigation, useLocation } from 'react-router-dom';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { Navbar, PopoverContent } from '@material-tailwind/react';
import { Breadcrumbs } from '@material-tailwind/react';
import './index.css';
import {
  ISidebar,
  SideBarData,
  SideBarDataCT,
  SideBarDataFacul,
} from './SidebarData';
import logo from '../../assets/logo.svg';
import MenuBackground from '../../assets/img/menu-bg.png';
import HeaderAdmin from '../../components/Header/HeaderAdmin';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authentication/loginconfig';
import ItemMenu from './ItemMenu';
import MenuDropdown from './MenuDropdown';
import { IoLogOut } from 'react-icons/io5';
import { notification } from 'antd';

export default function SideBar({
  content,
  noHeader,
}: {
  content: any;
  noHeader?: boolean;
}) {
  let location = useLocation();
  const navigation = useNavigate();
  const nameMenu = useAppSelector((state: any) =>
    state.form.nameMenu ? state.form.nameMenu : 'Trang Chủ',
  );
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();

  const logoutAdmin = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/',
    });
    notification.success({ message: 'Đăng Xuất Thành Công' });
    dispatch(actions.authActions.logout());
  };
  const info = useAppSelector((state) => state.auth.info);
  useEffect(() => {
    let temp = SideBarData.filter(
      (item: ISidebar) => item.path === location.pathname,
    )[0]?.title;
    temp &&
      dispatch(
        actions.formActions.setNameMenu(
          `${
            temp == 'Trang Chủ' || temp == 'Dashboard'
              ? temp
              : 'Quản Lý ' + temp
          }`,
        ),
      );
  }, []);

  return (
    <>
      <div className="flex relative max-w-full h-screen">
        <div className="fixed w-[79%] z-[1] ">
          <div
            className="z-0  overflow-hidden bg-img-bar relative sidebar flex flex-col content-center items-center w-1/5"
            style={{
              backgroundImage: `url(${MenuBackground})`,
            }}
          >
            <div className=" absolute w-full h-full opacity-70 bg-dark-red	" />
            <a
              onClick={() => {
                navigation('/admin');
                dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
              }}
              className=" hover:text-white relative my-2  px-2 w-full flex flex-row items-center justify-center"
            >
              <img className="w-1/5 h-fit mb-2" src={logo} />
              <p className="text-lg text-center mb-2 mx-2"> VLG TRAINING</p>
            </a>
            <ul className="relative list-none w-full text-center">
              {info?.roleId == 2
                ? SideBarData.map((value, index) => {
                    return (
                      <div key={index}>
                        {value.children ? (
                          <MenuDropdown params={value} />
                        ) : (
                          <ItemMenu params={value} />
                        )}
                      </div>
                    );
                  })
                : null}
              {info?.roleId == 3
                ? SideBarDataCT.map((value, index) => {
                    return (
                      <div key={index}>
                        {value.children ? (
                          <MenuDropdown params={value} />
                        ) : (
                          <ItemMenu params={value} />
                        )}
                      </div>
                    );
                  })
                : null}
              {info?.roleId == 4
                ? SideBarDataFacul.map((value, index) => {
                    return (
                      <div key={index}>
                        {value.children ? (
                          <MenuDropdown params={value} />
                        ) : (
                          <ItemMenu params={value} />
                        )}
                      </div>
                    );
                  })
                : null}
              <>
                <li
                  className={`ml-2 py-4 my-0 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
                  onClick={() => logoutAdmin()}
                >
                  <div id="icon">
                    <IoLogOut />
                  </div>{' '}
                  <div id="title" className="flex  ">
                    <p className={`font-semibold `}>Đăng xuất</p>
                  </div>
                </li>
              </>
            </ul>
          </div>
        </div>
        <div
          className={`${!noHeader ? 'z-[2]' : 'z-[0]'} Layout${
            !noHeader ? ' ml-[16.1%]' : 'ml-[10%] '
          } w-full  `}
        >
          {!noHeader && (
            <header className="header bg-gray-50 px-4 shadow-md-2">
              <div className="w-full flex items-center justify-between ">
                <h1 className="font-semibold text-xl">{nameMenu}</h1>

                <HeaderAdmin />
              </div>
            </header>
          )}
          <main className={!noHeader && 'mx-4'}>{content}</main>
        </div>
      </div>
    </>
  );
}
