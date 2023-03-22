import React, { useState, useEffect } from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import { Form, Upload, notification } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { API_URL } from '../../../../api/api';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { IGift } from '../../../../api/apiInterface';
import apiService from '../../../../api/apiService';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function AddManagerGift({
  showModal,
  setShowModal,
  detail,
}: {
  showModal: boolean;
  setShowModal: any;
  detail: IGift;
}) {
  const [form] = Form.useForm();
  const [infoImage, setInfoImage] =
    useState<UploadChangeParam<UploadFile>>(null);
  const formData = new FormData();
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div className="mt-20">
      <img
        src={`${API_URL}/images/${detail?.image}`}
        className="object-cover"
      />
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 20 }}>Tải Ảnh Lên</div>
    </div>
  );

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
  console.log(detail);
  useEffect(() => {
    if (detail) {
      form.setFieldsValue(detail);
    }
  }, []);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        formData.append('Name', values.name ? values.name : detail?.name);
        formData.append(
          'Image',
          values.image ? values.image.file : detail?.image,
        );
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
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } catch (error) {
          notification.error({ message: 'Thực hiện không thành công' });
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  const FormItem = () => {
    return (
      <>
        <div className="flex justify-between content-center">
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: 'Vui Lòng chọn hình ảnh',
              },
            ]}
          >
            <Upload
              name="Image"
              listType="picture-card"
              className="avatar-uploader w-full"
              showUploadList={false}
              onChange={handleChange}
              accept="image/*"
              onPreview={handlePreview}
            >
              {infoImage ? (
                <div className="flex flex-col">
                  <img src={previewImage} style={{ width: '100%' }} />
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
      label={'Tài Khoản'}
      name={detail}
      handleOk={handleOk}
      FormItem={<FormItem />}
      form={form}
      header={'Phân Quyền'}
      width={900}
    />
  );
}
