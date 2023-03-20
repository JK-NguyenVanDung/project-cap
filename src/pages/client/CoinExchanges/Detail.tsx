import { Form, Input, UploadProps, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import imageDetailBader from '../../../assets/svg/detailBage.jpg';

import logo from '../../../assets/img/VLU_Logo_Final_VLU_logo-ngang_Eng.png';

import { useLocation, useNavigate } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useMsal } from '@azure/msal-react';
import moment from 'moment';
import { IExchangeCoin, IProgramItem } from '../../../Type';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import { useAppSelector, useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { Space } from '../Programs/ResultProgram';
import UploadImage from '../../../components/Exchange/Upload';
import { TiDelete } from 'react-icons/ti';
import { FaCoins } from 'react-icons/fa';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
export default function () {
  const [form] = Form.useForm();
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();
  const exchangeId = Number(location.pathname.split('/')[2]?.toString());
  const nameMenu = useAppSelector((state: any) => state.form.nameMenu);
  const dispatch = useAppDispatch();
  const program: IProgramItem = useAppSelector(
    (state: any) => state.form.programId,
  );
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    console.log(1);

    setFile(newFileList);
  };
  const info = useAppSelector((state) => state.auth.info);
  const [fullName, setFullName] = useState({ value: nameMenu });
  const [detailExchange, setDetailExchange] = useState<IExchangeCoin>(null);

  const [previewImage, setPreviewImage] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [files, setFiles] = useState<any>(null);

  const [previewText, setPreviewText] = useState<string>(
    '  * Đây là ảnh mẫu ví dụ 1 giấy chứng nhận hợp lệ  ',
  );
  const [uploadStatus, setUploadStatus] = useState<string>('Chưa gửi');
  const frmData: any = new FormData();

  // const [hover, setH] = useState<any>(null);
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  async function onUploadPreview(e: any) {
    if (e) {
      setPreviewText(
        'Ảnh bạn đã gửi vào lúc ' +
          moment().local().format('HH:mm:ss - DD/MM/YYYY'),
      );
      console.log(e);
      setPreviewImage(URL.createObjectURL(e));
      let reader = new FileReader();
      reader.readAsDataURL(e);
      let a: any = await toBase64(e);
      setFiles(a.split(',')[2].toString());
      return new Promise(
        () => 'https://cntttest.vanlanguni.edu.vn:18081/CP25Team02/',
      );
    }
  }
  function removeFile() {
    setFile(null);
    setPreviewImage(null);
  }
  async function onOK() {
    frmData.append('AccountId', info.accountId);
    frmData.append('ExchangeId', exchangeId);

    frmData.append('Image', files);
    if (false) {
      // const data = await apiService.putProgram(item.programId, frmData);
      // if (data) {
      //   notification.success({
      //     message:
      //       type === 'save' ? 'Sửa thành công' : 'Gửi duyệt thành công',
      //   });
      //   navigate(-1);
      // }
      // form.resetFields();
    } else {
      const data = await apiService.postImage(frmData);
      if (data) {
        notification.success({ message: 'Gửi thành công' });
        // navigate(-1);
      }
    }
  }
  useEffect(() => {
    // dispatch(
    //   actions.formActions.setNameMenu(`${accounts[0]?.name.split('-')[1]}`),
    // );
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response: any = await apiService.getDetailExchange(exchangeId);
      setDetailExchange(response);
    };
    getData();
  }, []);
  const handelChangeText = (event: any) => {
    setFullName((prev) => ({ ...prev, value: event.target.value }));
  };
  return (
    <>
      <div className="w-full  px-4 pb-2 bg-white">
        <Breadcrumb
          router1={`/${location.pathname.split('/')[1]}/`}
          router2={`/${location.pathname.split('/')[1]}/${
            program ? program?.programName : 'N/A'
          }`}
          name={'Đổi Coin'}
          name2={program ? program?.programName : 'N/A'}
        />
      </div>
      <div className="mb-5 mx-5 ">
        <Space size={30} />
        <div className="flex">
          <div className="w-4/6">
            <div className=" relative flex flex-col items-center justify-center">
              {!previewImage ? (
                <>
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
                      TÊN KHOÁ HỌC MẪU
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
                      Thời Gian Hoàn Thành: {moment().format('DD/MM/YYYY')}
                    </p>
                  </div>
                  <div className="absolute bottom-[19%] right-[19%] text-center">
                    <p className="uppercase text-[25px]  font-fontSecons intent">
                      Viên
                    </p>
                    <Space size={10} />
                    <p className="uppercase text=[16px] font-bold ">
                      Nguyễn Kỳ Viên
                    </p>
                    <p className="text=[13px] font-bold leading-loose">
                      Giám Đốc Trung Tâm
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-fit h-fit">
                    <img
                      src={previewImage}
                      className="max-h-[80vh]  w-full cover object-cover	"
                    />
                  </div>
                </>
              )}
            </div>
            <p
              className="w-full text-start mt-2
              italic"
            >
              {previewText}
            </p>
          </div>
          <Space sizeWidth={15} />
          <div className="bg-white rounded-lg shadow-lg p-5 w-2/6">
            <h1 className="text-center font-bold text-base text-gray-600">
              Gửi ảnh chứng chỉ nhận được coin thưởng
            </h1>
            <div className="p-4">
              {/* <Form form={form}>
                <Form.Item
                  style={{ marginTop: 10 }}
                  className="mt-4 "
                  name="Image"
                  rules={[
                    {
                      required: previewImage ? false : true,
                      message: 'Vui Lòng Chọn Ảnh Banner ',
                    },
                  ]}
                > */}
              <UploadImage
                fileList={file}
                onUpload={(e: any) => onUploadPreview(e)}
                setFile={setFile}
                onChange={handleChange}
              />
              {/* </Form.Item>
              </Form> */}
              {previewImage && (
                <CustomButton
                  text="Xóa ảnh"
                  size="md"
                  className="w-full my-4 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none "
                  type="delete"
                  onClick={removeFile}
                />
              )}
            </div>
            <Space size={10} />
            <div className="w-full px-4">
              <div className="">
                <p className="text-xl my-2 eclipse-text  max-w-fit 	font-semibold cursor-pointer text-primary">
                  {detailExchange?.title}
                </p>
                <p className="text-body flex  justify-between py-4">
                  <p className="font-bold text-gray-900">Trạng thái:</p>
                  <span className="text-black font-bold">{uploadStatus}</span>
                </p>
                <p className="text-body flex  justify-between">
                  <p className="font-semibold text-gray-900">Hạn đổi điểm:</p>
                  <span className="text-black">
                    {` ${moment(detailExchange?.endDate).format(
                      'HH:mm -  DD/MM/YYYY',
                    )}`}
                  </span>
                </p>

                <div className="flex w-full justify-between items-center my-4">
                  <p className="font-semibold text-gray-900">
                    Số coin nhận được:{' '}
                  </p>
                  <div className="flex items-center font-semibold text-gray-700">
                    <FaCoins className="text-lg mr-2 text-gray-800" />
                    {detailExchange?.coin}{' '}
                    {Number(detailExchange?.coin) < 2 ? 'Coin' : 'Coins'}
                  </div>
                </div>
                <div className=" w-full  my-4">
                  <p className="font-semibold text-gray-900">Mô tả: </p>
                  <div className="flex items-center ">
                    {detailExchange?.description}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end m-4">
              <CustomButton
                text="Gửi ảnh chứng chỉ"
                size="md"
                color="blue"
                noIcon
                className="w-full mt-4"
                onClick={() => onOK()}
              />
              <CustomButton
                text="Quay Lại"
                size="md"
                noIcon
                type="goBack"
                className="w-full mt-4"
                tip="Thống kê khóa học"
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
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
