import { AiFillHeart } from 'react-icons/ai';
import CustomButton from '../../../components/admin/Button';

interface Content {
  title: string;
  subject: string;
  icon?: any;
}
const RightSection = () => {
  return (
    <div className=" rounded-xl w-[25%] text-black bg-white h-fit m-4 p-2 border flex flex-col justify-start items-start">
      <p className="pt-4 text-xl font-semibold text-gray-900 text-center  flex w-full justify-center items-center">
        Ngành Công Nghệ Thông Tin
      </p>
      <CategoryDetail
        header="Người tạo"
        contents={[
          {
            title: 'Tên',
            subject: 'Nguyễn Văn Dũng',
          },
          {
            title: 'Email',
            subject: 'vandung 111@gmail.com',
          },
          {
            title: 'SĐT',
            subject: '0368346742',
          },
        ]}
      />
      <CategoryDetail
        header="Giảng viên"
        contents={[
          {
            title: 'Tên',
            subject: 'Nguyễn Văn Dũng',
          },
        ]}
      />
      <CategoryDetail
        header="Tương tác"
        contents={[
          {
            title: 'Học viên đã tham gia',
            subject: '100',
          },
          {
            title: 'Lượt thích',
            subject: '40',
          },
        ]}
      />

      <CategoryDetail
        header="Thời gian tham gia"
        contents={[
          {
            title: 'Ngày bắt đầu',
            subject: '11/12/2022',
          },
          {
            title: 'Ngày kết thúc',
            subject: '11/12/2022',
          },
          {
            title: 'Số giờ đào tạo',
            subject: '22',
          },
        ]}
      />
      <CategoryDetail
        header="Thời gian đăng ký"
        contents={[
          {
            title: 'Ngày bắt đầu',
            subject: '11/12/2022',
          },
          {
            title: 'Ngày kết thúc',
            subject: '11/12/2022',
          },
        ]}
      />
      <CategoryDetail
        header="Phần thưởng"
        contents={[
          {
            title: 'Số coin thưởng',
            subject: '11',
          },
        ]}
      />
      <div className="flex my-8 flex-col w-full items-center justify-center">
        <CustomButton
          disabled
          noIcon
          color="blue"
          text="Đăng ký tham gia"
          className=" w-[90%] my-2  h-10"
        />{' '}
        <CustomButton
          disabled
          Icon={AiFillHeart}
          color="red"
          text="Yêu thích"
          className=" w-[90%] my-2 h-10"
        />
        <CustomButton
          disabled
          noIcon
          color="blue"
          variant={'outlined'}
          text="Quay lại"
          className=" w-[90%] my-2 h-10"
        />
      </div>
    </div>
  );
};

const CategoryDetail = (props: { header: string; contents: Content[] }) => {
  return (
    <>
      <div className="flex flex-col w-full h-fit pt-4 px-4">
        <p className="pt-4 text-lg font-semibold text-black  ">
          {props.header}
        </p>
        {props.contents.map((item: Content) => {
          return (
            <div className="flex  w-full h-fit justify-between">
              <p className="pt-4 text-sm text-gray-900 ">{item.title}</p>
              <p className="pt-4 text-sm text-black font-semibold ">
                {item.subject}
              </p>
              {item.icon && <item.icon />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RightSection;
