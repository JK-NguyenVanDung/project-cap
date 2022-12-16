import { useNavigate } from 'react-router-dom';
import CourseDetail from '../../../components/Course/CourseDetail';
import RightSection from '../../../components/Course/RightSection';
import { useState } from 'react';
import Loading from '../../../components/sharedComponents/Loading';

export default function (props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loading loading={loading} />
      <div
        className={`flex w-full justify-center ${
          loading ? 'invisible' : 'visible'
        }`}
      >
        <CourseDetail {...props} setLoading={setLoading} />
        <RightSection enable={true} goBack={() => navigate('/Courses/')} />
      </div>
    </>
  );
}
