import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import Loading from '../../../components/sharedComponents/Loading';
import { useAppSelector } from '../../../hook/useRedux';
import { Space } from '../Programs/ResultProgram';
import ItemGift from './Component/ItemGift';
import ModalGift from './Component/ModalGift';

function GiftSreen() {
  const [openExchange, setOpenExchange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemExchange, setItemExchange] = useState({});
  const [listGiftExchange, setListGiftExchange]: any = useState([]);
  const [coinSelf, setCoinSelf] = useState(0);
  const reload = useAppSelector((state: any) => state.reload.reload);

  const handelGiftExchange = (item: any) => {
    setOpenExchange(true);
    setItemExchange({ ...item, coinSelf });
  };

  useEffect(() => {
    setLoading(true);
    const fetchListGift = async () => {
      const data: any = await apiService.getAllGift();
      if (data) {
        setListGiftExchange(data.map((item: any) => item));
      }
    };
    fetchListGift();
    const fetchAccount = async () => {
      const response: any = await apiService.getProfile();
      if (response) {
        const { coin } = response;
        setCoinSelf(coin);
      }
    };
    fetchAccount();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [reload]);
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <div className="p-3 pl-5 pr-5">
            <ul className="px-2 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  grid-cols-3 md:grid-cols-2 sm:grid-cols-1  max-sm:grid-cols-1	">
              {listGiftExchange.map((item: any, index: number) => {
                return (
                  <li className="m-8 inline-block ">
                    <ItemGift
                      data={item}
                      index={index}
                      onClick={() => handelGiftExchange(item)}
                    />
                  </li>
                );
              })}
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

export default GiftSreen;
