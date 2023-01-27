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

function getStatusColor(status: string) {
  switch (status) {
    case 'UnApproved':
      return 'bg-blue-600';
    case 'Approved':
      return 'bg-green-500';
    case 'Refuse':
      return 'bg-red-500';
  }
}
function getStatus(status: string) {
  switch (status) {
    case 'UnApproved':
      return 'Chưa được duyệt ';
    case 'Approved':
      return 'Đã duyệt ';
    case 'Refuse':
      return 'Từ chối ';
  }
}
export default function (props: any) {
  return (
    <>
      <CourseContent {...props} />
    </>
  );
}

const CourseContent = (props: {
  onClick: any;
  item: IProgramItem;
  registerStatus: string;
  seeReason: any;
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
  // function getListLearnerType(item: IProgramItem) {
  //   let out = 'Dành cho: ';
  //   item?.programPositions.map((e, index) => {
  //     out += e.position.positionName;
  //     if (index < item.programPositions.length - 1) {
  //       out += ', ';
  //     }
  //   });
  //   return out;
  // }
  return (
    <>
      <div className="cardCont border min-w-[7rem] h-fit  min-h-[28vh] max-h-[29rem] w-[18rem] rounded-[20px] font-customFont ">
        <div
          className={`card ${
            props.registerStatus == 'Refuse'
              ? 'hover:border-orange-500'
              : 'hover:border-red-500'
          } flex overflow-hidden flex-col  w-full rounded-[20px] justify-end border-[2px] border-gray-200 `} //border-[2px] border-color-[#c3c6ce]
        >
          <div className="h-[30vh]  w-full">
            <img
              className="rounded-t-lg object-cover	h-full w-full"
              src={`${API_URL}/images/${props.item.image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${props.item.image}
              }}
              alt=""
            />
          </div>
          <div className="flex flex-col bg-white h-[60%] rounded-b-2xl py-2 px-4 pb-4">
            <div className="flex w-full justify-between items-center">
              <div
                className={`${getStatusColor(
                  props.registerStatus,
                )} w-fit p-1 text-white  rounded text-xs font-light `}
                onClick={props.onClick}
              >
                {getStatus(props.registerStatus)}
              </div>
              <div className="flex items-center">
                {/* <span className="text-body text-bold">
                  {program ? program.totalLike : props.item?.totalLike}
                </span>
                <AiFillHeart
                  onClick={() => handelLove(props.item)}
                  color={colorHeart}
                  className="ml-2 text-xl cursor-pointer"
                /> */}
              </div>
            </div>
            <p
              className="text-xl my-2 mt-4 eclipse-text  max-w-fit 	font-semibold cursor-pointer hover:text-primary"
              onClick={props.onClick}
            >
              {props.item?.programName}
            </p>
            {/* <p className="text-body">
              {`HK${props.item?.semester} - ${props.item?.academicYear?.year}`}
            </p>
            <div className="h-22 ">
              <p className="text-semibold ">
                {getListLearnerType(props?.item)}
              </p>
              <p className="text-body eclipse">{props.item?.descriptions}</p>
            </div> */}

            <div className="flex w-full justify-between items-center my-4 ">
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
          {props.registerStatus == 'Approved' ? (
            <></>
          ) : (
            <button
              className={` outline-none card-button ${
                props.registerStatus == 'Refuse'
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}
              onClick={() =>
                props.registerStatus == 'Refuse'
                  ? props.seeReason()
                  : props.onClick()
              }
            >
              {props.registerStatus == 'Refuse' ? 'Xem lý do' : 'Huỷ đăng ký'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
