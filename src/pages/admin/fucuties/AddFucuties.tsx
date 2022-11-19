import { Form, notification } from 'antd';
import React, { useState } from 'react';
import { IFuculties } from '../../../api/apiInterface';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';

export default function AddFucuties({
  showModal,
  setShowModal,
  detail,
  confirmLoading,
  setConfirmLoading,
  setDetail,
}: {
  confirmLoading: boolean;
  setConfirmLoading: (conformLoading: boolean) => void;
  detail: IFuculties;
  setDetail: React.Dispatch<React.SetStateAction<IFuculties>>;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [form] = Form.useForm();
  async function checkAccountExist(facultyName: string) {
    let res: any = await apiService.getFuculties();
    let obj = res.find((e: IFuculties) => e.facultyName === facultyName);
    console.log(obj);
    return obj !== undefined ? true : false;
  }
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values.facultyName);

        if (detail) {
          await apiService.editFuculties(detail.facultyId);
          setShowModal(false);
          // dispatch(actions.categoryActions.changeLoad(!loadData))
          notification.success({ message: 'Thay đổi thành công' });
          setConfirmLoading(!confirmLoading);
          form.resetFields();
        } else {
          let exist = checkAccountExist(values);

          if ((await exist) === false) {
            await apiService.addFuculties(values);
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
        name="name"
        label="Tên Phòng/Khoa"
        rules={[
          {
            required: true,
            message: 'Vui Lòng Nhập Vào Tên Phòng/Khoa',
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
