import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import avatarSqDefault from '../../../../assets/img/avatarSq.png';
import { Space } from '../../Programs/ResultProgram';
import Color from '../../../../components/constant/Color';
import { BiEdit } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useMsal } from '@azure/msal-react';
import HeaderClient from '../../../../components/Header/HeaderClient';
import ModalProfile from './Share/ModalProfile';
import Loading from '../../../../components/sharedComponents/Loading';
import { API_URL } from '../../../../api/api';
import apiService from '../../../../api/apiService';
export default function ProfileClient() {
  const dispatch = useAppDispatch();
  const { accounts } = useMsal();
  const [info, setInfo]: any = useState();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(`${accounts[0]?.name.split('-')[1]}`),
    );
  }, []);
  useEffect(() => {
    getMyAccount();
  }, []);
  const getMyAccount = async () => {
    try {
      const data: any = await apiService.getProfile();
      setLoading(true);
      if (data) {
        setLoading(false);
        setInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelEdit = () => {
    setOpenEdit(true);
  };
  return (
    <>
      <Loading loading={loading} />
      <div className="flex ">
        <div>
          <img
            className=" rounded-lg"
            src={
              info?.avatar
                ? `${API_URL}/images/${info?.avatar}`
                : avatarSqDefault
            }
          />
        </div>
        <Space sizeWidth={50} />
        <div className="w-full p-5">
          <Space size={10} />
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl text-gray-600">
                {info?.fullName ?? 'No Name'}
              </h1>
              <BiEdit
                onClick={() => handelEdit()}
                size={30}
                color={Color.theme.DOVE_GRAY}
              />
            </div>

            <Space size={10} />
            <p className="font-normar italic">
              <span className="text-gray-700 font-bold text-sm">Email:</span>{' '}
              {info?.email ?? ''}
            </p>
            <Space size={5} />
            <p className="font-normar italic">
              <span className="text-gray-700 font-bold text-sm">
                Mã Số Sinh Viên:
              </span>{' '}
              {info?.code ?? ''}
            </p>
            <Space size={5} />

            <p className="font-normar italic">
              <span className="text-gray-700 font-bold text-sm">
                Số Điện Thoại:
              </span>{' '}
              {info?.phoneNumber ?? ''}
            </p>
            <Space size={5} />

            <p className="font-normar italic">
              <span className="text-gray-700 font-bold text-sm">
                Thuộc Khoa:
              </span>{' '}
              {info?.faculty?.facultyName ?? ''}
            </p>
          </div>
          <ModalProfile
            loadingConfirm={loading}
            setLoadingConfirm={setLoading}
            open={openEdit}
            setOpen={setOpenEdit}
          />
        </div>
      </div>
    </>
  );
}

{
  /* <Space size={20} />
          <Progress
            percent={50}
            status="active"
            strokeColor={`${Color.theme.DARK_GRAY}`}
          />
          <Space size={20} />
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <AiFillFlag color={Color.theme.DARK_GRAY} size={40} />
              </div>
              <Space sizeWidth={10} />
              <div>
                <h1>27</h1>
                <p>quiz passed</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <AiFillFlag color={Color.theme.DARK_GRAY} size={40} />
              </div>
              <Space sizeWidth={10} />
              <div>
                <h1>27</h1>
                <p>quiz passed</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <AiFillFlag color={Color.theme.DARK_GRAY} size={40} />
              </div>
              <Space sizeWidth={10} />
              <div>
                <h1>27</h1>
                <p>quiz passed</p>
              </div>
            </div>
          </div> */
}
