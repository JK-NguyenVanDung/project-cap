import React, { useEffect, useState } from 'react';
import { Form, Upload, Select, DatePicker, Checkbox, notification } from 'antd';
import { GrAdd } from 'react-icons/gr';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';
import { Breadcrumb } from '../../../components/sharedComponents';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import './index.css';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService';
import { Option } from 'antd/lib/mentions';
import axios, { AxiosResponse } from 'axios';
import Input from '../../../components/sharedComponents/Input';
export default function EditProgram({ type }: { type: string }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataFct, setDataFct]: any = useState([]);
  const [dataCategory, setDataCategory]: any = useState([]);
  const [checkOption, setCheckOption] = useState(false);
  const [form] = Form.useForm();
  const frmData: any = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    getFacuties();
    getCategories();
  }, []);
  const getFacuties = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getFaculties();
    if (reponse) {
      setDataFct(reponse);
      setCheckOption(true);
    }
  };
  const getCategories = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getCategories();
    if (reponse) {
      setDataCategory(reponse);
      setCheckOption(true);
    }
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onSearch = () => {
    console.log('abc');
  };
  const handelOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        frmData.append('ProgramName', values.ProgramName);
        frmData.append('FacultyId', values.FacultyId);
        frmData.append('Image', values.Image.file);
        frmData.append('CategoryId', values.CategoryId);
        frmData.append(
          'StartDate',
          moment(values.StartDate).format('YYYY-MM-DD'),
        );
        frmData.append('EndDate', moment(values.EndDate).format('YYYY-MM-DD'));
        frmData.append('IsPublish', values.IsPublish);
        frmData.append('Coin', values.Coin);
        const data = await apiService.addProgram(frmData);
        if (data) {
          notification.success({ message: 'thêm thành công' });
          navigate(-1);
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  return (
    <div className="h-full">
      <Breadcrumb
        router1={'/admin/Program'}
        name={'Trang Chủ'}
        name2={`${type} Chương Trình`}
      />
      <Form
        form={form}
        initialValues={{
          midifier: 'public',
          IsPublish: true,
        }}
      >
        <div className="flex justify-around center my-5">
          <div className="w-full mx-5">
            <FormInput
              name="ProgramName"
              label="Chủ Đề Đào Tạo"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Chủ Đề Đào Tạo',
                },
              ]}
            />
            <div className="my-10">
              <FormInput type="textArea" label="Mô Tả Chủ Đề" />
            </div>
            <label className=" text-black font-bold font-customFont ">
              Phòng/Khoa
            </label>
            <Form.Item name="FacultyId">
              <Select
                showSearch
                placeholder="Chọn Phòng/Khoa"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataFct.map((item: any) => ({
                  value: item.facultyId,
                  label: item.facultyName,
                }))}
              />
            </Form.Item>
            <FormInput label="Vị Trí" className="mt-0" />
          </div>
          <div className="w-full mx-5">
            <FormInput label="Số Coin Đạt Được Khi Hoàn Thành" name="Coin" />

            <Form.Item label="Ngày Bắt Đầu" name="StartDate">
              <DatePicker picker="date" />
            </Form.Item>
            <Form.Item label="Ngày Kết Thúc" name="EndDate">
              <DatePicker picker="date" />
            </Form.Item>
            <label className="text-black font-bold font-customFont ">
              Năm Học
            </label>
            <Form.Item className="mb-4">
              <DatePicker picker="year" />
            </Form.Item>

            <label className="text-black font-bold font-customFont">
              Danh Mục
            </label>
            <Form.Item name="CategoryId">
              <Select
                showSearch
                placeholder="Chọn Danh Mục"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataCategory.map((item: any) => ({
                  value: item.categoryId,
                  label: item.categoryName,
                }))}
              />
            </Form.Item>
            <label className="text-black font-bold font-customFont ">
              Học Kì
            </label>
            <Form.Item>
              <Select placeholder="Chọn Học Kì">
                <Option>Năm I</Option>
                <Option>Năm II</Option>
                <Option>Năm III</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="w-2/3">
            <label className="text-black font-bold font-customFont">
              Ảnh Giới Thiệu
            </label>
            <Form.Item className="mt-4" name="Image">
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
                iconRender={GrAdd}
                className="containerUpLoad"
              >
                <GrAdd />
                <p>banner</p>
              </Upload>
            </Form.Item>
            <label className=" text-black font-bold font-customFont mr-2 ">
              Công Khai:
            </label>
            <Form.Item name="IsPublish" valuePropName="checked">
              <Checkbox>Có</Checkbox>
            </Form.Item>
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
                onClick={() => navigate(-1)}
                className="w-4/5 my-3 h-10"
              />
            </div>
          </div>
        </div>
      </Form>
      {/* <FooterButton /> */}
    </div>
  );
}
