import React, { MouseEvent, MouseEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { ISidebar } from './SidebarData';

export default function ItemMenu({
  params,
  closeMenu,
}: {
  params: any;
  closeMenu?: Function;
}) {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  let location = useLocation();

  return (
    <>
      <li
        className={`${
          location.pathname.includes(params.path)
            ? 'bg-primary rounded-lg mx-2 '
            : ' rounded-lg mx-2 '
        }${
          location.pathname.includes(params.path)
            ? ' text-white'
            : 'text-light-purple'
        } hover:bg-primary hover:opacity-40 hover:text-white py-4 my-2 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
        onClick={() => {
          navigation(params.path);
          dispatch(
            actions.formActions.setNameMenu(
              `${
                params.title == 'Trang Chủ'
                  ? '© 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang'
                  : params.headTitle &&
                    params.headTitle.includes('Chương Trình')
                  ? params.headTitle
                  : params.title
              }`,
            ),
          );
          closeMenu ? closeMenu() : null;
        }}
      >
        <div id="icon">
          <params.icon className="ml-2 text-md " />
        </div>{' '}
        <div id="title" className="flex  ">
          <p
            className={`font-semibold ${
              params.textClassName ? params.textClassName : 'text-sm uppercase'
            }`}
          >
            {params.title}
          </p>
        </div>
      </li>
    </>
  );
}
