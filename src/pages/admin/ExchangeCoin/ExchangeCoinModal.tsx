import React, { useState, useEffect, useRef } from 'react';
import { Form, notification, Image, DatePicker } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { useAppSelector } from '../../../hook/useRedux';
import apiService from '../../../api/apiService';
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { API_URL } from '../../../api/api';

export default function ({
  visible,
  setVisible,
  item,
  setItem,
  confirmLoading,
  setConfirmLoading,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: any;
  setItem: any;
  confirmLoading: boolean;
  setConfirmLoading: Function;
}) {
  const [form] = Form.useForm();
  const info = useAppSelector((state) => state.auth.info);
  const formData = new FormData();
  const inputRef = useRef(null);
  const [URLImage, setURLImage] = useState(null);
  const [infoImage, setInfoImage] = useState(null);

  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (info: any) => {
    const file = info.target.files[0];
    setLoadingImg(true);
    if (file) {
      setURLImage(URL.createObjectURL(file));
      setInfoImage(file);
    }
    let time = setTimeout(() => {
      setLoadingImg(false);
    }, 1000);
  };
  async function handleOk() {
    form
      .validateFields()
      .then(async (values) => {
        formData.append('Title', values.title ? values.title : item?.title);
        formData.append('Image', infoImage ? infoImage : item?.image);
        formData.append(
          'Description',
          values.description ? values.description : item?.description,
        );
        formData.append('Coin', values.coin ? values.coin : item?.coin);
        formData.append(
          'EndDate',
          values.endDate
            ? moment(values.endDate).toISOString(true)
            : item?.endDate,
        );
        formData.append('CreatorId', info.accountId);

        if (item) {
          await apiService.putExchange(item.exchangeId, formData);
          setVisible(false);
          notification.success({ message: 'Thay đổi thành công' });
        } else {
          await apiService.postExchange(formData);
          setVisible(false);
          notification.success({ message: 'Thêm thành công' });
        }
        setConfirmLoading(!confirmLoading);
        form.resetFields();
      })
      .catch((err: any) => {
        notification.error({ message: err?.message });
      })
      .finally(() => {
        form.resetFields();

        setURLImage(null);
      });
  }
  useEffect(() => {
    return () => {
      setURLImage(null);
    };
  }, [item || setVisible]);
  useEffect(() => {
    form.setFieldsValue({
      item,
    });
    console.log(item);
    setLoading(true);
    if (item) {
      setLoading(false);
    }
  }, [item, loading]);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <div className="img">
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
                    {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}{' '}
                    <span className="ml-2">Tải Ảnh Lên </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-[300px] flex flex-col items-center">
                <img
                  src={`${API_URL}/images/${item?.image}`}
                  alt="Ảnh bìa đổi coin"
                  className="object-cover w-[300px] h-[300px] rounded-lg"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                    // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
                  }}
                />

                <div style={{ marginTop: 20 }} className="flex items-center ">
                  {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}{' '}
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
        </div>
        <div className="w-full px-6 pb-6">
          <FormInput
            placeholder="Nhập Tiêu đề"
            label="Tên Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Tiêu đề',
              },
            ]}
          />
          <div className="flex justify-between">
            <div className=" w-full">
              <FormInput
                className=""
                placeholder="Số coin"
                label="Nhập số coin"
                name="coin"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Số Coin',
                  },
                  {
                    pattern: new RegExp(/^\d+$/),
                    message: 'Điểm phải thuộc kiểu số nguyên dương',
                  },
                ]}
              />
            </div>
            <div className="ml-8 w-full">
              <label className={`text-black font-bold font-customFont `}>
                Ngày kết thúc
              </label>
              <Form.Item
                style={{ marginTop: 14 }}
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Ngày Kết Thúc',
                  },
                ]}
              >
                <DatePicker
                  placeholder="Chọn ngày kết thúc"
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  className={`  font-customFont  font-bold  w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                />
              </Form.Item>
            </div>
          </div>
          <FormInput
            placeholder="Nhập miêu tả"
            label="Miêu tả"
            name="description"
            type="textArea"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Miêu tả',
              },
            ]}
          />
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      label={'Đơn Đổi Coin'}
      dataItem={item}
      name={item}
      handleOk={handleOk}
      FormItem={<FormItem />}
      form={form}
      width={900}
    />
  );
}
