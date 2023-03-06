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
import CourseCard, {
  SmallCourseCard,
} from '../../../components/client/Card/CourseCard';

export default function ({
  data,
  title = 'Khóa học',
}: {
  data: any;
  title: string;
}) {
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
        <div className="">
          <p className="text-xl font-bold">{title}</p>

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
                <SwiperSlide>
                  <div className="">
                    <SmallCourseCard data={item} navToSurvey={navToSurvey} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
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
      <div className="flex  min-h-[23rem] m-8  bg-white shadow-md rounded-xl">
        <div
          className="w-[70%] shadow-xl bg-no-repeat bg-cover	 rounded-xl"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 10%, rgba(255,255,255,0) 90%),url(${SurveyImage})`,
          }}
        >
          <div className="flex flex-col h-full w-full px-4 justify-end mb-4">
            <div className="flex my-4  font-bold flex-col text-white">
              <p className=" text-3xl">Khảo sát: {data.title}</p>
              {/* <p className="text-lg">
                {' '}
                {data.countAccount ? data.countAccount : 0} người đã làm
              </p> */}
            </div>
          </div>
        </div>
        <div className="ml-4 p-6 px-8 max-w-[50%]  flex justify-between  flex-col">
          <div className="">
            <h1 className="text-3xl font-bold">Khảo sát: {data?.title}</h1>
            <p className="mt-4 text-2xl">
              Bạn hãy cung cấp cho chúng tôi một nhu cầu hiện nay mà bạn mong
              muốn khi tham gia các khoá học
            </p>
          </div>
          <p className="text-base italic font-bold">
            Hạn làm khảo sát:{' '}
            {moment(data?.endDate).format('HH:MM - DD/MM/YYYY ')}
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
