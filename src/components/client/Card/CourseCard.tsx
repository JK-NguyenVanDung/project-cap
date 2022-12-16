import IconButton from '@material-tailwind/react/components/IconButton';
import React from 'react';
import './Card.css';
import { AiFillHeart } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import { RiTimerFill } from 'react-icons/ri';
import { IProgramItem } from '../../../Type';

export default function (props: any) {
  return (
    <>
      {/* <div className="cardCont rounded-[20px] font-customFont">
        <div
          className="card hover:border-primary flex  overflow-hidden flex-col min-w-[5rem]  min-h-[40vh] w-[16rem] h-36 rounded-[20px] justify-end border-[2px] border-white " //border-[2px] border-color-[#c3c6ce]
          style={{
            backgroundImage: `url(${'https://www.lvchn.edu.vn/images/medium/2020/08/03/free-online-course-on-learning-to-teach-online-1024x577.jpeg'})`,
          }}
        >
          <HomeContent />
          <button className="card-button bg-primary">Xem chi tiết</button>
        </div>
      </div> */}
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
  function checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  return (
    <>
      <div className="cardCont rounded-[20px] font-customFont ">
        <div
          className="card hover:border-primary flex  
          bg-contain 	
          bg-no-repeat
          bg-clip-border	
          overflow-hidden flex-col min-w-[5rem]  min-h-[50vh] w-[18rem] h-[44vh] rounded-[20px] justify-end border-[2px] border-white " //border-[2px] border-color-[#c3c6ce]
          style={{
            backgroundImage: `url(${
              !checkURL(props.item.image)
                ? props.item.image
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
            })`,
          }}
        >
          <div className="flex flex-col bg-white h-[60%] rounded-b-2xl py-2 px-4">
            <div
              className="bg-primary w-fit p-1 text-white  rounded text-xs font-light "
              onClick={props.onClick}
            >
              {props.item?.category?.categoryName}
            </div>
            <div className="flex w-full justify-between items-center my-2">
              <p
                className="text-xl font-semibold cursor-pointer hover:text-primary"
                onClick={props.onClick}
              >
                {props.item?.programName}
              </p>
              <AiFillHeart className="text-lg text-gray-400" />
            </div>
            <p className="text-body">
              {' '}
              {`HK${props.item?.semester} - ${props.item?.academicYear.year}`}{' '}
            </p>
            <div className="h-20 ">
              <p className="text-body eclipse">{props.item?.descriptions}</p>
            </div>

            <div className="flex w-full justify-between items-center my-4">
              <div className="flex   items-center">
                <IoPerson className="text-lg mr-2 text-gray-400" />
                Thầy Minh
              </div>
              <div className="flex   items-center">
                <RiTimerFill className="text-lg mr-2 text-gray-400" />
                23 tiếng
              </div>
            </div>
          </div>{' '}
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
