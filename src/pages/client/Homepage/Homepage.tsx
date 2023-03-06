import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, notification, Select, Modal } from 'antd';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import Banner from './Banner';
import { useMsal } from '@azure/msal-react';
import FormFirstTime from './FormFirstTime';
import Loading from '../../../components/sharedComponents/Loading';
import CourseCarousel from './CourseCarousel';

export default function Homepage() {
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(
        `${`Xin Chào \n
             ${accounts[0]?.name.split('-')[1]}`}`,
      ),
    );
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: any = await apiService.getMySurveys(info.accountId);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div className="absolute w-full h-screen">
          <Loading loading={loading} />
        </div>
        <div
          className={`flex w-full items-center justify-center ${
            loading ? 'hidden' : 'visible'
          }`}
        >
          <div className="w-[84vw]">
            <Banner data={data} />
          </div>
        </div>
        <CourseCarousel data={data} title="Khoá học mới nhất" />
        <FormFirstTime />
      </div>
    </>
  );
}
