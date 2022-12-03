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
import { SlArrowRight } from 'react-icons/sl';
import { actions } from '../../../Redux';
export default function ProgramDetail() {
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [startDate, setStartDate]: any = useState();
  const [endDate, setEndDate]: any = useState();
  const [acedemicYear, setAcedemicYear]: any = useState();
  const [faculty, setFaculty]: any = useState();
  const [isPublish, setIsPublish]: any = useState();
  const [category, setCategory]: any = useState();
  const [listContent, setListContent]: any = useState([]);
  const item = useAppSelector((state) => state.form.setProgram);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let t = setTimeout(() => {
      Object.keys(item).forEach((key: any) => {
        form.setFieldValue(key, item[key]);
      });
      setImage(item.image);
      setStartDate(moment(item.startDate).format('DD-MM-YYYY'));
      setEndDate(moment(item.endDate).format('DD-MM-YYYY'));
      setAcedemicYear(item.academicYear?.year ? item.academicYear?.year : '');
      setFaculty(item.faculty.facultyName);
      setCategory(item.category.categoryName);
      4;
      setIsPublish(item.isPublish);
      fetchProgramContent();
    }, 100);
    return () => {
      clearTimeout(t);
    };
  }, []);
  const addChapter = () => {
    navigate(`/admin/Program/Chapter/${'AddContent'}`);
  };
  const fetchProgramContent = async () => {
    const response = await apiService.getContentProgram(item.programId);
    if (response) {
      setListContent(response);
    }
  };
  function goBack() {
    navigate(-1);
  }
  const handelCancel = () => {
    navigate(-1);
    form.resetFields();
  };
  const handelOk = () => {
    navigate(-1);
    form.resetFields();
  };
  return (
    <div className="w-full h-full relative">
      <div className="ml-[10px]">
        <Breadcrumb
          router1={'/admin/Program'}
          name={'Chương Trình'}
          name2={`Chuyên Đề`}
        />
      </div>
      <Form form={form} className="formCategory w-full px-5">
        <div className="flex justify-between">
          <div>
            <FormInput
              label="Tên Chương Trình"
              name="programName"
              disabled={true}
            />
            <FormInput
              label="Mô Tả"
              type="textArea"
              name="descriptions"
              disabled={true}
            />
            <FormInput
              className="mt-2"
              label="Phòng/Khoa"
              value={faculty}
              disabled={true}
            />
          </div>
          <div>
            <FormInput label="Điểm Đạt Được" name="coin" disabled={true} />
            <FormInput label="Ngày Bắt Đầu" value={startDate} disabled={true} />
            <FormInput label="Ngày Kết thúc" value={endDate} disabled={true} />
            <FormInput label="Danh Mục" value={category} disabled={true} />
          </div>
          <div
            style={{
              width: '20%',
            }}
          >
            <label className="text-black font-bold font-customFont  mb-4">
              Ảnh giới thiệu
            </label>

            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                marginTop: 13,
              }}
              src={`${API_URL}/images/${image}`}
            />
            <div className="mt-10">
              <FormInput
                className="min-w-[12rem]"
                label="Học Kì"
                name="semester"
                disabled={true}
              />
              <FormInput
                className="min-w-[12rem]"
                label="Năm Học"
                value={acedemicYear}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div
          className="w-full bg-gray-400 my-10"
          style={{
            height: 1,
          }}
        />
        <h1 className="text-black mb-2 font-semibold font-customFont mr-2 h-full text-xl">
          Danh Sách chương
        </h1>
        <div className="my-10 h-full">
          {listContent.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className=" my-5 p-4 rounded-2xl flex items-center justify-between bg-gray-300 cursor-pointer active:bg-transparent"
                onClick={() => {
                  navigate(`/admin/Program/Chapter/${item.contentId}`);
                  dispatch(actions.formActions.setChappter(item));
                  dispatch(
                    actions.formActions.setNameMenu(
                      `Chương Trình ${item.content}`,
                    ),
                  );
                }}
              >
                <div>
                  <label className="text-black font-bold font-customFont ">
                    Chương {item.chapter}: {item.content}
                  </label>
                </div>
                <SlArrowRight size={20} />
              </div>
            );
          })}
        </div>
      </Form>

      <div className="flex w-4/6 absolute right-0 bottom-[-70px] ">
        <CustomButton
          type="cancel"
          text="Quay Lại"
          noIcon={true}
          color="blue-gray"
          className="w-2/5 my-3 mx-2 h-10"
          onClick={() => goBack()}
        />
        <CustomButton
          disabled
          type="cancel"
          text="Thêm Bài Kiểm Tra Cuối Kì"
          noIcon={true}
          variant="outlined"
          className="w-4/5 my-3 mx-2 h-10"
        />
        <CustomButton
          type="cancel"
          text="Thêm Chương"
          noIcon={true}
          color="green"
          variant="outlined"
          className="w-3/5 my-3 mx-2 h-10"
          onClick={() => addChapter()}
        />
      </div>
    </div>
  );
}
