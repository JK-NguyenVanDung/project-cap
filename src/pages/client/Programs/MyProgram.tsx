import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import CourseCard from '../../../components/client/Card/CourseCard';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import { BsFilter } from 'react-icons/bs';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import { MenuProps, Spin } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Loading from '../../../components/sharedComponents/Loading';
import { removeVietnameseTones } from '../../../utils/uinqueId';

export default function MyProgram() {
  const [data, setData] = useState<Array<IProgramItem>>(null);
  const [filterData, setFilterData] = useState<Array<IProgramItem>>(null);
  const myAccount = useAppSelector((state) => state.auth.info);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const data: any = await apiService.getMyPrograms(info.accountId);
        let tempA = data.filter(
          (item: IProgramItem) => item.status === 'public',
        );
        let tempB = data.filter(
          (item: IProgramItem) =>
            item.status === 'public' || item.status === 'end',
        );
        tempA = tempA.reverse();
        tempB = tempB.reverse();

        // temp = data.filter((item: IProgramItem) => item.status == 'Công khai');
        setData(tempA);
        setFilterData(tempB);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    dispatch(actions.formActions.setNameMenu(`${'Khóa Học Của Tôi'}`));
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/MyCourses/${item.programId}`);
  }
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const [filter, setFilter] = useState('Đang tham gia');
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => setFilter('Đang tham gia')}>Đang tham gia</a>,
    },
    {
      key: '2',
      label: <a onClick={() => setFilter('Hết hạn')}>Hết hạn</a>,
    },
    {
      key: '3',
      label: <a onClick={() => setFilter('Hoàn thành')}>Hoàn thành</a>,
    },
    // {
    //   key: '3',
    //   label: <a onClick={() => setFilter('Từ A-Z')}>Từ A-Z</a>,
    // },
  ];
  useEffect(() => {
    const filtering = () => {
      setLoading(true);
      if (filter === 'Đang tham gia') {
        setData(
          filterData?.filter((item: IProgramItem) => item.status === 'public'),
        );
      }
      if (filter === 'Hết hạn') {
        setData(
          filterData?.filter((item: IProgramItem) => item.status === 'end'),
        );
      }
    };
    filtering();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter]);
  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: IProgramItem) => {
        const nameMatch = removeVietnameseTones(record.programName).match(reg);

        const descMatch = removeVietnameseTones(record.descriptions).match(reg);
        const cateMatch = removeVietnameseTones(
          record.category.categoryName,
        ).match(reg);

        if (!nameMatch && !descMatch && !cateMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(filteredData ? filteredData : filterData);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };
  return (
    <>
      <div
        className={`bg-white py-4  pb-8 flex max-sm:flex-wrap  w-full  items-center justify-between
  `}
      >
        <div className="w-fit mx-4 ">
          <SearchBar
            onSearch={onChangeSearch}
            className="
            max-sm:min-w-[21rem]
            box-border	shadow-none min-w-[22rem] h-[2.8rem] border-2 rounded-[14px] border-[#F5F5F7]"
            prefix
          />
        </div>
        <div className="w-fit mx-4 cursor-pointer	max-sm:mt-4">
          <div className="  shadow-none border flex items-center p-2 rounded-lg border-[#F5F5F7]">
            <Dropdown menu={{ items }} placement="bottomRight">
              <button className="flex justify-center items-center">
                <BsFilter className="text-xl mx-2" />
                <div className="pr-2">Lọc bởi: {filter}</div>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        {data?.length > 0 ? (
          <ul className=" px-2 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
            {data?.map((item: IProgramItem) => {
              return (
                <li className="m-8 inline-block ">
                  <CourseCard
                    onClick={() => handelDataProgram(item)}
                    item={item}
                    isRegistered={true}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-full h-[60vh] flex justify-center items-center text-xl font-bold">
              Bạn đang không tham gia chương trình nào cả.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
