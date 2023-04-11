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
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { Form, message } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';

export default function () {
  const [data, setData] = useState<any>({});
  const [years, setYears] = useState<any>([]);
  const [ranking, setRanking] = useState<any>([]);

  const [selectedYears, setSelectedYears] = useState<any>([]);

  const [formDate] = Form.useForm();
  async function getData() {
    try {
      let years: any = await apiService.getAcademicYear();
      setSelectedYears(years[years?.length - 1]);
      setYears(years);
      let res: any = await apiService.getDashboardByYear(
        years[years?.length - 1].id,
      );
      setData(res);
      let learners: any = await apiService.getRanking();
      setRanking(learners);
    } catch (err: any) {}
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Dashboard`));
    getData();
  }, []);

  function selectRegistered() {
    formDate
      .validateFields()
      .then(async (values) => {
        try {
          let newYear = years.filter((year: any) => year.id == values.yearId);
          setSelectedYears(newYear[0]);
          let res: any = await apiService.getDashboardByYear(values.yearId);
          console.log(res);

          setData(res);
        } catch (err: any) {
          console.log(err?.message);
        }
      })
      .catch((err) => {
        {
          throw err?.message;
        }
      });
  }
  return (
    <>
      <Form
        form={formDate}
        className="formCategory w-fit ml-40  absolute top-[-41px]"
      >
        <div className="flex justify-between items-center  w-1/4 ">
          <FormInput
            labelLeft={true}
            className="min-w-[10rem]"
            label="Năm học"
            type="select"
            name="yearId"
            options={years?.map((item: any) => ({
              value: item.id,
              label: item.year,
            }))}
            defaultValue={years[years.length - 1]?.id}
            getSelectedValue={selectRegistered}
          />
        </div>
      </Form>
      <div className="w-full h-screen ">
        <div className="flex w-full h-fit justify-between my-12">
          <DataBox
            color={'bg-blue-100'}
            title="Tổng số khoá học"
            number={data?.countPrograms ? data?.countPrograms : 0}
            icon1={<FaBook className="text-2xl text-green-600" />}
          />
          <DataBox
            color={'bg-green-100'}
            title="Tổng số coin đã gửi"
            number={data?.countCoins ? data?.countCoins : 0 + ' $'}
            icon1={<FaCoins className="text-2xl text-yellow-700" />}
          />
          <DataBox
            color={'bg-orange-100'}
            title="Tổng chứng chỉ"
            number={data?.countCertificates ? data?.countCertificates : 0}
            icon1={<FaAward className="text-2xl text-blue-700" />}
          />
          <DataBox
            color={'bg-red-100'}
            title="Số lượng học viên"
            number={data?.countLearners ? data?.countLearners : 0}
            icon1={<BsPeopleFill className="text-2xl text-purple-800" />}
          />
        </div>
        <div className="flex">
          <RegisteredLineChart
            selectedYears={selectedYears}
            data={data.monthlyAttendances ? data.monthlyAttendances : []}
          />
          <LearnerBox
            percentage={
              data.countLearnersComplete
                ? Math.round(
                    (data.countLearnersComplete / data.countLearners) * 100,
                  )
                : 0
            }
            number={data.countResultTest ? data.countResultTest : 0}
          />
        </div>
        <div className="flex w-full justify-between my-12 min-h-[5rem] h-fit ">
          <DataBox
            color={'bg-green-100'}
            title="Tổng số khảo sát"
            number={data?.countSurveys ? data?.countSurveys : 0}
            icon1={<FcSurvey className="text-3xl " />}
          />
          <DataBox
            color={'bg-blue-100'}
            title="Tổng số bài kiểm tra"
            number={data?.countTests ? data?.countTests : 0}
            icon1={<MdBookmarkAdded className="text-2xl text-orange-600" />}
          />
          <DataBox
            color={'bg-red-100'}
            title="Tổng số đơn đăng ký"
            number={data?.countApplications ? data?.countApplications : 0}
            icon1={<FaClipboardList className="text-2xl text-indigo-600" />}
          />
          <DataBox
            color={'bg-orange-100'}
            title="Tổng số người đã làm khảo sát"
            number={data?.countSurveyTakers ? data?.countSurveyTakers : 0}
            longHeader
            icon1={<BsFillPersonCheckFill className="text-2xl text-red-600" />}
          />
        </div>
        <div className="flex w-full h-fit justify-between my-12">
          <CourseByMonthBarChart
            data={data.monthlyPrograms ? data.monthlyPrograms : []}
            selectedYears={selectedYears}
          />
          <TopLearners data={ranking ? ranking : []} />
        </div>
      </div>
      <div className="h-[30vh] mt-12"></div>
    </>
  );
}
