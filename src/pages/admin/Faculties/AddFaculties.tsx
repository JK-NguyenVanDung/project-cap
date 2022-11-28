import { Form, notification } from 'antd';
import React, { useState } from 'react';
import { IFaculties } from '../../../api/apiInterface';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText } from '../../../helper/constant';

export default function AddFaculties({
  showModal,
  setShowModal,
  detail,
  confirmLoading,
  setConfirmLoading,
  setDetail,
}: {
  confirmLoading: boolean;
  setConfirmLoading: (conformLoading: boolean) => void;
  detail: IFaculties;
  setDetail: React.Dispatch<React.SetStateAction<IFaculties>>;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [form] = Form.useForm();
  async function checkAccountExist(facultyName: string) {
    let res: any = await apiService.getFaculties();
    let obj = res.find((e: IFaculties) => e.facultyName === facultyName);
    console.log(obj);
    return obj !== undefined ? true : false;
  }
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (detail) {
          await apiService.editFaculties(detail.facultyId, {
            name: values.facultyName,
          });
          setShowModal(false);
          notification.success({ message: 'Thay đổi thành công' });
          setConfirmLoading(!confirmLoading);
          form.resetFields();
        } else {
          let exist = checkAccountExist(values);
          if ((await exist) === false) {
            await apiService.addFaculties({ name: values.facultyName });
            setShowModal(false);
            notification.success({ message: 'Thêm thành công' });
            setConfirmLoading(!confirmLoading);

            form.resetFields();
          } else {
            notification.error({ message: 'Thêm không thành công' });
          }
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  const FormItem = () => {
    return (
      <FormInput
        name="facultyName"
        label="Tên Phòng/Khoa"
        rules={[
          {
            required: true,
            message: 'Vui Lòng Nhập Vào Tên Phòng/Khoa',
          },
          {
            pattern: new RegExp(/^(?!\s*$|\s).*$/),
            message: errorText.space,
          },
        ]}
      />
    );
  };
  return (
    <CustomModal
      show={showModal}
      handleOk={handleOk}
      setShow={setShowModal}
      dataItem={detail}
      label={'Phòng/Khoa'}
      name={detail}
      FormItem={<FormItem />}
      form={form}
      header={showDetail ? 'Thêm' : 'Sửa Phòng/Khoa'}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    />
  );
}
