import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { loginRequest } from '../pages/authentication/loginconfig';
import { Spin, notification, Form, message, Select } from 'antd';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dataFct, setDataFct]: any = useState([]);
  const [positons, setPositons]: any = useState([]);
  const [roleId, setRoleId] = useState();
  const { instance, accounts } = useMsal();
  const LoginParmas = useAppSelector((state) => state.auth.LoginId);
  const navLink = useAppSelector((state) => state.nav.nav);
  const loading = true;
  const info = useAppSelector((state) => state.auth.info);
  const [checkFirt, setCheckFirt] = useState(false);
  useEffect(() => {
    if (info.phoneNumber === null) {
      getPositions();
      getFacuties();
    }
    fetchInfo();
    RequestAccessToken();
  }, []);
  const fetchInfo = async () => {
    const response: any = await apiService.getProfile();
    const { roleId } = response;
    setRoleId(roleId);
    dispatch(actions.authActions.setInfo(response));
  };
  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    instance
      .acquireTokenSilent(request)
      .then(async (response) => {
        try {
          const reponseToken: any = await apiService.postAdminUser({
            token: response.accessToken,
          });
          dispatch(actions.authActions.Login(reponseToken.token));
          localStorage.setItem('Bearer', `Bearer ${reponseToken.token}`);

          dispatch(actions.authActions.showNotification(true));

          if (LoginParmas.id == 2 && roleId == 1) {
            navigate('/');
            notification.error({
              message: 'Bạn Không Có Quyền Đăng Nhập',
            });
            if (navLink && LoginParmas.id == 1 && info.phoneNumber) {
              navigate(navLink);
            } else if (LoginParmas.id == 1 && info.phoneNumber) {
              navigate('/home');
            } else if (LoginParmas.id == 2 && info.phoneNumber) {
              navigate('/admin');
            }
          }
          if (!info.phoneNumber) {
            setCheckFirt(true);
            return;
          }
        } catch (error) {
          instance.logoutPopup({
            postLogoutRedirectUri: '/',
            mainWindowRedirectUri: '/',
          });
          navigate('/');
          localStorage.clear();
          notification.error({ message: 'Đăng Nhập Không Thành Công' });
          dispatch(actions.authActions.logout());
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const getPositions = async () => {
    const reponse = await apiService.getPositions();
    if (reponse) {
      setPositons(reponse);
    }
  };
  const getFacuties = async () => {
    const reponse = await apiService.getFaculties();
    if (reponse) {
      setDataFct(reponse);
    }
  };
  const [form] = Form.useForm();

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const data = await apiService.infoAccount(values);
        if (data) {
          if (navLink && LoginParmas.id == 1) {
            navigate(navLink);
          } else if (LoginParmas.id == 1) {
            navigate('/home');
          } else if (LoginParmas.id == 2) {
            navigate('/admin');
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  const LoginFirt = () => {
    return (
      <>
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
          id="myVideo"
        />
        <Form
          form={form}
          initialValues={{
            midifier: 'public',
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <div className="w-2/6 bg-white rounded-3xl p-10 flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-2xl mb-10">
              Thông Tin Của Bạn
            </h1>
            <FormInput className="w-full" name="address" label="Địa Chỉ" />
            <FormInput
              className="w-full"
              name="phoneNumber"
              label="Số Điện Thoại"
            />
            <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
              Chức Vụ Của Bạn
            </label>
            <Form.Item
              className="w-full "
              name="positionId"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Chức Vụ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn Chức Vụ"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={positons.map((item: any) => ({
                  value: item.positionId,
                  label: item.positionName,
                }))}
              />
            </Form.Item>
            <label className="text-start w-full mb-4 text-black font-bold font-customFont">
              Phòng/Khoa
            </label>
            <Form.Item
              className="w-full "
              name="facultyId"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Phòng/Khoa',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn Phòng/Khoa"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataFct.map((item: any) => ({
                  value: item.facultyId,
                  label: item.facultyName,
                }))}
              />
            </Form.Item>
            <CustomButton
              onClick={handelOk}
              size="md"
              className="w-3/6"
              text="Đăng Nhập"
              noIcon
            />
          </div>
        </Form>
      </>
    );
  };
  return (
    <>
      {info.phoneNumber ? <LoginFirt /> : null}
      {checkFirt == true && (
        <>
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
            id="myVideo"
          />
          <div
            className="flex justify-center content-center items-center"
            style={{
              height: '100vh',
            }}
          >
            <Spin
              className="absolute top-1/2 left-1/2"
              indicator={antIcon}
              tip="Loading..."
              spinning={loading}
            ></Spin>
          </div>
        </>
      )}
    </>
  );
}
