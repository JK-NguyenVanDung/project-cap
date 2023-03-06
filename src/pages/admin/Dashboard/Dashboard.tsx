import { FaAward, FaBook, FaClipboardList, FaCoins } from 'react-icons/fa';
import { FcSurvey } from 'react-icons/fc';
import { BsClipboardCheck, BsFillPersonCheckFill } from 'react-icons/bs';

import apiService from '../../../api/apiService';
import CourseByMonthBarChart from '../../../components/Statistic/CourseByMonthBarChart';
import DataBox from '../../../components/Statistic/DataBox';
import LearnerBox from '../../../components/Statistic/LearnerBox';
import RegisteredLineChart from '../../../components/Statistic/RegisteredLineChart';
import TopLearners from '../../../components/Statistic/TopLearners';
import { useEffect, useState } from 'react';
import { GrCertificate } from 'react-icons/gr';
import { BsPeopleFill } from 'react-icons/bs';
import { MdBookmarkAdded } from 'react-icons/md';

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
            icon1={<FaBook className="text-2xl text-green-600" />}
          />
          <DataBox
            title="Tổng số coin đã gửi"
            number={data?.countCoins ? data?.countCoins : 0 + ' $'}
            icon1={<FaCoins className="text-2xl text-yellow-700" />}
          />
          <DataBox
            title="Tổng chứng chỉ"
            number={data?.countCertificates ? data?.countCertificates : 0}
            icon1={<FaAward className="text-2xl text-blue-700" />}
          />
          <DataBox
            title="Số lượng học viên"
            number={data?.countLearners ? data?.countLearners : 0}
            icon1={<BsPeopleFill className="text-2xl text-purple-800" />}
          />
        </div>
        <div className="flex">
          <RegisteredLineChart
            data={data.monthlyAttendances ? data.monthlyAttendances : []}
          />
          <LearnerBox
            percentage={
              data.countLearnersComplete ? data.countLearnersComplete : 0
            }
            number={data.countResultTest ? data.countResultTest : 0}
          />
        </div>
        <div className="flex w-full justify-between my-12 min-h-[5rem] h-fit ">
          <DataBox
            title="Tổng số khảo sát"
            number={data?.countSurveys ? data?.countSurveys : 0}
            icon1={<FcSurvey className="text-3xl " />}
          />
          <DataBox
            title="Tổng số bài kiểm tra"
            number={data?.countTests ? data?.countTests : 0}
            icon1={<MdBookmarkAdded className="text-2xl text-orange-600" />}
          />
          <DataBox
            title="Tổng số đơn đăng ký"
            number={data?.countApplications ? data?.countApplications : 0}
            icon1={<FaClipboardList className="text-2xl text-indigo-600" />}
          />
          <DataBox
            title="Tổng số người đã làm khảo sát"
            number={data?.countSurveyTakers ? data?.countSurveyTakers : 0}
            longHeader
            icon1={<BsFillPersonCheckFill className="text-2xl text-red-600" />}
          />
        </div>
        <div className="flex w-full h-fit justify-between my-12">
          <CourseByMonthBarChart
            data={data.monthlyPrograms ? data.monthlyPrograms : []}
          />
          <TopLearners
            data={data.accountRankings ? data.accountRankings : []}
          />
        </div>
      </div>
      <div className="h-[30vh] mt-12"></div>
    </>
  );
}
