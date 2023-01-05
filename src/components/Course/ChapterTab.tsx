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

const ChapterTab = ({
  programId,
  isReviewing,
  isDetail,
}: {
  programId: number;
  isReviewing?: boolean;
  isDetail?: boolean;
}) => {
  const [chapters, setChapters] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      let res: any = await apiService.getContentProgram(programId);

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
  return (
    <>
      <Loading loading={loading} className="h-fit mt-10" />
      {!loading &&
        chapters?.map((item: IChapterItem) => {
          return (
            <ChapterItem
              chapter={item}
              isReviewing={isReviewing}
              isDetail={isDetail}
            />
          );
        })}
    </>
  );
};

export default ChapterTab;
