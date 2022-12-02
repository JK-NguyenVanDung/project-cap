import React, { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';
import { useAppDispatch } from '../hook/useRedux';
import { actions } from '../Redux';
import MakeAdminRouter from './AdminRouter';
import MakeUserRouter from './UserRouter';

export default function PageRouter() {
  const [rolesId, setRoleId] = useState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    CheckUser();
  }, []);
  const CheckUser = async () => {
    try {
      const response: any = await apiService.getProfile();
      setRoleId(response.roleId);
      dispatch(actions.authActions.setInfo(response));
      if (response?.roleId == 1) {
        navigate('/home');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      localStorage.clear();
      navigate('/');
    }
  };
  if (rolesId == 1 || undefined) {
    return <MakeUserRouter />;
  } else {
    return <MakeAdminRouter />;
  }
}
