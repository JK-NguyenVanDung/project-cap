import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, notification, Select, Modal } from 'antd';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import ModalProfile from '../Badge/Component/Share/ModalProfile';

export default function () {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchInfo();
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, []);
  const fetchInfo = async () => {
    const response: any = await apiService.getProfile();
    const { roleId } = response;
    const { code } = response;
    if (
      !code ||
      !response.fullName ||
      !response.address ||
      !response.email ||
      !response.phoneNumber
    ) {
      setVisible(true);
    }
  };
  return (
    <ModalProfile loadingConfirm={loading} setLoadingConfirm={setLoading} open={visible} setOpen={setVisible} />
  );
}
