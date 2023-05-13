import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { loginRequest, msalConfig } from '../pages/authentication/loginconfig';
import { Spin, notification, Form, message } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { actions } from '../Redux';
import { exitPath } from '../../onBuild';
import apiService from '../api/apiService';

export default function Logined() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  const navLink = useAppSelector((state) => state.nav.nav);

  const [tokenRequest, setTokenRequest] = useState();
  const alert = useAppSelector((state) => state.auth.notification);
  // const fetchInfo = async () => {
  //   try {
  //     const response: any = await apiService.getProfile();
  //     dispatch(actions.authActions.setInfo(response));

  //     if (
  //       response.roleId == 2 ||
  //       response.roleId == 3 ||
  //       response.roleId == 4
  //     ) {
  //       navigate('/admin');
  //     } else {
  //       navigate('/home');
  //     }
  //   } catch (err) {}
  // };
  useEffect(() => {
    RequestAccessToken();
    // if (tokenRequest) {
    //   fetchInfo();
    // }
  }, []);
  const fetchInfo = async () => {
    try {
      const response: any = await apiService.getProfile();
      dispatch(actions.authActions.setInfo(response));
    } catch (err: any) {
      throw err.message;
    }
  };

  useEffect(() => {
    if (alert === true) {
      dispatch(actions.authActions.showNotification(false));
    }
  }, []);

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    instance
      .acquireTokenSilent(request)
      .then(async (response) => {
        setLoading(true);
        try {
          const reponseToken: any = await apiService.postAdminUser({
            token: response.accessToken,
          });
          setTokenRequest(reponseToken.token);
          if (reponseToken) {
            dispatch(actions.authActions.showNotification(true));

            dispatch(actions.authActions.Login(reponseToken.token));
            localStorage.setItem('Bearer', `Bearer ${reponseToken.token}`);
            // await fetchInfo();
            if (navLink && LoginParmas.id == 1) {
              navigate(navLink);
            } else if (LoginParmas.id == 1) {
              navigate('/home');
            } else if (LoginParmas.id == 2) {
              navigate('/admin');
            }
          }
        } catch (error) {
          instance.logoutPopup({
            postLogoutRedirectUri: exitPath,
            mainWindowRedirectUri: exitPath,
          });
          navigate('/');
          localStorage.clear();
          notification.error({ message: 'Đăng Nhập Không Thành Công' });
          dispatch(actions.authActions.logout());
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <>
      <div
        className="flex justify-center content-center items-center"
        style={{
          height: '100vh',
        }}
      >
        <Spin indicator={antIcon} tip="Loading..." spinning={loading} />
      </div>
    </>
  );
}
