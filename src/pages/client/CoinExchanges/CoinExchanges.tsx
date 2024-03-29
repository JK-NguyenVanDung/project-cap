import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { IExchangeCoin, IProgramItem } from '../../../Type';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import Loading from '../../../components/sharedComponents/Loading';
import { removeVietnameseTones, timeOut } from '../../../utils/uinqueId';
import CoinExchangeCard from '../../../components/client/Card/CoinExchangeCard';
import { actions } from '../../../Redux';

export default function () {
  const [data, setData] = useState<Array<IProgramItem>>(null);
  const [filterData, setFilterData] = useState<Array<IProgramItem>>(null);
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data: any = await apiService.getLearnerExchanges(info.accountId);
        let res = data.reverse();
        console.log(res);
        setData(res);
        setFilterData(res);
        // temp = data.filter((item: IProgramItem) => item.status == 'Công khai');
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(actions.formActions.setNameMenu('Đổi Coin'));

    fetch().finally(() => timeOut(setLoading(false)));
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handelDataProgram(item: IExchangeCoin) {
    navigate(`/CoinExchanges/${item.exchangeId}`);
  }
  const [loading, setLoading] = useState(true);

  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: IExchangeCoin) => {
        const nameMatch = removeVietnameseTones(record.title).match(reg);

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
      </div>
      <Loading loading={loading} />

      <div
        className={`w-full flex justify-center ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        <ul className=" px-2 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
          {data && data?.length > 0 ? (
            data?.map((item: IExchangeCoin) => {
              return (
                <li className="m-8 inline-block ">
                  <CoinExchangeCard
                    onClick={() => handelDataProgram(item)}
                    item={item}
                    status={
                      item.ended ? 'ended' : item.certificatePhotos[0]?.status
                    }
                    isRegistered={false}
                  />
                </li>
              );
            })
          ) : (
            <div className="w-full ml-[80%] h-[60vh] grid content-center text-xl font-bold">
              {!loading && 'Không có dữ liệu'}
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
