import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { loginRequest } from '../pages/authentication/loginconfig';
import { Spin, notification, Form } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import MakeAdminRouter from './AdminRouter';
import { LoadingOutlined } from '@ant-design/icons';
import apiService from '../api/apiService';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';
import videoBackground from '../assets/video/background.mp4';
import FormInput from '../components/admin/Modal/FormInput';
import CustomButton from '../components/admin/Button';

export default function Logined() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [acceptToken, setAccessToken] = useState('');
  const { instance, accounts } = useMsal();
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    setLoading(true);
  }, []);

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    instance
      .acquireTokenSilent(request)
      .then(async (response) => {
        setAccessToken(response.accessToken);
        try {
          const reponseToken: any = await apiService.postAdminUser({
            token: response.accessToken,
          });
          if (reponseToken) {
            setLoading(false);
            dispatch(actions.authActions.Login(reponseToken.token));
            localStorage.setItem('Bearer', `Bearer ${reponseToken.token}`);
            notification.success({ message: 'Đăng Nhập Thành Công' });
            if (LoginParmas.id == 1) {
              navigate('/home');
            }
            if (LoginParmas.id == 2) {
              if (info.roleId == 1) {
                instance.logoutPopup({
                  postLogoutRedirectUri: '/',
                  mainWindowRedirectUri: '/',
                });
                navigate('/');
                localStorage.clear();
                notification.error({ message: 'Đăng Nhập Không Thành Công' });
                dispatch(actions.authActions.logout());
              } else {
                navigate('/admin');
              }
            }
          }
        } catch (error) {}
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const [form] = Form.useForm();
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <>
      {/* <div className="overlay" />
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
        id="myVideo"
      />
      <Form
        form={form}
        initialValues={{
          midifier: 'public',
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="w-2/6 bg-white rounded-3xl p-10 flex flex-col justify-center items-center">
          <h1 className="text-center font-bold text-2xl mb-10">
            Thông Tin Của Bạn
          </h1>
          <FormInput label="Số Điện Thoại" />
          <FormInput label="Địa Chỉ" />
          <FormInput label="Thuộc Khoa" />
          <CustomButton size="md" className="w-3/6" text="Đăng Nhập" noIcon />
        </div>
      </Form> */}
      {/* <div
        className="flex justify-center content-center items-center"
        style={{
          height: '100vh',
        }}
      >
        <Spin indicator={antIcon} tip="Loading..." spinning={loading} />
      </div> */}
    </>
  );
}
