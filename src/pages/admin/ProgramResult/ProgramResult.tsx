import { IProgramItem, IProgramResults } from '../../../Type';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { useAppSelector } from '../../../hook/useRedux';
import ProgramResultCard from '../../../components/Chart/ProgramResultCard';
import SmallProgramResultCard from '../../../components/Chart/SmallProgramResultCard';
import AttendanceRateCard from '../../../components/Chart/AttendanceRateCard';
import AveragePointChart from '../../../components/Chart/AveragePointChart';
import AttendanceRateChart from '../../../components/Chart/AttendanceRateChart';
import { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
export default function () {
  let program: IProgramItem = useAppSelector((state) => state.form.setProgram);
  const [result, setResult] = useState<IProgramResults>(null);
  const [loading, setLoading] = useState(false);
  async function getData() {
    let res: any = await apiService.getProgramResult(program.programId);
    setResult(res);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full h-full relative">
        <div className="ml-[-10px]">
          <Breadcrumb
            router1={'/admin/Program'}
            name={'Chương Trình'}
            name2={program?.programName}
          />
        </div>
        <div className="flex my-12 mx-2">
          <div className="flex flex-col justify-between h-[45vh]">
            <ProgramResultCard
              header={'SỐ NGƯỜI HỌC'}
              number={result?.countLearners}
              imgSrc="https://ouch-cdn2.icons8.com/tDVPnO7F3kdD0xVzd2VnMPmlb_Bhb841G_CUofgmuqk/rs:fit:256:324/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjgy/L2ExZGYxMGE0LTFk/NjMtNDA0Mi04ZWNj/LWI3OWU4N2ViM2Iw/Zi5wbmc.png"
            />
            <ProgramResultCard
              header={'SỐ ĐƠN ĐĂNG KÝ'}
              number={result?.countApplications}
              color="blue"
              imgSrc="https://ouch-cdn2.icons8.com/CnURUztFpXYPWbI5AnKPFW00eEU6_2ooZkc1ZKHNyek/rs:fit:256:367/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTc4/Lzk2NWMyYTUwLTFi/YWYtNDI3MS04ZWE3/LWZkMTI5YmUyZTE1/Ni5wbmc.png"
            />
          </div>
          <div className="mx-12 flex flex-col h-full justify-between ">
            <SmallProgramResultCard
              header={'SỐ LƯỢT THÍCH'}
              number={result?.countLike}
              color="blue"
            />
            <SmallProgramResultCard
              className="mt-5 bg-[#CB36FF]"
              header={'SỐ BÌNH LUẬN'}
              number={result?.countComment}
              color="purple"
            />
          </div>
          <div className=" flex flex-col h-full justify-between ">
            <SmallProgramResultCard
              header={'SỐ CHƯƠNG'}
              number={result?.countContent}
              color="green"
            />
            <SmallProgramResultCard
              className="mt-5"
              header={'SỐ BÀI KIỂM TRA'}
              number={result?.countContent}
              color="red"
            />
          </div>
          <AttendanceRateCard data={result ? result : {}} />
        </div>
      </div>
      <AveragePointChart data={result ? result?.resultTests : []} />
      <AttendanceRateChart data={result ? result?.resultAttendances : []} />
    </>
  );
}
