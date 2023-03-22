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
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function ModalProfile({
  open,
  setOpen,
  loadingConfirm,
  setLoadingConfirm,
}: {
  open: boolean;
  setOpen: any;
  loadingConfirm: boolean;
  setLoadingConfirm: any;
}) {
  const item = useAppSelector((state) => state.auth.info);
  const [form] = Form.useForm();
  const [dataFct, setDataFct]: any = useState([]);
  const [positons, setPositons]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [infoImage, setInfoImage] =
    useState<UploadChangeParam<UploadFile>>(null);
  const [previewImage, setPreviewImage] = useState('');
  const formData = new FormData();
  const dispatch = useAppDispatch();

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setLoading(false);
    setInfoImage(info);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values.avatar.file);
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
        values.avatar ? values.avatar.file : `${API_URL}/images/${item.avatar}`,
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
  const uploadButton = (
    <div className="mt-20">
      <img
        src={`${API_URL}/images/${item.avatar}`}
        alt="avatar"
        className="object-cover"
      />
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 20 }}>Tải Ảnh Lên</div>
    </div>
  );
  useEffect(() => {
    getPositions();
    getFacuties();
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
        <Form.Item
          name="avatar"
          rules={[
            {
              required: true,
              message: 'Vui Lòng chọn Avatar',
            },
          ]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader w-full"
            showUploadList={false}
            onChange={handleChange}
            accept="image/*"
            onPreview={handlePreview}
          >
            {infoImage ? (
              <div className="flex flex-col">
                <img
                  src={previewImage}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
                <p>{infoImage.file.name}</p>
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

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
  return (
    <CustomModal
      show={open}
      setShow={setOpen}
      header={'Chỉnh Sửa Thông Tin Người Dùng'}
      dataItem={item}
      FormItem={<FormItem />}
      form={form}
      width={900}
      handleOk={() => handelOk()}
    />
  );
}
