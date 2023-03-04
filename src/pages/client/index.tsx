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
// import MenuDropdown from './MenuDropdown';

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
export default function ClientSideBar({ content }: { content: any }) {
  let location = useLocation();
  const navigation = useNavigate();
  const nameMenu = useAppSelector((state: any) =>
    state.form.nameMenu ? state.form.nameMenu : 'Trang Chủ',
  );
  const { instance, accounts } = useMsal();
  const [open, setOpen] = useState(true);
  const windowDimensions = useWindowSize();
  const logoutUser = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/',
    });
    notification.success({ message: 'Đăng Xuất Thành Công' });
    dispatch(actions.authActions.logout());
  };
  const info = useAppSelector((state) => state.auth.info);
  useEffect(() => {
    if (windowDimensions.width >= 768) {
      setOpen(true);
    }
  }, [windowDimensions]);
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
               ${accounts[0]?.name.split('-')[1]}`
              : temp
          }`,
        ),
      );
  }, []);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex relative max-w-full h-screen text-black">
        <div
          className={`fixed  w-[80%] z-1 ${
            open ? 'max-sm:z-[100]' : 'max-sm:z-0'
          }`}
        >
          <div className="z-0 max-sm:z-100  overflow-hidden bg-white relative sidebar flex flex-col content-center items-center w-1/5 max-sm:w-full">
            <a
              onClick={() => {
                navigation('/home');
                dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
              }}
              className=" hover:text-black relative my-2  max-sm:mt-4  px-2 w-full flex flex-row items-center justify-center"
            >
              <img className="w-1/6 h-fit mb-2  max-sm:w-[10%] " src={logo} />
              <p className="text-lg font-bold text-center mb-2 mx-2">
                VLG TRAINING
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
                          windowDimensions.width < 768 ? setOpen(false) : {}
                        }
                      />
                      {/* )} */}
                    </div>
                  );
                })}
                <li
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
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="z-[2]  ml-[16%] max-sm:ml-0 w-full  ">
          <header className="header bg-white px-4 ">
            <div className="w-full flex items-center justify-between ">
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="max-sm:inline-flex z-[120] items-center  text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <h1 className="font-semibold text-xl max-sm:text-base max-sm:pl-4">
                {nameMenu}
              </h1>
              <HeaderClient />
            </div>
          </header>

          <main
            className="min-h-screen bg-gray-50 "
            onClick={() => (windowDimensions.width < 768 ? setOpen(false) : {})}
          >
            {content}
          </main>
        </div>
      </div>
    </>
  );
}
