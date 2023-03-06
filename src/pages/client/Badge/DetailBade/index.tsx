import { Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import imageDetailBader from '../../../../assets/svg/detailBage.svg';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { Space } from '../../Programs/ResultProgram';
import logo from '../../../../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useMsal } from '@azure/msal-react';

export default function () {
  const [form] = Form.useForm();
  const { accounts } = useMsal();
  const nameMenu = useAppSelector((state: any) => state.form.nameMenu);
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState({ value: nameMenu });
  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(`${accounts[0]?.name.split('-')[1]}`),
    );
  }, []);
  const handelChangeText = (event: any) => {
    setFullName((prev) => ({ ...prev, value: event.target.value }));
  };
  return (
    <div className="m-5">
      <Space size={30} />
      <div className="flex">
        <div className="w-4/6">
          <div className=" relative flex flex-col items-center justify-center">
            <img src={imageDetailBader} className="w-full" />
            <div className="absolute top-10 flex flex-col justify-center items-center">
              <img src={logo} className="w-[80px]" />
              <Space size={20} />
              <h1 className="text-xl font-bold text-[#E7BC37] font-serif uppercase">
                Chứng Nhận Thành Tính
              </h1>
              <Space size={10} />
              <h1 className="text-xl font-bold text-black font-serif">
                Đào Tạo Nội Bộ Văn Lang
              </h1>
              <Space size={25} />
              <p className="text-[50px] font-normal text-[#E7BC37] font-serif">
                {fullName.value}
              </p>
              <Space size={20} />
              <p className="text-[16px] font-thin w-[350px] text-center text-black font-serif">
                đã đạt chứng chỉ chương trình đào tạo Anh Văn Chuyên Ngành
              </p>
            </div>
          </div>
        </div>
        <Space sizeWidth={15} />
        <div className="bg-white rounded-lg shadow-lg p-5 w-2/6">
          <Form
            form={form}
            initialValues={{
              midifier: 'public',
            }}
          >
            <h1 className="text-center font-bold text-base text-gray-600">
              Thông Tin Chứng Chỉ
            </h1>
            <Space size={10} />
            <div className="w-full bg-white rounded-3xl px-4 flex flex-col justify-center items-center">
              <label className="text-start w-full mb-4 text-black font-bold font-customFont">
                Họ Và Tên
              </label>
              <Form.Item
                className="w-full "
                name="Họ Và Tên"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Họ Và Tên',
                  },
                  {
                    max: 40,
                    message: 'Họ Và Tên Ít Hơn 50 Kí Tự',
                  },
                ]}
              >
                <Input
                  className={`font-customFont  font-bold bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  onChange={handelChangeText}
                  defaultValue={nameMenu}
                  placeholder="Nhập Vào Tên Của Bạn"
                />
              </Form.Item>
              <FormInput
                className="w-full"
                name="phoneNumber"
                label="Chương Trình"
                disabled
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
