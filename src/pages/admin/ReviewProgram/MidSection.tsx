import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import { BsFillPlayCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { HiClipboardCheck } from 'react-icons/hi';

import ActiveArrow from '../../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../../assets/svg/NonActiveArrow';
import CustomButton from '../../../components/admin/Button';
import RightSection from './RightSection';
const instruction = [
  'Xem danh sách các khoá học',
  'Nhấn chọn đăng ký để được xét duyệt tham gia đào tạo',
  'Sau khi  được xác duyệt tham gia khoá học, bạn sẽ có thể xem các chương và làm bài tập',
  'Hoàn thành các bài kiểm tra và làm bài kiểm tra cuối cùng để nhận được chứng chỉ',
];
const MidSection = () => {
  const [currentTab, setCurrentTab] = useState(1);
  function getTitle() {
    let out = '';
    if (currentTab === 1) {
      out = 'Mô tả';
    } else if (currentTab === 2) {
      out = 'Danh sách chương trình';
    } else {
      out = 'Bình luận';
    }
    return out;
  }
  return (
    <>
      <div className=" w-[60%]  h-fit my-4 mx-2 flex flex-col justify-start items-center">
        <div className="shadow-lg p-6 rounded-xl w-full h-[70vh] text-black bg-white  border flex flex-col justify-start items-center">
          <div className="w-full h-[90%]">
            <img
              className="object-cover w-full h-full	rounded"
              src={
                'https://all.ie/wp-content/uploads/2015/09/Evening_English_1.jpg'
              }
            />
            <p className="py-4 text-xl font-semibold text-primary">
              Khoá học Lập trình Mobile App Android
            </p>
          </div>
        </div>
        <div className=" mt-8  flex w-full justify-between items-center">
          <CustomButton
            noIcon
            color="blue"
            variant={currentTab !== 1 && 'outlined'}
            text="Giới thiệu khoá học"
            className=" w-[30%] h-10"
            onClick={() => setCurrentTab(1)}
          />
          <CustomButton
            noIcon
            color="blue"
            variant={currentTab !== 2 && 'outlined'}
            text="Chương trình đào tạo"
            className=" w-[30%] h-10"
            onClick={() => setCurrentTab(2)}
          />
          <CustomButton
            noIcon
            color="blue"
            variant={currentTab !== 3 && 'outlined'}
            text="Bình luận"
            className=" w-[30%] h-10"
            onClick={() => setCurrentTab(3)}
          />
        </div>
        <div className=" shadow-lg rounded-xl w-full  h-fit  text-black bg-white  my-4 pb-8 border flex flex-col justify-start items-start px-4">
          <p className="pt-4 text-xl font-semibold text-black font-bold">
            {getTitle()}
          </p>
          <div className=" py-6 min-h-[10rem] w-full h-full">
            {currentTab === 1 && <DescriptionTab />}

            {currentTab === 2 && <ChapterTab />}
            {currentTab === 3 && <ReviewTab />}
          </div>
        </div>
      </div>
    </>
  );
};

const ChapterTab = () => {
  return (
    <>
      <ChapterItem />
      <ChapterItem />
    </>
  );
};
const ChapterItem = () => {
  const [show, setShow] = useState(false);

  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);
  return (
    <div
      ref={parent}
      className="flex flex-col w-full h-full mb-6 bg-gray-100  rounded-xl"
    >
      <div
        className={`flex justify-start items-center px-6   w-full ${
          show ? 'bg-primary  text-white ' : 'bg-gray-100  text-black '
        }  rounded-xl h-14  py-4`}
      >
        <button className="pr-4" onClick={reveal}>
          {show ? <ActiveArrow /> : <NonActiveArrow />}
        </button>
        <p className=" text-base  font-semibold ">Chương 1: Giới thiệu</p>
      </div>
      {show && (
        <>
          <div className="content mx-6 mt-4">
            <div className="">
              <div className="flex justify-between items-center px-6  w-full rounded-xl bg-white h-14 ">
                <div className="flex">
                  <button className="pr-4">
                    <BsFillPlayCircleFill className="text-primary text-lg" />
                  </button>
                  <p className=" text-base font-semibold text-black ">
                    Video Giới thiệu
                  </p>
                </div>
                <p className=" text-base font-semibold text-black ">11p20</p>
              </div>
            </div>
          </div>
          <div className="content mx-6 my-4">
            <div className="">
              <div className="flex justify-between items-center pl-[1.4rem] pr-6 w-full rounded-xl bg-white h-14 ">
                <div className="flex">
                  <button className="pr-3 ">
                    <HiClipboardCheck className="text-primary text-2xl" />
                  </button>
                  <p className=" text-base font-semibold text-black ">
                    Bài kiểm tra giới thiệu
                  </p>
                </div>
                <p className=" text-base font-semibold text-black ">10 câu</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ReviewTab = () => {
  return (
    <>
      <p className="pt-4 text-xl font-semibold text-black font-bold grid place-items-center	 h-full w-full">
        Chương có bình luận nào
      </p>
    </>
  );
};
const DescriptionTab = () => {
  return (
    <>
      <p className="pb-4 text-md  text-[#141522]">
        Làm theo video hướng dẫn ở trên. Hiểu cách sử dụng từng công cụ trong
        ứng dụng Android Studio. Đồng thời học cách tạo ra một thiết kế tốt và
        đúng đắn. Bắt đầu từ khoảng cách, kiểu chữ, nội dung và nhiều thứ bậc
        thiết kế khác. Sau đó, cố gắng tự làm nó bằng trí tưởng tượng và cảm
        hứng của bạn.
      </p>
      <p className="pt-4 text-xl font-semibold text-black font-bold">
        Cách tham gia đào tạo
      </p>
      <div className="flex flex-col justify-between">
        {instruction.map((item: string, index: number) => {
          return (
            <>
              <div className="flex w-full items-center mt-6" key={index}>
                <BsFillCheckCircleFill className="mr-4 text-primary" />
                <p className=" text-md  text-black font-semibold">{item}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MidSection;
