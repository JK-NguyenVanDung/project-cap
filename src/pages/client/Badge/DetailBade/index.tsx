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
import CustomButton from '../../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const program: IProgramItem = useAppSelector(
    (state: any) => state.form.programId,
  );
  const info = useAppSelector((state) => state.auth.info);
  const [fullName, setFullName] = useState(info.fullName);
  const [detailBadge, setDetailBadge]: any = useState({});

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
    setFullName(event.target.value);
  };
  return (
    <div className="m-5">
      <Space size={30} />
      <div className="flex max-sm:flex-col max-md:flex-col">
        <div className="w-4/6 max-sm:w-full mb-4">
          <div className=" relative flex flex-col items-center justify-center">
            <img src={imageDetailBader} className="w-full" />
            <div className=" max-sm:text-xs max-md:text-xs   absolute top-10 flex flex-col justify-center items-center">
              <div className="relative flex flex-col justify-start items-center w-full  ">
                <img
                  src={logo}
                  className="lg:mt-4 w-[30%] max-sm:w-[20%]  h-fit"
                />

                <h1 className="lg:mt-4 max-sm:text-xs max-md:text-xs text-3xl font-bold text-[#D5202A] font-serif uppercase">
                  Giấy Chứng Nhận
                </h1>

                <h1 className="lg:mt-4 max-sm:text-xs max-md:text-xs text-2xl font-bold text-black font-serif">
                  Trung Tâm Đào Tạo & Phát Triển VLG khen tặng
                </h1>

                <p className="max-sm:py-2  max-md:py-2 lg:mt-4 max-sm:text-base  max-md:text-base  text-6xl text-[#D5202A] font-fontSecons">
                  {fullName}
                </p>

                <p className="lg:mt-4 max-sm:text-xs max-md:text-xs text-lg font-semibold w-full text-center text-black font-serif italic ">
                  Đã hoàn thành khóa học
                </p>

                <p className="lg:mt-4 max-sm:text-base  max-md:text-base text-lg font-semibold w-full text-center text-black font-serif uppercase ">
                  {detailBadge?.programName
                    ? detailBadge?.programName
                    : program.programName}
                </p>
              </div>
            </div>
            <div className="absolute bottom-[23%] left-[12%] max-sm:left-[10%] max-sm:bottom-[20%] text-center">
              <div className="relative max-sm:text-[0.5rem] max-md:text-[0.5rem] mb-[5px]">
                <span className="max-sm:text-[0.5rem] max-md:text-[0.5rem]  uppercase text-lg font-bold leading-loose">
                  ISBN:
                </span>
                <span className="max-sm:text-[0.5rem] max-md:text-[0.5rem]  uppercase  text-lg font-bold ml-3">
                  2023000{info?.accountId}
                </span>
                <p className=" max-sm:text-[0.4rem]  max-md:text-[0.4rem] text-sm font-bold ml-3">
                  Thời Gian Hoàn Thành:{' '}
                  {moment(detailBadge?.timeFinish).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
            <div className=" max-sm:text-[0.5rem] max-md:text-[0.5rem] max-sm:b absolute bottom-[19%] right-[19%] max-sm:bottom-[20%] max-md:bottom-[21%] text-center">
              <p className="lg:mb-2 max-sm:text-[0.5rem] max-md:text-[0.5rem] uppercase text-lg  font-fontSecons intent">
                Viên
              </p>

              <p className="max-sm:text-[0.5rem] max-md:text-[0.5rem] uppercase text-base font-bold ">
                Nguyễn Kỳ Viên
              </p>
              <p className="max-sm:text-[0.5rem] max-md:text-[0.5rem] text-sm font-bold leading-loose max-sm:leading-[0] max-md:leading-[0]">
                Giám Đốc Trung Tâm
              </p>
            </div>
          </div>
        </div>
        <Space sizeWidth={15} />
        <div className="bg-white rounded-lg shadow-lg p-5 w-2/6 max-sm:w-full max-md:w-full">
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
                  defaultValue={fullName}
                  placeholder="Nhập Vào Tên Của Bạn"
                />
              </Form.Item>

              <FormInput
                label="Tên Chương Trình"
                className="w-full"
                name="phoneNumber"
                placeholder={`${
                  detailBadge?.programName
                    ? detailBadge?.programName
                    : program.programName
                }`}
                disabled
              />
            </div>
          </Form>
          <div className="flex justify-between items-end">
            <CustomButton
              text="Quay Lại"
              size="lg"
              noIcon
              color="red"
              className="w-full mr-3"
              tip="Thống kê khóa học"
              onClick={() => navigate(-1)}
            />
            {/* <CustomButton
              text="Xuất PDF"
              size="lg"
              noIcon
              className="w-full ml-3"
              color="blue-gray"
              tip="Thống kê khóa học"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
// function PDF() {}
// const MyDocument = (props: any) => (
//   <Document>
//     <Page size="A4">
//       <View>{props}</View>
//     </Page>
//   </Document>
// );
