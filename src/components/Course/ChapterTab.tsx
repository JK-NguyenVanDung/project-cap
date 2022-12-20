import autoAnimate from '@formkit/auto-animate';
import { useState, useEffect, useRef } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { HiClipboardCheck } from 'react-icons/hi';
import apiService from '../../api/apiService';
import ActiveArrow from '../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../assets/svg/NonActiveArrow';
import { IChapterItem, ITest } from '../../Type';
import Loading from '../sharedComponents/Loading';

const ChapterTab = ({ programId }: { programId: number }) => {
  const [chapters, setChapters] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      let res: any = await apiService.getContentProgram(programId);

      let temp = res.reverse();
      if (temp) {
        setChapters(temp);
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
          return <ChapterItem chapter={item} />;
        })}
    </>
  );
};
const ChapterItem = ({ chapter }: { chapter: IChapterItem }) => {
  const [show, setShow] = useState(false);
  const [test, setTest] = useState<ITest>(null);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  async function getData() {
    try {
      let test: any = await apiService.getTest(chapter?.contentId);

      if (test) {
        setTest(test);
      }
    } catch (err: any) {
      throw err.message;
    }
  }
  useEffect(() => {
    let time = setTimeout(async () => {
      await getData();
    }, 100);
    return () => {
      clearTimeout(time);
    };
  }, [chapter]);

  const reveal = () => setShow(!show);
  return (
    <>
      <div
        ref={parent}
        className="flex flex-col w-full h-full mb-6 bg-gray-100  rounded-xl"
      >
        <div
          className={`flex justify-start items-center px-6   w-full ${
            show ? 'bg-primary  text-white ' : 'bg-gray-100  text-black '
          }  rounded-xl h-14  py-4`}
        >
          <button className="pr-4" onClick={reveal}>
            {show ? <ActiveArrow /> : <NonActiveArrow />}
          </button>
          <p className=" text-base  font-semibold ">
            {chapter?.contentTitle ? chapter.contentTitle : 'N/A'}
          </p>
        </div>
        {show && (
          <>
            <div className="content mx-6 mt-4">
              <div className="">
                <div className="flex justify-between items-center px-6  w-full rounded-xl bg-white h-14 ">
                  <div className="flex">
                    <button className="pr-4">
                      <BsFillPlayCircleFill className="text-primary text-lg" />
                    </button>
                    <p className=" text-base font-semibold text-black ">
                      {chapter?.contentTitle
                        ? chapter.contentType + ' ' + chapter?.contentTitle
                        : null}
                    </p>
                  </div>
                  {/* <p className=" text-base font-semibold text-black ">11p20</p> */}
                </div>
              </div>
            </div>
            <div className="content mx-6 my-4">
              <div className="">
                <div className="flex justify-between items-center pl-[1.4rem] pr-6 w-full rounded-xl bg-white h-14 ">
                  <div className="flex">
                    <button className="pr-3 ">
                      <HiClipboardCheck className="text-primary text-2xl" />
                    </button>
                    <p className=" text-base font-semibold text-black ">
                      Bài Kiểm Tra {test?.testTitle ? test?.testTitle : null}
                    </p>
                  </div>
                  <p className=" text-base font-semibold text-black ">10 câu</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ChapterTab;
