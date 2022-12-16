import CourseDetail from '../../../components/Course/CourseDetail';
import RightSection from '../../../components/Course/RightSection';

export default function (props: any) {
  return (
    <>
      <div className="flex w-full justify-center">
        <CourseDetail {...props} />
        <RightSection enable={true} />
      </div>
    </>
  );
}
