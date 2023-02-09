import React, { useState, useEffect } from 'react';
import CustomButton from '../../../../components/admin/Button';
import { DatePicker, Form, notification } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import CustomModal from '../../../../components/admin/Modal/Modal';
import apiService from '../../../../api/apiService';
import { errorText } from '../../../../helper/constant';
import StartEndDatePicker from '../../../../components/admin/StartEndDatePicker';
import { Moment } from 'moment';
import { useAppSelector } from '../../../../hook/useRedux';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function AddSurvey({
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
  const [showDetail, setShowDetail] = useState(false);
  const [dates, setDates] = useState(null);
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    form.setFieldsValue(item);
  }, []);

  const FormItem = () => {
    return (
      <div className="flex flex-col justify-around w-full">
        <FormInput
          label="Tên khảo sát"
          name="title"
          placeholder="Khảo sát"
          rules={[
            { required: true, message: 'Vui lòng nhập vào tên khảo sát' },

            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            // {
            //   pattern: new RegExp(/^.{1,50}$/),
            //   message: 'Đạt tối đa số lượng ký tự cho phép',
            // },
          ]}
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
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              className={`  font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              onBlur={() => {}}
            />
          </Form.Item>
        </div>
      </div>
    );
  };
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      if (item) {
        await apiService.updateSurvey(item.surveyId, {
          accountIdCreate: info?.accountId,
          title: values.title,
          startDate: moment(values.surveyTime[0]).toISOString(),
          endDate: moment(values.surveyTime[1]).toISOString(),
        });
        setVisible(false);
        notification.success({ message: 'Thay đổi thành công' });
        setConfirmLoading(true);
        form.resetFields();
      } else {
        await apiService.addSurvey({
          accountIdCreate: info?.accountId,
          title: values.title,
          startDate: moment(values.surveyTime[0]).toISOString(),
          endDate: moment(values.surveyTime[1]).toISOString(),
        });
        setVisible(false);
        notification.success({ message: 'Thêm thành công' });
        setConfirmLoading(true);
        form.resetFields();
      }
    });

    setTimeout(() => {
      setConfirmLoading(false);
    }, 500);
  };
  return (
    <CustomModal
      show={visible}
      handleOk={handelOk}
      setShow={setVisible}
      dataItem={item}
      label={'Khảo sát'}
      name={item}
      FormItem={<FormItem />}
      form={form}
      header={showDetail ? 'Thêm' : 'Sửa'}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    />
  );
}
