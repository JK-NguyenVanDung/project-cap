import React, { useEffect, useState, useCallback } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import defaultAVT from '../../../../assets/img/avatarSq.png';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { Space } from '../../Programs/ResultProgram';
export default function ModalGift({
  show,
  setShow,
  data,
}: {
  show: boolean;
  setShow: any;
  data: any;
}) {
  const handleOk = () => {
    setShow(false);
  };

  const handleOnchange = (value: number) => {};

  const FormItem = () => {
    return (
      <>
        <div className="flex justify-around ">
          <div>
            <div>
              <img src={defaultAVT} />
              <Space size={5} />
              <div className="flex justify-between">
                <p>Số Lượng: </p>
                <p>{data.quantity ?? 0}</p>
              </div>
              <Space size={5} />
              <p>{data.description ?? ''}</p>
            </div>
          </div>
          <Space sizeWidth={20} />

          <div className="w-3/5">
            <div className="flex justify-between ">
              <h1>Tên Sản Phẩm:</h1>
              <p className="text-start"> {data.name ?? ''}</p>
            </div>
            <Space size={5} />
            <div className="flex justify-between ">
              <h1>Coin của bạn: </h1>
              <p className="text-start">{data.coinSelf ?? 0} coin</p>
            </div>
            <Space size={5} />
            <div className="flex justify-between ">
              <h1>Giá Sản Phẩm: </h1>
              <p className="text-start">{data.coin ?? 0} coin</p>
            </div>
            <Space size={5} />
            <div className="w-full h-[1px] bg-gray-700" />
            <Space size={5} />
            <div className="flex justify-between ">
              <h1>Coin còn lại: </h1>
              <p className="text-start">
                {data.coinSelf - data.coin ?? 0} coin
              </p>
            </div>
            <Space size={5} />
            <FormInput
              maxNumber={data.quantity}
              label="Số lượng muốn đổi: "
              type="inputNumber"
              defaultValue={1}
              onChangeNumber={(value: number) => handleOnchange(value)}
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số lượng',
                },
              ]}
            />
          </div>
        </div>
      </>
    );
  };
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      FormItem={<FormItem />}
      handleOk={handleOk}
      header="Quy Đổi Quà"
      label={'Quy Đổi Quà'}
      notAdd
      width={700}
    />
  );
}
