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

    console.log(JSON.stringify(item));
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
        }

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
                type === 'save' ? 'S???a th??nh c??ng' : 'G???i duy???t th??nh c??ng',
            });
            navigate(-1);
          }
          form.resetFields();
        } else {
          const data = await apiService.addProgram(frmData);
          if (data) {
            notification.success({ message: 'Th??m th??nh c??ng' });
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
      title: <p className="font-bold text-xl my-2">Xa??c nh????n</p>,
      icon: <AiFillWarning size={30} color={Color.warning} />,
      content: (
        <p className="font-medium text-base my-2">
          Ba??n co?? ch????c ch????n {status === 'public' ? '???n' : 'C??ng khai'} ch????ng
          tr??nh n??y?
        </p>
      ),
      okText: '?????ng ??',
      cancelText: 'Hu???',
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
              `${status === 'public' ? '???n' : 'C??ng khai'} tha??nh c??ng`,
            );
            setTimeout(() => {
              setLoading(false);
            }, 400);
          }
        };
        Approve();
      },
      onCancel() {
        message.error('h???y');
      },
    });
  }
  return (
    <div className="h-full">
      <Breadcrumb
        router1={'/admin/Program'}
        name={'Ch????ng Tr??nh'}
        name2={item ? 'S???a ch????ng tr??nh' : 'Th??m ch????ng tr??nh'}
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
              label="Ch??? ????? ????o T???o"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Ch??? ????? ????o T???o',
                },
              ]}
            />
            <div className="pt-1 pb-3">
              <FormInput
                areaHeight={10}
                name="Descriptions"
                type="textArea"
                label="M?? T??? Ch??? ?????"
                rules={[
                  {
                    required: true,
                    message: 'Vui L??ng Nh???p V??o M?? T??? Ch??? ?????',
                  },
                ]}
              />
            </div>
            <label className="text-black font-bold font-customFont ">
              Danh M???c
            </label>
            <Form.Item
              className="mt-4"
              name="CategoryId"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Danh M???c',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Ch???n Danh M???c"
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
              Ph??ng/Khoa
            </label>
            <Form.Item
              className="mt-4"
              name="FacultyId"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Ph??ng/Khoa',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Ch???n Ph??ng/Khoa"
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
              label="S??? Gi??? ????o t???o"
              name="TrainingHours"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o S??? Gi??? ????o t???o',
                },
              ]}
            />
            <FormInput
              type="inputNumber"
              label="S??? Coin ?????t ???????c Khi Ho??n Th??nh"
              name="Coin"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Coin',
                },
              ]}
            />
            <FormInput
              label="S??? l?????ng tham gia t???i ??a"
              name="MaxLearner"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o S??? l?????ng tham gia t???i ??a',
                },
              ]}
            />
            <div>
              <div className="">
                <label className="text-black font-bold font-customFont ">
                  H???c K??
                </label>
                <Form.Item
                  name="Semester"
                  className="w-full mt-4"
                  rules={[
                    {
                      required: true,
                      message: 'Vui L??ng Nh???p V??o H???c K??',
                    },
                  ]}
                >
                  <Select placeholder="Ch???n H???c K??">
                    <Option value="1">H???c K?? 1</Option>
                    <Option value="2">H???c K?? 2</Option>
                    <Option value="3">H???c K?? 3</Option>
                  </Select>
                </Form.Item>
              </div>

              <label className="text-black font-bold font-customFont">
                Ch???c v???
              </label>
              <Form.Item
                style={{ marginTop: 17 }}
                name="PositionIds"
                rules={[
                  {
                    required: true,
                    message: 'Vui L??ng Nh???p V??o Ch???c V???',
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n Ch???c V???"
                  optionFilterProp="children"
                  onChange={onChangePosition}
                  mode="multiple"
                >
                  {optionPosition}
                </Select>
              </Form.Item>
              <FormInput
                label="Gi???ng vi??n"
                name="Lecturers"
                rules={[
                  {
                    required: true,
                    message: 'Vui L??ng Nh???p V??o Gi???ng vi??n',
                  },
                ]}
              />
            </div>
          </div>
          <div className="w-2/3">
            <label className="text-black font-bold font-customFont">
              ???nh Gi???i Thi???u
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
            <Form.Item
              style={{ marginTop: 10 }}
              className="mt-4 "
              name="Image"
              rules={[
                {
                  required: image ? false : true,
                  message: 'Vui L??ng Ch???n ???nh Banner ',
                },
              ]}
            >
              <Upload
                accept="image/*"
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
              Ng??y B???t ?????u
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="StartDate"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Ng??y B???t ?????u',
                },
              ]}
            >
              <DatePicker placeholder="Ch???n Ng??y" picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont ">
              Ng??y K???t Th??c
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="EndDate"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Ng??y K???t Th??c',
                },
              ]}
            >
              <DatePicker placeholder="Ch???n Ng??y" picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont">
              Ng??y B???t ?????u ??K
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="RegistrationStartDate"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Ng??y B???t ?????u',
                },
              ]}
            >
              <DatePicker placeholder="Ch???n Ng??y" picker="date" />
            </Form.Item>
            <label className=" text-black font-bold font-customFont ">
              Ng??y K???t Th??c ??K
            </label>
            <Form.Item
              style={{ marginTop: 10 }}
              name="RegistrationEndDate"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o Ng??y K???t Th??c',
                },
              ]}
            >
              <DatePicker placeholder="Ch???n Ng??y" picker="date" />
            </Form.Item>
            <label className="text-black font-bold font-customFont ">
              N??m H???c
            </label>
            <Form.Item
              className="mt-4 w-fit"
              name="AcademicYearId"
              rules={[
                {
                  required: true,
                  message: 'Vui L??ng Nh???p V??o N??m H???c',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Ch???n N??m H???c"
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
            text="L??u"
            noIcon={true}
            className="w-44 my-3 mx-10 h-10"
          />

          {item && (
            <CustomButton
              text="L???ch s??? duy???t"
              variant="filled"
              color="blue-gray"
              noIcon={true}
              onClick={() => setOpenHistory(!openHistory)}
              className="w-44 my-3 h-10 "
            />
          )}
          {item && (
            <CustomButton
              tip="G???i Duy???t"
              noIcon={true}
              color="green"
              text="G???i"
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
                  text="Ri??ng T??"
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
                  text="C??ng Khai"
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
