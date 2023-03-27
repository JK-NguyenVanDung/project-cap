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
      const data: any = await apiService.getGiftExchange();
      if (data) {
        setListGiftExchange(data.map((item: any) => item.gift));
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
      <Loading loading={loading} />
      <div className="p-3 pl-5 pr-5">
        <div className="grid grid-cols-3 ">
          {listGiftExchange.map((item: any, index: number) => {
            return (
              <div className="mx-8">
                <ItemGift
                  data={item}
                  index={index}
                  onClick={() => handelGiftExchange(item)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <ModalGift
        data={itemExchange}
        show={openExchange}
        setShow={setOpenExchange}
        loading={reload}
        setLoading={setLoading}
      />
    </>
  );
}

export default GiftSreen;
