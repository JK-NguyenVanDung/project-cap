import React, { useEffect, useState } from 'react';
import { Form, message, Image } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { Breadcrumb } from '../../../components/sharedComponents';
import { API_URL } from '../../../api/api';
import CustomButton from '../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import apiService from '../../../api/apiService';

export default function ProgramDetail() {
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [startDate, setStartDate]: any = useState();
  const [endDate, setEndDate]: any = useState();
  const [listContent, setListContent]: any = useState([]);
  const item = useAppSelector((state) => state.form.setProgram);

  const navigate = useNavigate();
  useEffect(() => {
    Object.keys(item).forEach((key: any) => {
      form.setFieldValue(key, item[key]);
    });
    setImage(item.image);
    setStartDate(moment(item.startDate).format('DD-MM-YYYY'));
    setEndDate(moment(item.endDate).format('DD-MM-YYYY'));
    fetchProgramContent();
  }, []);
  const fetchProgramContent = async () => {
    const response = await apiService.getContentProgram(item.programId);
    if (response) {
      setListContent(response);
    }
  };
  const handelCancel = () => {
    navigate(-1);
    form.resetFields();
  };
  const handelOk = () => {
    navigate(-1);
    form.resetFields();
  };
  return (
    <div className="w-full h-screen">
      <Breadcrumb
        router1={'/admin/Program'}
        name={'Chương Trình'}
        name2={`Chuyên Đề`}
      />
      <Form form={form} className="formCategory w-full px-5">
        <div className="flex justify-between">
          <div>
            <FormInput name="programName" disabled={true} />
            <FormInput type="textArea" name="descriptions" disabled={true} />
          </div>
          <div>
            <FormInput name="coin" disabled={true} />
            <FormInput value={startDate} disabled={true} />
            <FormInput value={endDate} disabled={true} />
          </div>
          <div
            style={{
              width: '20%',
              marginTop: 13,
            }}
          >
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              src={`${API_URL}/images/${image}`}
            />
            <div>
              <CustomButton
                type="default"
                onClick={() => handelOk()}
                text="Lưu"
                noIcon={true}
                className="w-4/5 my-3  h-10"
              />
              <CustomButton
                type="cancel"
                noIcon={true}
                onClick={() => handelCancel()}
                className="w-4/5 my-3 h-10"
              />
            </div>
          </div>
        </div>
        <div
          className="w-full bg-gray-400 my-5"
          style={{
            height: 1,
          }}
        />
        <h1 className="text-black font-semibold font-customFont mr-2 h-full text-xl">
          Danh Sách chương
        </h1>
        {listContent.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div>item</div>
            </div>
          );
        })}
      </Form>
    </div>
  );
}
