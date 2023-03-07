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
  const [bannerData, setBannerData] = useState([]);
  const [programs, setPrograms] = useState([]);

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
        setBannerData(data);
        const res: any = await apiService.getPrograms();
        setPrograms(res);
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
      <div className="">
        <div className="relative">
          <div className="absolute w-full h-fit">
            <Loading loading={loading} />
          </div>
          <div
            className={`flex w-full items-center  ${
              loading ? 'hidden' : 'visible'
            }`}
          >
            <div className="w-[84vw]">
              <Banner data={[...bannerData, ...bannerData]} />
            </div>
          </div>

          <FormFirstTime />
        </div>
        <div className="my-12 w-[80vw]">
          <CourseCarousel data={programs} title="Khoá học mới nhất" />
        </div>
        <div className="my-12 w-[80vw]">
          <CourseCarousel data={programs} title="Khoá học nổi tiếng" />
        </div>
      </div>
    </>
  );
}
