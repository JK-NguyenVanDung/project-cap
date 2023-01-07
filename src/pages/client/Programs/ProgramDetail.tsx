import { useNavigate } from 'react-router-dom';
import CourseDetail from '../../../components/Course/CourseDetail';
import RightSection from '../../../components/Course/RightSection';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../components/sharedComponents/Loading';
import ScrollToTop from '../../../utils/scrollToTop';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { IProgramItem } from '../../../Type';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';

export default function (props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    // executeScroll(0);
    // console.log(1);
    dispatch(
      actions.formActions.setNameMenu(
        `${program ? program?.programName : 'N/A'}`,
      ),
    );
  }, []);

  return (
    <>
      <div className="w-full  px-4 pb-2 bg-white">
        <Breadcrumb
          router1={'/Programs/'}
          name={'Chương Trình'}
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
        <CourseDetail {...props} setLoading={setLoading} isDetail={true} />
        <RightSection enable={true} goBack={() => navigate('/Programs/')} />
      </div>
    </>
  );
}
