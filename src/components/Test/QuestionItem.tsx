import autoAnimate from '@formkit/auto-animate';
import { useState, useRef, useEffect } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { HiCheckCircle, HiClipboardCheck } from 'react-icons/hi';
import { IChapterItem, IQuestion, ITest } from '../../Type';
import apiService from '../../api/apiService';
import ActiveArrow from '../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../assets/svg/NonActiveArrow';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../Redux';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { IChapter } from '../../api/apiInterface';
import Answer from './Answer';

const QuestionItem = ({
  question,
  isReviewing = false,
  isDetail = false,
  disabled = false,
  finished = false,
}: {
  question?: IQuestion;
  isReviewing?: boolean;
  isDetail?: boolean;
  disabled?: boolean;
  finished?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [viewedContent, setViewedContent] = useState(false);

  // const [disabled, setDisabled] = useState(false);
  // const [finished, setFinished] = useState(false);
  // const [finished, setFinished] = useState(false);

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
    // if (selectedChapter?.contentId === chapter?.contentId) {
    //   setShow(true);
    //   if (selectedChapter.isTest && viewedContent) {
    //     setShowTest(true);
    //   } else {
    //     setShowContent(true);
    //   }
    //   dispatch(
    //     actions.productActions.setContentBreadcrumb(
    //       selectedChapter.contentTitle,
    //     ),
    //   );
    // } else {
    //   setShow(false);
    //   setShowTest(false);
    //   setShowContent(false);
    // }
    // let timeLock = setTimeout(() => {
    //   setViewedContent(true);
    // }, 300);
    // let time = setTimeout(async () => {
    //   if (selectedChapter?.contentId === chapter?.contentId) {
    //     await getData();
    //   }
    // }, 100);
    // return () => {
    //   clearTimeout(timeLock);
    //   clearTimeout(time);
    // };
  }, [selectedChapter]);

  // async function getData() {
  //   try {
  //     let test: any = await apiService.getTest(chapter?.contentId);
  //     let questionCount: any = await apiService.getQuestionCount(test?.testId);

  //     console.count('test');

  //     if (test) {
  //       let count =
  //         questionCount?.data !== undefined
  //           ? questionCount?.data
  //           : questionCount;
  //       setTest(test);
  //       dispatch(
  //         actions.productActions.setSelectedTest({
  //           ...test,
  //           questionCount: count,
  //         }),
  //       );

  //       setQuestionCount(count);
  //     }
  //   } catch (err: any) {
  //     throw err.message;
  //   }
  // }

  function resetSelection(condition: boolean) {
    // if (condition) {
    //   setShowContent(true);
    //   setShowTest(false);
    //   dispatch(
    //     actions.productActions.setSelectedChapter({
    //       ...chapter,
    //       isTest: false,
    //     }),
    //   );
    // } else if (viewedContent) {
    //   setShowTest(true);
    //   setShowContent(false);
    //   dispatch(
    //     actions.productActions.setSelectedChapter({
    //       ...chapter,
    //       isTest: true,
    //     }),
    //   );
    // }
  }

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
      <div className="w-fit min-w-[60rem] max-w-[60rem] h-fit bg-white m-4 py-6 px-8 rounded-xl">
        <div className="flex w-full justify-end text-primary font-bold ">
          1 điểm
        </div>
        <div className="flex w-full justify-start  items-center mx-4">
          <div className="flex flex-col justify-start items-start w-fit my-4 ml-2 mr-14">
            <div className="CIRCLE py-4 px-6 bg-gray-400 rounded-[20rem] text-black text-3xl font-bold">
              1
            </div>
          </div>
          <div className=" w-full flex ">
            <p className="text-gray-900 ">
              CAU HOICAU HOICAU HOICAU HOICAU HOICAU HOICAU HOI? CAU HOICAU
              HOICAU HOICAU HOICAU HOICAU HOICAU HOI? CAU HOICAU HOICAU HOICAU
              HOICAU HOICAU HOICAU HOI?
            </p>
          </div>
        </div>
        <p className="text-red-500 pl-2 mb-2 ">{'(Nhiều lựa chọn)'}</p>
        <Answer onChange={undefined} handleDelete={undefined} />
      </div>
    </>
  );
};
export default QuestionItem;
