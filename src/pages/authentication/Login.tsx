import React, { useCallback, useState, useRef } from 'react';
import { useMsal } from '@azure/msal-react';

import Logo from '../../assets/img/logoVLU.png';
import LogoTrungTam from '../../assets/img/logoTrungTam.png';
import trongdong from '../../assets/img/trongdong.png';
import './index.css';
import { loginRequest } from './loginconfig';
import { useNavigate } from 'react-router-dom';
import videoBackground from '../../assets/video/background.mp4';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';
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
  const dispatch = useAppDispatch();
  const { instance } = useMsal();

  function LoginPopUp(item: any) {
    instance.loginPopup(loginRequest).catch((e) => {});
    dispatch(actions.authActions.setRoleLogin(item));
    dispatch(actions.authActions.setInfo(''));
  }
  const videoRef = useRef(null);

  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.8;
  };
  return (
    <div className="bg-slate-500 ">
      <div className="overlay" />
      <video
        style={{
          height: '100vh',
          width: '100%',
          objectFit: 'cover',
        }}
        src={videoBackground}
        autoPlay
        muted
        loop
        onCanPlay={() => setPlayBack()}
        id="myVideo"
        ref={videoRef}
      />
      <main className="fixed w-full h-full top-0 place-content-center items-center flex flex-col">
        <h1 className="text-[#fff] uppercase font-bold text-center text-5xl mb-10 mt-10">
          <p className="my-4"> Đăng Nhập </p>
          <p className="mt-4 ">VLU Training</p>
        </h1>
        <div className="flex justify-center ">
          {DataLogin.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: 400,
                }}
                className=" justify-end group bg-clip-padding bg-white backdrop-filter backdrop-blur-sm bg-opacity-60 border border-transparent button_login hover:text-black flex flex-col items-center m-4 p-3 py-12 rounded-lg cursor-pointer hover:-translate-y-4 "
                onClick={() => LoginPopUp(item)}
              >
                <div
                  className={`w-fit h-fit flex flex-col items-center ${
                    item.id != '1' && 'justify-end mb-4'
                  }`}
                >
                  <img
                    className={item.id == '1' ? 'w-[7rem]  h-fit' : 'h-[80px]'}
                    src={item.Logo}
                  />
                </div>
                <h2 className="text-black group-hover:text-white font-normal text-2xl uppercase my-2 font-bold">
                  {item.title}
                </h2>
                <p className="text-black group-hover:text-white text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className=" container mx-auto px-6">
          <div className="mt-16 z- flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
              <p className=" text-sm text-white font-bold mb-2">
                © 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
