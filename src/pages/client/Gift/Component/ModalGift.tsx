import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import defaultAVT from '../../../../assets/img/avatarSq.png';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { Space } from '../../Programs/ResultProgram';
import { Form, notification } from 'antd';
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
  const [disable, setDisable] = useState(false);
  const [change, setChange] = useState(1);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then(async () => {
        if (change >= 0 || left >= 0) {
          const params = {
            giftId: data.giftId,
            quantity: change,
          };
          setLoading(true);
          try {
            dispatch(actions.reloadActions.setReload());
            const response = apiService.ExchangeGift(params);
            console.log(response.then());
            if (response) {
              setShow(false);
              setLoading(false);
              setChange(0);
              notification.success({ message: 'Đổi quà thành công' });
              form.resetFields();
            }
          } catch (error) {
            notification.error({ message: 'Đổi quà không thành công' });
          }
        } else {
          form.resetFields();
          notification.error({ message: 'Đổi quà không thành công' });
        }
      })

      .catch((info) => {
        console.log(info);
      });
  };
  const handelReset = () => {
    setChange(1);
    setDisable(false);
    setLeft(0);
  };
  const FormItem = () => {
<<<<<<< HEAD
    const handleOnchange = (value: number) => {
      setCoin(data.coin * Number(value));
      let newCoin = data.coin * Number(value);
      setLeft(data.coinSelf - newCoin);
      setChange(value);
      if (left < 0) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    };
=======
    const [change, setChange] = useState(1);
    const coinMemo = useMemo(() => {
      return data.coin * change;
    }, [change]);
    const leftMemo = useMemo(() => {
      return data.coinSelf - coinMemo;
    }, [coinMemo]);
>>>>>>> 02375dea1242f9d9e8b98f1cd6bad12bdb465f2f

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
              <p className="w-[220px]">{data.description ?? ''}</p>
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
              <p className="text-start">{coinMemo ?? 0} coin</p>
            </div>
            <Space size={5} />
            <div className="w-full h-[1px] bg-gray-700" />
            <Space size={5} />
            <div className="flex justify-between ">
              <h1>Coin còn lại: </h1>
              <p className="text-start">{leftMemo ?? 0} coin</p>
            </div>
            <Space size={5} />
            <FormInput
<<<<<<< HEAD
              maxNumber={data.quantity ?? 0}
              label="Số lượng muốn đổi: "
              type="inputNumber"
              defaultValue={change}
              disabled={disable}
              onChangeNumber={(value: number) => handleOnchange(value)}
=======
              maxNumber={data.quantity + 10}
              label="Số lượng muốn đổi: "
              type="inputNumber"
              defaultValue={change}
              onChangeNumber={(value: number) => setChange(value)}
>>>>>>> 02375dea1242f9d9e8b98f1cd6bad12bdb465f2f
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số lượng',
                },
              ]}
            />
            {disable == true ? (
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => handelReset()}
              >
                <p className="text-error">Bạn không có đủ coin</p>
                <p className="text-primary ">làm mới</p>
              </div>
            ) : null}
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
      buttonText="Nhận"
    />
  );
}
