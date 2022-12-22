import React from 'react';
import Logo from '../../assets/logo.svg';

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
export default Footer;
