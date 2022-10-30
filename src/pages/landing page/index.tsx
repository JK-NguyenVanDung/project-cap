import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'
import Hero from '../../assets/landingPage/hero-cover-1.png'
import Chart from '../../assets/landingPage/chart_line.svg'

import Button from '../../components/sharedComponents/Button'

function Header() {
  const headerList = ['Trang Chủ', 'Về chúng tôi', 'Khoá học', 'Liên hệ']
  const [open, setOpen] = useState(false)
  function login() {}
  return (
    <nav className="relative z-20  flex container  items-start mx-auto border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a
          href="http://localhost:5173/"
          className="logo px-2 md:order-1 flex flex-row items-center"
        >
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Training Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            TRAINING
          </span>
        </a>
        <div className="flex md:order-2 sm:order-2 ">
          <div
            className="login px-2 menu w-full mt-1 md:block md:w-auto"
            id="navbar-default"
          >
            <Button onClick={login} className="">
              Đăng nhập
            </Button>
          </div>
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
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
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
            {headerList.map((item) => (
              <li className="px-10" key="item">
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded hover:bg-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div className="flex z-10  pl-28 max-sm:p-2  max-sm:flex-wrap  flex-row w-full h-screen justify-between items-center ">
      <div className="flex   flex-col  w-1/2 max-sm:w-full  ">
        <div className="flex flex-col  w-full  justify-center items-start">
          <h4 className="mb-2 text-xl  font-bold tracking-tight text-white">
            Đào tạo trực tuyến cùng ĐH Văn Lang
          </h4>
          <h1 className="mb-2 text-5xl  font-bold tracking-tight text-white">
            Cơ hội đào tạo tốt nhất
          </h1>
          <h3 className="mb-2 text-xl  font-bold tracking-tight text-white">
            Hãy đăng nhập để tham gia khoá học của chúng tôi
          </h3>
          <div className="flex flex-row justify-center items-center">
            <Button onClick={() => {}}>Tham gia đào tạo</Button>
            <Button onClick={() => {}} className="btn-transparent">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
      <div className="flex relative max-w-full w-full max-sm:bottom-2">
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
            <Card />
          </div>
        </div>
      </div>
    </div>
  )
}
function Card() {
  return (
    <div className=" relative flex w-1/2 items-center bg-white rounded-lg border shadow-md   ">
      <div className="relative z-10 flex  flex-col justify-between p-4 w-fit leading-normal">
        <h5 className="mb-2 text-[3rem]  max-md:text-[2rem] max-sm:text-[2rem]   font-bold tracking-tight text-gray-900 dark:text-white">
          199+
        </h5>
      </div>
      <div className="  z-10 relative flex   flex-col justify-between p-4 w-full leading-normal">
        <h5 className="mb-2 text-[1.5rem]  max-md:text-[0.75rem] max-sm:text-[1rem] font-bold tracking-tight text-gray-900 dark:text-white">
          HỌC VIÊN ĐÃ HOÀN THÀNH KHOÁ HỌC
        </h5>
      </div>
      <div className=" z-0 absolute w-5/6 left-5 ">
        <img src={Chart} />
      </div>
    </div>
  )
}
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
  )
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
  )
}

function Product() {
  return (
    <div className="relative h-screen w-screen">
      <div className="z-0 h-[20vh] separationBg w-full" />
      <div className=" z-10 relative h-[60vh] bg-white text-black ">
        <div />
      </div>
      <div className=" z-0  separationBg2 h-[20vh] w-full " />
    </div>
  )
}
function ProductCard(props: any) {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={props.image} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <a
          href="#"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
function LandingPage() {
  return (
    <div className="flex bg-dark-blue h-screen flex-col overflow-x-hidden	">
      <Header />
      <Home />
      <Product />
    </div>
  )
}
export default LandingPage
