import React, { useCallback } from 'react'

import { CiLock } from 'react-icons/ci'

import Logo from '../../assets/img/logoVLU.png'
import './index.css'
import Input from '../../components/sharedComponents/Input'

const DataLogin = [
  {
    id: '1',
    title: 'Người Học',
    Logo: Logo,
    description: 'Đăng Nhập Với Tại Khoản VLU',
  },
  {
    id: '2',
    title: 'Trung Tâm',
    Logo: Logo,
    description: 'Đăng Nhập Với Tại Khoản VLU',
  },
  {
    id: '3',
    title: 'Tài Khoản Khác',
    Logo: Logo,
    description: 'Đăng Nhập Với Tại Khoản VLU',
  },
]
export default function Login() {
  const submit = () => {
    console.log('login')
  }
  return (
    <div className="bg-slate-500 ">
      <main className="fixed w-full h-full top-0 place-content-center items-center flex flex-col bg-[#252b42]">
        <h1 className="text-white font-bold text-5xl mb-20">Đăng Nhập</h1>
        <div className="flex justify-center ">
          {DataLogin.map((item, index) => {
            return (
              <div
                key={index}
                className="w-1/4 bg-white flex flex-col items-center m-4 p-3 py-12 rounded-lg"
              >
                <div className="w-1/5 mb-4">
                  <img src={item.Logo} />
                </div>
                <h2 className="text-blue-gray-900 font-normal text-2xl uppercase my-2">
                  {item.title}
                </h2>
                <p className="text-blue-gray-900">{item.description}</p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
