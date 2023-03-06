import Default from '../../assets/img/default.png';
export default function ({
  data,
}: {
  data: Array<{
    email: string;
    countComplete: number;
    sumTrainingHour: number;
  }>;
}) {
  return (
    <>
      <div className="flex flex-col w-[50%]  h-fit ml-12">
        <p className="text-2xl font-bold">Top thành tích</p>
        {data.map((item) => {
          return (
            <Learner
              name={item.email}
              point={item.sumTrainingHour}
              courseFinished={item.countComplete}
            />
          );
        })}
      </div>
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
      <div className="flex justify-between border-b p-2 my-4 pb-6 text-base">
        <div className="w-fit h-fit flex">
          <img
            className="object-contain	w-[15%]  mr-4"
            src={image ? image : Default}
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
