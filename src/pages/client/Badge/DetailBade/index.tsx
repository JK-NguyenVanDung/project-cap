import { Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import imageDetailBader from '../../../../assets/svg/detailBage.jpg';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { Space } from '../../Programs/ResultProgram';
import logo from '../../../../assets/img/VLU_Logo_Final_VLU_logo-ngang_Eng.png';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useMsal } from '@azure/msal-react';
import { IProgramItem } from '../../../../Type';
import apiService from '../../../../api/apiService';
import moment from 'moment';

export default function () {
  const [form] = Form.useForm();
  const { accounts } = useMsal();
  const nameMenu = useAppSelector((state: any) => state.form.nameMenu);
  const dispatch = useAppDispatch();
  const program = useAppSelector((state: any) => state.form.programId);
  const info = useAppSelector((state) => state.auth.info);
  const [fullName, setFullName] = useState({ value: nameMenu });
  const [detailBadge, setDetailBadge]: any = useState();
  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(`${accounts[0]?.name.split('-')[1]}`),
    );
  }, []);
  useEffect(() => {
    const fetchDetailBadge = async () => {
      const response: any = await apiService.getCertificate(
        info.accountId,
        program.programId,
      );
      setDetailBadge(response);
    };
    fetchDetailBadge();
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
              <Space size={20} />
              <img src={logo} className="w-[175px]" />
              <Space size={30} />
              <h1 className="text-[35px] font-bold text-[#D5202A] font-serif uppercase">
                Giấy Chứng Nhận
              </h1>
              <Space size={25} />
              <h1 className="text-2xl font-bold text-black font-serif">
                Trung Tâm Đào Tạo & Phát Triển VLG khen tặng
              </h1>
              <Space size={35} />
              <p className="text-[50px] text-[#D5202A] font-fontSecons">
                {fullName.value}
              </p>
              <Space size={25} />
              <p className="text-[18px] font-semibold w-full text-center text-black font-serif italic ">
                Đã hoàn thành khóa học
              </p>
              <Space size={10} />

              <p className="text-[18px] font-semibold w-full text-center text-black font-serif uppercase ">
                {detailBadge?.programName}
              </p>
            </div>
            <div className="absolute bottom-[23%] left-[12%] text-center">
              <span className="uppercase text=[16px] font-bold leading-loose">
                ISBN:
              </span>
              <span className="uppercase text=[16px] font-bold ml-3">
                2023000{info?.accountId}
              </span>
              <Space size={10} />
              <p className="text=[16px] font-bold ml-3">
                Thời Gian Hoàn Thành:{' '}
                {moment(detailBadge?.timeFinish).format('DD/MM/YYYY')}
              </p>
            </div>
            <div className="absolute bottom-[19%] right-[19%] text-center">
              <p className="uppercase text-[25px]  font-fontSecons intent">
                Viên
              </p>
              <Space size={10} />
              <p className="uppercase text=[16px] font-bold ">Cao Kỳ Viên</p>
              <p className="text=[13px] font-bold leading-loose">
                Giám Đốc Trung Tâm
              </p>
            </div>
          </div>
        </div>
        <Space sizeWidth={15} />
        {/* <div className="bg-white rounded-lg shadow-lg p-5 w-2/6">
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
                  disabled
                  className={`font-customFont  font-bold bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  onChange={handelChangeText}
                  defaultValue={nameMenu}
                  placeholder="Nhập Vào Tên Của Bạn"
                />
              </Form.Item>
              
              <FormInput
                label="Tên Chương Trình"
                className="w-full"
                name="phoneNumber"
                placeholder={`${program.programName}`}
                disabled
              />
            </div>
          </Form>
        </div> */}
      </div>
    </div>
  );
}
