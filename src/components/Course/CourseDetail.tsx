import { useState, useEffect } from 'react';
import { BiLike } from 'react-icons/bi';
import apiService from '../../api/apiService';
import { useAppSelector } from '../../hook/useRedux';
import { IProgramItem, IAccountItem } from '../../Type';
import CustomButton from '../admin/Button';
import ChapterTab from './ChapterTab';
import DescriptionTab from './DescriptionTab';
import ReviewTab from './ReviewTab';
import View from '../../assets/svg/View.svg';
import { checkURL } from '../../helper/constant';

export default function (props: any) {
  const [currentTab, setCurrentTab] = useState(1);

  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );

  const [user, setUser] = useState<IAccountItem>(null);
  useEffect(() => {
    getData();
  }, [program]);
  async function getData() {
    try {
      let res: any = await apiService.getAccounts();
      res = res.reverse();

      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));
      if (temp) {
        let acc = temp.find(
          (item: any) => program.accountIdCreator == item.accountId,
        );
        setUser(acc);
      }
    } catch (err: any) {
      throw err.message;
    }
  }

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
      <div className=" w-[62%]  h-fit my-4  mb-12 mx-2 flex flex-col justify-start items-center">
        <div className="shadow-lg p-6 rounded-xl w-full h-fit text-black bg-white  border flex flex-col justify-start items-center">
          <div className="w-full h-fit font-customFont ">
            <div className="w-full h-[50vh]">
              <div className="h-full w-full">
                <img
                  className="object-cover w-full h-full	rounded "
                  src={
                    program?.image && !checkURL(program?.image)
                      ? program?.image
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                  }
                />
              </div>
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
                {user ? user.fullName?.split('-')[1] : 'Chưa có thông tin'}
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
}