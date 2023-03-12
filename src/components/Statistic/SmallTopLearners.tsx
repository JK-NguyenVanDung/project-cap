import { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import Default from '../../assets/img/default.png';
export default function () {
  const [data, setData] = useState<any>(null);
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
      {data && (
        <div className=" py-4 my-2 relative  flex flex-col max-w-full justify-center text-center items-center  w-fit  h-fit  border-[6px] border-brown-500 rounded-xl ">
          <div className="absolute w-20 h-6 border-[#C0C0C0	] border-2 bg-[#ececec] rounded top-[-4%]"></div>
          <p className="text-base font-bold mb-2">Top thành tích</p>
          <div className="p-4">
            {data?.accountRankings?.map(
              (item: {
                email: string;
                countComplete: number;
                sumTrainingHour: number;
              }) => {
                return (
                  <Learner
                    name={item.email}
                    point={item.sumTrainingHour}
                    courseFinished={item.countComplete}
                  />
                );
              },
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Learner({
  image,
  name,
  point,
  courseFinished,
}: {
  image?: string;
  name: string;
  point: number;
  courseFinished: number;
}) {
  return (
    <>
      <div className="flex justify-between border-b p-1 text-xs ">
        <div className="w-fit h-fit flex">
          <img
            className="object-contain	w-[10%]  mr-1"
            src={image ? image : Default}
          />
          <div className="flex flex-col justify-start items-start">
            <p className="font-bold ">{name.split('@')[0]}</p>
            <p className="">{point} điểm</p>
          </div>
        </div>
      </div>
    </>
  );
}
