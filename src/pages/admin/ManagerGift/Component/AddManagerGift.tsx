import React, { useState, useEffect, useRef } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import { Form, Upload, notification } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { API_URL } from '../../../../api/api';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { IGift } from '../../../../api/apiInterface';
import apiService from '../../../../api/apiService';

export default function AddManagerGift({
  showModal,
  setShowModal,
  detail,
  loading,
  setLoading,
}: {
  showModal: boolean;
  setShowModal: any;
  detail: IGift;
  loading: any;
  setLoading: any;
}) {
  const [form] = Form.useForm();
  const formData = new FormData();
  const [infoImage, setInfoImage] = useState(null);
  const inputRef = useRef(null);
  const [URLImage, setURLImage] = useState(null);
  const handleChange = (info: any) => {
    const file = info.target.files[0];
    setLoading(true);
    if (file) {
      setURLImage(URL.createObjectURL(file));
      setInfoImage(file);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    return () => {
      setURLImage(null);
    };
  }, []);
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        formData.append('Name', values.name ? values.name : detail?.name);
        formData.append('Image', infoImage ? infoImage : detail?.image);
        formData.append(
          'Description',
          values.description ? values.description : detail?.description,
        );
        formData.append('Coin', values.coin ? values.coin : detail?.coin);
        formData.append(
          'Quantity',
          values.quantity ? values.quantity : detail?.quantity,
        );
        console.log(formData.getAll('Image'));
        try {
          setLoading(true);
          if (detail) {
            const data = apiService.updateGift(detail.giftId, formData);
            if (data) {
              notification.success({ message: 'Thay đổi thành công' });
            }
            setShowModal(false);
            form.resetFields();
          } else {
            const data = apiService.addGift(formData);
            if (data) {
              notification.success({ message: 'Thêm thành công' });
            }
            setShowModal(false);
            form.resetFields();
          }
        } catch (error) {
          notification.error({ message: 'Thực hiện không thành công' });
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const FormItem = () => {
    return (
      <>
        <div className="flex justify-between content-center">
          <div
            onClick={() => inputRef.current.click()}
            className=" cursor-pointer "
          >
            {URLImage ? (
              <>
                <div className="w-[300px] flex flex-col items-center">
                  <img
                    src={URLImage}
                    alt="ảnh quà tặng"
                    className="object-cover w-[300px] h-[300px] rounded-lg"
                  />

                  <div style={{ marginTop: 20 }} className="flex items-center ">
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}{' '}
                    <span className="ml-2">Tải Ảnh Lên </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-[300px] flex flex-col items-center">
                <img
                  src={`${API_URL}/images/${detail?.image}`}
                  alt="ảnh quà tặng"
                  className="object-cover w-[300px] h-[300px] rounded-lg"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                    // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
                  }}
                />

                <div style={{ marginTop: 20 }} className="flex items-center ">
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}{' '}
                  <span className="ml-2">Tải Ảnh Lên </span>
                </div>
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            style={{
              display: 'none',
            }}
            type="file"
            onChange={handleChange}
            accept="image/*"
          />

          <div className="w-full pr-10 pl-10">
            <FormInput
              className="w-full"
              name="name"
              label="Tên Quà Tặng"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Tên Quà Tặng',
                },
              ]}
            />
            <FormInput
              areaHeight={6}
              name="description"
              type="textArea"
              label="Mô Tả "
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Mô Tả ',
                },
              ]}
            />
            <FormInput
              className="w-full"
              name="coin"
              type="inputNumber"
              label="Giá Đổi    "
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Giá Đổi   ',
                },
              ]}
            />
            <FormInput
              className="w-full"
              name="quantity"
              type="inputNumber"
              label="Số Lượng Hiện Có"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số Lượng Hiện Có',
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
      centered={true}
      show={showModal}
      setShow={setShowModal}
      dataItem={detail}
      name={detail}
      handleOk={handleOk}
      FormItem={<FormItem />}
      form={form}
      header={'Chỉnh Sửa Quà Tặng'}
      width={900}
    />
  );
}
