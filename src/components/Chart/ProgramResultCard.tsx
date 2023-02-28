export default function ({
  header,
  number,
  color = 'green',
  imgSrc,
}: {
  header: string;
  number: number;
  color?: string;
  imgSrc: string;
}) {
  return (
    <>
      <div
        className={` hover:scale-105 w-[14.5rem] h-[20vh] bg-${color}-500 rounded-xl opacity-90 shadow-2xl pl-4 py-4 shadow-${color}-600 flex `}
      >
        <div className="flex w-full flex-col h-full justify-between text-white">
          <p className="text-xl font-bold">{header}</p>

          <p className="text-4xl font-bold">{number}</p>
        </div>
        <div className="w-fit ">
          <img src={imgSrc} alt="Student Illustration"></img>
        </div>
      </div>
    </>
  );
}
