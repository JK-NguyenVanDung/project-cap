import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import CourseCard from '../../../components/client/Card/CourseCard';
import Input from '../../../components/sharedComponents/Input';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import { BsFilter } from 'react-icons/bs';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import { MenuProps, Spin } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Loading from '../../../components/sharedComponents/Loading';

export default function Homepage() {
  const [data, setData] = useState<Array<IProgramItem>>(null);
  const [filterData, setFilterData] = useState<Array<IProgramItem>>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data: any = await apiService.getPrograms();
        data.reverse();
        setData(data);
        setFilterData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram(item: IProgramItem) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate(`/Courses/${item.programName}`);
  }
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const [filter, setFilter] = useState('Mới nhất');
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => setFilter('Mới nhất')}>Mới nhất</a>,
    },
    {
      key: '2',
      label: <a onClick={() => setFilter('Cũ nhất')}>Cũ nhất</a>,
    },
    // {
    //   key: '3',
    //   label: <a onClick={() => setFilter('Từ A-Z')}>Từ A-Z</a>,
    // },
  ];
  useEffect(() => {
    const filtering = () => {
      setLoading(true);

      if (filter === 'Mới nhất') {
        setData(filterData);
      }
      if (filter === 'Cũ nhất') {
        setData(filterData.slice().reverse());
      }
    };
    filtering();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [filter]);
  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(value, 'gi');
    let temp = data;
    const filteredData = temp
      .map((record: IProgramItem) => {
        const nameMatch = record.programName.match(reg);

        const descMatch = record.descriptions.match(reg);
        const cateMatch = record.category.categoryName.match(reg);

        if (!nameMatch && !descMatch && !cateMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' && filteredData ? filteredData : filterData);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };
  return (
    <>
      <Loading loading={loading} />

      <div className="bg-white py-4 pb-8 flex w-full  items-center justify-between">
        <div className="w-fit mx-4">
          <SearchBar
            onSearch={onChangeSearch}
            className="
            
            box-border	shadow-none min-w-[22rem] h-[2.8rem] border-2 rounded-[14px] border-[#F5F5F7]"
            prefix
          />
        </div>
        <div className="w-fit mx-4 cursor-pointer	">
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
      <div className="w-full flex justify-center">
        <ul className=" grid  grid-cols-3 ">
          {data?.length > 0 ? (
            data?.map((item: IProgramItem) => {
              return (
                <li className="m-8 inline-block ">
                  <CourseCard
                    onClick={() => handelDataProgram(item)}
                    item={item}
                  />
                </li>
              );
            })
          ) : (
            <div className="w-full ml-[80%] h-[60vh] grid content-center text-xl font-bold">
              Không có dữ liệu
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
