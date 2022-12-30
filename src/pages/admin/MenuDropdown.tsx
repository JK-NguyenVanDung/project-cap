import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { ISidebar } from './SidebarData';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import ItemMenu from './ItemMenu';
export default function MenuDropdown({ params }: { params: any }) {
  const [dropDown, setDropDown] = React.useState(false);
  const navigation = useNavigate();
  let location = useLocation();

  const dispatch = useAppDispatch();
  return (
    <>
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
        }hover:bg-white hover:text-white py-4 my-1 mx-1 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
        onClick={() => {
          navigation(params.path);
          setDropDown(!dropDown);

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
        </div>
        <div id="title" className="flex uppercase w-full  justify-between pr-4">
          <p className="font-semibold text-sm">{params.title}</p>
          <MdOutlineKeyboardArrowDown
            className="text-xl ml-6"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
        </div>
      </li>
      {dropDown && (
        <div className="  ml-6  ">
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
    </>
  );
}
