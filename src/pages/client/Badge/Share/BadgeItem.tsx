import React from 'react';
import { Space } from '../../Programs/ResultProgram';
import { BsFillHexagonFill, BsArrowDownLeft } from 'react-icons/bs';
import { SlBadge } from 'react-icons/sl';
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLineChart } from 'react-icons/ai';
import SearchBar from '../../../../components/admin/ToolBar/ToolBar';
import Color from '../../../../components/constant/Color';
import { useNavigate } from 'react-router-dom';
export default function BadgeItem() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col self-center items-center">
      <div className="relative w-[150px] h-[150px]">
        <BsFillHexagonFill size={150} color={Color.theme.BLACK_10} />
        <SlBadge className="absolute top-[40%] left-[40%]" size={30} />
      </div>
      <Space size={20} />
      <h1 className="font-bold text-lg text-gray-600">
        Bạn Chưa Có Chứng Chỉ Nào.{' '}
        <span
          className="text-primary cursor-pointer"
          onClick={() => navigate('/Programs')}
        >
          Nhận Chứng Chỉ
        </span>
      </h1>
    </div>
  );
}
