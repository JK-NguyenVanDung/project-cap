import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IProgramItem } from '../../Type';

const instruction = [
  'Xem danh sách các khoá học',
  'Nhấn chọn đăng ký để được xét duyệt tham gia đào tạo',
  'Sau khi  được xác duyệt tham gia khoá học, bạn sẽ có thể xem các chương và làm bài tập',
  'Hoàn thành các bài kiểm tra và làm bài kiểm tra cuối cùng để nhận được chứng chỉ',
];
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
export default DescriptionTab;
