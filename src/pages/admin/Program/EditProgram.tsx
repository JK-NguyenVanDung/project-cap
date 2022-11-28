import React, { useEffect, useState } from 'react';
import { Form, Upload, Select } from 'antd';
import { GrAdd } from 'react-icons/gr';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { Breadcrumb } from '../../../components/sharedComponents';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import './index.css';
import { useNavigate } from 'react-router-dom';
import FooterButton from '../../../components/admin/FooterButton';
import apiService from '../../../api/apiService';
import { AxiosResponse } from 'axios';
export default function EditProgram({ type }: { type: string }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataFct, setDataFct]: any = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handelDel = () => {
    console.log('del');
  };
  useEffect(() => {
    getFacuties();
  }, []);
  const getFacuties = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getFaculties();
    setDataFct(reponse);
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onSearch = () => {
    console.log('abc');
  };
  return (
    <div className="h-full">
      <Breadcrumb
        router1={'/admin/Program'}
        name={'Trang Chủ'}
        name2={`${type} Chương Trình`}
      />
      <Form>
        <div className="flex justify-around center my-5">
          <div className="w-full mx-5">
            <FormInput label="Chủ Đề Đào Tạo" />
            <FormInput type="textArea" label="Mô Tả Chủ Đề" />
            <div className="mt-8">
              <label className=" text-black font-bold font-customFont ">
                Phòng/Khoa
              </label>
              <Form.Item>
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
                />
              </Form.Item>
            </div>
          </div>
          <div className="w-full mx-5">
            <FormInput label="Số Coin Đạt Được Khi Hoàn Thành" />
            <FormInput type="date" label="Ngày Bắt Đầu" />
            <FormInput type="date" label="Ngày Kết Thúc" />
            <label className="text-black font-bold font-customFont ">
              Danh Mục
            </label>

            <Form.Item>
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
              />
            </Form.Item>
          </div>
          <div className="w-2/3">
            <label className="text-black font-bold font-customFont ">
              Ảnh Giới Thiệu
            </label>
            <div className="mt-4">
              <Form.Item>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  iconRender={GrAdd}
                  className="containerUpLoad"
                >
                  <GrAdd />
                  <p>banner</p>
                </Upload>
              </Form.Item>
            </div>
            <div>
              <CustomButton
                type="default"
                onClick={() => handelDel()}
                text="Lưu"
                noIcon={true}
                className="w-3/5 my-3 "
              />
              <CustomButton
                type="cancel"
                noIcon={true}
                onClick={() => navigate(-1)}
                className="w-3/5 my-3"
              />
            </div>
          </div>
        </div>
      </Form>
      {/* <FooterButton /> */}
    </div>
  );
}
