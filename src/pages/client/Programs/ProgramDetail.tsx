import { useLocation, useNavigate } from 'react-router-dom';
import CourseDetail from '../../../components/Course/CourseDetail';
import RightSection from '../../../components/Course/RightSection';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../components/sharedComponents/Loading';
import ScrollToTop from '../../../utils/scrollToTop';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { IProgramItem } from '../../../Type';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import apiService from '../../../api/apiService';

export default function (props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const location = useLocation();

  let ref = useRef(null);
  // const executeScroll = (i: number) => {
  //   setTimeout(() => {
  //     ref.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'nearest',
  //     });
  //   }, 50);
  // };
  const dispatch = useAppDispatch();
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    const getData = async () => {
      try {
        let res: any = await apiService.getIfProgramIsRegistered({
          programId: program?.programId,
          accountId: info.accountId,
        });
        if (res) {
          setIsApproved(res);
        }
      } catch (err) {}
    };
    getData();
    dispatch(
      actions.formActions.setNameMenu(
        `${program ? program?.programName : 'N/A'}`,
      ),
    );
    console.log(location.pathname);
  }, []);

  return (
    <>
      <div className="w-full  px-4 pb-2 bg-white">
        <Breadcrumb
          router1={`/${location.pathname.split('/')[1]}/`}
          name={
            location.pathname.includes('MyCourses')
              ? 'Khoá học Của Tôi'
              : 'Chương Trình'
          }
          name2={program ? program?.programName : 'N/A'}
        />
      </div>
      <Loading loading={loading} />
      <div
        ref={ref}
        className={`flex w-full justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        <CourseDetail
          {...props}
          isApproved={isApproved}
          setLoading={setLoading}
          isDetail={true}
          reRoute={
            location.pathname.includes('MyCourses') ? 'MyCourses' : 'Programs'
          }
        />
        <RightSection
          isApproved={isApproved}
          enable={true}
          goBack={() => navigate(`/${location.pathname.split('/')[1]}/`)}
        />
      </div>
    </>
  );
}
