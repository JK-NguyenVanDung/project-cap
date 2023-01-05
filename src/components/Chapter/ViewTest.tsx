import { API_URL } from '../../api/api';
import { IProgramItem, IAccountItem } from '../../Type';
import { BiLike } from 'react-icons/bi';
import View from '../../assets/svg/View.svg';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
export default function (props: any) {
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  return (
    <>
      <div className="w-full h-[50vh]">
        <div className="h-full w-full border border-border-gray rounded-xl">
          <div
            // ref={ref}
            className="py-8 "
            dangerouslySetInnerHTML={{ __html: props.iframe }}
          />
        </div>
      </div>
      <p className="py-4 text-2xl font-semibold text-primary">
        {program?.programName ? program?.programName : 'N/A'}
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
        <div className="flex items-center mr-4  font-light">
          <img src={View} className="  mr-2 font-bold  " />
          <span>
            {props.learnerCount ? props.learnerCount : 0} Người tham gia
          </span>
        </div>
        <div className="flex items-center font-light ">
          <BiLike className="text-[#54577A]  mr-2 font-bold text-xl " />
          <span>{program?.totalLike ? program.totalLike : 0} Lượt thích</span>
        </div>
      </div>
      <p className="py-4 text-md  text-[#141522]">
        {program?.descriptions ? program.descriptions : 'Chưa có mô tả'}
      </p>
    </>
  );
}
