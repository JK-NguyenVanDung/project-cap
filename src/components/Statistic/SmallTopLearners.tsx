import { useState, useEffect, memo } from 'react';
import apiService from '../../api/apiService';
import Default from '../../assets/img/default.png';
import { Avatar } from '@material-tailwind/react';
import { useAppSelector } from '../../hook/useRedux';
import { API_URL } from '../../api/api';
export default memo(function () {
  const [data, setData] = useState<any>(null);
  async function getData() {
    try {
      let res: any = await apiService.getRanking();
      setData(res);
    } catch (err: any) {}
  }
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data && (
        <div className="my-2 relative  flex flex-col max-w-full justify-center text-center items-center  w-fit  h-fit  border-[6px] border-brown-500 rounded-xl ">
          <div className="absolute w-20 h-4 border-[#C0C0C0	] border-2 bg-[#ececec] rounded top-[-4%]"></div>
          <p className="text-base font-bold pt-2">Top thành tích</p>
          <div className="pb-2 ">
            {data?.map(
              (item: {
                email: string;
                countComplete: number;
                sumTrainingHour: number;
                avatar: string;
              }) => {
                return (
                  <Learner
                    name={item.email}
                    point={item.sumTrainingHour}
                    avatar={item.avatar}
                  />
                );
              },
            )}
          </div>
        </div>
      )}
    </>
  );
});

function Learner({
  image,
  name,
  point,
  avatar,
}: {
  image?: string;
  name: string;
  point: number;
  avatar: string;
}) {
  return (
    <>
      <div className="flex justify-between border-b p-1 text-xs ml-2 ">
        <div className="w-fit h-fit flex">
          <img
            className="object-contain	w-[10%]  mr-1"
            src={avatar ? `${API_URL}/images/${avatar}` : Default}
            alt="avatar"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = Default;
              // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
            }}
          />

          <div className="flex flex-col justify-start items-start">
            <p className="font-bold ">{name.split('@')[0]}</p>
            <p className="">{point} giờ</p>
          </div>
        </div>
      </div>
    </>
  );
}
