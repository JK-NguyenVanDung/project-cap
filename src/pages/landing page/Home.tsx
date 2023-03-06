import Hero from '../../assets/landingPage/hero-cover-1.png';
import Chart from '../../assets/landingPage/chart_line.svg';
import Button from '../../components/sharedComponents/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { notification } from 'antd';
const Home = React.forwardRef((props, ref: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function Login() {
    navigate('/login');
    dispatch(actions.authActions.setInfo(null));
  }
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
          <h1 className="mb-6 text-5xl   font-bold tracking-tight text-white leading-[4rem]">
            Cơ hội đào tạo tốt nhất
          </h1>
          <h3 className="mb-6 text-xl  font-bold tracking-tight text-white">
            Hãy đăng nhập để tham gia khoá học của chúng tôi
          </h3>
          <div className="flex flex-row justify-center items-center">
            <Button onClick={() => Login()}>Tham gia đào tạo</Button>
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
            <img
              loading="eager"
              src={Hero}
              className=" max-w-full h-auto mb-10"
            />
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
                <img loading="lazy" src={Chart} />
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

export default Home;
