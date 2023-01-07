import { API_URL } from '../../api/api';
import { IProgramItem, IAccountItem, IChapterItem } from '../../Type';
import { BiLike } from 'react-icons/bi';
import View from '../../assets/svg/View.svg';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { useRef, useEffect, useState } from 'react';
export default function (props: any) {
  const ref = useRef(null);
  const iframeRef = useRef(null);
  const [frame, setFrame] = useState(null);
  const [unLock, setUnLock] = useState(false);
  const dispatch = useAppDispatch();

  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const selectedChapter: IChapterItem = useAppSelector(
    (state) => state.product.selectedChapter,
  );

  useEffect(() => {
    // console.log(ref.current?.children[0]?.src);
    setFrame(ref.current?.children[0]?.src);
  }, [selectedChapter]);
  return (
    <>
      <div
        ref={ref}
        className="py-8 hidden "
        dangerouslySetInnerHTML={{ __html: selectedChapter?.content }}
      />
      <div className="w-full h-[50vh]">
        <div className="h-full w-full border border-border-gray rounded-xl">
          <iframe
            ref={iframeRef}
            src={frame}
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
      <p className="py-4 w-full text-2xl h-fit font-semibold text-primary eclipse-wrap">
        {selectedChapter?.contentTitle ? selectedChapter?.contentTitle : 'N/A'}
      </p>
      <div className="flex w-full text-base font-light">
        <p>Khoa: </p>
        <span className=" pl-2 pr-4 mr-2 border-r-[1px] font-normal">
          {props.faculty ? props.faculty : 'Chưa có thông tin'}
        </span>
        <p>Giảng viên:</p>
        <span className=" pl-2 pr-4 mr-2 font-normal ">
          {program?.lecturers ? program.lecturers : 'Chưa có thông tin'}
        </span>
      </div>
      <div className="flex w-full items-center  mt-4 text-base">
        {/* <div className="flex items-center mr-4  font-light">
          <img src={View} className="  mr-2 font-bold  " />
          <span>
            {props.learnerCount ? props.learnerCount : 0} Người tham gia
          </span>
        </div>
        <div className="flex items-center font-light ">
          <BiLike className="text-[#54577A]  mr-2 font-bold text-xl " />
          <span>{program?.totalLike ? program.totalLike : 0} Lượt thích</span>
        </div> */}
      </div>
      <p className="pb-2 text-lg  text-[#141522]">Mô tả</p>
      <p className="pb-4 text-md  text-[#141522]">
        {selectedChapter?.contentDescription
          ? selectedChapter.contentDescription
          : 'Chưa có mô tả'}
      </p>
    </>
  );
}
