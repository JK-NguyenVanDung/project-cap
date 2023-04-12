import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import defaultAVT from '../../../../assets/img/avatarSq.png';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { Space } from '../../Programs/ResultProgram';
import { Form, notification, Modal } from 'antd';
import apiService from '../../../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { API_URL } from '../../../../api/api';
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
  const [disable, setDisable] = useState(false);
  const [change, setChange] = useState(1);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  function countDown() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'CHÚC MỪNG ! BẠN ĐÃ NHẬN QUÀ THÀNH CÔNG',
      content: (
        <div>
          <h1 className="font-bold ">Để Nhận Quà Vui Lòng Đến:</h1>
          <p>
            <h1 className="font-bold ">Địa Chỉ:</h1> 69/68 Đ. Đặng Thuỳ Trâm,
            Phường 13, Bình Thạnh, Thành phố Hồ Chí Minh
          </p>
        </div>
      ),
      width: 500,
    });
    setLoading(true);
    setTimeout(() => {
      modal.destroy();
      setLoading(false);
    }, secondsToGo * 1000);
  }
  const redeemSuccess = () => {
    setLoading(false);
    setShow(false);
    countDown();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async () => {
        const params = {
          giftId: data.giftId,
          quantity: change,
        };
        setLoading(true);
        try {
          dispatch(actions.reloadActions.setReload());
          const response = await apiService.ExchangeGift(params);
          if (response) {
            setLoading(false);
            setChange(0);
            setShow(false);
          }
          redeemSuccess();
          form.resetFields();
        } catch (error) {
          console.log(error);
          notification.error({ message: 'Đổi quà không thành công' });
        }
      })
      .catch((info) => {
        console.log(info);
      });
    setShow(false);

    form.resetFields();
  };
  const handleCancel = () => {
    setChange(1);
    setDisable(false);
    setShow(false);
    form.resetFields();
  };
  const FormItem = () => {
    const coinMemo = useMemo(() => {
      return data.coin * change;
    }, [change, data.coin]);
    const leftMemo = useMemo(() => {
      return data.coinSelf - coinMemo;
    }, [coinMemo, data.coinSelf]);
    if (data.coinSelf - data.coin * change <= 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    return (
      <>
        <div className="flex justify-around ">
          <div className="w-1/2 ">
            <div>
              <img
                className="rounded-lg object-cover object-center  w-full h-[26vh]"
                src={`${API_URL}/images/${data.image}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                  // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
                }}
                alt=""
              />
              <Space size={5} />
              <h1 className="text-start font-bold text-lg">
                {data.name ?? ''}
              </h1>
              <Space size={5} />
              <div className="flex ">
                <p className="mr-2">Số Lượng: </p>
                <p>{data.quantity ?? 0}</p>
              </div>
              <Space size={5} />
            </div>
          </div>
          <Space sizeWidth={20} />

          <div className="w-3/5">
            <FormInput
              maxNumber={data.quantity}
              label="Số lượng muốn đổi: "
              type="inputNumber"
              defaultValue={change}
              onChangeNumber={(value: number) => setChange(value)}
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số lượng',
                },
              ]}
            />
            <div className="flex justify-between ">
              <h1>Coin của bạn: </h1>
              <p className="text-start">{data.coinSelf ?? 0} coin</p>
            </div>
            <Space size={10} />
            <div className="flex justify-between ">
              <h1>Giá Sản Phẩm: </h1>
              <p className="text-start">{coinMemo ?? 0} coin</p>
            </div>
            <Space size={10} />
            <div className="w-full h-[1px] bg-gray-700" />
            <Space size={10} />
            <div className="flex justify-between ">
              <h1>Coin còn lại: </h1>
              <p className="text-start">{leftMemo ?? 0} coin</p>
            </div>
            <Space size={10} />
          </div>
        </div>
        <p className="w-full">{data.description ?? ''}</p>
      </>
    );
  };
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      FormItem={<FormItem />}
      handelCancel={handleCancel}
      handleOk={handleOk}
      cancel={true}
      form={form}
      label="Quy Đổi Quà"
      notAdd
      showButton
      redeemText={disable == true ? null : 'Nhận'}
      width={700}
    />
  );
}
