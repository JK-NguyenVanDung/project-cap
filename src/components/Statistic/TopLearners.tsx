import { API_URL } from '../../api/api';
import Default from '../../assets/img/default.png';
import { useAppSelector } from '../../hook/useRedux';
export default function ({
  data,
}: {
  data: Array<{
    email: string;
    countComplete: number;
    sumTrainingHour: number;
    avatar: string;
  }>;
}) {
  const info = useAppSelector((state) => state.auth.info);

  return (
    <>
      <div className="flex flex-col w-[50%]  h-fit ml-12 ">
        <p className="text-2xl font-bold mb-2">Top thành tích</p>
        {data.map((item) => {
          return (
            <Learner
              name={item.email}
              point={item.sumTrainingHour}
              courseFinished={item.countComplete}
              avatar={item.avatar}
            />
          );
        })}
      </div>
    </>
  );
}

function Learner({
  name,
  point,
  courseFinished,
  avatar,
}: {
  name: string;
  point: number;
  courseFinished: number;
  avatar?: string;
}) {
  return (
    <>
      <div className="flex justify-between border-b p-2 my-4 pb-4 text-base">
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
            <p className="">{point} điểm</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className="text-sm font-light">
            Đã hoàn thành {courseFinished} khóa học
          </p>
        </div>
      </div>
    </>
  );
}
