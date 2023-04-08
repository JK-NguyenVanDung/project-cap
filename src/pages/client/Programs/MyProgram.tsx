import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import CourseCard from '../../../components/client/Card/CourseCard';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import { BsFilter } from 'react-icons/bs';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import { MenuProps, Select, Spin } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Loading from '../../../components/sharedComponents/Loading';
import { removeVietnameseTones, timeOut } from '../../../utils/uinqueId';

export default function MyProgram() {
  const [data, setData] = useState<Array<IProgramItem>>(null);
  const [filterData, setFilterData] = useState<Array<IProgramItem>>(null);
  const myAccount = useAppSelector((state) => state.auth.info);
  const [loading, setLoading] = useState(true);

  const [options, setOptions] = useState([
    {
      value: 'Tất cả',
      label: 'Tất cả',
    },
    {
      value: 'Chưa đăng ký',
      label: 'Chưa đăng ký',
    },
    {
      value: 'Hết hạn',
      label: 'Hết hạn',
    },
  ]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data: any = await apiService.getMyPrograms(myAccount.accountId);
        const cate: any = await apiService.getCategories();
        cate &&
          setOptions([
            {
              value: 'Tất cả',
              label: 'Tất cả',
            },
            {
              value: 'Đang tham gia',
              label: 'Đang tham gia',
            },
            {
              value: 'Đã hoàn thành',
              label: 'Đã hoàn thành',
            },
            {
              value: 'Hết hạn',
              label: 'Hết hạn',
            },
            ...cate.map((item: any) => {
              return {
                value: item.categoryId,
                label: item.categoryName,
              };
            }),
          ]);
        let temp = data.reverse();

        // temp = data.filter((item: IProgramItem) => item.status == 'Công khai');
        setData(temp);
        setFilterData(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetch().finally(() => timeOut(setLoading(false)));

    dispatch(actions.formActions.setNameMenu(`${'Khóa Học Của Tôi'}`));
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/MyCourses/${item.programId}`);
  }
  const callBack = useCallback(function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/MyCourses/${item.programId}`);
  }, []);
  const filtering = (filter: any) => {
    setLoading(true);
    if (filter === 'Tất cả') {
      setData(filterData);
    } else if (filter === 'Đang tham gia') {
      setData(
        filterData?.filter(
          (item: IProgramItem) => item.status === 'public' && !item.isComplete,
        ),
      );
    } else if (filter === 'Đã hoàn thành') {
      setData(
        filterData?.filter(
          (item: IProgramItem) => item.status === 'public' && item.isComplete,
        ),
      );
    } else if (filter === 'Hết hạn') {
      setData(
        filterData?.filter((item: IProgramItem) => item.status === 'end'),
      );
    } else {
      setData(
        filterData?.filter((item: IProgramItem) => item.categoryId === filter),
      );
    }
    setLoading(false);
  };

  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: IProgramItem) => {
        const nameMatch = removeVietnameseTones(record.programName).match(reg);

        // const descMatch = removeVietnameseTones(record.descriptions).match(reg);
        // const cateMatch = removeVietnameseTones(
        //   record.category.categoryName,
        // ).match(reg);
        //&& !descMatch && !cateMatch
        if (!nameMatch) {
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
          <Select
            defaultValue="Tất cả"
            className={'min-w-[16rem]'}
            onChange={(e) => filtering(e)}
            options={options}
          />
        </div>
      </div>
      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        {data && data?.length > 0 ? (
          <ul className=" px-2 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
            {data?.map((item: IProgramItem) => {
              return (
                <li className="m-8 inline-block " key={item.programId}>
                  <CourseCard
                    onClick={callBack}
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
