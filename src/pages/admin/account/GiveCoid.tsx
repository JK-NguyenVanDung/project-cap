import React, { useEffect, useState } from 'react';
import { Form, Select, message, notification } from 'antd';
import CustomModal from '../../../components/admin/Modal/Modal';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import { errorText } from '../../../helper/constant';
export default function GiveCoid({ showModal, setShowModal }: any) {
  const [form] = Form.useForm();
  const [listAccount, setListAccount] = useState([]);
  useEffect(() => {
    const getAllAccount = async () => {
      try {
        let res: any = await apiService.getAccounts();
        setListAccount(res);
      } catch (err: any) {
        throw err.message;
      }
    };
    getAllAccount();
  }, []);
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const response = await apiService.giveCoin(values);
        notification.success({ message: 'Tặng Coid Thành Công !' });
        setShowModal(false);
        form.resetFields();
      })

      .catch((info) => {
        notification.error({ message: 'Tặng Coid Không Thành Công !' });

        // dispatch(actions.formActions.showError())
      });
  };
  const FormItem = () => {
    return (
      <>
        <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
          Email Người Nhận
        </label>
        <Form.Item
          className="w-full "
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Email',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn Email Người Nhận"
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={listAccount.map((item: any) => ({
              value: item.email,
              label: item.email,
            }))}
          />
        </Form.Item>
        <FormInput
          type="inputNumber"
          label="Số Coin"
          name="coin"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Số Coin',
            },
          ]}
        />
      </>
    );
  };
  return (
    <CustomModal
      centered={true}
      show={showModal}
      setShow={setShowModal}
      label={'Tặng Coin'}
      handleOk={handleOk}
      FormItem={<FormItem />}
      form={form}
      header={'Tặng Coin'}
    />
  );
}
