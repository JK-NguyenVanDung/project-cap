import CustomButton from '../../../components/admin/Button';
import SurveyImage from '../../../assets/img/temp-bg-img.png';
import { IProgramItem, ISurveyItem } from '../../../Type';
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
        <div className=" ml-10">
          <div className="flex justify-between items-center max-w-screen">
            <p className="text-xl font-bold">{title}</p>
            {/* <a className="text-primary font-light">Xem thêm</a> */}
          </div>

          <Swiper
            className="w-full"
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={4}
            // pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {data.map((item: IProgramItem) => {
              return (
                <SwiperSlide>
                  <div className="w-fit">
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
