import { Form, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText } from '../../../helper/constant';
import { Select } from 'antd';
import { useAppSelector } from '../../../hook/useRedux';
import { IProgramItem } from '../../../Type';
import Input from '../../../components/sharedComponents/Input';
import CustomButton from '../../../components/admin/Button';
import { HiOutlineTrash } from 'react-icons/hi';

export default function ImportFile({
  showModal,
  setShowModal,
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const [valueMail, setValueMail] = useState('');
  const [form] = Form.useForm();
  const [listProgram, setListProgram] = useState([]);
  const tamp: any = {
    email: valueMail,
  };
  const [arrMail, setArrMail] = useState([tamp]);
  useEffect(() => {
    async function fetchProgram() {
      let res: any = await apiService.getPrograms();
      setListProgram(res);
    }
    fetchProgram();
  }, []);

  const handelEmail = (value: any) => {
    setValueMail(value.target.value);
  };
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const data = apiService.importFileLeaner(values);
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
  const handelAddEmail = () => {
    setArrMail([...arrMail, tamp]);
    console.log(arrMail);
  };
  const removeEmail = (index: number) => {
    console.log(index);
    const filteredItems = arrMail.filter((item, i) => {
      return i + 1 !== index;
    });
    setArrMail([...filteredItems]);
  };
  const ItemFormEmail = ({ index }: { index: number }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="w-full">
          <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
            Email {index}
          </label>
          <Form.Item
            className="w-full "
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Email',
              },
              {
                pattern: new RegExp(
                  /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/,
                ),
                message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU',
              },

              {
                pattern: new RegExp(
                  /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/,
                ),
                message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU ',
              },
              {
                pattern: new RegExp(/^\w/),
                message: errorText.email,
              },
              {
                pattern: new RegExp(/^(?!\s*$|\s).*$/),
                message: errorText.space,
              },
            ]}
          >
            <Input onChange={(value: string) => handelEmail(value)} />
          </Form.Item>
        </div>
        <div className=" pb-5">
          <CustomButton
            className="w-9 h-9"
            size="sm"
            Icon={HiOutlineTrash}
            color="red"
            onClick={() => removeEmail(index)}
          />
        </div>
      </div>
    );
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
        {arrMail.map((item, index) => {
          return <ItemFormEmail key={index} index={index + 1} />;
        })}
        <CustomButton
          className="w-36"
          size="sm"
          text="Thêm Email"
          onClick={() => handelAddEmail()}
        />
      </>
    );
  };
  return (
    <CustomModal
      show={showModal}
      handleOk={handleOk}
      setShow={setShowModal}
      label={'Người Học'}
      FormItem={<FormItem />}
      form={form}
      header={'Xuất Tập Tin'}
      confirmLoading={loading}
    />
  );
}
