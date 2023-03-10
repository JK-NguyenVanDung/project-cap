import React from 'react';
import { Space } from '../../Programs/ResultProgram';
import {
  BsFillHexagonFill,
  BsArrowDownLeft,
  BsCalendar3,
} from 'react-icons/bs';
import { SlBadge } from 'react-icons/sl';
import { GiWhiteBook } from 'react-icons/gi';
import { HiClock } from 'react-icons/hi';
import { FaBookReader } from 'react-icons/fa';
import { IoMdBookmarks } from 'react-icons/io';
import SearchBar from '../../../../components/admin/ToolBar/ToolBar';
import Color from '../../../../components/constant/Color';
import { useNavigate } from 'react-router-dom';
import { typeStatic } from '../index';

export default function ItemStatic({
  params,
  type,
}: {
  params: any;
  type: typeStatic;
}) {
  return (
    <div className="ml-5 mr-5">
      <div className="border-solid w-[320px] border-[1px] border-gray-400 rounded-xl p-3">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-sm text-gray-600">
              {type === typeStatic.programComplete
                ? 'Khóa Học Đã Hoàn Thành'
                : type === typeStatic.trainingHours
                ? 'Thời Gian Đào Tạo'
                : 'Khóa Học Tham Gia'}
            </h1>
            <h1 className="font-bold text-2xl text-black py-2">
              {type === typeStatic.programComplete
                ? `${params} Khóa Học`
                : type === typeStatic.trainingHours
                ? `${params} Giờ`
                : `${params} Khóa Học`}
            </h1>
            <Space size={5} />

            <h1 className="flex items-center">
              <div className=" py-1 pr-1 m-1">
                <BsCalendar3 fontWeight={700} />
              </div>
              {/* <span className="text-[#51CC5D] font-bold">-3,5%</span> */}
              <h1 className="font-bold text-sm text-black">2022-23</h1>
            </h1>
          </div>
          <Space sizeWidth={30} />
          <div className="flex flex-col items-end">
            {type === typeStatic.programComplete ? (
              <FaBookReader size={30} color={Color.theme.GREEN_DARK} />
            ) : type === typeStatic.trainingHours ? (
              <HiClock size={30} color={Color.theme.YELLOW} />
            ) : (
              <IoMdBookmarks size={30} color={Color.theme.CARNATION} />
            )}
            <Space size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
