import moment from 'moment';
import { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IAccountItem, IChapterItem, IProgramItem } from '../../Type';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../Redux';
import ChapterItem from './ChapterItem';

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
  const selectedChapter: IChapterItem = useAppSelector(
    (state) => state.product.selectedChapter,
  );
  const initChapter: IChapterItem = useAppSelector(
    (state) => state.product.initChapter,
  );

  useAppDispatch;
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    getData();

    setLike(program?.isLike);
  }, [programNav]);

  async function getData() {
    try {
      const data: any = await apiService.getProgram(programNav?.programId);
      let content: any = await apiService.getProgramContents({
        programId: programNav?.programId,
        accountId: info?.accountId,
      });
      if (content) {
        setChapters(content);
        dispatch(actions.productActions.setInitSelectedChapter(content[0]));
        console.log(selectedChapter?.contentId);
        console.log(initChapter?.contentId);
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

  return (
    <div className="overflow-scroll rounded-xl w-fit max-w-xl text-black bg-white h-fit min-h-[85vh] m-4 p-2 px-8 border flex flex-col justify-start items-start">
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
    </div>
  );
};

export default ChapterBar;
