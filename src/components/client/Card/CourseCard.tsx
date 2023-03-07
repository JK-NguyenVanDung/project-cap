import IconButton from '@material-tailwind/react/components/IconButton';
import React, { useEffect, useState } from 'react';
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
  }
}
export default function (props: any) {
  return (
    <>
      <CourseContent {...props} />
    </>
  );
}

export const SmallCourseCard = ({
  data,
  navToSurvey,
}: {
  data: IProgramItem;
  navToSurvey: Function;
}) => {
  return (
    <>
      <div className="w-fit min-w-[17rem]   flex flex-col bg-white h-1/2 border-white border-4 py-2 px-4 rounded-xl shadow-lg m-4">
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
        <div className="flex w-full justify-between items-center">
          <p className="text-lg my-2 eclipse-text  max-w-fit 	font-semibold cursor-pointer hover:text-primary">
            {data.programName}
          </p>
          <IconButton variant="text">
            <AiFillHeart className="text-lg text-gray-400" />
          </IconButton>
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
    </>
  );
};

const CourseContent = ({
  onClick,
  item,
  isRegistered = false,
}: {
  onClick: React.MouseEventHandler;
  item: IProgramItem;
  isRegistered: boolean;
}) => {
  const [like, setLike] = useState(item.isLike);
  const [colorHeart, setColorHeart]: any = useState(Color.gray4);
  const [program, setProgram]: any = useState(null);

  const handelLove = (itemProgram?: IProgramItem) => {
    setLike(!like);
    like === false ? setColorHeart(Color.gray4) : setColorHeart(Color.error);
    const fetchLike = async () => {
      const response = await apiService.likeProgram(
        itemProgram?.programId,
        like,
      );
      const res = await apiService.getProgram(itemProgram?.programId);
      setProgram(res);
    };
    fetchLike();
  };
  useEffect(() => {
    handelLove();
  }, []);
  function getListLearnerType(item: IProgramItem) {
    let out = 'Dành cho: ';
    item?.programPositions.map((e, index) => {
      out += e.position.positionName;
      if (index < item.programPositions.length - 1) {
        out += ', ';
      }
    });
    return out;
  }
  return (
    <>
      <div className="cardCont border  mb-32  min-w-[7rem] h-full    max-h-[40vh] w-[18rem] rounded-[20px] font-customFont ">
        <div
          className="card border-[2px] border-gray-300 hover:border-primary flex
          overflow-hidden flex-col  w-full rounded-[20px] justify-end hover:border-[3px]  " //border-[2px] border-color-[#c3c6ce]
        >
          <div className="max-h-[40vh] h-[25vh]  w-full">
            {!isRegistered && (
              <div className="absolute  tag bg-green-500 px-2 shadow top-[1rem] text-white w-fit min-w-[3.5rem] flex justify-center items-start left-[-4px]">
                <div className="relative bg-green-500">
                  <p>{getStatus(item?.status)}</p>
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
                onClick={onClick}
              >
                {item?.category?.categoryName}
              </div>
              <div className="flex items-center">
                <span className="text-body text-bold">
                  {program ? program.totalLike : item?.totalLike}
                </span>
                <AiFillHeart
                  onClick={() => handelLove(item)}
                  color={colorHeart}
                  className="ml-2 text-xl cursor-pointer"
                />
              </div>
            </div>
            <p
              className="text-xl my-2 eclipse-text  max-w-fit 	font-semibold cursor-pointer hover:text-primary"
              onClick={onClick}
            >
              {item?.programName}
            </p>
            <p className="text-body">
              {`HK${item?.semester} - ${item?.academicYear?.year}`}{' '}
            </p>
            <div className="h-22 ">
              <p className="text-semibold ">{getListLearnerType(item)}</p>
              <p className="text-body eclipse min-h-[3rem]">
                {item?.descriptions}
              </p>
            </div>

            <div className="flex w-full justify-between items-center my-4">
              <div className="flex items-center">
                <IoPerson className="text-lg mr-2 text-gray-400" />
                {item?.lecturers}
              </div>
              <div className="flex   items-center">
                <RiTimerFill className="text-lg mr-2 text-gray-400" />
                {item?.trainingHours}h
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
