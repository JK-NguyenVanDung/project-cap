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
import CustomButton from '../../../components/admin/Button';
import uniqueId from '../../../utils/uinqueId';
import { useNavigate } from 'react-router-dom';

export default function () {
  let program: IProgramItem = useAppSelector((state) => state.form.setProgram);
  const [result, setResult] = useState<IProgramResults>(null);
  // const [loading, setLoading] = useState(false);
  async function getData() {
    let res: any = await apiService.getProgramResult(program.programId);
    setResult(res);
  }
  const navigate = useNavigate();

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
          {/* <CustomButton
            noIcon
            size="sm"
            variant="outlined"
            className="w-32 "
            text="Quay lại"
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(-1);
            }}
          />
          , */}
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
          <div className="mx-12 flex flex-col h-full justify-between items-center ">
            <SmallProgramResultCard
              header={'SỐ LƯỢT THÍCH'}
              number={result?.countLike}
              color="blue"
              imgSrc={
                'https://ouch-cdn2.icons8.com/XRdNlEWuNrUtT9j_4ITmCtDhbzvZqVSc29Zgm2YPyTk/rs:fit:256:207/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDUy/L2JiYWVjMmRkLTg5/YTEtNDA4Yy04YTBk/LTc1YWFkZjI2MWQw/NC5wbmc.png'
              }
              imgClassName={'w-[32%]'}
            />
            <SmallProgramResultCard
              className="mt-5 bg-[#CB36FF]"
              header={'SỐ BÌNH LUẬN'}
              number={result?.countComment}
              color="purple"
              imgSrc={
                'https://ouch-cdn2.icons8.com/wIO0q4i-rhS4_CqIBaaGThi3i4EeHAxKSO_fCdn7zng/rs:fit:256:264/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvODU5/LzM5MGQ5NWFlLWIz/NGItNGQ3Yy1hNmIw/LWFmMmIwZmFmNzU4/YS5wbmc.png'
              }
              imgClassName="w-[100%]"
            />
          </div>
          <div className=" flex flex-col h-full justify-between ">
            <SmallProgramResultCard
              header={'SỐ CHƯƠNG'}
              number={result?.countContent}
              color="green"
              imgSrc={
                'https://ouch-cdn2.icons8.com/YTg-3nEloZ4ai-FGIYWZ5vyyT0QYYpRR4hL0B_K76y4/rs:fit:256:192/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTQz/LzMwZDk2YWEyLWE5/MTgtNGEzOC1hOTMw/LTQ2OTY0ZGRiMmNl/Ny5wbmc.png'
              }
              imgClassName="w-[60%]"
            />
            <SmallProgramResultCard
              className="mt-5"
              header={'SỐ BÀI KIỂM TRA'}
              number={result?.countContent}
              color="red"
              imgSrc={
                'https://ouch-cdn2.icons8.com/oaZ6u_NdjONKx9iYFdqkbajZgZZQVGHKE4MsnVopgl0/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzU3/LzQyMjcyNmEzLTE4/MzktNDA2Ny1hNGY5/LTI3ODk1NGZjYmRm/ZC5wbmc.png'
              }
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
