import moment from 'moment';
import { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IAccountItem, IChapterItem, IProgramItem } from '../../Type';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../Redux';
import CustomButton from '../admin/Button';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
// import ChapterItem from './ChapterItem';

interface Content {
  title: string;
  subject: string | number;
  icon?: any;
}

const ChapterBar = (props: any) => {
  const programNav: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const navigate = useNavigate();
  const [program, setProgram] = useState<IProgramItem>();
  const [user, setUser] = useState<IAccountItem>(null);
  const [like, setLike]: any = useState();
  const [chapters, setChapters] = useState(null);
  const [current, setCurrent] = useState(0);

  const updateLike: boolean = useAppSelector(
    (state) => state.product.updateLike,
  );
  useAppDispatch;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // getData();
  }, [programNav]);

  // async function getData() {
  //   try {
  //     const data: any = await apiService.getProgram(programNav?.programId);
  //     let content: any = await apiService.getContentProgram(
  //       programNav?.programId,
  //     );
  //     if (content) {
  //       setChapters(content);
  //       dispatch(actions.productActions.setInitSelectedChapter(content[0]));
  //       dispatch(actions.productActions.setSelectedChapter(content[0]));
  //     }

  //     setProgram(data);

  //     let res: any = await apiService.getAccounts();
  //     res = res.reverse();

  //     const temp = res.map((v: any, index: number) => ({
  //       ...v,
  //       index: index + 1,
  //     }));
  //     if (temp) {
  //       let acc = temp.find(
  //         (item: any) => data.accountIdCreator == item.accountId,
  //       );
  //       setUser(acc);
  //     }
  //   } catch (err: any) {
  //     throw err.message;
  //   }
  // }
  const testLength = 5;
  const isViewing = (index: number) => {
    let length = testLength >= 5 ? 5 : testLength;
    let limit = current + length;
    if (index + 1 <= limit && limit <= testLength) {
      return true;
    }
    return false;
  };

  function navToReview() {
    let id = 1;
    navigate(`/Test/Review/${id}`);
  }
  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="fixed right-0 overflow-y-scroll rounded-xl w-fit text-black bg-white h-fit min-h-[80vh]    max-w-[25rem] m-4 p-2 px-8 border flex flex-col justify-start items-start">
      <p className="my-6 text-xl font-bold  text-gray-900 text-center  flex w-full justify-start items-start">
        Danh sách câu hỏi
      </p>
      <div className="flex flex-wrap justify-start items-center w-full border-b-2 border-gray-200 pb-4">
        {arr?.map((item: number, index: number) => {
          return (
            <div
              className={`${
                isViewing(index)
                  ? 'bg-primary bg-opacity-20'
                  : 'bg-white bg-opacity-100'
              }`}
            >
              <CustomButton
                noIcon
                text={item}
                className={'min-w-[2rem] py-2 m-3  text-md'}
              />
            </div>
          );
        })}
      </div>
      <div className=" w-full my-2">
        <div className="flex w-full justify-between my-6">
          <p className="text-lg font-semibold  text-gray-900 text-center   items-start">
            Tổng thời gian làm bài:{' '}
          </p>
          <p className=" font-semibold   text-gray-900 text-center   items-start">
            20p{' '}
          </p>
        </div>
        <div className="flex w-full justify-between my-6">
          <p className="text-lg font-semibold  text-gray-900 text-center   items-start">
            Thời gian còn lại:{' '}
          </p>
          <p className=" font-semibold   text-gray-900 text-center   items-start">
            12p30{' '}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full h-full ">
        <CustomButton
          noIcon
          text={
            <>
              <div className="flex items-center justify-center pr-5">
                <HiOutlineChevronLeft className="mr-2" /> Quay lại
              </div>
            </>
          }
          className="mx-10 py-3 mb-4"
          variant={'outlined'}
        />
        <CustomButton
          noIcon
          text={
            <>
              <div className="flex items-center justify-center pl-4">
                Đi tiếp <HiOutlineChevronRight className="ml-4" />
              </div>
            </>
          }
          className="mx-10 py-3 mb-4"
          variant={'outlined'}
        />
        <CustomButton
          noIcon
          text="Hoàn thành"
          className="mx-10 py-3 mb-4"
          onClick={navToReview}
        />
      </div>
    </div>
  );
};

export default ChapterBar;
