import React, { useEffect, useState } from 'react';
import {
  Image,
  Form,
  Upload,
  Select,
  DatePicker,
  Checkbox,
  notification,
} from 'antd';
import { GrAdd } from 'react-icons/gr';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';
import { Breadcrumb } from '../../../components/sharedComponents';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService';
import axios, { AxiosResponse } from 'axios';
import { useAppSelector } from '../../../hook/useRedux';
const { Option } = Select;
import './index.css';
import { API_URL } from '../../../api/api';
export default function EditProgram() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataFct, setDataFct]: any = useState([]);
  const [acedemic, setAcedemic]: any = useState([]);
  const [positons, setpositons]: any = useState([]);
  const [dataCategory, setDataCategory]: any = useState([]);
  const [checkOption, setCheckOption] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage]: any = useState(null);
  const frmData: any = new FormData();
  const navigate = useNavigate();
  const item: any = useAppSelector((state) => state.form.setProgram);
  console.log(item);

  useEffect(() => {
    getFacuties();
    getCategories();
    getAcedemicYear();
    getPositions();
    item
      ? (form.setFieldsValue({
          ProgramName: item ? item.programName : '',
          Coin: item ? item.coin : '',
          StartDate: item ? moment(item.startDate) : '',
          EndDate: item ? moment(item.endDate) : '',
          AcademicYearId: item ? item.academicYearId : '',
          Semester: item ? item.semester?.toString() : '',
          Positions: item
            ? item.position.map((item: any) => item.positionName)
            : '',
          FacultyId: item ? item.facultyId : '',
          CategoryId: item ? item.categoryId : '',
          Descriptions: item ? item.descriptions : '',
        }),
        setImage(item.image))
      : form.setFieldsValue(setLoading(false));
  }, [loading]);
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
  const getAcedemicYear = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getAcedemicYear();
    if (reponse) {
      setAcedemic(reponse);
      setCheckOption(true);
    }
  };
  const getPositions = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getPositions();
    if (reponse) {
      setpositons(reponse);
      setCheckOption(true);
    }
  };
  const optionPosition = checkOption
    ? positons.map((item: any) => {
        return (
          <Option value={item.positionId} key={item.positionId}>
            {item.positionName}
          </Option>
        );
      })
    : '';
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onSearch = () => {};
  const handelOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        frmData.append(
          'ProgramName',
          values.ProgramName ? values.ProgramName : item.programName,
        );
        frmData.append(
          'FacultyId',
          values.FacultyId ? values.FacultyId : item.facultyId,
        );
        frmData.append('Image', values.Image ? values.Image.file : item.image);
        frmData.append(
          'CategoryId',
          values.CategoryId ? values.CategoryId : item.categoryId,
        );
        frmData.append(
          'StartDate',
          values.StartDate
            ? moment(values.StartDate).format('YYYY-MM-DD')
            : moment(item.startDate).format('YYYY-MM-DD'),
        );
        frmData.append(
          'EndDate',
          values.EndDate
            ? moment(values.EndDate).format('YYYY-MM-DD')
            : moment(item.endDate).format('YYYY-MM-DD'),
        );
        frmData.append('Coin', values.Coin ? values.Coin : item.coin);
        frmData.append(
          'Descriptions',
          values.Descriptions ? values.Descriptions : item.descriptions,
        );
        frmData.append(
          'Positions',
          values.Positions ? values.Positions : item.positions,
        );
        frmData.append(
          'Semester',
          values.Semester ? values.Semester : item.semester,
        );
        frmData.append(
          'AcademicYearId',
          values.AcademicYearId ? values.AcademicYearId : item.academicYearId,
        );
        if (item) {
          const data = await apiService.putProgram(item.programId, frmData);
          if (data) {
            notification.success({ message: 'sửa thành công' });
            navigate(-1);
          }
          form.resetFields();
        } else {
          const data = await apiService.addProgram(frmData);
          if (data) {
            notification.success({ message: 'thêm thành công' });
            navigate(-1);
          }
          form.resetFields();
        }
      })

      .catch((info) => {
        console.log(info);
      });
  };
  const handelCancel = () => {
    navigate(-1);
    form.resetFields();
  };
  return (
    <div className="h-full">
      <Breadcrumb
        router1={'/admin/Program'}
        name={'Chương Trình'}
        name2={item ? 'Sửa chương trình' : 'Thêm chương trình'}
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
              <FormInput
                name="Descriptions"
                type="textArea"
                label="Mô Tả Chủ Đề"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Mô Tả Chủ Đề',
                  },
                ]}
              />
            </div>
            <label className=" text-black font-bold font-customFont ">
              Phòng/Khoa
            </label>
            <Form.Item
              name="FacultyId"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Phòng/Khoa',
                },
              ]}
            >
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
          </div>
          <div className="w-full mx-5">
            <FormInput
              type="inputNumber"
              label="Số Coin Đạt Được Khi Hoàn Thành"
              name="Coin"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Coin',
                },
              ]}
            />
            <div className="mt-12">
              <label className="text-black font-bold font-customFont ">
                Năm Học
              </label>
              <Form.Item
                className="mb-4"
                name="AcademicYearId"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Năm Học',
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn Năm Học"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={acedemic.map((item: any) => ({
                    value: item.id,
                    label: item.year,
                  }))}
                />
              </Form.Item>

              <label className="text-black font-bold font-customFont ">
                Học Kì
              </label>
              <Form.Item
                name="Semester"
                className="w-4/5"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Học Kì',
                  },
                ]}
              >
                <Select placeholder="Chọn Học Kì">
                  <Option value="1">Năm I</Option>
                  <Option value="2">Năm II</Option>
                  <Option value="3">Năm III</Option>
                </Select>
              </Form.Item>
              <label className="text-black font-bold font-customFont">
                Danh Mục
              </label>
              <Form.Item
                name="CategoryId"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Danh Mục',
                  },
                ]}
              >
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
              <label className="text-black font-bold font-customFont">
                Chức vụ
              </label>
              <Form.Item
                name="Positions"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Chức Vụ',
                  },
                ]}
              >
                <Select
                  placeholder="Chọn Chức Vụ"
                  optionFilterProp="children"
                  onChange={onChange}
                  mode="multiple"
                >
                  {optionPosition}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="w-2/3">
            <label className="text-black font-bold font-customFont">
              Ảnh Giới Thiệu
            </label>

            {image && (
              <Image
                style={{
                  marginRight: 10,
                  width: '50%',
                  height: '50%',
                }}
                src={`${API_URL}/images/${image}`}
              />
            )}
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
            <label className=" text-black font-bold font-customFont">
              Ngày Bắt Đầu
            </label>
            <Form.Item
              name="StartDate"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Ngày Bắt Đầu',
                },
              ]}
            >
              <DatePicker picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont ">
              Ngày Kết Thúc
            </label>
            <Form.Item
              name="EndDate"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Ngày Kết Thúc',
                },
              ]}
            >
              <DatePicker picker="date" />
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
                onClick={() => handelCancel()}
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
