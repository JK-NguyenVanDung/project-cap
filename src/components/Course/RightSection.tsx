import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import apiService from '../../api/apiService';
import CustomButton from '../admin/Button';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IAccountItem, IProgramItem } from '../../Type';
import { useNavigate } from 'react-router-dom';
import Color from '../constant/Color';
import { Spin } from 'antd';
import { actions } from '../../Redux';

interface Content {
  title: string;
  subject: string | number;
  icon?: any;
}

const RightSection = (props: any) => {
  const programId: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const navigate = useNavigate();
  const [program, setProgram] = useState<IProgramItem>();
  const [user, setUser] = useState<IAccountItem>(null);
  const [like, setLike]: any = useState();
  const updateLike: boolean = useAppSelector(
    (state) => state.product.updateLike,
  );
  useAppDispatch;
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLike(program?.isLike);
  }, [program]);

  async function getData() {
    try {
      const data: any = await apiService.getProgram(programId.programId);
      setProgram(data);

      let res: any = await apiService.getAccounts();
      res = res.reverse();

      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));
      if (temp) {
        let acc = temp.find(
          (item: any) => data.accountIdCreator == item.accountId,
        );
        setUser(acc);
      }
    } catch (err: any) {
      throw err.message;
    }
  }
  const handelLove = async (itemProgram?: IProgramItem) => {
    const fetchLike = async () => {
      await apiService.likeProgram(itemProgram?.programId, !itemProgram.isLike);
    };

    await fetchLike();

    const data: any = await apiService.getProgram(programId.programId);
    setProgram(data);

    dispatch(actions.productActions.setUpdateLike(!updateLike));
  };
  return (
    <div className=" rounded-xl w-fit text-black bg-white h-fit m-4 p-2 border flex flex-col justify-start items-start">
      <p className="mt-6 text-xl font-light text-gray-900 text-center  flex w-full justify-center items-center">
        TH??NG TIN KHO?? H???C
      </p>
      <CategoryDetail
        header="Ng?????i t???o"
        contents={[
          {
            title: 'T??n',
            subject: user?.fullName ? user.fullName?.split('-')[1] : 'N/A',
          },
          {
            title: 'Email',
            subject: user?.email ? user.email : 'N/A',
          },
          {
            title: 'S??T',
            subject: user?.phoneNumber ? user.phoneNumber : 'N/A',
          },
        ]}
      />

      <CategoryDetail
        header="Th???i gian tham gia"
        contents={[
          {
            title: 'Ng??y b???t ?????u',
            subject: program?.startDate
              ? moment(program.startDate).format('DD/MM/YYYY').toString()
              : 'N/A',
          },
          {
            title: 'Ng??y k???t th??c',
            subject: program?.endDate
              ? moment(program.endDate).format('DD/MM/YYYY').toString()
              : 'N/A',
          },
          {
            title: 'S??? gi??? ????o t???o',
            subject: program?.trainingHours ? program?.trainingHours : '0',
          },
        ]}
      />
      <CategoryDetail
        header="Th???i gian ????ng k??"
        contents={[
          {
            title: 'Ng??y b???t ?????u',
            subject: program?.registrationStartDate
              ? moment(program.registrationStartDate)
                  .format('DD/MM/YYYY')
                  .toString()
              : 'N/A',
          },
          {
            title: 'Ng??y k???t th??c',
            subject: program?.registrationEndDate
              ? moment(program.registrationEndDate)
                  .format('DD/MM/YYYY')
                  .toString()
              : 'N/A',
          },
        ]}
      />
      <CategoryDetail
        header="Ph???n th?????ng"
        contents={[
          {
            title: 'S??? coin th?????ng',
            subject: program?.coin && program?.coin > 0 ? program.coin : '0',
          },
        ]}
      />

      <div className="flex my-8 flex-col w-full items-center justify-center">
        <CustomButton
          disabled={props.enable ? false : true}
          noIcon
          color="blue"
          text="????ng k?? tham gia"
          className=" w-[90%] my-2  h-10"
        />{' '}
        <CustomButton
          disabled={props.enable ? false : true}
          Icon={AiFillHeart}
          color={!like ? 'gray' : 'red'}
          text="Y??u th??ch"
          className=" w-[90%] my-2 h-10 hover:bg-red-400"
          onClick={() => handelLove(program)}
        />
        <CustomButton
          disabled={props.enable ? false : true}
          noIcon
          color="blue"
          variant={'outlined'}
          text="Quay l???i"
          className=" w-[90%] my-2 h-10"
          onClick={props.goBack}
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
