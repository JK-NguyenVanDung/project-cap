export default function ({
  percentage,
  number,
  icon1,
  icon2,
}: {
  percentage: number;
  number: number | string;
  icon1?: any;
  icon2?: any;
}) {
  return (
    <>
      <div className="  flex flex-col w-fit justify-between min-w-[28rem] ml-4 min-h-[40vh]  bg-dark-blue shadow-2xl rounded-xl p-8">
        <div className="flex w-full items-center">
          <div className="">
            <p className="font-semibold text-lg mr-6 text-white  ">
              Học viên đã hoàn thành:
            </p>
            <p className="font-semibold text-5xl mr-6 my-4 text-white  ">
              {percentage}%
            </p>
            <p className="font-semibold text-lg mr-6 text-white  ">
              Tổng các khóa học
            </p>
          </div>
          <div className="w-[36%]">
            <img
              className="object-cover"
              src="https://ouch-cdn2.icons8.com/3m9a9qB4NjbEC9p-YP5oPVvIu2jllS0hpTwvlM7O9BM/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTE1/LzZmZGJkM2YwLTll/NzQtNDJjYy1hOTcz/LTI2ODc3OGY1ZmE2/ZS5wbmc.png"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            <p className="font-semibold text-lg mr-6 text-white  ">
              Học viên đã làm tổng cộng:
            </p>
            <p className="font-bold text-4xl my-2 text-white ">{number}</p>
            <div className="flex justify-between w-fit">
              <p className="font-semibold text-lg mr-2 text-white  ">
                Bài kiểm tra
              </p>
              <IncreaseIcon />
            </div>
          </div>
          <div className="mr-4">
            <ChartLine />
          </div>
        </div>
      </div>
    </>
  );
}

const IncreaseIcon = () => {
  return (
    <>
      <svg
        width="23"
        height="23"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8.75792" cy="9.24229" r="8.75792" fill="#B5FFCE" />
        <path
          d="M7.56641 6.64062L11.0696 6.64063V10.1438"
          stroke="#43BE83"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.059 6.64062L6.32422 11.3754"
          stroke="#43BE83"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

const Increasing = () => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L15.5 2.5L16 6"
        stroke="#43BE83"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 1V17H17"
        stroke="#43BE83"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 13.5L7.5 8.5L11 10L15 3.5"
        stroke="#43BE83"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const ChartLine = () => {
  return (
    <svg
      width="173"
      height="71"
      viewBox="0 0 173 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.42822 67.0086C29.0875 67.0086 31.8466 28.345 58.6095 28.345C85.0965 28.345 87.5796 47.1895 113.791 47.1895C141.175 47.1895 143.589 3.65234 168.972 3.65234"
        stroke="url(#paint0_linear_1658_5198)"
        stroke-width="6.13125"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1658_5198"
          x1="86.2001"
          y1="3.65234"
          x2="49.7931"
          y2="85.1251"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B7C3F9" />
          <stop offset="1" stop-color="#F7941D" stop-opacity="0.47" />
        </linearGradient>
      </defs>
    </svg>
  );
};
