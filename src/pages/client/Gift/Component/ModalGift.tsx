import React, { useEffect, useState, useCallback } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import defaultAVT from '../../../../assets/img/avatarSq.png';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { Space } from '../../Programs/ResultProgram';
import { Form } from 'antd';
import apiService from '../../../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
export default function ModalGift({
  show,
  setShow,
  data,
  loading,
  setLoading,
}: {
  show: boolean;
  loading: any;
  setLoading: any;
  setShow: any;
  data: any;
}) {
  const [coin, setCoin] = useState(data.coin ? data.coin : 0);
  const [left, setLeft] = useState(
    data.coinSelf && data.coin ? data.coinSelf - data.coin : 0,
  );
  const [change, setChange] = useState(0);

  const dispatch = useAppDispatch();
  const handleOnchange = (value: number) => {
    setCoin(data.coin * Number(value));
    let newCoin = data.coin * Number(value);
    setLeft(data.coinSelf - newCoin);
    setChange(value);
  };
  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const params = {
          giftId: data.giftId,
          quantity: change,
        };
        setLoading(true);
        try {
          dispatch(actions.reloadActions.setReload());
          const response = apiService.ExchangeGift(params);
          if (response) {
            setShow(false);
            setLoading(false);
            setChange(0);
            form.resetFields();
          }
        } catch (error) {}
      })

      .catch((info) => {
        console.log(info);
      });
  };

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
              <p className="text-start">{coin ?? 0} coin</p>
            </div>
            <Space size={5} />
            <div className="w-full h-[1px] bg-gray-700" />
            <Space size={5} />
            <div className="flex justify-between ">
              <h1>Coin còn lại: </h1>
              <p className="text-start">{left ?? 0} coin</p>
            </div>
            <Space size={5} />
            <FormInput
              maxNumber={data.quantity}
              label="Số lượng muốn đổi: "
              type="inputNumber"
              defaultValue={change}
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
      form={form}
      header="Quy Đổi Quà"
      label={'Quy Đổi Quà'}
      notAdd
      width={700}
    />
  );
}
