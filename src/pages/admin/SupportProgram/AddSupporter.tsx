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

export default function ({
  programId,
  showModal,
  setShowModal,
  detail,
  loading,
  setLoading,
}: {
  programId: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  detail: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [form] = Form.useForm();
  const account = useAppSelector((state) => state.auth.info);
  const [listLearner, setListLearner] = useState([]);
  const dispatch = useAppDispatch();

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
        try {
          //reload

          dispatch(actions.reloadActions.setReload());
          setLoading(true);

          let data = await apiService.addSupporter({
            programId: programId,
            accountId: values.accountId,
          });
          if (data) {
            notification.success({ message: 'Thêm thành công' });
          }
          setShowModal(false);
          form.resetFields();

          setTimeout(() => {
            setLoading(false);

            dispatch(actions.reloadActions.setReload());
          }, 1000);
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
          Người Hỗ Trợ
        </label>
        <Form.Item
          className="w-full "
          name="accountId"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Chức Vụ',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn Người hỗ trợ"
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

  return (
    <CustomModal
      show={showModal}
      handleOk={handleOk}
      setShow={setShowModal}
      dataItem={detail}
      label={'Người Học'}
      name={detail}
      FormItem={<FormItem />}
      form={form}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      confirmLoading={loading}
    />
  );
}
