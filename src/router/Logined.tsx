import React from 'react'

import { Button } from 'antd'
import trongdong from '../assets/img/trongdong.png'
import { useNavigate } from 'react-router-dom'
export default function Logined() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="bg-slate-500 ">
        <main className="fixed w-full h-full top-0 place-content-center items-center flex flex-col bg-[#252b42]">
          <h1 className="text-brown-50 font-bold text-5xl mb-20">
            Đăng Nhập Thành Công
          </h1>
          <div>
            <Button
              onClick={() => navigate('/')}
              style={{
                color: '#fff',
                backgroundColor: '#9999',
                margin: 10,
                width: 200,
                height: 70,
              }}
            >
              quay lại giới thiệu
            </Button>
            <Button
              onClick={() => navigate('/admin')}
              style={{
                color: '#fff',
                backgroundColor: '#9999',
                margin: 10,
                width: 200,
                height: 70,
              }}
            >
              đi tới Admin
            </Button>
          </div>
          <div className="layer layer-0">
            <img src={trongdong} className="animation-0" alt="" />
          </div>
          <div className="layer layer-0">
            <img src={trongdong} className="animation-0" alt="" />
          </div>
        </main>
      </div>
    </div>
  )
}
