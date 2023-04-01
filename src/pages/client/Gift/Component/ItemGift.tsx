import React from 'react';
import { API_URL } from '../../../../api/api';
import defaultAvatar from '../../../../assets/img/avatarSq.png';
export default function ItemGift({
  data,
  index,
  onClick,
}: {
  data?: any;
  index?: number;
  onClick?: any;
}) {
  return (
    <div
      key={index}
      className="cardCont  rounded-[20px] bg-white  flex flex-col w-full  my-8"
    >
      <div
        className={`card shadow-lg  border-[2px] border-white hover:border-primary ${
          data?.quantity === 0 ? 'hover:border-red-500' : 'hover:border-primary'
        } hover:transition-colors	 hover:ease-in-out flex 
          overflow-hidden flex-col  w-full rounded-[20px] justify-end hover:border-[3px] `}
      >
        <div className="max-h-[40vh] h-[25vh]  w-full">
          <img
            className="rounded-lg object-cover	h-full w-full"
            src={`${API_URL}/images/${data?.image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
            }}
          />
        </div>
        <div className="py-2 px-4 ">
          <p className="text-lg my-2 eclipse-text  max-w-fit w-fit font-semibold cursor-pointer hover:text-primary">
            {data?.name}
          </p>
          <p className="text-body eclipse min-h-[3rem]">{data?.description}</p>
          <div className="flex justify-between pb-4">
            <p>
              <span className="font-bold">Số Lượng:</span> {data?.quantity ?? 0}
            </p>
            <p>
              <span className="font-bold">Giá:</span> {data?.coin ?? 0} Coin
            </p>
          </div>
        </div>
        <button
          className={` outline-none card-button ${
            data?.quantity === 0 ? 'bg-red-500' : 'bg-primary'
          }`}
          onClick={() => (data?.quantity !== 0 ? onClick(data) : null)}
        >
          {data?.quantity !== 0 ? 'Nhận' : 'Đã Hết Quà'}
        </button>
      </div>
    </div>
  );
}
