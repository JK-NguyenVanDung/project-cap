import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../components/Header/HeaderAdmin';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import logo from '../../../assets/logo.svg';
import CustomButton from '../../../components/admin/Button';

import MidSection from './MidSection';
import LeftSection from './LeftSection';
import RightSection from '../../../components/Course/RightSection';
import Loading from '../../../components/sharedComponents/Loading';

const ReviewDetail = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loading loading={loading} />

      <div className="bg-gray-100 w-full h-full font-customFont">
        <div className="w-full h-14 flex items-center justify-between shadow-lg py-4  bg-white text-black">
          <a
            onClick={() => {
              navigation('/admin');
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
            }}
            className=" hover:text-primary relative my-2 pl-4  pl-2 flex  w-fit flex-row items-center justify-start"
          >
            <img className="w-[3%] h-full" src={logo} />
            <p className="text-lg text-center mx-2"> VLG TRAINING</p>
          </a>
          <div className="w-[40%]">
            <HeaderAdmin />
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div className=" w-[15%] m-4  p-4 mr-8 h-full" />
          <LeftSection />
          <MidSection setLoading={setLoading} isReviewing={true} />
          <RightSection enable={false} />
        </div>
      </div>
    </>
  );
};

export default ReviewDetail;
