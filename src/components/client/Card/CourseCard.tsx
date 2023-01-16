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

const HomeContent = () => {
  return (
    <>
      <div className="flex flex-col bg-white h-1/2 border border-white border-4 py-2 px-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-xl font-semibold">Khoá học CNTT</p>
          <IconButton variant="text">
            <AiFillHeart className="text-lg text-gray-400" />
          </IconButton>
        </div>
        <p className="text-body"> HK1 - 2022-2023</p>
        <div className="flex w-[88%] justify-between items-center my-4">
          <div className="flex   items-center">
            <IoPerson className="text-lg mr-2 text-gray-400" />
            Thầy Minh
          </div>
          <div className="flex   items-center">
            <RiTimerFill className="text-lg mr-2 text-gray-400" />
            23 tiếng
          </div>
        </div>
      </div>
    </>
  );
};

const CourseContent = (props: {
  onClick: React.MouseEventHandler;
  item: IProgramItem;
}) => {
  const [like, setLike] = useState(props.item.isLike);
  const [colorHeart, setColorHeart]: any = useState(Color.gray4);
  const [program, setProgram]: any = useState(null);

  const handelLove = (itemProgram?: IProgramItem) => {
    setLike(!like);
    like === false ? setColorHeart(Color.gray4) : setColorHeart(Color.error);
    const fetchLike = async () => {
      const response = await apiService.likeProgram(
        itemProgram.programId,
        like,
      );
      const res = await apiService.getProgram(itemProgram.programId);
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
      <div className="cardCont border min-w-[7rem] h-fit  min-h-[54vh] max-h-[29rem] w-[18rem] rounded-[20px] font-customFont ">
        <div
          className="card hover:border-primary flex
          overflow-hidden flex-col  w-full rounded-[20px] justify-end border-[2px] border-gray-200 " //border-[2px] border-color-[#c3c6ce]
        >
          <div className="h-[40%]  w-full">
            <div className="absolute  tag bg-green-500 px-2 shadow top-[1rem] text-white w-fit min-w-[3.5rem] flex justify-center items-start left-0">
              <div className="relative bg-green-500">
                <p>{getStatus(props.item?.status)}</p>
              </div>
            </div>
            <img
              className="rounded-t-lg object-cover	h-full w-full"
              src={`${API_URL}/images/${props.item.image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${props.item.image}`;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${props.item.image}
              }}
              alt=""
            />
          </div>
          <div className="flex flex-col bg-white h-[60%] rounded-b-2xl py-2 px-4">
            <div className="flex w-full justify-between items-center">
              <div
                className="bg-primary w-fit p-1 text-white  rounded text-xs font-light "
                onClick={props.onClick}
              >
                {props.item?.category?.categoryName}
              </div>
              <div className="flex items-center">
                <span className="text-body text-bold">
                  {program ? program.totalLike : props.item?.totalLike}
                </span>
                <AiFillHeart
                  onClick={() => handelLove(props.item)}
                  color={colorHeart}
                  className="ml-2 text-xl cursor-pointer"
                />
              </div>
            </div>
            <p
              className="text-xl my-2 eclipse-text  max-w-fit 	font-semibold cursor-pointer hover:text-primary"
              onClick={props.onClick}
            >
              {props.item?.programName}
            </p>
            <p className="text-body">
              {`HK${props.item?.semester} - ${props.item?.academicYear?.year}`}{' '}
            </p>
            <div className="h-22 ">
              <p className="text-semibold ">
                {getListLearnerType(props?.item)}
              </p>
              <p className="text-body eclipse">{props.item?.descriptions}</p>
            </div>

            <div className="flex w-full justify-between items-center my-4">
              <div className="flex items-center">
                <IoPerson className="text-lg mr-2 text-gray-400" />
                {props.item?.lecturers}
              </div>
              <div className="flex   items-center">
                <RiTimerFill className="text-lg mr-2 text-gray-400" />
                {props.item?.trainingHours}h
              </div>
            </div>
          </div>
          <button
            className=" outline-none card-button bg-primary"
            onClick={props.onClick}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </>
  );
};
