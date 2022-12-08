import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { ISidebar } from './SidebarData';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import ItemMenu from './ItemMenu';
export default function MenuDropdown({ params }: { params: any }) {
  const [dropDown, setDropDown] = React.useState(false);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <li
        className={`${
          location.pathname === params.path ||
          location.pathname == '/admin/MyProgram'
            ? 'bg-white bg-opacity-25 rounded-lg mx-1'
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
        </div>
        <div id="title" className="flex uppercase w-fit ">
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
        <div className=" flex flex-col mx-2 ml-8  ">
          {params.children.map((item: any) => {
            return <ItemMenu params={item} />;
          })}
        </div>
      )}
    </>
  );
}
