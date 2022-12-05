import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { loginRequest } from '../pages/authentication/loginconfig';
import { Spin, notification } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import MakeAdminRouter from './AdminRouter';
import { LoadingOutlined } from '@ant-design/icons';
import apiService from '../api/apiService';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';
export default function Logined() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [acceptToken, setAccessToken] = useState('');
  const { instance, accounts } = useMsal();

  useEffect(() => {
    setLoading(true);
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
            } else {
              navigate('/');
              notification.error({ message: 'Đăng Nhập Không Thành Công' });
            }
          } catch (error) {
            localStorage.clear();
            navigate('/');
            notification.error({ message: 'Đăng Nhập Không Thành Công' });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    RequestAccessToken();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <div
      className="flex justify-center content-center items-center"
      style={{
        height: '100vh',
      }}
    >
      <Spin indicator={antIcon} tip="Loading..." spinning={loading} />
    </div>
  );
}
