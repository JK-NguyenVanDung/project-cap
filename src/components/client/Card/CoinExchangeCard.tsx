import IconButton from '@material-tailwind/react/components/IconButton';
import React, { useEffect, useState } from 'react';
import './Card.css';
import { AiFillHeart } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import { RiTimerFill } from 'react-icons/ri';
import { IExchangeCoin, IProgramItem } from '../../../Type';
import { checkURL } from '../../../helper/constant';
import Color from '../../constant/Color';
import apiService from '../../../api/apiService';
import { message } from 'antd';
import { API_URL } from '../../../api/api';
import { FaCoins } from 'react-icons/fa';
import moment from 'moment';
import Image from '../../../assets/img/dazzle-signing-a-financial-contract.gif';
import { getColor } from '../../../utils/uinqueId';
export default function ({
  onClick,
  item,
  isRegistered = false,
}: {
  onClick: React.MouseEventHandler;
  item: IExchangeCoin;
  isRegistered: boolean;
}) {
  return (
    <>
      <div className="cardCont  mb-32  min-w-[7rem] h-full    max-h-[40vh] w-[18rem] rounded-[20px] font-customFont ">
        <div
          className="card shadow-lg  border-[2px] border-white hover:border-primary hover:transition-colors	 hover:ease-in-out flex
          overflow-hidden flex-col  w-full rounded-[20px] justify-end hover:border-[3px]  " //border-[2px] border-color-[#c3c6ce]
        >
          <div
            className={`max-h-[40vh] h-[25vh]  w-full  `}
            style={{ background: getColor() }}
          >
            <img
              className="rounded-t-lg object-cover object-center		h-full w-full"
              src={Image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
              }}
              alt=""
            />
          </div>
          <div className="flex flex-col bg-white h-[60%] rounded-b-2xl py-2 px-4">
            <p
              className="text-lg my-2 eclipse-text  max-w-fit 	font-semibold cursor-pointer hover:text-primary"
              onClick={onClick}
            >
              {item?.title}
            </p>
            <p className="text-body">
              Hạn đổi điểm:
              <span className="font-bold">
                {` ${moment(item?.endDate).format('HH:mm -  MM-DD-YYYY')}`}
              </span>
            </p>

            <div className="flex w-full  items-center my-4">
              Số coin:
              <div className="ml-4 flex items-center font-semibold text-gray-700">
                <FaCoins className="text-lg mr-2 text-gray-400" />
                {item?.coin} Coin
              </div>
            </div>
          </div>
          <button
            className=" outline-none card-button bg-primary"
            onClick={onClick}
          >
            Đổi Coin
          </button>
        </div>
      </div>
    </>
  );
}
