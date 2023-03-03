export default function ({
  header,
  number,
  color = 'green',

  className,
}: {
  header: string;
  number: number;
  color?: string;

  className?: string;
}) {
  return (
    <>
      <div
        className={` hover:scale-105 w-[10.8rem] h-[22vh] bg-${color}-400 bg-opacity-20  rounded-xl opacity-100 shadow-xl pl-4 py-4 shadow-${color}-600 flex flex-col justify-between ${className}`}
      >
        <div className="">
          <p className="text-xl font-bold text-gray-800">{header}</p>
        </div>
        <div
          className={`flex h-fit w-full  justify-between pr-4 text-${color}`}
        >
          <div className={`w-[5px] h-full bg-${color}-500 rounded`}></div>
          <p className={`text-4xl w-fit font-bold text-${color}-500`}>
            {number}
          </p>
        </div>
      </div>
    </>
  );
}
