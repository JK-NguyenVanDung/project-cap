import React from 'react';
import { Space } from '../../Programs/ResultProgram';
import { BsFillHexagonFill, BsArrowDownLeft } from 'react-icons/bs';
import { SlBadge } from 'react-icons/sl';
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLineChart } from 'react-icons/ai';
import SearchBar from '../../../../components/admin/ToolBar/ToolBar';
import Color from '../../../../components/constant/Color';
import { useNavigate } from 'react-router-dom';
export default function ItemStatic() {
  return (
    <div className="ml-5 mr-5">
      <div className="border-solid w-[fit-content] border-[1px] border-gray-400 rounded-xl p-3">
        <div className="flex ">
          <div>
            <h1 className="font-bold text-sm text-gray-600">
              Số Giờ Tham Gia Học
            </h1>
            <h1 className="font-bold text-lg text-black">2.000 Giờ</h1>
            <h1 className="flex items-center">
              <div className="rounded-full bg-[#BAFCCC] p-1 m-1">
                <BsArrowDownLeft
                  color={Color.theme.GREEN_DARK}
                  fontWeight={700}
                />
              </div>
              <span className="text-[#51CC5D] font-bold">-3,5%</span>
            </h1>
          </div>
          <Space sizeWidth={30} />
          <div className="flex flex-col items-end">
            <TfiAlarmClock size={30} color={Color.theme.GREEN_DARK} />
            <Space size={30} />
            <span className="text-primary underline underline-offset-2 cursor-pointer font-bold">
              xem thêm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
