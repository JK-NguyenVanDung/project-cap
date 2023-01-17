import autoAnimate from '@formkit/auto-animate';
import { useState, useRef, useEffect } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { HiCheckCircle, HiClipboardCheck } from 'react-icons/hi';
import { IChapterItem, ITest } from '../../Type';
import apiService from '../../api/apiService';
import ActiveArrow from '../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../assets/svg/NonActiveArrow';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IChapter } from '../../api/apiInterface';
import { notification } from 'antd';

const ChapterItem = ({
  chapter,
  isReviewing = false,
  isDetail = false,
  disabled = false,
  isDone = false,
  navTest = false,
}: {
  chapter: IChapterItem;
  isReviewing?: boolean;
  isDetail?: boolean;
  disabled?: boolean;
  isDone?: boolean;
  navTest?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [viewedContent, setViewedContent] = useState(false);

  // const [disabled, setDisabled] = useState(false);
  // const [isDone, setisDone] = useState(false);
  // const [isDone, setisDone] = useState(false);

  const [test, setTest] = useState<ITest>(null);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const navigate = useNavigate();
  const parent = useRef(null);
  const dispatch = useAppDispatch();
  const selectedChapter: IChapterItem = useAppSelector(
    (state) => state.product.selectedChapter,
  );
  // const viewedContent: boolean = useAppSelector(
  //   (state) => state.product.viewedContent,
  // );
  const initChapter: IChapterItem = useAppSelector(
    (state) => state.product.initChapter,
  );
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  // useEffect(() => {
  //   if (show && !showTest) {
  //     setShowContent(true);
  //   }
  // }, [show]);
  useEffect(() => {
    async function initData() {
      if (selectedChapter?.contentId === chapter?.contentId) {
        await getData();

        setShow(true);
        if (selectedChapter.isTest && viewedContent) {
          setShowTest(true);
        } else {
          setShowContent(true);
        }
        dispatch(
          actions.productActions.setContentBreadcrumb(
            selectedChapter.contentTitle,
          ),
        );
      } else {
        setShow(false);
        setShowTest(false);
        setShowContent(false);
      }
    }
    initData();

    let timeLock = setTimeout(() => {
      setViewedContent(true);
    }, 3000);
    return () => {
      clearTimeout(timeLock);

      // setViewedContent(false);
    };
  }, [selectedChapter]);

  async function getData() {
    try {
      let test: any = await apiService.getTest(chapter?.contentId);
      let questionCount: any = await apiService.getQuestionCount(test?.testId);

      if (test) {
        let count =
          questionCount?.data !== undefined
            ? questionCount?.data
            : questionCount;
        setTest(test);
        dispatch(
          actions.testActions.setSelectedTest({
            ...test,
            questionCount: count,
          }),
        );

        setQuestionCount(count);
      }
    } catch (err: any) {
      notification.error({ message: 'Không tìm thấy bài kiểm tra ' });
    }
  }

  function resetSelection(condition: boolean) {
    if (condition) {
      setShowContent(true);
      setShowTest(false);
      dispatch(
        actions.productActions.setSelectedChapter({
          ...chapter,
          isTest: false,
        }),
      );
    } else if (viewedContent) {
      setShowTest(true);
      setShowContent(false);
      dispatch(
        actions.productActions.setSelectedChapter({
          ...chapter,
          isTest: true,
        }),
      );
      //navTest
    }
  }
  const reveal = () => {
    if (show !== true && initChapter?.contentId !== chapter?.contentId) {
      dispatch(
        actions.productActions.setSelectedChapter({
          ...chapter,
          isTest: false,
        }),
      );
      dispatch(
        actions.productActions.setContentBreadcrumb(chapter.contentTitle),
      );
    } else {
      dispatch(actions.productActions.setSelectedChapter(initChapter));
      dispatch(
        actions.productActions.setContentBreadcrumb(initChapter.contentTitle),
      );
    }
    setViewedContent(false);

    initChapter?.contentId !== chapter?.contentId && setShow(!show);
  };

  function navToChapter(chapter: IChapterItem) {
    if (!isReviewing) {
      dispatch(
        actions.productActions.setContentBreadcrumb(chapter.contentTitle),
      );

      dispatch(
        actions.productActions.setSelectedChapter({
          ...chapter,
          isTest: false,
        }),
      );

      dispatch(actions.productActions.setProgramId(chapter.programId));
      navigate(`/Programs/${chapter.programId}/Chapters`);
    }
  }

  return (
    <>
      <div
        ref={parent}
        className={` ${
          isReviewing || isDetail ? 'w-full' : 'w-[20rem]'
        } flex flex-col  h-full mb-6 bg-gray-100  rounded-xl`}
      >
        <div
          className={`flex justify-between  items-center pl-[1.4rem] pr-6 w-full rounded-xl ${
            show ? 'bg-primary  text-white ' : 'bg-gray-100  text-black '
          } min-h-[3.5rem]  h-fit  py-1 `}
        >
          <div className={`flex  w-full   h-fit  `}>
            <button
              className={`${disabled && 'opacity-40'} pr-4`}
              onClick={(!disabled || isReviewing) && reveal}
            >
              {show ? <ActiveArrow /> : <NonActiveArrow />}
            </button>
            <p
              className={` text-sm hover:${
                !show && !disabled && 'text-primary'
              }  ${
                disabled && 'opacity-40'
              } w-full eclipse-wrap pr-2 font-semibold cursor-pointer	`}
              onClick={() => !disabled && navToChapter(chapter)}
            >
              {chapter?.contentTitle ? chapter.contentTitle : 'N/A'}
            </p>
          </div>
          {isDone && (
            <div className="bg-white rounded-3xl">
              <HiCheckCircle
                className={`${true ? 'text-green-500' : 'text-primary'} ${
                  disabled && 'opacity-40'
                } text-lg`}
              />
            </div>
          )}
        </div>
        {show && (
          <>
            <div
              className="content mx-6 mt-4 cursor-pointer h-fit"
              onClick={() => (isReviewing ? {} : resetSelection(true))}
            >
              <div
                className={`flex justify-between  items-center pl-[1.4rem] pr-6 w-full rounded-xl ${
                  showContent ? 'bg-primary' : 'bg-white'
                } min-h-[3.5rem]  h-fit  py-1 `}
              >
                <div className="flex w-full  ">
                  <button className="pr-4">
                    <BsFillPlayCircleFill
                      className={`${
                        showContent ? 'text-white' : 'text-primary'
                      } text-lg`}
                    />
                  </button>
                  <p
                    className={` text-sm font-semibold  w-full   pr-2 eclipse-wrap ${
                      showContent ? 'text-white' : 'text-black'
                    }`}
                    onClick={() => !disabled && navToChapter(chapter)}
                  >
                    {chapter?.contentTitle
                      ? chapter?.contentTitle //chapter.contentType + ' ' +
                      : null}
                  </p>
                </div>
                {isDone && (
                  <div className="bg-white rounded-3xl">
                    <HiCheckCircle
                      className={`${true ? 'text-green-500' : 'text-primary'} ${
                        disabled && 'opacity-40'
                      } text-lg`}
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className="content mx-6 my-4 h-fit cursor-pointer"
              onClick={() =>
                isReviewing || isDetail ? {} : resetSelection(false)
              }
            >
              <div className="">
                <div
                  className={`flex justify-between  items-center pl-[1.4rem] pr-6 w-full rounded-xl ${
                    showTest ? 'bg-primary' : 'bg-white'
                  } min-h-[3.5rem]  h-fit  py-1 `}
                >
                  <div className="flex items-center">
                    <button
                      className={` pr-3  ${
                        disabled || viewedContent === false || isDetail
                          ? 'opacity-40'
                          : 'opacity-100'
                      }`}
                    >
                      <HiClipboardCheck
                        className={`${
                          showTest ? ' text-white' : ' text-primary'
                        } text-2xl`}
                      />
                    </button>
                    <p
                      // onClick={() => !disabled && navToChapter(chapter)}
                      className={` text-sm font-semibold  eclipse-wrap ${
                        showTest ? 'text-white' : 'text-black'
                      }  ${
                        disabled || viewedContent === false || isDetail
                          ? 'opacity-40 no-copy'
                          : 'opacity-100'
                      }`}
                    >
                      {test?.testTitle ? test?.testTitle : 'Bài Kiểm Tra'}
                    </p>
                  </div>
                  {isDone ? (
                    <div className="bg-white rounded-3xl">
                      <HiCheckCircle
                        className={`${'text-green-500'} text-lg`}
                      />
                    </div>
                  ) : (
                    <p
                      className={` text-sm text-center font-semibold ${
                        showTest ? 'text-white' : 'text-black'
                      } ${
                        disabled || viewedContent === false || isDetail
                          ? 'opacity-40'
                          : 'opacity-100'
                      }`}
                    >
                      {questionCount ? questionCount : 0} câu
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ChapterItem;
