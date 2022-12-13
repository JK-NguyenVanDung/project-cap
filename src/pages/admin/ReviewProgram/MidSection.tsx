import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import {
  BsFillPlayCircleFill,
  BsFillCheckCircleFill,
  BsPeople,
} from 'react-icons/bs';
import { HiClipboardCheck } from 'react-icons/hi';
import { MdThumbUpOffAlt } from 'react-icons/md';
import View from '../../../assets/svg/View.svg';

import ActiveArrow from '../../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../../assets/svg/NonActiveArrow';
import CustomButton from '../../../components/admin/Button';
import RightSection from './RightSection';
import { BiLike } from 'react-icons/bi';
import { useAppSelector } from '../../../hook/useRedux';
import { IChapterItem, IProgramItem, ITest } from '../../../Type';
import apiService from '../../../api/apiService';
const instruction = [
  'Xem danh sách các khoá học',
  'Nhấn chọn đăng ký để được xét duyệt tham gia đào tạo',
  'Sau khi  được xác duyệt tham gia khoá học, bạn sẽ có thể xem các chương và làm bài tập',
  'Hoàn thành các bài kiểm tra và làm bài kiểm tra cuối cùng để nhận được chứng chỉ',
];
const MidSection = (props: any) => {
  const [currentTab, setCurrentTab] = useState(1);

  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );

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
        <div className="shadow-lg p-6 rounded-xl w-full h-fit text-black bg-white  border flex flex-col justify-start items-center">
          <div className="w-full h-fit font-customFont ">
            <div className="w-full h-[50vh]">
              <img
                className="object-cover w-full h-full	rounded"
                src={
                  program?.image
                    ? program?.image
                    : 'https://all.ie/wp-content/uploads/2015/09/Evening_English_1.jpg'
                }
              />
            </div>
            <p className="py-4 text-2xl font-semibold text-primary">
              {program?.programName ? program?.programName : 'N/A'}
            </p>
            <div className="flex w-full text-base font-light">
              <p>Khoa: </p>
              <span className=" pl-2 pr-4 mr-2 border-r-[1px] font-normal">
                {program?.faculty
                  ? program.faculty.facultyName
                  : 'Chưa có thông tin'}
              </span>
              <p>Giảng viên:</p>
              <span className=" pl-2 pr-4 mr-2 font-normal ">
                {program?.accountIdCreator
                  ? program?.accountIdCreator
                  : 'Chưa có thông tin'}
              </span>
            </div>
            <div className="flex w-full items-center  mt-4 text-base">
              <div className="flex items-center mr-4  font-light">
                <img src={View} className="  mr-2 font-bold  " />
                <span>
                  {props.learnerCount ? props.learnerCount : 0} Người tham gia
                </span>
              </div>
              <div className="flex items-center font-light ">
                <BiLike className="text-[#54577A]  mr-2 font-bold text-xl " />
                <span>{props.like ? props.like : 0} Lượt thích</span>
              </div>
            </div>
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
            {currentTab === 1 && <DescriptionTab program={program} />}

            {currentTab === 2 && <ChapterTab programId={program?.programId} />}
            {currentTab === 3 && <ReviewTab program={program} />}
          </div>
        </div>
      </div>
    </>
  );
};

const ChapterTab = ({ programId }: { programId: number }) => {
  const [chapters, setChapters] = useState(null);

  async function getData() {
    try {
      let res: any = await apiService.getContentProgram(programId);

      let temp = res.reverse();
      if (temp) {
        setChapters(temp);
      }
    } catch (err: any) {
      throw err.message;
    }
  }
  useEffect(() => {
    let time = setTimeout(async () => {
      await getData();
    }, 100);
    return () => {
      clearTimeout(time);
    };
  }, [programId]);
  return (
    <>
      {chapters?.map((item: IChapterItem) => {
        return <ChapterItem chapter={item} />;
      })}
    </>
  );
};
const ChapterItem = ({ chapter }: { chapter: IChapterItem }) => {
  const [show, setShow] = useState(false);
  const [test, setTest] = useState<ITest>(null);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  async function getData() {
    try {
      let test: any = await apiService.getTest(chapter?.contentId);

      if (test) {
        setTest(test);
      }
    } catch (err: any) {
      throw err.message;
    }
  }
  useEffect(() => {
    let time = setTimeout(async () => {
      await getData();
    }, 100);
    return () => {
      clearTimeout(time);
    };
  }, [chapter]);

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
        <p className=" text-base  font-semibold ">
          {chapter?.contentTitle ? chapter.contentTitle : 'N/A'}
        </p>
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
                    {chapter?.contentTitle
                      ? chapter.contentType + ' ' + chapter?.contentTitle
                      : null}
                  </p>
                </div>
                {/* <p className=" text-base font-semibold text-black ">11p20</p> */}
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
                    Bài Kiểm Tra {test?.testTitle ? test?.testTitle : null}
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

const ReviewTab = ({ program }: { program: IProgramItem }) => {
  return (
    <>
      <p className="pt-4 text-xl font-semibold text-black font-bold grid place-items-center	 h-full w-full">
        Chương có bình luận nào
      </p>
    </>
  );
};
const DescriptionTab = ({ program }: { program: IProgramItem }) => {
  return (
    <>
      <p className="pb-4 text-md  text-[#141522]">
        {program?.descriptions ? program.descriptions : 'Chưa có mô tả'}
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
