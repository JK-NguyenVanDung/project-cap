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
  const handleOk = async () => {
    form
      .validateFields()
      .then(async () => {
        const values = {
          programId: program.programId,
          emails: listEmail,
        };
        const data: any = apiService.importFileLearner(values);
        setLoading(true);
        if (data) {
          setLoading(false);
          notification.success({ message: 'Thêm tập tin thành công' });
        } else {
          notification.success({ message: 'Thêm tập tin không thành công' });
        }
        setShowModal(false);
        form.resetFields();
      })

      .catch((info) => {});
  };
  const handelReadFile = (value: any) => {
    const file = value.target.files[0];
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
    readFileExcel.then((data: any) => {
      data &&
        setListEmail(
          data.map((item: any) => {
            const email = item.Email || item.email;
            if (
              !email
                .toString()
                .match(
                  /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/,
                )
            ) {
              notification.error({ message: 'Email không đúng định dạng' });
            } else {
              return email;
            }
          }),
        );
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
  const FormItem = () => {
    return (
      <>
        <p>
          <span className="text-error">*</span> Email phải có thật, định dạng
          đuôi @vanlanguni.vn hoặc @vlu.edu.vn
        </p>
        <p>
          <span className="text-error">*</span> Ví Dụ Cho Excel
        </p>
        <TableConfig
          panigation={false}
          search={false}
          data={dataTable}
          columns={column}
        />
        <Input type="file" onChange={(value: any) => handelReadFile(value)} />
      </>
    );
  };
  return (
    <CustomModal
      show={showModal}
      handleOk={handleOk}
      setShow={setShowModal}
      label={'Người Học'}
      FormItem={<FormItem />}
      form={form}
      header={'Xuất Tập Tin'}
      confirmLoading={loading}
    />
  );
}
