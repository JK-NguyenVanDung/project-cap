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
import Color from '../../../components/constant/Color';
import ReviewHistory from '../../../components/admin/Review/ReviewHistory';
export default function EditProgram() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataFct, setDataFct]: any = useState([]);
  const [acedemic, setAcedemic]: any = useState([]);
  const [positons, setpositons]: any = useState([]);
  const [dataCategory, setDataCategory]: any = useState([]);
  const [checkOption, setCheckOption] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  const [image, setImage]: any = useState(null);
  const frmData: any = new FormData();
  const navigate = useNavigate();
  const item: any = useAppSelector((state) => state.form.setProgram);
  const [valuePositions, setValuePositions]: any = useState([]);

  useEffect(() => {
    getFacuties();
    getCategories();
    getAcedemicYear();
    getPositions();
    let temp = item?.programPositions?.map((e: any) => {
      return {
        value: e.position.positionId,
        label: e.position.positionName,
      };
    });
    item
      ? (form.setFieldsValue({
          ProgramName: item ? item.programName : '',
          Coin: item ? item.coin : '',
          Time: item ? item.time : '',
          Lecturers: item ? item.lecturers : '',
          StartDate: item ? moment(item.startDate) : '',
          EndDate: item ? moment(item.endDate) : '',
          AcademicYearId: item ? item.academicYearId : '',
          Semester: item ? item.semester?.toString() : '',
          FacultyId: item ? item.facultyId : '',
          CategoryId: item ? item.categoryId : '',
          Descriptions: item ? item.descriptions : '',
          PositionIds: item ? temp : '',
          RegistrationStartDate: item.registrationStartDate
            ? moment(item.registrationStartDate)
            : '',
          RegistrationEndDate: item.registrationStartDate
            ? moment(item.registrationEndDate)
            : '',
        }),
        setImage(item.image),
        setValuePositions(
          item?.programPositions?.map((item: any) => {
            return item.positionId;
          }),
        ))
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
    console.log(newFileList);
  };
  const onChangePosition = (item: any) => {
    setValuePositions(item);

    console.log(item);
  };
  const onSearch = () => {};
  const handelOk = async (type: 'save' | 'saveDraft') => {
    form
      .validateFields()
      .then(async (values) => {
        frmData.append('Time', values.Time ? values.Time : item.time);
        frmData.append(
          'Lecturers',
          values.Lecturers ? values.Lecturers : item.lecturers,
        );

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
          'RegistrationStartDate',
          values.RegistrationStartDate
            ? moment(values.RegistrationStartDate).format('YYYY-MM-DD')
            : moment(item.registrationStartDate).format('YYYY-MM-DD'),
        );
        frmData.append(
          'RegistrationEndDate',
          values.RegistrationEndDate
            ? moment(values.RegistrationEndDate).format('YYYY-MM-DD')
            : moment(item.registrationEndDate).format('YYYY-MM-DD'),
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
        type === 'save' && frmData.append('Status', 'save');
        type === 'saveDraft' && frmData.append('Status', 'pending');
        console.log(values);
        for (let i = 0; i < valuePositions.length; i++) {
          frmData.append('PositionIds', valuePositions[i]);
        } //
        // frmData.append(
        //   'PositionIds',
        //   valuePositions ? valuePositions : item.positions,
        // );
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
            <div className="pt-1 pb-3">
              <FormInput
                areaHeight={10}
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
            <label className="text-black font-bold font-customFont ">
              Danh Mục
            </label>
            <Form.Item
              className="mt-4"
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
            <label className=" text-black font-bold font-customFont  ">
              Phòng/Khoa
            </label>
            <Form.Item
              className="mt-4"
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
              label="Số Giờ Đào tạo"
              name="Time"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số Giờ Đào tạo',
                },
              ]}
            />
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
            <div>
              <label className="text-black font-bold font-customFont ">
                Năm Học
              </label>
              <Form.Item
                className="mt-4"
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

              <div className="">
                <label className="text-black font-bold font-customFont ">
                  Học Kì
                </label>
                <Form.Item
                  name="Semester"
                  className="w-full mt-4"
                  rules={[
                    {
                      required: true,
                      message: 'Vui Lòng Nhập Vào Học Kì',
                    },
                  ]}
                >
                  <Select placeholder="Chọn Học Kì">
                    <Option value="1">Học Kì 1</Option>
                    <Option value="2">Học Kì 2</Option>
                    <Option value="3">Học Kì 3</Option>
                  </Select>
                </Form.Item>
              </div>

              <label className="text-black font-bold font-customFont">
                Chức vụ
              </label>
              <Form.Item
                style={{ marginTop: 17 }}
                name="PositionIds"
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
                  onChange={onChangePosition}
                  mode="multiple"
                >
                  {optionPosition}
                </Select>
              </Form.Item>
              <FormInput
                label="Giảng viên"
                name="Lecturers"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Giảng viên',
                  },
                ]}
              />
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
            <Form.Item style={{ marginTop: 10 }} className="mt-4 " name="Image">
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
              style={{ marginTop: 10 }}
              name="StartDate"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Ngày Bắt Đầu',
                },
              ]}
            >
              <DatePicker placeholder="Chọn Ngày" picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont ">
              Ngày Kết Thúc
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="EndDate"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Ngày Kết Thúc',
                },
              ]}
            >
              <DatePicker placeholder="Chọn Ngày" picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont">
              Ngày Bắt Đầu ĐK
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="RegistrationStartDate"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Ngày Bắt Đầu',
                },
              ]}
            >
              <DatePicker placeholder="Chọn Ngày" picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont ">
              Ngày Kết Thúc ĐK
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="RegistrationEndDate"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Ngày Kết Thúc',
                },
              ]}
            >
              <DatePicker placeholder="Chọn Ngày" picker="date" />
            </Form.Item>
          </div>
        </div>
        <div className="flex  w-full justify-center">
          <CustomButton
            type="cancel"
            noIcon={true}
            onClick={() => handelCancel()}
            className="w-44 my-3  h-10"
          />
          <CustomButton
            type="default"
            onClick={() => handelOk('save')}
            text="Lưu"
            noIcon={true}
            className="w-44 my-3 mx-10 h-10"
          />

          <CustomButton
            text="Lịch sử duyệt"
            variant="filled"
            color="blue-gray"
            noIcon={true}
            onClick={() => setOpenHistory(!openHistory)}
            className="w-44 my-3 h-10 "
          />
          <CustomButton
            tip="Gửi"
            noIcon={true}
            color="green"
            text="Gửi"
            onClick={() => handelOk('saveDraft')}
            className="w-44 mx-10 my-3 h-10"
          />
        </div>
      </Form>
      <ReviewHistory
        programId={item?.programId}
        setShow={setOpenHistory}
        show={openHistory}
      />
      {/* <FooterButton /> */}
    </div>
  );
}
