import { Form, Spin, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import CustomModal from '../../../components/admin/Modal/Modal';
import Input from '../../../components/sharedComponents/Input';
import * as XLSX from 'xlsx';
import { IProgramItem } from '../../../Type';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import Button from '../../../components/sharedComponents/Button';
import { ExportCSV } from '../../../components/Statistic/ExportButton';
import Loading from '../../../components/sharedComponents/Loading';

const emailVlu =
  /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/;
const emailValid =
  /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/;
const emailNotW = /^\w/;
const emailSpace = /^(?!\s*$|\s).*$/;

export default function ImportFile({
  showModal,
  setShowModal,
  loading,
  setLoading,
  program,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  program: IProgramItem;
}) {
  const [form] = Form.useForm();
  // const [listEmail, setListEmail]: any = useState([]);
  // const [listName, setListName]: any = useState([]);
  // const [listMSNV, setListMSNV]: any = useState([]);
  const [listData, setListData]: any = useState([]);
  const [file, setJustAddedFile] = useState('');

  const [emailError, setEmailError] = useState([]);
  const [checkError, setCheckError] = useState(false);
  const [showDetailError, setShowDetailError] = useState(false);
  const [changeArrow, setChangeArrow] = useState(false);
  const dispatch = useAppDispatch();

  const [successList, setSuccessList]: any = useState({
    totalEmail: [],
    newEmail: [],
    registedEmail: [],
  });
  const [saveEmail, setSaveEmail] = useState(false);
  const [checkEmailRegisted, setCheckEmailRegisted] = useState(false);
  const [checkEmailNew, setCheckEmailNew] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  // const [localLoading, setLocalLoading] = useState(false);

  const info = useAppSelector((state) => state.auth.info);

  const data = [
    {
      STT: 1,
      'Họ & Tên': 'Nguyễn Hoàng Vũ',
      MSNV: '9999999',
      EMAIL: 'vu.999999@vanlanguni.vn',
    },
    {
      STT: 2,
      'Họ & Tên': 'Nguyễn Văn Dũng',
      MSNV: '9999999',
      EMAIL: 'dung.999999@vanlanguni.vn',
    },
    {
      STT: 3,
      'Họ & Tên': 'Trần Thành Đạt',
      MSNV: '9999999',
      EMAIL: 'dat.999999@vanlanguni.vn',
    },
  ];

  const handleOk = async () => {
    form.validateFields().then(async () => {
      let outPut = listData.map((item: any) => {
        return {
          email: item.Email || item.email || item.EMAIL,
          fullName:
            item['Họ & Tên'] ||
            item['Họ Và Tên'] ||
            item.fullName ||
            item['Full Name'] ||
            item.FullName,
          code: item?.MSNV?.toString(),
        };
      });

      const success = outPut?.filter((item: any) => {
        if (
          emailVlu.test(item?.email) &&
          emailValid.test(item?.email) &&
          emailNotW.test(item?.email) &&
          emailSpace.test(item?.email)
        ) {
          return item;
        }
      });
      const values = {
        programId: program.programId,
        learners: success,
        // emails: emailSuccess,
        // code: listMSNV.map((item: any) => item),
        // fullName: listName.map((item: any) => item),
      };

      const data = apiService
        .importFileLearner({
          body: values,
          accountId: info.accountId,
        })
        .finally(() => {
          setSaveEmail(true);
          setLoading(true);
        });

      data.then((res: any) => {
        setSuccessList(res);
      });

      if (await data) {
        notification.success({ message: 'Thêm tập tin thành công' });
      }
      form.resetFields();
    });
  };
  const checkDataColumn = (data: any) => {
    console.log(data);
    const checkMail: string = data[0].Email || data[0].email || data[0].EMAIL;
    const checkName: string =
      data[0]['Họ & Tên'] ||
      data[0]['Họ Và Tên'] ||
      data[0].fullName ||
      data[0]['Full Name'] ||
      data[0].FullName;
    const checkCode: string = data[0].MSNV || data[0].Msnv;

    if (checkMail && checkName && checkCode) {
      return true;
    }
    return false;
  };
  const handelReadFile = (value: any) => {
    const file = value.target.files[0];
    console.log(file);

    if (file) {
      setJustAddedFile(file?.name);
    }
    const readFileExcel = new Promise((resolve, reject) => {
      let fileSizeInBytes = file.size;
      let fileSizeInKB = fileSizeInBytes / 1024;
      let fileSizeInMB = fileSizeInKB / 1024;

      if (fileSizeInMB >= 5) {
        notification.error({
          message: `Giới hạn upload file là 5mb, vui lòng chọn file có dung lượng dưới 5mb`,
          duration: 2500,
        });
        setCheckError(false);
        reject();
      }
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const wsName = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        if (!checkDataColumn(data)) {
          notification.error({
            message:
              'Format các cột dữ liệu chưa chính xác, vui lòng xem lại file mẫu',
          });
          setCheckError(false);
          reject();
        }
        setCheckError(false);

        resolve(data);
      };
      fileReader.onerror = (error) => {
        setCheckError(false);
        reject(error);
      };
      // setLocalLoading(false);
    });
    readFileExcel
      .then((data: any) => {
        notification.success({
          message: `Đã thêm File ${file.name} thành công`,
        });
        setListData(data);

        setEmailError(
          data.filter((item: any) => {
            const email: string = item.Email || item.email || item.EMAIL;
            if (!emailVlu.test(email)) {
              return email;
            }
          }),
        );
      })
      .catch((error) => {
        console.log(error);
        setJustAddedFile('');
        notification.error({
          message: 'Lấy File không thành công',
          duration: 2500,
        });
      });
  };

  const handelShowEmailError = () => {
    setChangeArrow(!changeArrow);
    setShowDetailError(!showDetailError);
  };
  const handelShow = () => {
    setEmailError([]);
    setShowDetailError(false);
    setSuccessList();
    setSaveEmail(false);
    setCheckEmail(false);
    setCheckEmailNew(false);
    setCheckEmailRegisted(false);
  };
  const handelCancel = () => {
    setEmailError([]);
    setShowDetailError(false);
    setSuccessList();
    setSaveEmail(false);
    setCheckEmail(false);
    setCheckEmailNew(false);
    setCheckEmailRegisted(false);
    setLoading(false);
  };
  const FormItem = () => {
    return (
      <>
        <ExportCSV
          // data={data}
          // filename={'mau_file_excel.xls'}
          // headers={['STT', 'Họ & Tên', 'MSNV', 'EMAIL']}
          csvData={data}
          fileName={`mau_file_excel`}
          className="w-44 h-10 bg-blue-gray-500 flex my-5 justify-center items-center text-white rounded-lg"
        >
          Tải Xuống File Mẫu
        </ExportCSV>

        <Input
          accept=".xlsx,.xls"
          type="file"
          onChange={(value: any) => handelReadFile(value)}
        />
        <p className="py-2">File vừa thêm vào: {file}</p>
        {saveEmail && successList ? (
          <>
            <div className="w-full h-[1px] bg-gray-500" />
            <p className="text-lg font-bold py-4">Kết Quả</p>
            <Button
              className="bg-green-400 text-white  p-3 flex justify-between items-center cursor-pointer"
              onClick={() => setCheckEmailNew(!checkEmailNew)}
              children={
                <>
                  <p>Email Vừa Được Thêm Thành Công</p>
                  <p>{successList.totalEmail?.length ?? 0}</p>
                </>
              }
            />
            {checkEmailNew &&
              successList.totalEmail?.map((item: any, index: number) => {
                return (
                  <p key={index} className="p-1">
                    {index + 1} - {item}
                  </p>
                );
              })}
            <Button
              className="bg-red-400 p-3 text-white flex justify-between items-center cursor-pointer"
              onClick={() => handelShowEmailError()}
              children={
                <>
                  <p>Email Không Hợp Lệ</p>
                  <p>{emailError?.length ?? 0}</p>
                </>
              }
            />
            {showDetailError && (
              <div className="delay-75">
                {emailError.map((item, index: number) => {
                  return (
                    <p key={index}>
                      + Dòng {item.__rowNum__} -
                      {item.email || item.Email || item.EMAIL}
                    </p>
                  );
                })}
              </div>
            )}

            <Button
              className="bg-blue-500 p-3 text-white flex justify-between items-center cursor-pointer"
              onClick={() => setCheckEmail(!checkEmail)}
              children={
                <>
                  <p>Email Đã Tồn Tại Trong Khóa Học</p>
                  <p>{successList.exitsEmail?.length ?? 0}</p>
                </>
              }
            />
            {checkEmail &&
              successList.exitsEmail?.map((item: any, index: number) => {
                return (
                  <p key={index} className="p-1">
                    {index + 1} - {item}
                  </p>
                );
              })}
            <Button
              className="bg-blue-400 p-3 text-white flex justify-between items-center cursor-pointer"
              onClick={() => setCheckEmailRegisted(!checkEmailRegisted)}
              children={
                <>
                  <p>Email Đã Đăng Ký Khóa Học</p>
                  <p>{successList.registeredEmail?.length ?? 0}</p>
                </>
              }
            />
            {checkEmailRegisted &&
              successList.registeredEmail?.map((item: any, index: number) => {
                return (
                  <p key={index} className="p-1">
                    {index + 1} - {item}
                  </p>
                );
              })}
          </>
        ) : null}
      </>
    );
  };

  return (
    <div className="w-full">
      <CustomModal
        show={showModal}
        handleOk={handleOk}
        handleShow={handelShow}
        handelCancel={handelCancel}
        setShow={setShowModal}
        label={'Bằng Tập Tin'}
        FormItem={<FormItem />}
        form={form}
        header={'Xuất Tập Tin'}
        confirmLoading={loading}
        textCancel="Ẩn"
      />
    </div>
  );
}
