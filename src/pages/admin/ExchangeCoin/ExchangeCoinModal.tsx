import React, { useState, useEffect } from 'react';
import { Form, notification, Image, DatePicker } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { useAppSelector } from '../../../hook/useRedux';
import apiService from '../../../api/apiService';
import moment from 'moment';

export default function ({
  visible,
  setVisible,
  item,
  setItem,
  confirmLoading,
  setConfirmLoading,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: any;
  setItem: any;
  confirmLoading: boolean;
  setConfirmLoading: Function;
}) {
  const [form] = Form.useForm();
  const info = useAppSelector((state) => state.auth.info);

  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  function getComment(item: any) {
    let text = '';
    if (!item) {
      return 'Chưa có Miêu tả';
    }
    if (item.reasonRefusal) {
      text += 'Lý do từ chối: ';
      text += item.reasonRefusal;
      text += `\n`;
    }
    if (item.comment) {
      text += item.comment;
    }
    return text;
  }
  async function handleOk() {
    form.validateFields().then(async (values) => {
      if (item) {
        await apiService.putExchange(item.exchangeId, {
          ...values,
          endDate: moment(values.endDate).toISOString(true),
          creatorId: info.accountId,
        });
        setVisible(false);
        notification.success({ message: 'Thay đổi thành công' });
      } else {
        await apiService.postExchange({
          ...values,
          endDate: moment(values.endDate).toISOString(true),

          creatorId: info.accountId,
        });
        setVisible(false);
        notification.success({ message: 'Thêm thành công' });
      }
      setConfirmLoading(!confirmLoading);
      form.resetFields();
    });
  }
  useEffect(() => {
    form.setFieldsValue({
      item,
    });
    setLoading(true);
    if (item) {
      setLoading(false);
    }
  }, [item, loading]);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <div className="w-full p-6">
          <FormInput
            placeholder="Nhập Tiêu đề"
            label="Tên Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Tiêu đề',
              },
            ]}
          />
          <div className="flex justify-between">
            <div className=" w-full">
              <FormInput
                className=""
                placeholder="Số coin"
                label="Nhập số coin"
                name="coin"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Số Coin',
                  },
                  {
                    pattern: new RegExp(/^\d+$/),
                    message: 'Điểm phải thuộc kiểu số nguyên dương',
                  },
                ]}
              />
            </div>
            <div className="ml-8 w-full">
              <label className={`text-black font-bold font-customFont `}>
                Ngày kết thúc
              </label>
              <Form.Item
                style={{ marginTop: 14 }}
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: 'Vui Lòng Nhập Vào Ngày Kết Thúc',
                  },
                ]}
              >
                <DatePicker
                  placeholder="Chọn ngày kết thúc"
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  className={`  font-customFont  font-bold  w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                />
              </Form.Item>
            </div>
          </div>
          <FormInput
            placeholder="Nhập miêu tả"
            label="Miêu tả"
            name="description"
            type="textArea"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Miêu tả',
              },
            ]}
          />
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      label={'Đơn Đổi Coin'}
      dataItem={item}
      name={item}
      handleOk={handleOk}
      FormItem={<FormItem />}
      form={form}
      width={900}
    />
  );
}
