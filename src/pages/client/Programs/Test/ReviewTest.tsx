import { useLocation, useNavigate } from 'react-router-dom';
import CourseDetail from '../../../../components/Course/CourseDetail';
import RightSection from '../../../../components/Course/RightSection';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/sharedComponents/Loading';
import ScrollToTop from '../../../../utils/scrollToTop';
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb';
import { IProgramItem } from '../../../../Type';
import { useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useAppDispatch } from '../../../../hook/useRedux';
import apiService from '../../../../api/apiService';
import HeaderClient from '../../../../components/Header/HeaderClient';
import logo from '../../../../assets/logo.svg';
import ReviewQuestionItem from '../../../../components/Test/ReviewQuestionItem';
import TestBar from '../../../../components/Test/TestBar';
import CustomButton from '../../../../components/admin/Button';

export default function ReviewTest(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let ref = useRef(null);
  const location = useLocation();
  // const executeScroll = (i: number) => {
  //   setTimeout(() => {
  //     ref.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'nearest',
  //     });
  //   }, 50);
  // };

  const dispatch = useAppDispatch();
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const breadCrumb: string = useAppSelector(
    (state) => state.product.contentBreadcrumb,
  );
  async function getData() {
    try {
      let current = location.pathname.split('/')[1].toString();
      let res: any = await apiService.getProgram(Number(current));
      dispatch(actions.formActions.setProgramForm(res));
      dispatch(
        actions.formActions.setNameMenu(`${res ? res?.programName : 'N/A'}`),
      );
    } catch (err) {}
  }
  useEffect(() => {
    // executeScroll(0);
    // console.log(1);
    // !program && getData();
    dispatch(
      actions.formActions.setNameMenu(
        `${program ? program?.programName : 'N/A'}`,
      ),
    );
  }, []);
  const content = [
    {
      title: 'Tổng thời gian làm bài:',
      value: '20 phut', //moment(program?.endDate).format('DD/MM/YYYY').toString(),
    },
    {
      title: 'Thời gian còn lại:',
      value: '12p43', //moment(program?.endDate).format('DD/MM/YYYY').toString(),
    },
    {
      title: 'Tổng số câu trả lời:',
      value: '3 / 9 câu', //moment(program?.endDate).format('DD/MM/YYYY').toString(),
    },
  ];
  return (
    <>
      <div className="w-full h-14 flex items-center justify-between ">
        <div className="z-0  overflow-hidden bg-white relative flex flex-col justify-center content-center items-center w-1/5">
          <a
            onClick={() => {
              navigate('/home');
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
            }}
            className=" hover:text-primary text-black relative my-2  px-2 w-full flex flex-row items-center justify-center"
          >
            <img className="w-[14%] h-fit " src={logo} />
            <p className="text-lg font-bold text-center mx-2">VLG TRAINING</p>
          </a>
        </div>

        <div className="w-full h-14 flex items-center justify-between ">
          <p className="text-black text-lg font-bold font-customFont">
            Bài kiểm tra chương
          </p>
          <HeaderClient />
        </div>
      </div>

      <div className="w-full  px-4 pb-2 bg-white">
        <Breadcrumb
          router1={'/Test/Review/'}
          router2={`/Test/Review/${program ? program?.programName : 'N/A'}`}
          name={'Chương Trình'}
          name2={program ? program?.programName : 'N/A'}
          name3={breadCrumb ? breadCrumb : 'N/A'}
        />
      </div>

      {/* <Loading loading={loading} /> */}
      <div
        ref={ref}
        className={`flex w-full justify-between min-h-screen bg-gray-50 ${
          loading ? 'visible' : 'visible'
        }`}
      >
        <div className="flex w-full justify-between m-4 mx-8 flex-col bg-white p-8 rounded-lg ">
          <div className="">
            <p className="text-black text-lg font-bold font-customFont">
              Danh sách các câu trả lời
            </p>
            <ReviewQuestionItem
              index={1}
              question={{ questionTitle: 'a', score: 1 }}
            />
            <ReviewQuestionItem
              index={1}
              question={{ questionTitle: 'a', score: 1 }}
            />
          </div>
          <div className="flex flex-col text-black  w-full justify-center items-center">
            <div className="mb-4 mt-4 w-2/6">
              {content.map((item: { title: string; value: any }) => {
                return (
                  <div className="flex w-full items-center justify-between  mt-4 text-base">
                    <div className="flex items-center ">
                      <span className="text-start font-semibold">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center   font-light">
                      <span className="text-start ">{item.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" flex  w-1/2 justify-between mb-4 mt-4 ">
              <CustomButton
                className="min-w-[15rem] p-3"
                variant="outlined"
                noIcon
                text="Quay lại  làm bài"
              />
              <CustomButton
                className="min-w-[15rem] p-3"
                color="green"
                noIcon
                text="Nộp bài"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
