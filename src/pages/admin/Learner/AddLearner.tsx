import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText } from '../../../helper/constant';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { IProgramItem } from '../../../Type';
import { actions } from '../../../Redux';

const { Option } = Select;

export default function AddLearner({
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
  const [listLearner, setListLearner] = useState([]);

  useEffect(() => {
    async function fetchLearner() {
      let res: any = await apiService.getAccounts();
      setListLearner(res);
    }
    fetchLearner();
  }, []);
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const valueLearner = {
          accountIdLearner: values.accountIdLearner,
          programId: program.programId,
          accountIdApprover: account.accountId,
        };

        try {
          if (detail) {
            const data = await apiService
              .updateLearner(detail.learnerId, values)
              .finally(() => {
                setLoading(true);
              });
            if (data) {
              notification.success({ message: 'Thay đổi thành công' });
            }
            setShowModal(false);
            form.resetFields();
          } else {
            const data = await apiService
              .addLearner(valueLearner)
              .finally(() => {
                setLoading(true);
              });
            if (data) {
              notification.success({ message: 'Thêm thành công' });
            }
            setShowModal(false);
            form.resetFields();
          }
        } catch (error) {
          notification.error({ message: 'Người này đã có trong khoá học' });
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
              message: 'Vui Lòng Chọn Người Học',
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
            options={listLearner?.map((item: any) => ({
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
        <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
          Người Học
        </label>
        <Form.Item
          name="status"
          className="w-full mt-4"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Trạng Thái',
            },
          ]}
        >
          <Select placeholder="Chọn Trạng Thái">
            <Option value="Attending">Đang Tham Gia</Option>
            <Option value="Stop Attending">Ngưng Tham Gia</Option>
            <Option value="Not Complete">Chưa Hoàn Thành</Option>
            <Option value="Complete">Hoàn Thành</Option>
          </Select>
        </Form.Item>
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
