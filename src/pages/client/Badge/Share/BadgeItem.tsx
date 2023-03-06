import React from 'react';
import { Space } from '../../Programs/ResultProgram';
import { BsFillHexagonFill, BsArrowDownLeft } from 'react-icons/bs';
import { SlBadge } from 'react-icons/sl';
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLineChart, AiFillStar } from 'react-icons/ai';
import SearchBar from '../../../../components/admin/ToolBar/ToolBar';
import Color from '../../../../components/constant/Color';
import { useNavigate } from 'react-router-dom';
import ContentPopover from './ContentPopover';
import { Popover } from 'antd';
export default function BadgeItem() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <div className="flex flex-col self-center items-center ">
          <div
            className="relative w-[150px] h-[150px] cursor-pointer"
            onClick={() => navigate('/detailBadge')}
          >
            <Popover content={ContentPopover} title="Thông Tin Chứng Chỉ">
              <BsFillHexagonFill
                className="rotate-90"
                size={150}
                color={Color.theme.CORNFLOWER_BLUE}
              />

              <div className="absolute w-full top-0 flex flex-col items-center text-center">
                <Space size={30} />
                <SlBadge size={30} />
                <Space size={10} />
                <h1 className="font-bold text-lg text-black">GITHUB</h1>
                <Space size={10} />
                <div className="flex">
                  <AiFillStar size={20} color={Color.theme.YELLOW} />
                  <AiFillStar size={20} color={Color.theme.YELLOW} />
                  <AiFillStar size={20} color={Color.theme.YELLOW} />
                </div>
              </div>
            </Popover>
          </div>
        </div>
        <Space size={20} />
      </div>
    </>
  );
}
