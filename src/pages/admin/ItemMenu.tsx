import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { ISidebar } from './SidebarData';

export default function ItemMenu({ params }: { params: any }) {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <li
        className={`${
          location.pathname === params.path
            ? 'bg-white bg-opacity-25 rounded-lg mx-1 '
            : ''
        }${
          location.pathname === params.path ? ' text-primary' : 'text-primary'
        }hover:bg-white hover:text-white py-4 my-2 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
        onClick={() => {
          navigation(params.path);
          dispatch(
            actions.formActions.setNameMenu(
              `${
                params.title == 'Trang Chủ'
                  ? params.title
                  : 'Quản Lý ' + params.title
              }`,
            ),
          );
        }}
      >
        <div id="icon">
          <params.icon className="ml-2 text-md " />
        </div>{' '}
        <div id="title" className="flex uppercase ">
          <p className="font-semibold text-sm">{params.title}</p>
        </div>
      </li>
    </>
  );
}