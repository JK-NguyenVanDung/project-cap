import React, { useCallback, useState } from 'react';
import { useMsal } from '@azure/msal-react';

import Logo from '../../assets/img/logoVLU.png';
import LogoTrungTam from '../../assets/img/logoTrungTam.png';
import trongdong from '../../assets/img/trongdong.png';
import './index.css';
import { loginRequest } from './loginconfig';
import { useNavigate } from 'react-router-dom';

const DataLogin = [
  {
    id: '1',
    title: 'CBGV & NV',
    Logo: Logo,
    description: 'Đăng Nhập Dành Cho Người Học',
  },
  {
    id: '2',
    title: 'Trung Tâm',
    Logo: LogoTrungTam,
    description: 'Đăng Nhập Dành Cho Quản Lý',
  },
];
export default function Login() {
  const { instance } = useMsal();
  function LoginPopUp(item: any) {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  }

  return (
    <div className="bg-slate-500 ">
      <main className="fixed w-full h-full top-0 place-content-center items-center flex flex-col bg-[#252b42]">
        <h1 className="text-yellow-200 font-bold text-center text-5xl mb-20">
          <p className="my-4"> Đăng Nhập </p>
          <p className="my-4">VLU Training</p>
        </h1>
        <div className="flex justify-center ">
          {DataLogin.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: 300,
                }}
                className=" bg-white flex flex-col items-center m-4 p-3 py-12 rounded-lg cursor-pointer hover:-translate-y-4  "
                onClick={() => LoginPopUp(item)}
              >
                <div className="w-full mb-4 flex flex-col items-center">
                  <img
                    style={{
                      height: 100,
                    }}
                    src={item.Logo}
                  />
                </div>
                <h2 className="text-blue-gray-900 font-normal text-2xl uppercase my-2 font-bold">
                  {item.title}
                </h2>
                <p className="text-blue-gray-900 text-lg">{item.description}</p>
              </div>
            );
          })}
        </div>
        <div className="layer layer-0">
          <img src={trongdong} className="animation-0" alt="" />
        </div>
      </main>
    </div>
  );
}
