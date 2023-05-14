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
import { notification } from 'antd';
import { IoLogOut } from 'react-icons/io5';
import SmallTopLearners from '../../components/Statistic/SmallTopLearners';
import { useWindowSize } from '../../utils/uinqueId';
// import MenuDropdown from './MenuDropdown';

// Hook

export default function ClientSideBar({ content }: { content: any }) {
  let location = useLocation();
  const navigation = useNavigate();
  const nameMenu = useAppSelector((state: any) =>
    state.form.nameMenu ? state.form.nameMenu : 'Trang Chủ',
  );
  const { instance, accounts } = useMsal();
  const [open, setOpen] = useState(true);
  const windowDimensions = useWindowSize();

  const info = useAppSelector((state) => state.auth.info);
  useEffect(() => {
    if (windowDimensions.width >= 767) {
      setOpen(true);
    }
  }, [windowDimensions.width]);
  useEffect(() => {
    let temp = SideBarData.filter(
      (item: ISidebar) => item.path === location.pathname,
    )[0]?.title;
    temp &&
      dispatch(
        actions.formActions.setNameMenu(
          `${
            temp == 'Trang Chủ'
              ? '© 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang'
              : temp
          }`,
        ),
      );
  }, []);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex relative max-w-full h-screen text-black ">
        <div
          className={`fixed  w-[80%] z-1 ${
            open ? 'max-sm:z-[100]' : 'max-sm:z-0'
          }        ${open === true ? '' : 'hidden'}`}
        >
          <div className="z-0 max-sm:z-100  overflow-hidden bg-white relative sidebar flex flex-col content-center items-center w-1/5 max-sm:w-full">
            <a
              onClick={() => {
                navigation('/home');
                dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
              }}
              className=" hover:text-black relative my-2  max-sm:mt-4  px-2 w-full flex flex-row items-center justify-center"
            >
              <img
                className={`w-[15%] h-fit mb-2  max-sm:w-[10%]  ${
                  open ? 'max-sm:visible ' : 'max-sm:hidden'
                }`}
                src={logo}
              />
              <p
                className={`${
                  open === true ? '' : 'hidden'
                }] text-lg font-bold text-center mb-2 mx-2`}
              >
                L&D VLG TRAINING
              </p>
            </a>

            <div
              className={`menu  md:order-1 w-full  ${
                open === true ? '' : 'hidden'
              }`}
              id="navbar-default"
            >
              <ul className="relative list-none w-full text-center ">
                {SideBarData.map((value, index) => {
                  return (
                    <div key={index}>
                      {/* {value.children ? (
                          <MenuDropdown params={value} />
                        ) : ( */}
                      <ItemMenu
                        params={value}
                        closeMenu={() =>
                          windowDimensions.width <= 767 ? setOpen(false) : {}
                        }
                      />
                      {/* )} */}
                    </div>
                  );
                })}
                {/* <li
                  className={`
          ml-4
         rounded-lg mx-2 text-light-purple
       hover:bg-primary hover:opacity-40 hover:text-white py-4 my-2 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
                  onClick={() => logoutUser()}
                >
                  <div id="icon">
                    <IoLogOut />
                  </div>{' '}
                  <div id="title" className="flex  ">
                    <p className={`font-semibold `}>Đăng xuất</p>
                  </div>
                </li> */}
              </ul>
              <div className="mt-4  px-4	">
                <SmallTopLearners />
              </div>
            </div>
          </div>
        </div>
        <div className="z-[2]  ml-[16%] max-sm:ml-0 max-md:ml-0 w-full  ">
          <header className="header bg-white px-4 ">
            <div className="w-full  flex items-center justify-between  max-w-[80vw] max-sm:max-w-[100vw] max-md:max-w-[100vw]">
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="max-md:inline-flex max-sm:inline-flex z-[120] items-center  text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded="false"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <h1 className="w-fit mr-4 font-semibold text-xl max-sm:text-sm max-sm:pl-4 max-sm:max-w-[30%] eclipse-text">
                {nameMenu}
              </h1>
              <HeaderClient />
            </div>
          </header>

          <main
            className="min-h-screen bg-gray-50 "
            onClick={() =>
              windowDimensions.width <= 767 ? setOpen(false) : {}
            }
          >
            {content}
          </main>
        </div>
      </div>
    </>
  );
}
