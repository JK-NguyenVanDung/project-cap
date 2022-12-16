import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import apiService from '../../api/apiService';
import CustomButton from '../admin/Button';
import { useAppSelector } from '../../hook/useRedux';
import { IAccountItem, IProgramItem } from '../../Type';

interface Content {
  title: string;
  subject: string | number;
  icon?: any;
}
const RightSection = (props: any) => {
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const [user, setUser] = useState<IAccountItem>(null);
  useEffect(() => {
    let time = setTimeout(async () => {
      await getData();
    }, 100);
    return () => {
      clearTimeout(time);
    };
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
  return (
    <div className=" rounded-xl w-fit text-black bg-white h-fit m-4 p-2 border flex flex-col justify-start items-start">
      <p className="mt-6 text-xl font-light text-gray-900 text-center  flex w-full justify-center items-center">
        THÔNG TIN KHOÁ HỌC
      </p>
      <CategoryDetail
        header="Người tạo"
        contents={[
          {
            title: 'Tên',
            subject: user?.fullName ? user.fullName?.split('-')[1] : 'N/A',
          },
          {
            title: 'Email',
            subject: user?.email ? user.email : 'N/A',
          },
          {
            title: 'SĐT',
            subject: user?.phoneNumber ? user.phoneNumber : 'N/A',
          },
        ]}
      />

      <CategoryDetail
        header="Thời gian tham gia"
        contents={[
          {
            title: 'Ngày bắt đầu',
            subject: program?.startDate
              ? moment(program.startDate).format('DD/MM/YYYY').toString()
              : 'N/A',
          },
          {
            title: 'Ngày kết thúc',
            subject: program?.endDate
              ? moment(program.endDate).format('DD/MM/YYYY').toString()
              : 'N/A',
          },
          {
            title: 'Số giờ đào tạo',
            subject:
              program?.semester && program?.semester > 0
                ? program.semester
                : '0',
          },
        ]}
      />
      <CategoryDetail
        header="Thời gian đăng ký"
        contents={[
          {
            title: 'Ngày bắt đầu',
            subject: program?.registrationStartDate
              ? moment(program.registrationStartDate)
                  .format('DD/MM/YYYY')
                  .toString()
              : 'N/A',
          },
          {
            title: 'Ngày kết thúc',
            subject: program?.registrationEndDate
              ? moment(program.registrationEndDate)
                  .format('DD/MM/YYYY')
                  .toString()
              : 'N/A',
          },
        ]}
      />
      <CategoryDetail
        header="Phần thưởng"
        contents={[
          {
            title: 'Số coin thưởng',
            subject: program?.coin && program?.coin > 0 ? program.coin : '0',
          },
        ]}
      />
      <div className="flex my-8 flex-col w-full items-center justify-center">
        <CustomButton
          disabled={props.enable ? false : true}
          noIcon
          color="blue"
          text="Đăng ký tham gia"
          className=" w-[90%] my-2  h-10"
        />{' '}
        <CustomButton
          disabled={props.enable ? false : true}
          Icon={AiFillHeart}
          color="red"
          text="Yêu thích"
          className=" w-[90%] my-2 h-10"
        />
        <CustomButton
          disabled={props.enable ? false : true}
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
              <p className="pt-4 text-sm text-gray-900 text-left ">
                {item.title}
              </p>
              <p className="pt-4 pl-16 text-sm text-black font-semibold text-right ">
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
