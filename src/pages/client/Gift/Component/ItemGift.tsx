import React from 'react';
import { API_URL } from '../../../../api/api';
import defaultAvatar from '../../../../assets/img/avatarSq.png';
export default function ItemGift({
  data,
  onClick,
}: {
  data?: any;
  onClick?: any;
}) {
  return (
    <div className="cardCont w-fit  rounded-[20px] bg-white  flex flex-col   my-8">
      <div
        className="card shadow-lg  border-[2px] border-white hover:border-primary hover:transition-colors	 hover:ease-in-out flex 
          overflow-hidden flex-col  w-full rounded-[20px] justify-end hover:border-[3px]  "
      >
        <div className="max-h-[40vh] h-[25vh]  w-full">
          <img
            className="rounded-lg object-cover	h-full w-full"
            // src={`${API_URL}/images/${data.image}`}
            src={defaultAvatar}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
            }}
            alt=""
          />
        </div>
        <div className="py-2 px-4 ">
          <p className="text-lg my-2 eclipse-text  max-w-fit w-fit font-semibold cursor-pointer hover:text-primary">
            Macccc
          </p>
          <p className="text-body eclipse min-h-[3rem]">
            aksdhjkahdfkjhsadkfhakjsdhfkjsadhfk
          </p>
          <div className="flex justify-between">
            <p>
              <span className="font-bold">Số Lượng:</span> 300
            </p>
            <p>
              <span className="font-bold">Giá:</span> 30000 Coin
            </p>
          </div>
        </div>
        <button
          className=" outline-none card-button bg-primary"
          onClick={onClick}
        >
          Nhận
        </button>
      </div>
    </div>
  );
}
