import IconButton from '@material-tailwind/react/components/IconButton';
import React, { memo, useEffect, useState, useMemo } from 'react';
import './Card.css';
import { AiFillHeart } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import { RiTimerFill } from 'react-icons/ri';
import { IProgramItem } from '../../../Type';
import { checkURL } from '../../../helper/constant';
import Color from '../../constant/Color';
import apiService from '../../../api/apiService';
import { message } from 'antd';
import { API_URL } from '../../../api/api';

function getStatus(status: string) {
  switch (status) {
    case 'public':
      return 'Có thể đăng ký  ';
    case 'end':
      return 'Đã kết thúc';
  }
}
function getAttendanceStatus(status: string) {
  switch (status) {
    case 'Attending':
      return 'Đang tham gia';
    case 'Complete':
      return 'Đã hoàn thành';
  }
}
export default memo(function ({
  onClick,
  item,
  isRegistered = false,
}: {
  onClick?: Function;
  item?: IProgramItem;
  isRegistered?: boolean;
}) {
  const memoItem = useMemo(() => {
    return item;
  }, [item]);
  const [like, setLike] = useState(memoItem?.isLike);
  const [totalLike, setTotalLike] = useState(memoItem?.totalLike);

  // const [colorHeart, setColorHeart]: any = useState(Color.gray4);
  console.count(memoItem?.programName + ' re-render');
  const handelLove = (itemProgram?: IProgramItem) => {
    setTotalLike((lastTotal) => (!like ? lastTotal + 1 : lastTotal - 1));
    setLike((like) => !like);
    const fetchLike = async () => {
      await apiService.likeProgram(itemProgram?.programId, like);
    };

    if (itemProgram?.programId) {
      try {
        fetchLike();
      } catch (err: any) {
        throw err.message;
      }
    }
  };
  function getListLearnerType(item: IProgramItem) {
    let out = 'Dành cho: ';
    memoItem?.programPositions.map((e, index) => {
      out += e.position.positionName;
      if (index < item.programPositions.length - 1) {
        out += ', ';
      }
    });
    return out;
  }
  return (
    <>
      <div className="cardCont  mb-32  min-w-[7rem] h-full    max-h-[40vh] w-[18rem] rounded-[20px] font-customFont ">
        <div
          className="card shadow-lg  border-[2px] border-white hover:border-primary hover:transition-colors	 hover:ease-in-out flex
          overflow-hidden flex-col  w-full rounded-[20px] justify-end hover:border-[3px]  " //border-[2px] border-color-[#c3c6ce]
        >
          <div className="max-h-[40vh] h-[25vh]  w-full">
            {!isRegistered ? (
              <div
                className={`absolute  tag ${
                  memoItem?.status === 'public' ? 'bg-green-600' : 'bg-red-600'
                } px-2 shadow top-[1rem] text-white w-fit min-w-[3.5rem] flex justify-center items-start left-[-4px]`}
              >
                <div
                  className={`relative ${
                    memoItem?.status === 'public'
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  } `}
                >
                  <p>{getStatus(memoItem?.status)}</p>
                </div>
              </div>
            ) : (
              <div
                className={`absolute  tag ${
                  memoItem?.learners[0]?.status === 'Attending'
                    ? 'bg-blue-600'
                    : 'bg-cyan-600'
                } px-2 shadow top-[1rem] text-white w-fit min-w-[3.5rem] flex justify-center items-start left-[-4px]`}
              >
                <div
                  className={`relative ${
                    memoItem?.learners[0]?.status === 'Attending'
                      ? 'bg-blue-600'
                      : 'bg-cyan-600'
                  } `}
                >
                  <p>{getAttendanceStatus(memoItem?.learners[0]?.status)}</p>
                </div>
              </div>
            )}
            <img
              className="rounded-t-lg object-cover	h-full w-full"
              src={`${API_URL}/images/${item.image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
              }}
              alt=""
            />
          </div>
          <div className="flex flex-col bg-white h-[60%] rounded-b-2xl py-2 px-4">
            <div className="flex w-full justify-between items-center">
              <div
                className="bg-primary w-fit p-1 text-white  rounded text-xs font-light "
                onClick={() => onClick(item)}
              >
                {memoItem?.category?.categoryName}
              </div>
              <div className="flex items-center">
                <span className="text-body text-bold">
                  {totalLike ?? totalLike}
                </span>
                <AiFillHeart
                  onClick={() => handelLove(item)}
                  color={!like ? Color.gray4 : Color.error}
                  className="ml-2 text-xl cursor-pointer"
                />
              </div>
            </div>
            <p
              className="text-xl my-2 eclipse-text  max-w-fit 	font-semibold cursor-pointer hover:text-primary"
              onClick={() => onClick(item)}
            >
              {memoItem?.programName}
            </p>
            <p className="text-body">
              {`HK${memoItem?.semester} - ${memoItem?.academicYear?.year}`}{' '}
            </p>
            <div className="h-22 ">
              <p className="text-semibold eclipse-text">
                {getListLearnerType(item)}
              </p>
              <p className="text-body eclipse min-h-[3rem]">
                {memoItem?.descriptions}
              </p>
            </div>

            <div className="flex w-full justify-between items-center my-4">
              <div className="flex items-center">
                <IoPerson className="text-lg mr-2 text-gray-400" />
                {memoItem?.lecturers}
              </div>
              <div className="flex   items-center">
                <RiTimerFill className="text-lg mr-2 text-gray-400" />
                {memoItem?.trainingHours}h
              </div>
            </div>
          </div>
          <button
            className=" outline-none card-button bg-primary"
            onClick={() => onClick(item)}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </>
  );
});

export const SmallCourseCard = ({
  data,
  onClick,
}: {
  data: IProgramItem;
  onClick?: any;
}) => {
  const [like, setLike] = useState(data?.isLike);
  const [totalLike, setTotalLike] = useState(data?.totalLike);

  const handelLove = (itemProgram?: IProgramItem) => {
    setTotalLike((lastTotal) => (!like ? lastTotal + 1 : lastTotal - 1));
    setLike((like) => !like);
    const fetchLike = async () => {
      await apiService.likeProgram(itemProgram?.programId, like);
    };

    if (itemProgram?.programId) {
      try {
        fetchLike();
      } catch (err: any) {
        throw err.message;
      }
    }
  };

  return (
    <>
      <div className="cardCont w-fit min-w-[17rem] max-w-[17rem] rounded-[20px] bg-white  flex flex-col h-1/2  my-8">
        <div
          className="card shadow-lg  border-[2px] border-white hover:border-primary hover:transition-colors	 hover:ease-in-out flex 
          overflow-hidden flex-col  w-full rounded-[20px] justify-end hover:border-[3px]  " //border-[2px] border-color-[#c3c6ce]
        >
          <div className="max-h-[40vh] h-[25vh]  w-full">
            {/* {!data.isRegistered && (
            <div className="absolute  tag bg-green-500 px-2 shadow top-[1rem] text-white w-fit min-w-[3.5rem] flex justify-center items-start left-[-4px]">
              <div className="relative bg-green-500">
                <p>{getStatus(data?.status)}</p>
              </div>
            </div>
          )} */}
            <img
              className="rounded-lg object-cover	h-full w-full"
              src={`${API_URL}/images/${data.image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
              }}
              alt=""
            />
          </div>
          <div className="py-2 px-4 ">
            <div className="flex w-full justify-between items-center ">
              <p className="text-lg my-2 eclipse-text  max-w-fit w-fit font-semibold cursor-pointer hover:text-primary">
                {data.programName}
              </p>
              <div className="flex items-center">
                <span className="text-body text-bold">
                  {data ? totalLike : data?.totalLike}
                </span>
                <AiFillHeart
                  onClick={() => handelLove(data)}
                  color={!like ? Color.gray4 : Color.error}
                  className="ml-2 text-xl cursor-pointer"
                />
              </div>
            </div>
            <p className="text-body">
              {' '}
              {`HK${data?.semester} - ${data?.academicYear?.year}`}{' '}
            </p>
            <div className="flex w-[88%] justify-between items-center my-4">
              <div className="flex   items-center">
                <IoPerson className="text-lg mr-2 text-gray-400" />
                {data.lecturers}
              </div>
              <div className="flex   items-center">
                <RiTimerFill className="text-lg mr-2 text-gray-400" />
                {data.trainingHours}h
              </div>
            </div>
          </div>
          <button
            className=" outline-none card-button bg-primary"
            onClick={onClick}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </>
  );
};
