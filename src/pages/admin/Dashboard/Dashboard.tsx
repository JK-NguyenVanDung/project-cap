import CourseByMonthBarChart from '../../../components/Statistic/CourseByMonthBarChart';
import DataBox from '../../../components/Statistic/DataBox';
import LearnerBox from '../../../components/Statistic/LearnerBox';
import RegisteredLineChart from '../../../components/Statistic/RegisteredLineChart';
import TopLearners from '../../../components/Statistic/TopLearners';

export default function () {
  return (
    <>
      <div className="w-full h-screen ">
        <div className="flex w-full h-fit justify-between my-12">
          <DataBox title="Tổng số khoá học" number={1000} />
          <DataBox title="Tổng số coin đã gửi" number={'2,435k $'} />
          <DataBox title="Tổng chứng chỉ" number={'10k'} />
          <DataBox title="Số lượng học viên" number={'43k'} />
        </div>
        <div className="flex">
          <RegisteredLineChart data={[]} />
          <LearnerBox percentage={10} number={1000} />
        </div>
        <div className="flex w-full justify-between my-12 min-h-[5rem] h-fit ">
          <DataBox title="Tổng số khảo sát" number={1000} />
          <DataBox title="Tổng số bài kiểm tra" number={'2,435k $'} />
          <DataBox title="Tổng số đơn đăng ký" number={'10k'} />
          <DataBox
            title="Tổng số người đã làm khảo sát"
            number={'43k'}
            longHeader
          />
        </div>
        <div className="flex w-full h-fit justify-between my-12">
          <CourseByMonthBarChart data={[]} />
          <TopLearners />
        </div>
      </div>
      <div className="h-[30vh] mt-12"></div>
    </>
  );
}
