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
import { useAppDispatch } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
export default function BadgeItem({ params }: { params: any }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goDetailBadge = (item: any) => {
    navigate('/detailBadge');
    dispatch(actions.formActions.setProgramId(item));
  };
  return (
    <>
      <div className="flex">
        <div className="flex  self-center items-center ">
          {params?.map((item: any, index: number) => {
            return (
              <>
                <div
                  className="relative w-[200px] h-[200px] cursor-pointer"
                  onClick={() => goDetailBadge(item)}
                  key={index}
                >
                  <Popover
                    content={<ContentPopover params={item} />}
                    title="Thông Tin Chứng Chỉ"
                  >
                    <BsFillHexagonFill
                      className="rotate-90"
                      size={200}
                      color={Color.theme.CORNFLOWER_BLUE}
                    />

                    <div className="absolute w-full top-0 flex flex-col items-center text-center">
                      <Space size={30} />
                      <SlBadge size={30} />
                      <Space size={10} />
                      <h1 className="font-bold text-lg w-4/6 text-black">
                        {item.category.categoryName}
                      </h1>
                      <Space size={10} />
                      <div className="flex">
                        <AiFillStar size={20} color={Color.theme.YELLOW} />
                        <AiFillStar size={20} color={Color.theme.YELLOW} />
                        <AiFillStar size={20} color={Color.theme.YELLOW} />
                      </div>
                    </div>
                  </Popover>
                </div>
                <Space sizeWidth={20} />
              </>
            );
          })}
        </div>
        <Space size={20} />
      </div>
    </>
  );
}
