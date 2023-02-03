import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import CustomModal from '../../../components/admin/Modal/Modal';
import Input from '../../../components/sharedComponents/Input';
import { Image } from 'antd';
import * as XLSX from 'xlsx';
import TableConfig from '../../../components/admin/Table/Table';
import { IProgramItem } from '../../../Type';
import Validate from '../../../config/Validate';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { AiOutlineUp } from 'react-icons/ai';
import { SideBarDataCT } from '../SidebarData';
import Button from '../../../components/sharedComponents/Button';
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
  const [listEmail, setListEmail] = useState();
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

  const info = useAppSelector((state) => state.auth.info);

  const handleOk = async () => {
    form.validateFields().then(async () => {
      dispatch(actions.reloadActions.setReload());

      const values = {
        programId: program.programId,
        emails: listEmail,
      };
      const data = apiService.importFileLearner({
        body: values,
        accountId: info.accountId,
      });
      data.then((res: any) => setSuccessList(res));
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
    });
    readFileExcel
      .then((data: any) => {
        setListEmail(
          data.map((item: any, index: number) => {
            const email: string = item.Email || item.email || item.EMAIL;
            return email;
          }),
        );
        setEmailError(
          data.filter((item: any, index: number) => {
            const email: string = item.Email || item.email || item.EMAIL;
            const checkEmail = email
              .toString()
              .trim()
              .match(
                /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/,
              );
            if (!checkEmail) {
              setCheckError(true);
              return email;
            }
          }),
        );
      })
      .catch((error) => {
        setJustAddedFile('');
        notification.error({ message: 'Lấy File Không Thành Công' });
      });
  };

  const dataTable = [
    {
      key: '1',
      email: 'demo@vanlanguni.com',
    },
    {
      key: '2',
      email: 'demo_2@vanlanguni.com',
    },
  ];
  const column = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];
  const handelShowEmailError = () => {
    setChangeArrow(!changeArrow);
    setShowDetailError(!showDetailError);
  };
  const handelShow = () => {
    console.log('hello');
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
        <p>
          <span className="text-error">*</span> Email phải tồn tại trên hệ thống
        </p>
        <p>
          <span className="text-error">*</span> Ví Dụ Cho Excel
        </p>
        <TableConfig
          pagination={false}
          search={false}
          data={dataTable}
          columns={column}
        />
        <Input
          accept=".xlsx,.xls"
          type="file"
          onChange={(value: any) => handelReadFile(value)}
        />
        <p className="py-2">File vừa thêm vào: {file}</p>
        {checkError && (
          <>
            <Button
              className="bg-red-400 p-3 flex justify-between items-center cursor-pointer"
              onClick={() => handelShowEmailError()}
              children={
                <>
                  <p>Email Không hợp lệ</p>
                  {changeArrow ? (
                    <AiOutlineUp className="rotate-180" />
                  ) : (
                    <AiOutlineUp />
                  )}
                </>
              }
            />
            {showDetailError && (
              <div className="delay-75">
                {emailError.map((item, index: number) => {
                  return (
                    <p key={index}>
                      {index + 1}: Dòng {item.stt} - {item.email}
                    </p>
                  );
                })}
              </div>
            )}
          </>
        )}
        {saveEmail && successList ? (
          <>
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
            <Button
              className="bg-yellow-400 p-3 flex justify-between items-center cursor-pointer"
              onClick={() => setCheckEmailNew(!checkEmailNew)}
              children={
                <>
                  <p>Email Chưa Có Trên Hệ Thống</p>
                  <p>{successList.newEmail?.length ?? 0}</p>
                </>
              }
            />
            {checkEmailNew &&
              successList.newEmail?.map((item: any, index: number) => {
                return (
                  <p key={index} className="p-1">
                    {index + 1} - {item}
                  </p>
                );
              })}
            <Button
              className="bg-green-400 p-3 flex justify-between items-center cursor-pointer"
              onClick={() => setCheckEmail(!checkEmail)}
              children={
                <>
                  <p>Email Đã Được thêm vào hệ thống</p>
                  <p>{successList.totalEmail?.length ?? 0}</p>
                </>
              }
            />
            {checkEmail &&
              successList.totalEmail?.map((item: any, index: number) => {
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
  );
}
