import moment from 'moment';
import { FaChartLine } from 'react-icons/fa';
import { FcAreaChart } from 'react-icons/fc';

export default function ({
  title,
  number,
  icon1,
  icon2,
  longHeader,
  color,
}: {
  title: string;
  number: number | string;
  icon1?: any;
  icon2?: any;
  longHeader?: boolean;
  color?: string;
}) {
  return (
    <>
      <div
        className={`flex flex-col w-fit mx-2 justify-between min-w-[16rem]  border border-${[
          color ? color : '#C7D0FF',
        ]} rounded-xl p-8 shadow-xl ${color} bg-opacity-30`}
      >
        <div className="flex w-full items-center">
          <p className="font-semibold text-base mr-4">{title}</p>{' '}
          {!longHeader && (icon1 ? icon1 : <Increasing />)}
        </div>
        {!longHeader ? (
          <p className="font-bold text-4xl my-2">{number}</p>
        ) : (
          <div className="flex w-full items-center justify-between">
            <p className="font-bold text-4xl my-2 mr-4">{number}</p>
            {icon1 ? icon1 : <Increasing />}
          </div>
        )}
        <div className="flex justify-between">
          {/* {icon2 ? icon2 : <IncreaseIcon />} */}
          <FaChartLine className={`text-xl text-[${color}}]`} />
          {/* <p className="font-semibold ">2022 - {moment().year()}</p> */}
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
