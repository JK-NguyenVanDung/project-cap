import React, { useEffect, useState } from 'react'
import { IconBase, IconType } from 'react-icons'
import { useNavigate, useNavigation, useLocation } from 'react-router-dom'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import { Navbar, PopoverContent } from '@material-tailwind/react'
import { Breadcrumbs } from '@material-tailwind/react'
import './index.css'
import { ISidebar, SideBarData } from './SidebarData'
import logo from '../../assets/logo.svg'
import MenuBackground from '../../assets/img/menu-bg.jpeg'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import { useAppDispatch, useAppSelector } from '../../hook/useRedux'
import { actions } from '../../Redux'
export default function SideBar({ content }: { content: any }) {
  let location = useLocation()
  const navigation = useNavigate()
  const nameMenu = useAppSelector((state: any) =>
    state.form.nameMenu ? state.form.nameMenu : 'Trang Chủ'
  )
  useEffect(() => {
    let temp = SideBarData.filter(
      (item: ISidebar) => item.path === location.pathname
    )[0].title
    dispatch(actions.formActions.setNameMenu(`${temp}`))
  }, [])
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex max-w-full h-screen">
        <div
          className="bg-img-bar relative sidebar flex flex-col content-center items-center w-1/5"
          style={{
            backgroundImage: `url(${MenuBackground})`,
          }}
        >
          <div className=" absolute w-full h-full opacity-60 bg-dark-blue	" />

          <a
            onClick={() => {
              navigation('/admin')
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`))
            }}
            className=" hover:text-white relative my-4  px-3 w-full flex flex-col items-center"
          >
            <img className="w-1/3" src={logo} />
            <p className="text-xl ">TRANG QUẢN LÝ</p>
            <p className="text-xl"> VĂN LANG TRAINING</p>
          </a>
          <ul className="relative list-none w-full text-center">
            {SideBarData.map((value, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    location.pathname === value.path
                      ? 'bg-white bg-opacity-25 rounded-lg mx-1 '
                      : ''
                  }${
                    location.pathname === value.path
                      ? ' text-primary'
                      : 'text-primary'
                  }hover:bg-white hover:text-white py-4 my-2 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
                  onClick={() => {
                    navigation(value.path)
                    dispatch(actions.formActions.setNameMenu(`${value.title}`))
                  }}
                >
                  <div id="icon">
                    <value.icon className="text-md" />
                  </div>{' '}
                  <div id="title" className="flex uppercase">
                    <p className="font-semibold text-sm">{value.title}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="Layout w-full mx-4 ">
          <header className="header">
            <div className="container flex items-center justify-between ">
              <h1 className="font-semibold text-xl">{nameMenu}</h1>
              <HeaderAdmin />
            </div>
          </header>
          <main>{content}</main>
        </div>
      </div>
    </>
  )
}
