import { useNavigate } from 'react-router-dom';
import CourseDetail from '../../../components/Course/CourseDetail';
import RightSection from '../../../components/Course/RightSection';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../components/sharedComponents/Loading';
import ScrollToTop from '../../../utils/scrollToTop';

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

  // useEffect(() => {
  //   executeScroll(0);
  //   console.log(1);
  // }, []);
  return (
    <>
      <Loading loading={loading} />
      <div
        ref={ref}
        className={`flex w-full justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        <CourseDetail {...props} setLoading={setLoading} />
        <RightSection enable={true} goBack={() => navigate('/Courses/')} />
      </div>
    </>
  );
}
