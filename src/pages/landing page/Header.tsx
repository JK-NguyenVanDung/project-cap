import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import Logo from '../../assets/logo.svg';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';

const useMountEffect = (fun: any) => useEffect(fun, []);

const Header = (props: any) => {
  const dispatch = useAppDispatch();
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
  function Login() {
    navigate('/login');
    dispatch(actions.authActions.setInfo(null));
  }
  const [open, setOpen] = useState(false);

  const executeScroll = (i: number) => {
    const e = props.references.filter((e: any, index: number) => index === i);
    if (e.length > 0) {
      setTimeout(() => {
        e[0].current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }, 50);
    }
  };

  useEffect(() => {
    executeScroll(0);
  }, []);

  useMountEffect(executeScroll); // Scroll on mount

  return (
    <nav className="  hide hide-top relative z-20  flex max-sm:container  w-full  items-start mx-auto border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className=" max-sm:container w-full flex flex-wrap justify-between items-center mx-auto px-16 max-sm:px-0">
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
            onClick={() => Login()}
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

export default Header;
