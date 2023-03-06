import React from 'react';
import { Space } from '../Programs/ResultProgram';
import { BsFillHexagonFill, BsArrowDownLeft } from 'react-icons/bs';
import { SlBadge } from 'react-icons/sl';
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLineChart } from 'react-icons/ai';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import Color from '../../../components/constant/Color';
import { useNavigate } from 'react-router-dom';
import ItemChart from './Share/ItemStatic';
import BadgeItem from './Share/BadgeItem';
import { Popover } from 'antd';
import ContentPopover from './Share/ContentPopover';
import ProfileClient from './Component/ProfileClient';
export default function () {
  const navigate = useNavigate();
  const onChangeSearch = () => {
    console.log('search');
  };

  return (
    <>
      <Space size={5} />
      <div className="m-5">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <ProfileClient />
        </div>
        <Space size={30} />
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="flex  justify-between items-center ">
            <div className="flex items-center">
              <SlBadge size={24} />
              <Space sizeWidth={10} />
              <h1 className="font-bold text-lg text-gray-600">CHỨNG CHỈ</h1>
            </div>
            <SearchBar
              onSearch={onChangeSearch}
              className="
            max-sm:min-w-[21rem]
            box-border	shadow-none min-w-[22rem] h-[2.8rem] border-2 rounded-[14px] border-[#F5F5F7]"
              prefix
            />
          </div>
          <Space size={50} />
          <BadgeItem />
          <Space size={30} />
        </div>
        <Space size={30} />
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="flex  justify-between items-center ">
            <div className="flex items-center">
              <AiOutlineLineChart size={24} fontWeight={700} />
              <Space sizeWidth={10} />
              <h1 className="font-bold text-lg text-gray-600">Thống Kê</h1>
            </div>
          </div>
          <Space size={30} />
          <ItemChart />
          <Space size={30} />
        </div>
        <Space size={30} />
      </div>
    </>
  );
}
