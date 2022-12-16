import { useNavigate } from 'react-router-dom';
import CourseDetail from '../../../components/Course/CourseDetail';
import RightSection from '../../../components/Course/RightSection';

export default function (props: any) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full justify-center">
        <CourseDetail {...props} />
        <RightSection enable={true} goBack={() => navigate('/Courses/')} />
      </div>
    </>
  );
}
