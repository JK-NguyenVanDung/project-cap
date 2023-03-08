import React from 'react';
import { Space } from '../../Programs/ResultProgram';
import {
  BsFillHexagonFill,
  BsArrowDownLeft,
  BsCalendar3,
} from 'react-icons/bs';
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
            <h1 className="font-bold text-sm text-gray-600">Số Giờ Đào Tạo</h1>
            <h1 className="font-bold text-2xl text-black py-2">20 Giờ</h1>
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
            <TfiAlarmClock size={30} color={Color.theme.GREEN_DARK} />
            <Space size={30} />
            <span className="text-primary underline underline-offset-2 cursor-pointer font-bold">
              Xem thêm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
