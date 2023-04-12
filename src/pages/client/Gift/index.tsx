import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import SearchBar from '../../../components/admin/ToolBar/ToolBar';
import Loading from '../../../components/sharedComponents/Loading';
import { useAppSelector } from '../../../hook/useRedux';
import { removeVietnameseTones, timeOut } from '../../../utils/uinqueId';
import { Space } from '../Programs/ResultProgram';
import ItemGift from './Component/ItemGift';
import ModalGift from './Component/ModalGift';

function GiftScreen() {
  const [openExchange, setOpenExchange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemExchange, setItemExchange] = useState({});
  const [listGiftExchange, setListGiftExchange]: any = useState([]);
  const [filterData, setFilterData]: any = useState([]);

  const [coinSelf, setCoinSelf] = useState(0);
  const reload = useAppSelector((state: any) => state.reload.reload);

  const handelGiftExchange = (item: any) => {
    setOpenExchange(true);
    setItemExchange({ ...item, coinSelf });
  };
  const onChangeSearch = async (value: string) => {
    setLoading(true);
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();

    const filteredData = temp
      .map((record: any) => {
        const nameMatch = removeVietnameseTones(record.name).match(reg);
        if (!nameMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setListGiftExchange(filteredData ? filteredData : filterData);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };
  useEffect(() => {
    const fetchListGift = async () => {
      const data: any = await apiService.getAllGift();
      if (data) {
        setFilterData(data);
        setListGiftExchange(data.map((item: any) => item));
      }
    };

    const fetchAccount = async () => {
      const response: any = await apiService.getProfile();
      if (response) {
        const { coin } = response;
        setCoinSelf(coin);
      }
    };
    Promise.all([fetchListGift(), fetchAccount()]).finally(() =>
      timeOut(setLoading(false)),
    );
    // let timer = setTimeout(() => {

    // }, 300);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [reload]);
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
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
          <div className="p-3 pl-5 pr-5">
            <ul className="px-2 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
              {listGiftExchange ? (
                listGiftExchange.map((item: any, index: number) => {
                  return (
                    <li className="m-8 inline-block ">
                      <ItemGift
                        data={item}
                        index={index}
                        onClick={() => handelGiftExchange(item)}
                      />
                    </li>
                  );
                })
              ) : (
                <>Không có món quà bạn đang tìm kiếm</>
              )}
            </ul>
          </div>
          <ModalGift
            data={itemExchange}
            show={openExchange}
            setShow={setOpenExchange}
            loading={reload}
            setLoading={setLoading}
          />
        </>
      )}
    </>
  );
}

export default GiftScreen;
