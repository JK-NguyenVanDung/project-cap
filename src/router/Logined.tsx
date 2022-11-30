import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { loginRequest } from '../pages/authentication/loginconfig';
import { Spin } from 'antd';
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
    const postLogin = async () => {
      try {
        const reponseToken: any = await apiService.postAdminUser({
          token: acceptToken,
        });
        if (reponseToken) {
          setLoading(false);
          dispatch(actions.authActions.Login(reponseToken.token));
          localStorage.setItem('Bearer', `Bearer ${reponseToken.token}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    function RequestAccessToken() {
      const request = {
        ...loginRequest,
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(request)
        .then((response) => {
          setAccessToken(response.accessToken);
          setTimeout(() => {
            postLogin();
          }, 3000);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    RequestAccessToken();
  }, [loading]);

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
