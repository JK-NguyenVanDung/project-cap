import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import CustomModal from '../../../components/admin/Modal/Modal';
import Input from '../../../components/sharedComponents/Input';
import { Image } from 'antd';
import * as XLSX from 'xlsx';
import TableConfig from '../../../components/admin/Table/Table';
import { IProgramItem } from '../../../Type';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { AiOutlineUp } from 'react-icons/ai';
import { SideBarDataCT } from '../SidebarData';
import Button from '../../../components/sharedComponents/Button';
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
  const [listEmail, setListEmail]: any = useState([]);
  const [listName, setListName]: any = useState([]);
  const [listMSNV, setListMSNV]: any = useState([]);
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

  const handleOk = async () => {
    form.validateFields().then(async () => {
      dispatch(actions.reloadActions.setReload());
      const emailSuccess = listEmail?.filter((item: any) => {
        if (
          emailVlu.test(item) &&
          emailValid.test(item) &&
          emailNotW.test(item) &&
          emailSpace.test(item)
        ) {
          return item;
        }
      });
      const values = {
        programId: program.programId,
        emails: emailSuccess,
        code: listMSNV.map((item: any) => item),
        fullName: listName.map((item: any) => item),
      };
      console.log(values);
      const data = apiService.importFileLearner({
        body: values,
        accountId: info.accountId,: string
      });

      data.then((res: any) => {
        setSuccessList(res);
      });
      setSaveEmail(true);
      setLoading(true);
      if (data) {
        setLoading(false);
        notification.success({ message: 'Thêm tập tin thành công' });
      }
      form.resetFields();
      setTimeout(() => {
        dispatch(actions.reloadActions.setReload());
      }, 1000);
    });
  };
  const handelReadFile = (value: any) => {
    const file = value.target.files[0];
    if (file) {
      setJustAddedFile(file?.name);
      notification.success({
        message: `Đã Thêm File ${file.name} Thành Công`,
      });
    }
    const readFileExcel = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const wsName = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      // setLocalLoading(false);
    });
    readFileExcel
      .then((data: any) => {
        setListEmail(
          data.map((item: any) => {
            const email: string = item.Email || item.email || item.EMAIL;
            if (emailVlu.test(email)) {
              return email;
            }
          }),
        );
        setListMSNV(
          data.map((item: any) => {
            const MSNV = item.MSNV || item.Msnv;
            return MSNV;
          }),
        );
        setListName(
          data.map((item: any) => {
            const fullName =
              item['Họ & Tên'] ||
              item['Họ Và Tên'] ||
              item.fullName ||
              item['Full Name'] ||
              item.FullName;
            console.log(fullName);
            return fullName;
          }),
        );
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
        notification.error({ message: 'Lấy File Không Thành Công' });
      });
  };

  const handelShowEmailError = () => {
    setChangeArrow(!changeArrow);
    setShowDetailError(!showDetailError);
  };
  const handelShow = () => {
    setEmailError([]);
    setCheckError(false);
    setShowDetailError(false);
    setSuccessList();
    setSaveEmail(false);
    setCheckEmail(false);
    setCheckEmailNew(false);
    setCheckEmailRegisted(false);
  };
  const FormItem = () => {
    return (
      <>
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
              className="bg-green-400 p-3 flex justify-between items-center cursor-pointer"
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
              className="bg-red-400 p-3 flex justify-between items-center cursor-pointer"
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
              className="bg-blue-500 p-3 flex justify-between items-center cursor-pointer"
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
              className="bg-blue-400 p-3 flex justify-between items-center cursor-pointer"
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
