import React, { useEffect, useState } from 'react'
import { IconBase, IconType } from 'react-icons'
import { useNavigate, useNavigation } from 'react-router-dom'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import { Navbar, PopoverContent } from '@material-tailwind/react'

import './index.css'
import { ISidebar, SideBarData } from './SidebarData'
import logo from '../../assets/img/logo.png'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import { useAppDispatch, useAppSelector } from '../../hook/useRedux'
import { actions } from '../../redux'
export default function SideBar({ content }: { content: any }) {
  const navigation = useNavigate()
  const nameMenu = useAppSelector((state: any) =>
    state.form.nameMenu ? state.form.nameMenu : 'Trang Chủ'
  )
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex max-w-full">
        <div className="sidebar flex flex-col content-center items-center">
          <img src={logo} />
          <ul className="list-none w-full text-center">
            {SideBarData.map((value, index) => {
              return (
                <li
                  key={index}
                  className=" cursor-pointer flex max-w-full justify-center text-white h-12 text-center items-center active:bg-white active:text-[#252b42]"
                  onClick={() => {
                    navigation(value.path)
                    dispatch(actions.formActions.setNameMenu(`${value.title}`))
                  }}
                >
                  <div id="icon">
                    <value.icon />
                  </div>{' '}
                  <div id="title" className="flex uppercase">
                    <p className="font-semibold text-sm">{value.title}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="Layout">
          <header className="header">
            <div className="container flex items-center justify-between">
              <AiOutlineAlignLeft />
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
