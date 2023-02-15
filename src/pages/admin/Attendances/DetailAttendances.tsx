import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Image } from 'antd';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default function DetailAttendances({
  visible,
  setVisible,
  item,
  setItem,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: any;
  setItem: any;
}) {
  const [form] = Form.useForm();

  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      ...item,
      surveyTime: [moment(item?.startDate), moment(item?.endDate)],
      programName: item?.program?.programName,
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
          <FormInput name="programName" label="Chương Trình" disabled />
          <FormInput
            placeholder="Tiêu Đề"
            disabled
            label="Tiêu Đề"
            name="title"
          />
          <div className="w-full h-fit mb-3 z-1">
            <label className="text-black font-bold font-customFont ">
              {'Thời Gian Bắt Đầu - Kết Thúc'}
            </label>
            <Form.Item
              className={'mt-4'}
              name={'surveyTime'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thời gian bắt đầu - kết thúc',
                },
              ]}
            >
              <RangePicker
                disabled
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']}
                className={`  font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                onBlur={() => {}}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      header={'Xem Chi Tiết Điểm Danh'}
      label={'Điểm Danh'}
      dataItem={item}
      name={item}
      FormItem={<FormItem />}
      form={form}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      width={900}
      showButton={true}
    />
  );
}
