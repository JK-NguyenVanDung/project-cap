import CustomButton from '../../../components/admin/Button';
import SurveyImage from '../../../assets/img/temp-bg-img.png';
import { ISurveyItem } from '../../../Type';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import apiService from '../../../api/apiService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';
import Loading from '../../../components/sharedComponents/Loading';
import moment from 'moment';
export default function ({ data }: { data: any }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const range: any = useAppSelector((state) => state.survey.range);

  async function navToSurvey(item: ISurveyItem) {
    setLoading(true);
    dispatch(actions.surveyActions.setSelectedSurvey(item));
    try {
      let res: any = await apiService.getSurveyQuestions(item.surveyId);
      res = res.map((item: any, index: number) => {
        return { ...item, index: index + 1 };
      });
      dispatch(
        actions.surveyActions.setListCurrentQuestions(
          res.slice(range.base, range.limit),
        ),
      );

      dispatch(actions.surveyActions.setListQuestions(res));

      navigate(`/Survey/Question`);
    } catch (err: any) {
      throw err.message;
    }
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {data.map((item: any) => {
            return (
              <SwiperSlide className="pb-8">
                <div className="">
                  <BannerItem data={item} navToSurvey={navToSurvey} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}

function BannerItem({
  data,
  navToSurvey,
}: {
  data: ISurveyItem;
  navToSurvey: Function;
}) {
  return (
    <>
      <div className="flex  min-h-[23rem]  max-sm:flex-col m-8 max-sm:m-0 max-sm:ml-4  bg-white shadow-md rounded-xl">
        <div
          className="w-[70%] max-sm:w-full max-sm:min-h-[30vh] shadow-xl bg-no-repeat bg-cover  rounded-xl"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 10%, rgba(255,255,255,0) 90%),url(${SurveyImage})`,
          }}
        >
          <div className="flex flex-col h-full w-full px-4 justify-end max-sm:min-h-[30vh] mb-4">
            <div className="flex my-4  font-bold flex-col text-white">
              <p className=" text-3xl">Khảo sát: {data.title}</p>
              {/* <p className="text-lg">
                {' '}
                {data.countAccount ? data.countAccount : 0} người đã làm
              </p> */}
            </div>
          </div>
        </div>
        <div className="ml-4 p-6 px-8 max-w-[50%] max-sm:px-1   max-sm:max-w-full flex justify-between  flex-col ">
          <div className="max-sm:min-w-full  max-sm:h-fit">
            <h1 className="text-3xl max-sm:text-lg font-bold">
              Khảo sát: {data?.title}
            </h1>
            <p className="mt-4 text-2xl max-sm:text-base">
              Bạn hãy cung cấp cho chúng tôi một nhu cầu hiện nay mà bạn mong
              muốn khi tham gia các khoá học
            </p>
          </div>
          <p className="text-base italic font-bold">
            Hạn làm khảo sát:{' '}
            {moment(data?.endDate).local().format('HH:MM - DD/MM/YYYY ')}
          </p>
          <p className="text-sm italic">
            *Các khảo sát sẽ được ghi nhớ thời gian làm. Khi hoàn thành khảo
            sát, học viên sẽ được ghi nhận đã hoàn thành khảo sát.
          </p>
          <div className="flex items-center justify-center w-full">
            <CustomButton
              size="md"
              className="w-[16rem]"
              noIcon
              text="Tham gia"
              onClick={() => navToSurvey(data)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
