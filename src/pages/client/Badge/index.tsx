import React, { useEffect, useState } from 'react';
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
import apiService from '../../../api/apiService';
import { useAppSelector } from '../../../hook/useRedux';
import { removeVietnameseTones } from '../../../utils/uinqueId';
import Loading from '../../../components/sharedComponents/Loading';
export enum typeStatic {
  programComplete = 'programComplete',
  trainingHours = 'trainingHours',
  attendance = 'attendance',
}
export default function () {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.auth.info);
  const [todoList, setTodoList]: any = useState([]);
  const [listStatics, setListStatics]: any = useState();
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData]: any = useState(null);

  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = todoList.slice();

    const filteredData = temp
      .map((record: any) => {
        const cateMatch = removeVietnameseTones(
          record.category.categoryName,
        ).match(reg);

        if (!cateMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setTodoList(filteredData ? filteredData : filterData);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };
  useEffect(() => {
    const filtering = () => {
      setLoading(true);
      setTodoList(filterData);
    };
    filtering();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filterData]);
  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const data: any = await apiService.getProgramComplete(
          account.accountId,
        );
        setLoading(true);
        if (data) {
          setLoading(false);
          setFilterData(data);
          setTodoList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBadge();
  }, []);

  useEffect(() => {
    const fetchStatics = async () => {
      try {
        const data: any = await apiService.getMyStatics(account.accountId);
        setLoading(true);
        if (data) {
          setLoading(false);
          setListStatics(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatics();
  }, []);
  return (
    <>
      <Loading loading={loading} />
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
          <BadgeItem params={todoList ?? []} />
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
          <div className="flex justify-between">
            <ItemChart
              params={listStatics?.programComplete}
              type={typeStatic.programComplete}
            />
            <ItemChart
              params={listStatics?.trainingHours}
              type={typeStatic.trainingHours}
            />
            <ItemChart
              params={listStatics?.attendance}
              type={typeStatic.attendance}
            />
          </div>
          <Space size={30} />
        </div>
        <Space size={30} />
      </div>
    </>
  );
}
