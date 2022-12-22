import React, { useEffect, useState } from 'react';
import { IconBase, IconType } from 'react-icons';
import { useNavigate, useNavigation, useLocation } from 'react-router-dom';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { Navbar, PopoverContent } from '@material-tailwind/react';
import { Breadcrumbs } from '@material-tailwind/react';
import '../admin/index.css';
import { ISidebar, SideBarData } from './SidebarData';
import logo from '../../assets/logo.svg';
import MenuBackground from '../../assets/img/menu-bg.jpeg';
import HeaderClient from '../../components/Header/HeaderClient';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authentication/loginconfig';
import ItemMenu from './ItemMenu';
import SearchBar from '../../components/admin/ToolBar/ToolBar';
import { BsFilter } from 'react-icons/bs';
// import MenuDropdown from './MenuDropdown';
export default function ClientSideBar({ content }: { content: any }) {
  let location = useLocation();
  const navigation = useNavigate();
  const nameMenu = useAppSelector((state: any) =>
    state.form.nameMenu ? state.form.nameMenu : 'Trang Chủ',
  );
  const { instance, accounts } = useMsal();

  const info = useAppSelector((state) => state.auth.info);
  useEffect(() => {
    let temp = SideBarData.filter(
      (item: ISidebar) => item.path === location.pathname,
    )[0]?.title;
    temp &&
      dispatch(
        actions.formActions.setNameMenu(
          `${
            temp == 'Trang Chủ'
              ? `Xin Chào \n
               ${accounts[0].name.split('-')[1]}`
              : temp
          }`,
        ),
      );
  }, []);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex relative max-w-full h-screen text-black">
        <div className="fixed w-[80%] z-1 ">
          <div className="z-0  overflow-hidden bg-white relative sidebar flex flex-col content-center items-center w-1/5">
            <a
              onClick={() => {
                navigation('/home');
                dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
              }}
              className=" hover:text-black relative my-2  px-2 w-full flex flex-row items-center justify-center"
            >
              <img className="w-1/5 h-fit mb-2" src={logo} />
              <p className="text-lg font-bold text-center mb-2 mx-2">
                VLG TRAINING
              </p>
            </a>
            <ul className="relative list-none w-full text-center">
              {SideBarData.map((value, index) => {
                return (
                  <div key={index}>
                    {/* {value.children ? (
                          <MenuDropdown params={value} />
                        ) : ( */}
                    <ItemMenu params={value} />
                    {/* )} */}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="z-[2]  ml-[16%] w-full  ">
          <header className="header bg-white px-4 ">
            <div className="container flex items-center justify-between ">
              <h1 className="font-semibold text-xl">{nameMenu}</h1>
              <HeaderClient />
            </div>
          </header>

          <main className="min-h-screen bg-gray-50">{content}</main>
        </div>
      </div>
    </>
  );
}
