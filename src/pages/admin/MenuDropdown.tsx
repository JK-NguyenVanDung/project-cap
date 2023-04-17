import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { notification } from 'antd';
import { ISidebar } from './SidebarData';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import ItemMenu from './ItemMenu';
import autoAnimate from '@formkit/auto-animate';

export default function MenuDropdown({
  params,
  closeMenu,
}: {
  params: any;
  closeMenu?: Function;
}) {
  const [dropDown, setDropDown] = React.useState(false);
  const [close, setClose] = React.useState(false);

  const navigation = useNavigate();
  let location = useLocation();
  const dispatch = useAppDispatch();

  const parent = useRef(null);
  useEffect(() => {
    location.pathname.includes(params.path) ||
    params.children.find((item: any) => location.pathname.includes(item.path))
      ? {}
      : setDropDown(false);
  }, [location]);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  return (
    <div ref={parent}>
      <li
        className={`${
          location.pathname.includes(params.path) ||
          params.children.find((item: any) =>
            location.pathname.includes(item.path),
          )
            ? 'bg-white bg-opacity-25 rounded-lg '
            : ''
        }${
          location.pathname.includes(params.path)
            ? ' text-primary'
            : 'text-primary'
        }hover:bg-white hover:text-white dropdown-label py-4 my-1 mx-1 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
        onClick={() => {
          navigation(params.path);
          setClose(!dropDown);

          setDropDown(!dropDown);

          dispatch(
            actions.formActions.setNameMenu(
              `${
                params.title == 'Trang Chủ' || params.title == 'Dashboard'
                  ? params.title
                  : 'Quản Lý ' + params.title
              }`,
            ),
          );
          closeMenu ? closeMenu() : null;
        }}
      >
        <div id="icon">
          <params.icon className="ml-2 text-md max-sm:ml-[3px]  max-md:ml-[3px] max-sm:text-sm  max-md:text-sm " />
        </div>
        <div id="title" className="flex uppercase w-full  justify-between pr-4">
          <p className="font-semibold text-sm">{params.title}</p>
          <MdOutlineKeyboardArrowDown
            className="text-xl ml-6  max-sm:ml-[3px]  max-md:ml-[3px]"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
        </div>
      </li>
      {dropDown && (
        <div className="  ml-6 dropdown-content max-sm:ml-[3px]  max-md:ml-[3px]  max-sm:mb-2  max-md:mb-2">
          {params.children.map((item: any) => {
            return (
              <ItemMenu
                params={{
                  ...item,
                  textClassName: 'text-xm ',
                  headTitle: params.title,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
