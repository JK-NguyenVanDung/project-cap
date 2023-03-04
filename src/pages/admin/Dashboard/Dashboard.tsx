import apiService from '../../../api/apiService';
import CourseByMonthBarChart from '../../../components/Statistic/CourseByMonthBarChart';
import DataBox from '../../../components/Statistic/DataBox';
import LearnerBox from '../../../components/Statistic/LearnerBox';
import RegisteredLineChart from '../../../components/Statistic/RegisteredLineChart';
import TopLearners from '../../../components/Statistic/TopLearners';
import { useEffect, useState } from 'react';

export default function () {
  const [data, setData] = useState<any>({});
  async function getData() {
    try {
      let res: any = await apiService.getDashboard();
      setData(res);
    } catch (err: any) {}
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full h-screen ">
        <div className="flex w-full h-fit justify-between my-12">
          <DataBox
            title="Tổng số khoá học"
            number={data?.countPrograms ? data?.countPrograms : 0}
          />
          <DataBox
            title="Tổng số coin đã gửi"
            number={data?.countCoins ? data?.countCoins : 0 + ' $'}
          />
          <DataBox
            title="Tổng chứng chỉ"
            number={data?.countCertificates ? data?.countCertificates : 0}
          />
          <DataBox
            title="Số lượng học viên"
            number={data?.countLearners ? data?.countLearners : 0}
          />
        </div>
        <div className="flex">
          <RegisteredLineChart data={[]} />
          <LearnerBox percentage={10} number={1000} />
        </div>
        <div className="flex w-full justify-between my-12 min-h-[5rem] h-fit ">
          <DataBox
            title="Tổng số khảo sát"
            number={data?.countSurveys ? data?.countSurveys : 0}
          />
          <DataBox
            title="Tổng số bài kiểm tra"
            number={data?.countTests ? data?.countTests : 0}
          />
          <DataBox
            title="Tổng số đơn đăng ký"
            number={data?.countApplications ? data?.countApplications : 0}
          />
          <DataBox
            title="Tổng số người đã làm khảo sát"
            number={data?.countSurveyTakers ? data?.countSurveyTakers : 0}
            longHeader
          />
        </div>
        <div className="flex w-full h-fit justify-between my-12">
          <CourseByMonthBarChart
            data={data.monthlyPrograms ? data.monthlyPrograms : []}
          />
          <TopLearners />
        </div>
      </div>
      <div className="h-[30vh] mt-12"></div>
    </>
  );
}
