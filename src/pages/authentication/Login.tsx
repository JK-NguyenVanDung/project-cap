import { Button, Input } from '@material-tailwind/react'
import React, { useCallback } from 'react'
import { loadFull } from 'tsparticles'

import { CiLock } from 'react-icons/ci'
import { FiMail } from 'react-icons/fi'
import loginwith365 from '../../assets/img/loginwith365.png'
import logintecher from '../../assets/img/logintecher.png'
import imgLogin from '../../assets/img/imglogin.png'
import logonotext from '../../assets/img/logoNotext.png'
import './index.css'
import Particle from '../../components/Particles/Particle'
export default function Login() {
  const submit = () => {
    console.log('login')
  }
  return (
    <div className="bg-slate-500 ">
      <main className="fixed w-full h-full top-0 place-content-center items-center flex bg-[#252b42]">
        <div className="h-3/4 lg-max:hidden">
          <img src={imgLogin} />
        </div>
        <form className="h-3/4 w-1/4 flex flex-col bg-slate-50 bg-white items-center rounded-r-3xl lg-max:rounded-3xl justify-center">
          <img src={logonotext} className="w-1/4 h-1/6" />
          <h1 className="text-2xl font-semibold">Đăng Nhập</h1>
          <div className="w-5/6 my-4 mt-7">
            <div className="w-full flex flex-col items-start  mb-6">
              <Input type={'email'} icon={<FiMail />} label="email" />
            </div>
            <div className="w-full flex flex-col items-start  mb-6">
              <Input type={'password'} icon={<CiLock />} label="password" />
            </div>
          </div>

          <div className="flex flex-col items-center w-3/4 ">
            <div className="md:w w-full">
              <Button className="w-full bg-[#252b42]" onClick={submit}>
                Login
              </Button>
            </div>
            <div className="md:w flex flex-col items-center">
              <div className="my-6 cursor-pointer">
                <img src={loginwith365} />
              </div>
              <div className="cursor-pointer">
                <img src={logintecher} />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
