import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText } from '../../../helper/constant';
import { Select } from 'antd';
import { useAppSelector } from '../../../hook/useRedux';
import { IProgramItem } from '../../../Type';

export default function ImportFile({
  showModal,
  setShowModal,
  detail,
  program,
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  program: IProgramItem;
  detail: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [form] = Form.useForm();
  const account = useAppSelector((state) => state.auth.info);
  const [listProgram, setListProgram] = useState([]);

  useEffect(() => {
    async function fetchProgram() {
      let res: any = await apiService.getPrograms();
      setListProgram(res);
    }
    fetchProgram();
  }, []);
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const valueProgram = {
          accountIdLearner: values.accountIdLearner,
          programId: program.programId,
          accountIdApprover: account.accountId,
        };
        const data = apiService.addProgram(valueProgram);
        setLoading(true);
        if (data) {
          setLoading(false);
          notification.success({ message: 'Thêm tập tin thành công' });
        }
        setShowModal(false);
        form.resetFields();
      })

      .catch((info) => {});
  };
  const FormItem = () => {
    return (
      <>
        <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
          Chương Trình
        </label>
        <Form.Item
          className="w-full "
          name="programId"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Chức Vụ',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn Chương Trình"
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={listProgram?.map((item: any) => ({
              value: item.accountId,
              label: item.fullName,
            }))}
          />
        </Form.Item>
      </>
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
      confirmLoading={loading}
    />
  );
}
