import autoAnimate from '@formkit/auto-animate';
import { useState, useEffect, useRef } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { HiClipboardCheck } from 'react-icons/hi';
import apiService from '../../api/apiService';
import ActiveArrow from '../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../assets/svg/NonActiveArrow';
import { IChapterItem, ITest } from '../../Type';
import Loading from '../sharedComponents/Loading';
import ChapterItem from '../Chapter/ChapterItem';
import { message } from 'antd';
import { useAppSelector } from '../../hook/useRedux';

const ChapterTab = ({
  programId,
  isReviewing,
  isDetail,
  isApproved,
}: {
  programId: number;
  isReviewing?: boolean;
  isDetail?: boolean;
  isApproved?: boolean;
}) => {
  const [chapters, setChapters] = useState(null);
  const [loading, setLoading] = useState(false);
  const info = useAppSelector((state) => state.auth.info);

  async function getData() {
    try {
      let res: any = await apiService.getProgramContents({
        programId: programId,
        accountId: info?.accountId,
      });
      // let temp = res.reverse();
      if (res) {
        setChapters(res);
      }
      setLoading(false);
    } catch (err: any) {
      throw err.message;
    }
  }
  useEffect(() => {
    setLoading(true);
    let time = setTimeout(async () => {
      await getData();
    }, 200);
    return () => {
      setLoading(false);
      clearTimeout(time);
    };
  }, [programId]);
  function hasDoneTest(prevChapter: IChapterItem) {
    if (prevChapter?.isDone) {
      return false;
    }
    return true;
  }

  return (
    <>
      <Loading loading={loading} className="h-fit mt-10" />
      {!loading &&
        chapters?.map((item: IChapterItem, index: number) => {
          console.log(isApproved);
          return (
            <ChapterItem
              chapter={item}
              isReviewing={isApproved != true || isReviewing}
              isDetail={isDetail}
              isDone={item.isDone}
              // navTest={item.isDone ? true : false}
              disabled={index === 0 ? null : hasDoneTest(chapters[index - 1])}
            />
          );
        })}
    </>
  );
};

export default ChapterTab;
