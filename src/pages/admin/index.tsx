import React, { useEffect, useState } from 'react'
import { IconBase, IconType } from 'react-icons'
import { useNavigate, useNavigation } from 'react-router-dom'

import './index.css'
import { ISidebar, SideBarData } from './SidebarData'
import logo from '../../assets/img/logo.png'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import { useAppSelector } from '../../hook/useRedux'
export default function SideBar(/*{
  content,
  menu,
}: {
  menu: ISidebar
  content: any
}*/) {
  const navigation = useNavigate()
  return (
    <>
      <div className="header-sidebar">
        <div className="sidebar flex flex-col content-center items-center">
          <img src={logo} />
          <ul className="list-none w-full text-center">
            {SideBarData.map((value, index) => {
              return (
                <li
                  key={index}
                  className=" cursor-pointer flex max-w-full justify-center text-white h-12 text-center items-center hover:bg-white hover:text-[#252b42]"
                  onClick={() => {
                    navigation(value.path)
                  }}
                >
                  <div id="icon">
                    <value.icon />
                  </div>{' '}
                  <div id="title" className="flex uppercase">
                    <h1>{value.title}</h1>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
