import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../assets/logo.svg';
import Hero from '../../assets/landingPage/hero-cover-1.png';
import Chart from '../../assets/landingPage/chart_line.svg';
import People from '../../assets/landingPage/people.svg';
import Video from '../../assets/landingPage/video.svg';
import IntroMain from '../../assets/landingPage/introduction-cover.jpg';
import { IoTimeSharp, IoCalendar, IoArrowRedoOutline } from 'react-icons/io5';
import { HiPresentationChartBar } from 'react-icons/hi';
import { TbCertificate, TbGift } from 'react-icons/tb';
import { BiTimer } from 'react-icons/bi';
import Button from '../../components/sharedComponents/Button';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';

const useMountEffect = (fun: any) => useEffect(fun, []);

const Header = (props: any) => {
  const navigate = useNavigate();
  const headerList = [
    {
      title: 'TRANG CHỦ',
      index: 0,
    },
    {
      title: 'KHOÁ HỌC',
      index: 1,
    },
    { title: 'VỀ CHÚNG TÔI', index: 2 },
    { title: 'LIÊN HỆ', index: 3 },
  ];
  const [open, setOpen] = useState(false);

  const executeScroll = (i: number) => {
    const e = props.references.filter((e: any, index: number) => index === i);
    if (e.length > 0) {
      e[0].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  };
  useEffect(() => {
    executeScroll(0);
  }, []);

  useMountEffect(executeScroll); // Scroll on mount

  function login() {
    navigate('/login');
  }
  return (
    <nav className="  hide hide-top relative z-20  flex container  items-start mx-auto border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="logo px-2 md:order-1 flex flex-row items-center">
          <img src={Logo} className="mr-3 h-6 sm:h-9 " alt="Training Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            VLG TRAINING
          </span>
        </a>
        <div className="flex md:order-2 sm:order-2 ">
          <button
            type="button"
            className={`btn btn-primary`}
            onClick={() => login()}
          >
            Đăng nhập
          </button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`menu  md:order-1 w-full md:block md:w-auto ${
            open === true ? '' : 'hidden'
          }`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 bg-dark-blue rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-dark-blue dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {headerList.map((item) => {
              return (
                <li className="px-10 hover:text-primary" key={item.index}>
                  <a
                    onClick={() => executeScroll(item.index)}
                    className=" cursor-pointer font-customFont font-semibold block py-2 pr-4 pl-3 text-white rounded hover:text-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
const Home = React.forwardRef((props, ref: any) => {
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className=" mb-20 flex z-10  pl-20 max-sm:p-2  max-sm:flex-wrap  flex-row w-full h-screen justify-between items-center bg-dark-blue "
    >
      <div className="flex hide hide-left  flex-col  w-[60%] max-sm:w-full  ">
        <div className="flex flex-col  w-full  justify-center items-start  max-sm:items-center ">
          <h4 className="mb-6 text-xl  font-bold tracking-tight text-white">
            Đào tạo nội bộ cùng ĐH Văn Lang
          </h4>
          <h1 className="mb-6 text-5xl  font-bold tracking-tight text-white ">
            Cơ hội đào tạo tốt nhất
          </h1>
          <h3 className="mb-6 text-xl  font-bold tracking-tight text-white">
            Hãy đăng nhập để tham gia khoá học của chúng tôi
          </h3>
          <div className="flex flex-row justify-center items-center">
            <Button onClick={() => navigate('/login')}>Tham gia đào tạo</Button>
          </div>
        </div>
      </div>
      <div className="flex hide hide-right relative max-w-full w-full max-sm:bottom-2">
        <div className="absolute w-full min-w-full ">
          <WhiteBlob />
          <PinkBlob />
        </div>
        <div className="relative w-full  min-w-full  bottom-14 max-sm:bottom-0 ">
          <div className="flex justify-center items-center">
            <img src={Hero} className=" max-w-full h-auto mb-10" />
          </div>
        </div>
        <div className=" absolute w-full min-w-full  bottom-14 max-sm:bottom-0 ">
          <div className="flex justify-center items-center">
            <div className=" relative flex w-1/2 max-sm:w-4/5  items-center bg-white rounded-lg border shadow-md   ">
              <div className="relative z-10 flex  flex-col justify-between p-4 w-fit leading-normal">
                <h5 className="mb-2 text-[3rem]  max-md:text-[1rem] max-sm:text-[2rem]   font-bold tracking-tight text-gray-900 dark:text-white">
                  529+
                </h5>
              </div>
              <div className="  z-10 relative flex   flex-col justify-between p-4 w-full leading-normal">
                <h5 className="mb-2 text-[1.5rem]   max-sm:text-[0.9rem] font-bold tracking-tight text-gray-900 dark:text-white">
                  HỌC VIÊN ĐÃ HOÀN THÀNH KHOÁ HỌC
                </h5>
              </div>
              <div className=" z-0 absolute w-5/6 left-5 ">
                <img src={Chart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function PinkBlob() {
  return (
    <div className="absolute w-full left-2 top-16 ">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        id="blobSvg"
      >
        <g transform="translate(156.21375274658203, 0.6466789245605469)">
          <path fill="#FCC0AD">
            <animate
              attributeName="d"
              dur="10000ms"
              repeatCount="indefinite"
              values="M471,312Q443,374,385.5,397.5Q328,421,278,411Q228,401,178,396Q128,391,87,350.5Q46,310,73,258Q100,206,100,141.5Q100,77,157.5,41.5Q215,6,267.5,51.5Q320,97,367.5,120.5Q415,144,457,197Q499,250,471,312Z;
            M456,317Q459,384,404.5,427Q350,470,285.5,460.5Q221,451,160,438Q99,425,85.5,363.5Q72,302,53,244Q34,186,69.5,134Q105,82,164,71.5Q223,61,275,71.5Q327,82,388,102Q449,122,451,186Q453,250,456,317Z;
            M440,304Q418,358,369.5,382Q321,406,269,441Q217,476,160,447.5Q103,419,76.5,364Q50,309,74.5,257.5Q99,206,117.5,162Q136,118,178,80Q220,42,286.5,33.5Q353,25,379,88Q405,151,433.5,200.5Q462,250,440,304Z;
            M430,316Q456,382,405,429.5Q354,477,287.5,465.5Q221,454,166,432.5Q111,411,83,359Q55,307,50.5,248.5Q46,190,89,151.5Q132,113,180,105.5Q228,98,275,95.5Q322,93,362.5,122.5Q403,152,403.5,201Q404,250,430,316Z;
            M471,312Q443,374,385.5,397.5Q328,421,278,411Q228,401,178,396Q128,391,87,350.5Q46,310,73,258Q100,206,100,141.5Q100,77,157.5,41.5Q215,6,267.5,51.5Q320,97,367.5,120.5Q415,144,457,197Q499,250,471,312Z;"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}
function WhiteBlob() {
  return (
    <div className="absolute w-full top-20 ">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        id="blobSvg"
      >
        <g transform="translate(116.44757843017578, -12.443168640136719)">
          <path fill="#ffffff">
            <animate
              attributeName="d"
              dur="10000ms"
              repeatCount="indefinite"
              values="M428,302.5Q414,355,379.5,406.5Q345,458,287,428.5Q229,399,164,411.5Q99,424,56.5,371.5Q14,319,17.5,251Q21,183,62,131.5Q103,80,165.5,88.5Q228,97,281.5,80.5Q335,64,375.5,103.5Q416,143,429,196.5Q442,250,428,302.5Z;
              M434.5,292Q380,334,359.5,390Q339,446,278,462Q217,478,158.5,450.5Q100,423,102,358Q104,293,77.5,242.5Q51,192,83,143Q115,94,166.5,61Q218,28,285.5,25.5Q353,23,399.5,73.5Q446,124,467.5,187Q489,250,434.5,292Z;
              M429,311Q441,372,380,386Q319,400,272,410Q225,420,174,408.5Q123,397,73.5,356.5Q24,316,26,250.5Q28,185,68,135.5Q108,86,167.5,88.5Q227,91,280,79.5Q333,68,380.5,102Q428,136,422.5,193Q417,250,429,311Z;
              M428,302.5Q414,355,379.5,406.5Q345,458,287,428.5Q229,399,164,411.5Q99,424,56.5,371.5Q14,319,17.5,251Q21,183,62,131.5Q103,80,165.5,88.5Q228,97,281.5,80.5Q335,64,375.5,103.5Q416,143,429,196.5Q442,250,428,302.5Z;"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}

const Product = React.forwardRef((props, ref: any) => {
  const navigate = useNavigate();

  return (
    <section ref={ref} className={`z-0  h-screen w-screen bg-gradient`}>
      <div className=" z-10 h-[20vh] separationBg w-full"></div>
      <div className="  z-20 relative min-h-[60vh]  px-20 bg-white text-black border-opacity-0">
        <div className="flex max-sm:flex-wrap  max-sm:mb-16 flex-row w-full h-20 items-center  md:px-[9rem] sd:px-0 justify-between mb-[0.75rem] ">
          <p className="max-sm:text-xl max-sm:w-full max-sm:mb-4  font-semibold md:text-3xl w-2/3">
            Một số khoá học nổi tiếng của chúng tôi
          </p>
          <Button
            onClick={() => navigate('/login')}
            className=" h-12 btn-transparent text-blue-700"
          >
            Xem thêm
          </Button>
        </div>
        <div className="products max-sm:flex-wrap  flex flex-row justify-evenly items-center w-full ">
          <ProductCard
            title="Đắc Nhân Tâm"
            view="500 Học viên"
            hour="10 buổi"
            image="https://americastarbooks.com/wp-content/uploads/2018/11/noi-dung-sach-dac-nhan-tam-1280x720.jpg"
          />
          <ProductCard
            title="Tiếng Anh Giao Tiếp"
            view="200 Học viên"
            hour="20 buổi"
            image="https://vcdn1-vnexpress.vnecdn.net/2020/09/12/English-4241-1599884287.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=lXq1p7RniKkjCoSZHhQ5PQ"
          />
          <ProductCard
            title="Kỹ Năng Mềm"
            view="300 Học viên"
            hour="12 buổi"
            image="https://images.careerbuilder.vn/content/images/loi-ich-tu-nhung-ky-nang-mem-careerbuilder.jpg  "
          />
        </div>
      </div>
      <div className=" z-20  separationBg2 h-[20vh] w-full "></div>
    </section>
  );
});
const ProductCard = (props: any) => {
  const navigate = useNavigate();

  return (
    <div className="max-sm:m-4  relative max-w-[16.7rem] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img className="rounded-t-lg h-40 w-full" src={props.image} alt="" />
      </a>
      <div className="py-3 px-5">
        <a>
          <h5 className=" text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>
        <div className=" ">
          <div className="inline-flex flex-row w-full h-16 min-w-0">
            <div className="inline-flex flex-row justify-between items-center ">
              <img src={People} className="pr-2" />
              <span>{props.view}</span>
            </div>
            <div className="inline-flex flex-row justify-between items-center pl-10 ">
              <IoTimeSharp className="text-lg text-primary" />
              <span className="pl-2 text-sm">{props.hour}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button
            onClick={() => navigate('/login')}
            className="btn-primary btn-l"
          >
            Xem khoá học
          </Button>
        </div>
      </div>
    </div>
  );
};
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

const Footer = React.forwardRef((props, ref: any) => {
  return (
    <>
      <footer
        ref={ref}
        className="w-full bg-img footer bg-white relative border-b-2"
        style={{
          backgroundImage: `url(https://aitcv.ac.vn/wp-content/uploads/2021/09/e63eb8a14d09bb57e218.jpg)`,
        }}
      >
        <div className=" absolute w-full h-full opacity-75 bg-dark-blue	" />

        <div className=" relative w-full hide hide-bottom  container mx-auto px-6">
          <div className="sm:flex sm:mt-8">
            <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
              <div className="w-[10%] flex flex-col items-center justify-center">
                <img src={Logo} className=" " alt="Training Logo" />
                <span className="mt-2 self-center text-xl font-semibold whitespace-nowrap text-white-500">
                  VLG TRAINING
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">
                  Trường Đại học Văn Lang
                </span>
                <span className="my-2">
                  <p className="text-white text-md ">
                    <p className="text-white font-bold text-md  ">
                      Cơ sở chính:{' '}
                    </p>
                    69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh, TP. HCM
                  </p>
                </span>
                <span className="my-2">
                  <p className="text-white  text-md ">
                    <p className="text-white font-bold text-md  ">Cơ sở 1: </p>{' '}
                    45 Nguyễn Khắc Nhu, P. Cô Giang, Q.1, TP. HCM
                  </p>
                </span>
                <span className="my-2">
                  <p className="text-white text-md ">
                    <p className="text-white font-bold text-md  ">Cơ sở 2: </p>{' '}
                    233A Phan Văn Trị, P.11, Q. Bình Thạnh, TP. HCM
                  </p>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">
                  Liên hệ
                </span>
                <span className="my-2">
                  <p className="text-white  text-md ">
                    <p className="text-white font-bold text-md ">
                      Điện thoại bàn:{' '}
                    </p>
                    028.71099221- EXT: 3320
                  </p>
                </span>
                <span className="my-2">
                  <p className="text-white  text-md ">
                    <p className="text-white font-bold text-md ">
                      Điện thoại Mobile:{' '}
                    </p>{' '}
                    028.71239221- EXT: 3320
                  </p>
                </span>
                <span className="my-2">
                  <p className="text-white  text-md ">
                    <p className="text-white font-bold text-md ">Email: </p>{' '}
                    lotusVLU@vlu.edu.vn
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" container mx-auto px-6">
          <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
              <p className=" hide hide-bottom text-sm text-white font-bold mb-2">
                © 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});

const LandingPage = () => {
  const homeRef = useRef();
  const productRef = useRef();
  const introRef = useRef();
  const contactRef = useRef();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  useEffect(() => {
    const hiddenElements = document.querySelectorAll('.hide');
    hiddenElements.forEach((el) => observer.observe(el));
    console.count();
  }, [observer]);
  // useEffect(() => {
  //   async function a() {
  //     try {
  //       let res: any = await apiService.getCategories();
  //       res = res.reverse();
  //       console.log(res);
  //     } catch (err: any) {
  //       throw err.message();
  //     }
  //   }
  //   a();
  // }, []);
  return (
    <>
      <div className=" font-customFont flex bg-dark-blue h-screen flex-col overflow-x-hidden	">
        <Header references={[homeRef, productRef, introRef, contactRef]} />
        <Home ref={homeRef} />
        <Product ref={productRef} />
        <Introduction ref={introRef} />
        <Footer ref={contactRef} />
      </div>
    </>
  );
};
export default LandingPage;
