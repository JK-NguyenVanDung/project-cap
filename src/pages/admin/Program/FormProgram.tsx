import React, { useEffect, useState } from 'react';
import {
  Image,
  Form,
  Upload,
  Select,
  DatePicker,
  Checkbox,
  notification,
  Modal,
  message,
  Spin,
} from 'antd';
import { actions } from '../../../Redux';

import { GrAdd } from 'react-icons/gr';
import { AiFillWarning, AiFillUnlock, AiFillLock } from 'react-icons/ai';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';
import { Breadcrumb } from '../../../components/sharedComponents';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService';
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
const { Option } = Select;
import './index.css';

import { API_URL } from '../../../api/api';
import Color from '../../../components/constant/Color';
import ReviewHistory from '../../../components/admin/Review/ReviewHistory';
export default function FormProgram() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataFct, setDataFct]: any = useState([]);
  const [academic, setAcademic]: any = useState([]);
  const [positions, setPositions]: any = useState([]);
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
  const dispatch = useAppDispatch();

  async function getData() {
    const res: AxiosResponse<any, any> = await apiService.getProgram(
      item.programId,
    );
    dispatch(actions.formActions.setProgramForm(res));
  }
  useEffect(() => {
    getData();

    getFacuties();
    getCategories();
    getAcademicYear();
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
          TrainingHours: item ? item.trainingHours : '',
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
          MaxLearner: item && item.maxLearner ? item.maxLearner : '0',
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
  const getAcademicYear = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getAcademicYear();
    if (reponse) {
      setAcademic(reponse);
      setCheckOption(true);
    }
  };
  const getPositions = async () => {
    const reponse: AxiosResponse<any, any> = await apiService.getPositions();
    if (reponse) {
      setPositions(reponse);
      setCheckOption(true);
    }
  };
  const optionPosition = checkOption
    ? positions.map((item: any) => {
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
  const onChangePosition = (item: any) => {
    setValuePositions(item);
  };
  const onSearch = () => {};
  const handelOk = async (type: 'save' | 'saveDraft') => {
    form
      .validateFields()
      .then(async (values) => {
        frmData.append(
          'TrainingHours',
          values.TrainingHours ? values.TrainingHours : item.trainingHours,
        );
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
            ? moment(values.StartDate).format('YYYY-MM-DD hh:mm:ss')
            : moment(item.startDate).format('YYYY-MM-DD hh:mm:ss'),
        );
        frmData.append(
          'RegistrationStartDate',
          values.RegistrationStartDate
            ? moment(values.RegistrationStartDate).format('YYYY-MM-DD hh:mm:ss')
            : moment(item.registrationStartDate).format('YYYY-MM-DD hh:mm:ss'),
        );
        frmData.append(
          'RegistrationEndDate',
          values.RegistrationEndDate
            ? moment(values.RegistrationEndDate).format('YYYY-MM-DD hh:mm:ss')
            : moment(item.registrationEndDate).format('YYYY-MM-DD hh:mm:ss'),
        );
        frmData.append(
          'EndDate',
          values.EndDate
            ? moment(values.EndDate).format('YYYY-MM-DD hh:mm:ss')
            : moment(item.endDate).format('YYYY-MM-DD hh:mm:ss'),
        );
        frmData.append('Coin', values.Coin ? values.Coin : item.coin);
        frmData.append(
          'Descriptions',
          values.Descriptions ? values.Descriptions : item.descriptions,
        );
        type === 'save' && frmData.append('Status', 'save');
        type === 'saveDraft' && frmData.append('Status', 'pending');

        frmData.append('PositionIds', valuePositions),
          frmData.append(
            'Semester',
            values.Semester ? values.Semester : item.semester,
          );
        frmData.append(
          'AcademicYearId',
          values.AcademicYearId ? values.AcademicYearId : item.academicYearId,
        );
        frmData.append(
          'MaxLearner',
          values.MaxLearner ? values.MaxLearner : item.maxLearner,
        );
        if (item) {
          const data = await apiService.putProgram(item.programId, frmData);
          if (data) {
            notification.success({
              message:
                type === 'save' ? 'Sửa thành công' : 'Gửi duyệt thành công',
            });
            navigate(-1);
          }
          form.resetFields();
        } else {
          const data = await apiService.addProgram(frmData);
          if (data) {
            notification.success({ message: 'Thêm thành công' });
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
  function handelApprove(items: any) {
    const { status } = items;
    Modal.confirm({
      title: <p className="font-bold text-xl my-2">Xác nhận</p>,
      icon: <AiFillWarning size={30} color={Color.warning} />,
      content: (
        <p className="font-medium text-base my-2">
          Bạn có chắc chắn {status === 'public' ? 'Ẩn' : 'Công khai'} chương
          trình này?
        </p>
      ),
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      maskStyle: { borderRadius: 12 },
      bodyStyle: { margin: 2, marginBottom: 4 },
      okType: 'danger',
      onOk() {
        const Approve = async () => {
          let temp = status === 'public' ? 'hide' : 'public';
          const data = await apiService.setStatusProgram(items.programId, {
            Status: temp,
          });
          setLoading(true);
          if (data) {
            message.success(
              `${status === 'public' ? 'Ẩn' : 'Công khai'} thành công`,
            );
            setTimeout(() => {
              setLoading(false);
            }, 400);
          }
        };
        Approve();
      },
      onCancel() {
        message.error('hủy');
      },
    });
  }
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
              name="TrainingHours"
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
            <FormInput
              label="Số lượng tham gia tối đa"
              name="MaxLearner"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số lượng tham gia tối đa',
                },
              ]}
            />
            <div>
              <div className="">
                <div className="flex w-full justify-between">
                  <div className="w-1/2 mr-4">
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
                  <div className=" w-1/2">
                    <label className="text-black font-bold font-customFont ">
                      Năm Học
                    </label>
                    <Form.Item
                      className="mt-4 "
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
                        options={academic.map((item: any) => ({
                          value: item.id,
                          label: item.year,
                        }))}
                      />
                    </Form.Item>
                  </div>
                </div>
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
              <img
                style={{
                  marginRight: 10,
                  width: '75%',
                  height: '30vh',
                }}
                src={`${API_URL}/images/${image}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                  // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
                }}
                alt="Cover Image"
              />
            )}
            <Form.Item
              style={{ marginTop: 10 }}
              className="mt-4 "
              name="Image"
              rules={[
                {
                  required: image ? false : true,
                  message: 'Vui Lòng Chọn Ảnh Banner ',
                },
              ]}
            >
              <Upload
                accept="image/*"
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
                iconRender={GrAdd}
                className="h-[30vh]"
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
              <DatePicker
                placeholder="Chọn ngày bắt đầu"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                className={`  font-customFont  font-bold  w-fit bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              />
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
              <DatePicker
                placeholder="Chọn ngày kết thúc"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                className={`  font-customFont  font-bold  w-fit bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              />
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
              <DatePicker
                placeholder="Chọn ngày bắt đầu đăng ký"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                className={`  font-customFont  font-bold  w-fit bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              />
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
              <DatePicker
                placeholder="Chọn ngày kết thúc đăng ký"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                className={`  font-customFont  font-bold  w-fit bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex  w-full justify-center">
          <CustomButton
            type={item ? 'goBack' : 'cancel'}
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

          {item && (
            <CustomButton
              text="Lịch sử duyệt"
              variant="filled"
              color="blue-gray"
              noIcon={true}
              onClick={() => setOpenHistory(!openHistory)}
              className="w-44 my-3 h-10 "
            />
          )}
          {item && (
            <CustomButton
              tip="Gửi Duyệt"
              noIcon={true}
              color="green"
              text="Gửi"
              onClick={() => handelOk('saveDraft')}
              className="w-44 mx-10 my-3 h-10"
            />
          )}
          {item &&
          (item.status === 'approved' ||
            item.status === 'hide' ||
            item.status === 'public') ? (
            item.status === 'public' ? (
              <Spin spinning={loading}>
                <CustomButton
                  type="Success"
                  Icon={AiFillLock}
                  text="Riêng Tư"
                  fullWidth
                  className="w-44 text-white my-3 h-10 "
                  color="teal"
                  onClick={() => handelApprove(item)}
                />
              </Spin>
            ) : (
              <Spin spinning={loading}>
                <CustomButton
                  type="Success"
                  text="Công Khai"
                  className="w-44 text-white my-3 h-10 "
                  color="light-green"
                  onClick={() => handelApprove(item)}
                />
              </Spin>
            )
          ) : null}
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
