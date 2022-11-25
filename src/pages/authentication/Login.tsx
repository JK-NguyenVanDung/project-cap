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
    title: 'CBDVNV',
    Logo: Logo,
    description: 'Đăng Nhập Với Tài Khoản VLU',
  },
  {
    id: '2',
    title: 'Trung Tâm',
    Logo: LogoTrungTam,
    description: 'Đăng Nhập Với Tài Khoản VLU',
  },
];
export default function Login() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  function LoginPopUp() {
    instance
      .loginPopup(loginRequest)
      .then(() => navigate('/admin'))
      .catch((e) => {
        console.log('e', e);
      });
  }
  return (
    <div className="bg-slate-500 ">
      <main className="fixed w-full h-full top-0 place-content-center items-center flex flex-col bg-[#252b42]">
        <h1 className="text-white font-bold text-5xl mb-20">
          Đăng Nhập Training
        </h1>
        <div className="flex justify-center ">
          {DataLogin.map((item, index) => {
            return (
              <div
                key={index}
                className="w-1/4 bg-white flex flex-col items-center m-4 p-3 py-12 rounded-lg cursor-pointer "
                onClick={() => LoginPopUp()}
              >
                <div className="w-1/5 mb-4">
                  <img src={item.Logo} />
                </div>
                <h2 className="text-blue-gray-900 font-normal text-2xl uppercase my-2">
                  {item.title}
                </h2>
                <p className="text-blue-gray-900">{item.description}</p>
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
