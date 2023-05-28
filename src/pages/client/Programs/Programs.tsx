import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

export default function Programs() {
  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState<Array<IProgramItem>>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const callBack = useCallback(function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/Programs/${item.programId}`);
  }, []);
  const [loading, setLoading] = useState(true);
  const isLike: boolean = useAppSelector((state) => state.nav.isLike);
  const location = useLocation();
  const [options, setOptions] = useState([
    {
      value: 'Tất cả',
      label: 'Tất cả',
    },
    {
      value: 'Không trong thời hạn đăng ký',
      label: 'Không trong thời hạn đăng ký',
    },
    {
      value: 'Đã kết thúc',
      label: 'Đã kết thúc',
    },
  ]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: any = await apiService.getPublicPrograms();

        let temp = res;
        temp = isLike
          ? res.filter((item: IProgramItem) => item.isLike === true)
          : res.reverse();
        setData(temp);
        console.log(temp);
        setFilterData(temp);
        const cate: any = await apiService.getCategories();

        cate &&
          setOptions([
            {
              value: 'Tất cả',
              label: 'Tất cả',
            },
            {
              value: 'Không trong thời hạn đăng ký',
              label: 'Không trong thời hạn đăng ký',
            },
            {
              value: 'Đã kết thúc',
              label: 'Đã kết thúc',
            },
            ...cate.map((item: any) => {
              return {
                value: item.categoryId,
                label: item.categoryName,
              };
            }),
          ]);
        // temp = data.filter((item: IProgramItem) => item.status == 'Công khai');
      } catch (error) {
        console.log(error);
      }
    };
    fetch().finally(() => timeOut(setLoading(false)));
    dispatch(
      actions.formActions.setNameMenu(
        `${!isLike ? 'Khóa học' : `Khoá Học Yêu Thích`}`,
      ),
    );
    return () => {
      dispatch(actions.navActions.setIsLike(false));
    };
  }, [location]);
  // useEffect(() => {
  console.count('re-0');

  function NoData() {
    return (
      <>
        <div className="w-full ml-[80%] max-sm:ml-0 max-md:ml-0 h-[60vh] grid content-center text-xl font-bold">
          Không có dữ liệu
        </div>
      </>
    );
  }
  const filtering = (e: any) => {
    setLoading(true);
    console.log(e);
    // setData(filterData);
    if (e === 'Tất cả') {
      setData(filterData);
    } else if (e === 'Không trong thời hạn đăng ký') {
      setData(
        filterData?.filter((item: IProgramItem) => item.status === 'public'),
      );
    } else if (e === 'Đã kết thúc') {
      setData(
        filterData?.filter((item: IProgramItem) => item.status === 'end'),
      );
    } else {
      setData(
        filterData?.filter((item: IProgramItem) => item.categoryId === e),
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
        // && !descMatch && !cateMatch
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
        className={`bg-white py-4  pb-8 flex max-sm:flex-wrap  w-full  items-center justify-between`}
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
          <div className=" ">
            <Select
              defaultValue="Tất cả"
              className={'min-w-[16rem]'}
              onChange={(e) => filtering(e)}
              options={options}
            ></Select>
          </div>
        </div>
      </div>
      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        <ul className=" px-2 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
          {data && data?.length > 0 ? (
            data?.map((item: IProgramItem) => {
              return (
                <li className="m-8 inline-block " key={item.programId}>
                  <CourseCard onClick={callBack} item={item} />
                </li>
              );
            })
          ) : (
            <>{<NoData />}</>
          )}
        </ul>
      </div>
    </>
  );
}
