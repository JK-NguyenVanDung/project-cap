import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import CustomModal from '../../../components/admin/Modal/Modal';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
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
    console.log('ok');
  };
  const FormItem = () => {
    return (
      <>
        <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
          Email Người Nhận
        </label>
        <Form.Item
          className="w-full "
          name="positionId"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Email Người Nhận',
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
              value: item.accountId,
              label: item.email,
            }))}
          />
        </Form.Item>
        <FormInput
          type="inputNumber"
          label="Sô Coin"
          name="Coin"
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
      label={'Tài Khoản'}
      handleOk={handleOk}
      FormItem={<FormItem />}
      form={form}
      header={'Tặng Coid'}
    />
  );
}