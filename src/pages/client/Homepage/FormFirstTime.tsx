import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, notification, Select, Modal } from 'antd';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';

export default function () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataFct, setDataFct]: any = useState([]);
  const [positons, setPositons]: any = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPositions();
    getFacuties();
    fetchInfo();
  }, []);
  const getPositions = async () => {
    const reponse = await apiService.getPositions();
    if (reponse) {
      setPositons(reponse);
    }
  };
  const getFacuties = async () => {
    const reponse = await apiService.getFaculties();
    if (reponse) {
      setDataFct(reponse);
    }
  };
  const fetchInfo = async () => {
    const response: any = await apiService.getProfile();
    const { roleId } = response;
    const { code } = response;
    if (!code) {
      setVisible(true);
    }
  };
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const data: any = await apiService.infoAccount(values);
        if (data) {
          setVisible(false);
          notification.success({ message: 'Cập Nhật Thông Tin Thành Công' });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <Modal
        open={visible}
        title="Cập Nhật Thông tin Người Dùng"
        footer={
          <div className=" my-5 flex flex-row justify-evenly w-full">
            <CustomButton
              size="md"
              fullWidth={true}
              noIcon={true}
              type="add"
              color="blue-gray"
              onClick={() => handelOk()}
              text="Lưu"
            />
          </div>
        }
      >
        <Form
          form={form}
          initialValues={{
            midifier: 'public',
          }}
        >
          <div className="w-full bg-white rounded-3xl px-4 flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-2xl mb-10">
              Thông Tin Của Bạn
            </h1>
            <FormInput
              className="w-full"
              name="address"
              label="Địa Chỉ"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Chức Vụ',
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
              name="code"
              label="Mã Số Sinh Viên"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Mã Số Sinh Viên',
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
        </Form>
      </Modal>
    </>
  );
}
