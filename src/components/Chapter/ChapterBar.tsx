import moment from 'moment';
import { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IAccountItem, IChapterItem, IProgramItem } from '../../Type';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../Redux';
import ChapterItem from './ChapterItem';
import ActiveArrow from '../../assets/svg/ActiveArrow';

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
  const [done, setHasDone] = useState(false);

  const [doingSurvey, setDoingSurvey] = useState(false);
  const [chapters, setChapters] = useState([]);
  const selectedChapter: IChapterItem = useAppSelector(
    (state) => state.product.selectedChapter,
  );

  const initChapter: IChapterItem = useAppSelector(
    (state) => state.product.initChapter,
  );

  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    getData();
  }, [programNav]);

  async function getData() {
    try {
      const data: any = await apiService.getProgram(programNav?.programId);
      let content: any = await apiService.getProgramContents({
        programId: programNav?.programId,
        accountId: info?.accountId,
      });
      let isDone: any = await apiService.checkDoneSurvey(
        programNav.programId,
        info.accountId,
      );

      if (content) {
        setChapters(content);
        dispatch(actions.productActions.setInitSelectedChapter(content[0]));
        if (
          selectedChapter === undefined ||
          initChapter === undefined ||
          selectedChapter?.contentId === initChapter?.contentId
        ) {
          dispatch(actions.productActions.setSelectedChapter(content[0]));
        }
      }

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
      let condition = !isDone;
      let condition2 = false;
      if (content[content?.length - 1]?.isDone) {
        condition2 = true;
      } else {
        condition2 = false;
      }

      let finalCont = false;
      if (condition2 === false) {
        finalCont = false;
      } else if (condition2 === true) {
        if (condition === false) {
          finalCont = false;
        } else {
          finalCont = true;
        }
      } else {
        finalCont = false;
      }

      setDoingSurvey(finalCont);
    } catch (err: any) {
      throw err.message;
    }
  }

  async function checkDoneSurvey() {
    try {
      let res: any = await apiService.checkDoneSurvey(
        programNav.programId,
        info.accountId,
      );
      console.log(res);
      return res;
    } catch (err: any) {
      throw err.message;
    }
  }
  function hasDoneTest(prevChapter: IChapterItem) {
    if (prevChapter?.isDone) {
      return false;
    }
    return true;
  }
  function navToSurvey() {
    dispatch(actions.formActions.setProgramForm(programNav));
    navigate(`/ProgramSurvey/${programNav?.programName}`);
  }

  return (
    <div className="overflow-y-scroll rounded-xl  w-fit max-w-xl text-black bg-white h-fit min-h-[85vh] md:min-w-[30%] m-4 p-2 px-8 border flex flex-col justify-start items-start">
      <p className="my-6 text-xl font-bold  text-gray-900 text-center  flex w-full justify-start items-start">
        Danh sách chương
      </p>
      {chapters?.map((item: IChapterItem, index: number) => {
        return (
          <ChapterItem
            chapter={item}
            isDone={item.isDone}
            disabled={index === 0 ? null : hasDoneTest(chapters[index - 1])}
          />
        );
      })}
      {doingSurvey === true ? (
        <>
          <ProgramSurvey navToSurvey={navToSurvey} />
          <i className="font-light  	italic">
            Vui lòng làm khảo sát để nhận được Coin
          </i>
        </>
      ) : null}
    </div>
  );
};

function ProgramSurvey({ navToSurvey }: { navToSurvey: Function }) {
  return (
    <>
      <div
        className={`flex justify-between  items-center pl-[1.4rem] pr-6 w-full rounded-xl 
         bg-green-500  text-white
          } min-h-[3.5rem]  h-fit  py-1 `}
      >
        <div className={`flex  w-full   h-fit  `}>
          <button className={` pr-4`} onClick={() => navToSurvey()}>
            <ActiveArrow />
          </button>
          <p
            className={` text-sm hover: w-full eclipse-wrap pr-2 font-semibold cursor-pointer	`}
            onClick={() => navToSurvey()}
          >
            Khảo sát chương trình
          </p>
        </div>
      </div>
    </>
  );
}
export default ChapterBar;
