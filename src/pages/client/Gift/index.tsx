import React, { useState } from 'react';
import { Space } from '../Programs/ResultProgram';
import ItemGift from './Component/ItemGift';
import ModalGift from './Component/ModalGift';

function GiftSreen() {
  const [openExchange, setOpenExchange] = useState(false);
  const handelGiftExchange = () => {
    setOpenExchange(true);
  };
  return (
    <>
      <div className="p-3 pl-5 pr-5">
        <div className="grid grid-cols-3">
          <ItemGift onClick={() => handelGiftExchange()} />
        </div>
      </div>
      <ModalGift show={openExchange} setShow={setOpenExchange} />
    </>
  );
}

export default GiftSreen;
