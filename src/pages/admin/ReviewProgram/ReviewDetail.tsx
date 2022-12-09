import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import logo from '../../../assets/logo.svg';
import { Button } from '@material-tailwind/react';
import CustomButton from '../../../components/admin/Button';
import { BsFillCheckCircleFill } from 'react-icons/bs';
const instruction = [
  'Xem danh sách các khoá học',
  'Nhấn chọn đăng ký để được xét duyệt tham gia đào tạo',
  'Sau khi  được xác duyệt tham gia khoá học, bạn sẽ có thể xem các chương và làm bài tập',
  'Hoàn thành các bài kiểm tra và làm bài kiểm tra cuối cùng để nhận được chứng chỉ',
];

const ReviewDetail = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="bg-gray-100 w-full h-full">
        <div className="w-full h-14 flex items-center justify-between shadow-lg py-4  bg-white text-black">
          <a
            onClick={() => {
              navigation('/admin');
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
            }}
            className=" hover:text-white relative my-2 pl-4  px-2 flex flex-row items-center justify-start"
          >
            <img className="w-[3%] h-full" src={logo} />
            <p className="text-lg text-center mx-2"> VLG TRAINING</p>
          </a>
          <div className="">
            <HeaderAdmin />
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div className="fixed shadow-md rounded-xl w-[15%] text-black bg-white h-fit m-4  p-4 pl-4 border flex flex-col justify-start items-center">
            <p className="border-b-2  text-2xl text-center text-primary border-primary border-opacity-20 text-bold">
              PHÊ DUYỆT KHOÁ HỌC
            </p>
            <CustomButton
              noIcon
              color="blue-gray"
              text="Lịch sử duyệt"
              className="mb-4 mt-8 w-full h-10"
            />
            <CustomButton
              noIcon
              color="green"
              text="Thêm người duyệt"
              className="mb-4 w-full h-10"
            />{' '}
            <CustomButton
              noIcon
              color="blue"
              text="Duyệt"
              className="mb-4 w-full h-10"
            />{' '}
            <CustomButton
              noIcon
              color="red"
              text="Từ chối"
              className="mb-4 w-full h-10"
            />
            <CustomButton
              noIcon
              color="blue"
              variant={'outlined'}
              text="Quay lại"
              className="mb-12 w-full h-10"
            />
          </div>
          <div className=" w-[15%] m-4  p-4 mr-8 h-full" />
          <ViewDetail />
        </div>
      </div>
    </>
  );
};
const ViewDetail = () => {
  const [currentTab, setCurrentTab] = useState(1);
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
            text="Đánh giá"
            className=" w-[30%] h-10"
            onClick={() => setCurrentTab(3)}
          />
        </div>
        <div className="rounded-xl w-full  h-fit  text-black bg-white  my-4 pb-8 border flex flex-col justify-start items-start px-4">
          {currentTab === 1 && <DescriptionTab />}

          {currentTab === 2 && <ChapterTab />}
          {currentTab === 3 && <ReviewTab />}
        </div>
      </div>
      <RightSection />
    </>
  );
};
const ChapterTab = () => {
  return (
    <>
      <p className="pt-4 text-xl font-semibold text-black font-bold">Mô tả</p>
    </>
  );
};
const ReviewTab = () => {
  return (
    <>
      <p className="pt-4 text-xl font-semibold text-black font-bold">Mô tả</p>
      <p className="pb-4 pt-2 text-md  text-[#141522]">
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
const DescriptionTab = () => {
  return (
    <>
      <p className="pt-4 text-xl font-semibold text-black font-bold">Mô tả</p>
      <p className="pb-4 pt-2 text-md  text-[#141522]">
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
          noIcon
          color="blue"
          text="Giới thiệu khoá học"
          className=" w-[90%] my-2  h-10"
        />{' '}
        <CustomButton
          noIcon
          color="blue"
          variant={'outlined'}
          text="Chương trình đào tạo"
          className=" w-[90%] my-2 h-10"
        />
        <CustomButton
          noIcon
          color="blue"
          variant={'outlined'}
          text="Đánh giá"
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
export default ReviewDetail;
