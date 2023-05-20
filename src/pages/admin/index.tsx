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
import { exitPath } from '../../../onBuild';
import { useWindowSize } from '../../utils/uinqueId';
import Loading from '../../components/sharedComponents/Loading';

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
      postLogoutRedirectUri: exitPath,
      mainWindowRedirectUri: exitPath,
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
  const windowDimensions = useWindowSize();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (windowDimensions.width >= 767) {
      setOpen(true);
    }
  }, [windowDimensions.width]);
  return (
    <>
      <div className="flex relative max-w-full h-screen ">
        <div
          className={`fixed h-full  w-[74%] z-[1] ${
            open || noHeader ? 'max-sm:z-[100]' : 'max-sm:z-0'
          }        ${open || noHeader ? '' : 'hidden'} `}
        >
          <div
            // className="z-0 overflow-hidden no-scroll bg-img-bar h-full relative sidebar flex flex-col content-center items-center w-[25%]"
            className="z-0 max-sm:z-100   overflow-hidden no-scroll  bg-img-bar bg-white relative sidebar flex flex-col content-center items-center w-[25%] max-sm:w-full"
            style={{
              backgroundImage: `url(${MenuBackground})`,
              overflowY: 'scroll',
            }}
          >
            <div className=" absolute w-full min-h-[120vh]  opacity-70 bg-dark-red	">
              <a
                onClick={() => {
                  navigation('/admin');
                  dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
                }}
                className=" hover:text-white relative my-2  px-2 w-full flex flex-row items-center justify-center"
              >
                <img
                  className={`w-[15%] h-fit mb-2  max-sm:w-[10%]  ${
                    open || noHeader ? 'max-sm:visible ' : 'max-sm:hidden'
                  }`}
                  src={logo}
                />{' '}
                <p
                  className={`${
                    open || noHeader ? '' : 'hidden'
                  }] text-lg font-bold text-center mb-2 mx-2`}
                >
                  L&D VLG TRAINING
                </p>
              </a>
              <div
                className={`menu  md:order-1 w-full  ${
                  open || noHeader ? '' : 'hidden'
                }`}
                id="navbar-default"
              >
                <ul className="relative list-none w-full text-center ">
                  {info?.roleId == 2
                    ? SideBarData.map((value, index) => {
                        return (
                          <div key={index}>
                            {value.children ? (
                              <MenuDropdown
                                params={value}
                                closeMenu={() =>
                                  windowDimensions.width <= 767
                                    ? setOpen(false)
                                    : {}
                                }
                              />
                            ) : (
                              <ItemMenu
                                params={value}
                                closeMenu={() =>
                                  windowDimensions.width <= 767
                                    ? setOpen(false)
                                    : {}
                                }
                              />
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
                              <MenuDropdown
                                params={value}
                                closeMenu={() =>
                                  windowDimensions.width <= 767
                                    ? setOpen(false)
                                    : {}
                                }
                              />
                            ) : (
                              <ItemMenu
                                params={value}
                                closeMenu={() =>
                                  windowDimensions.width <= 767
                                    ? setOpen(false)
                                    : {}
                                }
                              />
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
                              <MenuDropdown
                                params={value}
                                closeMenu={() =>
                                  windowDimensions.width <= 767
                                    ? setOpen(false)
                                    : {}
                                }
                              />
                            ) : (
                              <ItemMenu
                                params={value}
                                closeMenu={() =>
                                  windowDimensions.width <= 767
                                    ? setOpen(false)
                                    : {}
                                }
                              />
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
          </div>
        </div>
        <React.Suspense fallback={<Loading loading={true} />}>
          <div
            className={`${!noHeader ? 'z-[2]' : 'z-[0]'} Layout ${
              !noHeader && open ? ' ml-[18.6%]' : !open ? 'ml-0 ' : 'ml-[10%] '
            }  w-full  bg-gray-50`}
          >
            {!noHeader && (
              <header className="header bg-gray-50 px-4 shadow-md-2">
                <div className="w-full flex items-center justify-between ">
                  <button
                    data-collapse-toggle="navbar-cta"
                    type="button"
                    className="mr-1 max-md:inline-flex max-sm:inline-flex z-[120] items-center  text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                  <h1 className="font-semibold text-xl eclipse max-sm:text-sm max-sm:text-sm">
                    {nameMenu}
                  </h1>

                  <HeaderAdmin />
                </div>
              </header>
            )}
            <main
              className="min-h-screen bg-gray-50 max-sm:max-md:overflow-x-scroll "
              onClick={() =>
                windowDimensions.width <= 767 ? setOpen(false) : {}
              }
            >
              {content}
            </main>
          </div>
        </React.Suspense>
      </div>
    </>
  );
}
