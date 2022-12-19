import IntroMain from '../../assets/landingPage/introduction-cover.jpg';
import { IconType } from 'react-icons';

import { IoTimeSharp, IoCalendar, IoArrowRedoOutline } from 'react-icons/io5';
import { HiPresentationChartBar } from 'react-icons/hi';
import { TbCertificate, TbGift } from 'react-icons/tb';
import { BiTimer } from 'react-icons/bi';
import React from 'react';
interface IntroContent {
  logo: IconType;
  title: string;
  description: string;
}
const Introduction = React.forwardRef((props, ref: any) => {
  const content = new Map<string, IntroContent>([
    [
      '1',
      {
        logo: HiPresentationChartBar,
        title: 'Dễ dàng tìm kiếm',
        description:
          'Tìm kiếm các khoá học mọi lúc, mọi nơi nào phù hợp với bạn. Đảm bảo được kiến thức dù bất cứ nơi đâu.',
      },
    ],
    [
      '2',
      {
        logo: IoCalendar,
        title: 'QL giờ đào tạo dễ dàng',
        description:
          'Quản lý được thời gian bạn tham gia đào tạo, xem các thống kê hữu ích nhất cho bạn.',
      },
    ],
    [
      '3',
      {
        logo: TbCertificate,
        title: 'Chứng chỉ Online',
        description:
          'Cung cấp ngay chứng chỉ Online sau khi hoàn thành khoá học, chuẩn bị cho người học tiến xa hơn trong sự nghiệp.',
      },
    ],
    [
      '4',
      {
        logo: BiTimer,
        title: 'Đăng ký tức thời',
        description:
          'Khi tham gia khoá học, việc đăng ký khoá học sẽ được thực hiện 1 cách dễ dàng, tiện lợi và nhanh chóng.',
      },
    ],
  ]);
  return (
    <div
      ref={ref}
      className="relative mb-4 max-sm:mt-[130vh] max-sm:mb-[80vh]  max-sm:flex-wrap  max-sm:h-screen flex h-screen flex-row justify-between md:mx-20 max-sm:mx-2 items-center "
    >
      <div className="  max-sm:w-full w-1/2 h-screen flex flex-col items-center justify-center">
        <p className=" font-bold text-4xl mb-6 text-white">
          Các khoá học nội bộ của chúng tôi hoạt động ra sao?
        </p>
        <div className="grid grid-cols-2 contentList">
          {[...content.values()].map((e, index) => {
            return (
              <div key={index} className="  m-3">
                <div className="bg-dark-pink w-14 h-14 rounded-md flex justify-center items-center mb-4">
                  <e.logo className="text-white w-1/2 h-1/2"></e.logo>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {e.title}
                </h2>
                <h4 className="text-md w-4/5 max-sm:w-full text-white ">
                  {e.description}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      <div className="  relative max-sm:w-[80%]  max-sm:h-[70vh] w-[38vw] h-[100vh] flex justify-center flex-col ">
        <div className="  absolute w-full h-2/3 bg-dark-pink left-10 rounded-md" />

        <img
          src={IntroMain}
          className=" max-sm:h-[50vw]  hide-delay relative rounded-md"
          alt=""
        />
        <div className=" pic-group relative flex flex-row h-[0vh] w-full justify-evenly ml-10">
          <div className=" mt-10 h-[14vh] w-[8vw] max-sm:h-[12vh] max-sm:w-[20vw] bg-white rounded-md">
            <img src={IntroMain} className=" p-2 rounded-md " alt="" />
          </div>
          <div className=" hide-delay-1 mt-10 h-[14vh]  max-sm:h-[12vh] w-[8vw] max-sm:w-[20vw] bg-white rounded-md">
            <img src={IntroMain} className=" p-2 rounded-md " alt="" />
          </div>
          <div className=" hide-delay-2 mt-10 h-[14vh] max-sm:h-[12vh] w-[8vw] max-sm:w-[20vw] bg-white rounded-md">
            <img src={IntroMain} className=" p-2 rounded-md " alt="" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Introduction;
