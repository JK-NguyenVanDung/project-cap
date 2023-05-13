import React, { useRef, useEffect, useState } from 'react';
import { Form, Select, Upload, Image, message, notification } from 'antd';
import CustomModal from '../../../../../components/admin/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../../hook/useRedux';
import avatarSqDefault from '../../../../../assets/img/avatarSq.png';
import FormInput from '../../../../../components/admin/Modal/FormInput';
import apiService from '../../../../../api/apiService';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import './index.css';
import { actions } from '../../../../../Redux';
import { API_URL } from '../../../../../api/api';
export default function ModalProfile({
  open,
  item,
  setItem,
  setOpen,
  loadingConfirm,
  setLoadingConfirm,
}: {
  open: boolean;
  item?: any;
  setItem?: any;

  setOpen: any;
  loadingConfirm: boolean;
  setLoadingConfirm: any;
}) {
  const [form] = Form.useForm();
  const [dataFct, setDataFct]: any = useState([]);
  const [positons, setPositons]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const formData = new FormData();
  const dispatch = useAppDispatch();
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
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      setLoadingConfirm(true);
      formData.append(
        'Address',
        values.address ? values.address : item.address,
      );
      formData.append(
        'PhoneNumber',
        values.phoneNumber ? values.phoneNumber : item.phoneNumber,
      );
      formData.append('code', values.code ? values.code : item.code);
      formData.append(
        'PositionId',
        values.positionId ? values.positionId : item.positionId,
      );
      formData.append(
        'FacultyId',
        values.facultyId ? values.facultyId : item.facultyId,
      );
      formData.append(
        'FullName',
        values.fullName ? values.fullName : item.fullName,
      );
      formData.append(
        'Avatar',
        infoImage ? infoImage : `${API_URL}/images/${item.avatar}`,
      );
      formData.append('Code', values.code ? values.code.file : item.code);

      try {
        const data: any = await apiService.infoAccount(formData);
        if (data) {
          setOpen(false);
          setLoadingConfirm(false);
          notification.success({ message: 'Cập Nhật Thông Tin Thành Công' });
          form.resetFields();
          dispatch(actions.authActions.setInfo(data));
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getPositions();
    getFacuties();
    setURLImage(null);
    setInfoImage(null);
  }, []);

  const getPositions = async () => {
    const reponse: any = await apiService.getPositions();
    if (reponse) {
      setPositons(reponse);
    }
  };
  const getFacuties = async () => {
    const reponse: any = await apiService.getFaculties();
    if (reponse) {
      setDataFct(reponse);
    }
  };
  const FormItem = () => {
    return (
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
                  alt="avatar"
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
                src={`${API_URL}/images/${item.avatar}`}
                alt="avatar"
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
            name="fullName"
            label="Họ Và Tên"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Họ Và Tên',
              },
              {
                pattern: new RegExp(
                  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,
                ),
                message: 'Vui Lòng Nhập Đúng Định Dạng Họ Và Tên',
              },
            ]}
          />
          <FormInput
            className="w-full"
            name="code"
            label="Mã"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Mã',
              },
            ]}
          />
          <FormInput
            className="w-full"
            name="phoneNumber"
            label="Số Điện Thoại"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Số Điện Thoại',
              },
              {
                pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
                message: 'Vui Lòng Nhập Đúng Số Điện Thoại',
              },
            ]}
          />
          <FormInput
            className="w-full"
            name="address"
            label="Địa Chỉ"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Địa Chỉ',
              },
            ]}
          />
          <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
            Chức Vụ Của Bạn
          </label>
          <Form.Item
            className="w-full "
            name="positionId"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Chức Vụ',
              },
            ]}
          >
            <Select
              className="font-bold"
              showSearch
              placeholder="Chọn Chức Vụ"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={positons.map((item: any) => ({
                value: item.positionId,
                label: item.positionName,
              }))}
            />
          </Form.Item>
          <label className="text-start w-full mb-4 text-black font-bold font-customFont">
            Phòng/Khoa
          </label>
          <Form.Item
            className="w-full "
            name="facultyId"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Phòng/Khoa',
              },
            ]}
          >
            <Select
              className="font-bold"
              showSearch
              placeholder="Chọn Phòng/Khoa"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={dataFct.map((item: any) => ({
                value: item.facultyId,
                label: item.facultyName,
              }))}
            />
          </Form.Item>
        </div>
      </div>
    );
  };
  const handelOnChange = () => {
    console.log('hello');
  };
  return (
    <CustomModal
      show={open}
      setShow={setOpen}
      header={'Chỉnh Sửa Thông Tin Người Dùng'}
      dataItem={item}
      FormItem={<FormItem />}
      form={form}
      width={1000}
      handleOk={() => handelOk()}
    />
  );
}
