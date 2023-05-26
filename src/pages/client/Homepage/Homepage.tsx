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
import { IProgramItem } from '../../../Type';

export default function Homepage() {
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();
  const [bannerData, setBannerData] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [popularPrograms, setPopularPrograms] = useState([]);

  const [loading, setLoading] = useState(true);

  const info = useAppSelector((state) => state.auth.info);

  const firstTimeLogin = useAppSelector((state) => state.auth.firstTimeLogin);

  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(
        `© 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang`,
      ),
    );
    const fetchData = async () => {
      try {
        const data: any = await apiService.getMySurveys(info?.accountId);
        setBannerData(data);
        const pop: any = await apiService.getPopularPrograms();
        setPopularPrograms(pop);

        const res: any = await apiService.getNewPrograms();
        setPrograms(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().finally(() => setLoading(false));
  }, [info]);

  return (
    <>
      <div className="">
        <div className="relative">
          <div className="absolute w-full h-fit">
            <Loading loading={loading} />
          </div>
          {!loading && bannerData && bannerData.length > 0 && (
            <div className={`flex w-full items-center`}>
              <div className="w-[84vw] max-sm:w-[96vw] mt-4">
                <Banner data={[...bannerData]} />
              </div>
            </div>
          )}

          {firstTimeLogin && <FormFirstTime />}
        </div>
        {!loading && programs && programs?.length > 0 && (
          <div className="my-12 w-[90vw] max-sm:w-[100vw]">
            <CourseCarousel
              data={programs?.reverse()}
              title="Khoá học mới nhất"
            />
          </div>
        )}
        {!loading && popularPrograms && popularPrograms?.length > 0 && (
          <div className="my-12 w-[90vw] max-sm:w-[100vw]">
            <CourseCarousel
              data={popularPrograms?.reverse()}
              title="Khoá học nổi tiếng"
            />
          </div>
        )}
      </div>
    </>
  );
}
