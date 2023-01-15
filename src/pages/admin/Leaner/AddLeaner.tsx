import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText } from '../../../helper/constant';
import { Select } from 'antd';
import { useAppSelector } from '../../../hook/useRedux';
import { IProgramItem } from '../../../Type';
export default function AddLeaner({
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
  const [listLeaner, setListLeaner] = useState([]);

  useEffect(() => {
    async function fetchLeaner() {
      let res: any = await apiService.getAccounts();
      setListLeaner(res);
      console.log(res);
    }
    fetchLeaner();
  }, []);
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const valueLeaner = {
          accountIdLearner: values.accountIdLearner,
          programId: program.programId,
          accountIdApprover: account.accountId,
        };
        try {
          if (detail) {
            const data = apiService.updateLeaner(detail.learnerId, values);
            setLoading(true);
            if (data) {
              setLoading(false);
              notification.success({ message: 'Thay đổi thành công' });
            }
            setShowModal(false);
            form.resetFields();
          } else {
            const data = apiService.addLeaner(valueLeaner);
            if (data) {
              notification.success({ message: 'Thêm thành công' });
            }
            setShowModal(false);
            form.resetFields();
          }
        } catch (error) {
          notification.error({ message: 'Thực hiện không thành công' });
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };
  const FormItem = () => {
    return (
      <>
        <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
          Người Học
        </label>
        <Form.Item
          className="w-full "
          name="accountIdLearner"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Chức Vụ',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn Người Học"
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={listLeaner?.map((item: any) => ({
              value: item.accountId,
              label: item.email,
            }))}
          />
        </Form.Item>
      </>
    );
  };
  const FormUpdate = () => {
    return (
      <>
        <FormInput
          label="Trạng Thái"
          name="status"
          placeholder="Trạng Thái"
          rules={[{ required: true, message: 'Vui lòng nhập vào Trạng Thái' }]}
        />
        <FormInput
          type="textArea"
          label="Nhận Xét"
          name="comment"
          placeholder="Nhận Xét"
          rules={[{ required: true, message: 'Vui lòng nhập vào Nhận Xét' }]}
        />
      </>
    );
  };
  return (
    <CustomModal
      show={showModal}
      handleOk={handleOk}
      setShow={setShowModal}
      dataItem={detail}
      label={'Người Học'}
      name={detail}
      FormItem={detail ? <FormUpdate /> : <FormItem />}
      form={form}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      confirmLoading={loading}
    />
  );
}
