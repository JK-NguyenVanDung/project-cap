import { Form, Input, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import imageDetailBader from '../../../assets/svg/detailBage.jpg';

import logo from '../../../assets/img/VLU_Logo_Final_VLU_logo-ngang_Eng.png';

import { useLocation, useNavigate } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useMsal } from '@azure/msal-react';
import moment from 'moment';
import { ICertificatePhoto, IExchangeCoin, IProgramItem } from '../../../Type';
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
import { API_URL } from '../../../api/api';
import { HiDocumentMagnifyingGlass } from 'react-icons/hi2';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Loading from '../../../components/sharedComponents/Loading';
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

  const info = useAppSelector((state) => state.auth.info);
  const [loading, setLoading] = useState(true);

  const [detailExchange, setDetailExchange] = useState<IExchangeCoin>(null);

  const [previewImage, setPreviewImage] = useState<any>(null);
  const [file, setFile] = useState<File>(null);
  const [previewText, setPreviewText] = useState<string>(
    '  * Đây là ảnh mẫu ví dụ 1 giấy chứng nhận hợp lệ  ',
  );
  const [uploadStatus, setUploadStatus] = useState<string>('Chưa gửi');

  const [certification, setCertification] = useState<ICertificatePhoto>(null);
  const frmData: any = new FormData();

  // const [hover, setH] = useState<any>(null);

  function onUploadPreview(e: any) {
    if (e) {
      setPreviewText(
        'Ảnh bạn đã gửi vào lúc ' +
          moment().local().format('HH:mm - DD/MM/YYYY'),
      );
      console.log(e);
      setPreviewImage(URL.createObjectURL(e));

      setFile(e);
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
    frmData.append('Image', file);
    try {
      if (certification?.status === 'denied') {
        const data = await apiService.updateCertificationImage(
          certification?.id,
          frmData,
        );
        if (data) {
          // notification.success({
          //   message:
          //     type === 'save' ? 'Sửa thành công' : 'Gửi duyệt thành công',
          // });
          // navigate(-1);
          notification.success({ message: 'Cập nhật thành công' });
        }
        form.resetFields();
      } else {
        frmData.append('AccountId', info.accountId);
        frmData.append('ExchangeId', exchangeId);
        console.log(file);
        const data = await apiService.postCertificationImage(frmData);
        if (data) {
          notification.success({ message: 'Gửi thành công' });
          // navigate(-1);
        }
      }
      navigate(-1);
    } catch (err) {
      notification.error({ message: 'Gửi không thành công' });
    }
  }
  function getStatus(status: string) {
    switch (status) {
      case 'pending':
        return <span className="text-primary font-bold">Đang duyệt</span>;

      case 'approved':
        return <span className="text-green-500 font-bold">Thành công</span>;

      case 'denied':
        return <span className="text-red-500 font-bold">Từ chối</span>;

      default:
        return <span className="text-gray-800 font-bold">Chưa gửi</span>;
    }
  }

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const response: any = await apiService.getDetailExchange(
        exchangeId,
        info.accountId,
      );

      setCertification({
        ...response.certificatePhotos[response.certificatePhotos.length - 1],
      });
      let temp =
        response?.certificatePhotos[response.certificatePhotos.length - 1];
      console.log(response);

      setPreviewText(
        temp?.reviewDate
          ? `Ảnh bạn đã được ${
              temp.status === 'denied' ? 'xem xét' : 'duyệt'
            } vào lúc 
        ${moment(temp?.reviewDate).local().format('HH:mm - DD/MM/YYYY')}

      `
          : `Ảnh bạn đã gửi vào lúc 
        ${moment(temp?.sentDate).local().format('HH:mm - DD/MM/YYYY')}

      `,
      );
      dispatch(actions.formActions.setNameMenu('Đổi Coin: ' + response?.title));
      setDetailExchange({
        ...response,
        status: response.ended
          ? 'ended'
          : response.certificatePhotos[response.certificatePhotos.length - 1]
              ?.status,
      });
    };
    getData();
    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="w-full  px-4 pb-2 bg-white">
        <Breadcrumb
          router1={`/CoinExchanges`}
          name={'Đổi Coin'}
          name3={detailExchange?.title}
        />
      </div>
      <div className="mb-5 mx-5 ">
        <Space size={30} />
        <div className="flex max-sm:flex-col">
          <div className="w-4/6 max-sm:w-full">
            <div className=" relative flex flex-col items-center justify-center">
              {certification?.image && !previewImage ? (
                <>
                  <div className="w-fit h-fit">
                    <img
                      src={`${API_URL}/images/${certification?.image}`}
                      className="max-h-[80vh]  w-full cover object-cover	"
                    />
                  </div>
                </>
              ) : !previewImage ? (
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
                      {'Tên Người Nhận'}
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
            <p
              className="w-full text-start mt-2
              font-bold text-xl text-red-500"
            >
              {certification?.status === 'denied' &&
                certification?.comment &&
                `Lý do từ chối: ${certification.comment}`}
            </p>
          </div>
          <Space sizeWidth={15} />
          <div className="bg-white rounded-lg shadow-lg p-5 w-2/6 max-sm:w-full">
            <h1 className="text-center font-bold text-base text-gray-600">
              Gửi ảnh chứng chỉ nhận được coin thưởng
            </h1>
            <div className="p-4">
              {certification?.status === 'pending' ||
              certification?.status === 'approved' ? (
                <div
                  className={`w-full border-2 ${
                    certification?.status === 'pending'
                      ? 'border-primary'
                      : 'border-green-500'
                  } min-h-[30vh] flex flex-col justify-center item-center rounded p-4 border-dashed	`}
                >
                  {certification?.status === 'pending' ? (
                    <>
                      <HiDocumentMagnifyingGlass className="w-full text-center text-6xl text-primary " />

                      <p className=" text-primary py-4 w-full text-center ">
                        Đơn đổi coin của bạn đang được xem xét
                      </p>
                    </>
                  ) : (
                    <>
                      <BsFillCheckCircleFill className="w-full text-center text-6xl text-green-500 " />

                      <p className=" text-green-500 py-4 w-full text-center ">
                        Đã đổi thành công
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <UploadImage
                  disabled={detailExchange?.status === 'ended'}
                  onUpload={(e: any) => onUploadPreview(e)}
                />
              )}

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
                <p className="text-xl my-2 eclipse-text  max-w-fit 	font-semibold  text-primary">
                  {detailExchange?.title}
                </p>
                <p className="text-body flex  justify-between py-4">
                  <p className="font-bold text-gray-900">Trạng thái:</p>
                  {getStatus(certification?.status)}
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
                text={
                  certification?.status === 'denied'
                    ? 'Cập nhật ảnh chứng chỉ'
                    : 'Gửi ảnh chứng chỉ'
                }
                size="md"
                color="blue"
                disabled={
                  !previewImage ||
                  certification?.status === 'pending' ||
                  certification?.status === 'approve' ||
                  detailExchange?.status === 'ended'
                }
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
