import React, { useState, useEffect } from 'react';
import CustomButton from '../../../components/admin/Button';
import { Form, notification } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import apiService from '../../../api/apiService';
export default function DetailAcedemicYear({
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
  setConfirmLoading: (confirmLoading: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    form.setFieldsValue(item);
  }, []);

  const FormItem = () => {
    return (
      <div className="flex justify-around">
        <div>
          <FormInput
            label="Năm Học"
            name="year"
            placeholder="Năm Học"
            rules={[
              { required: true, message: 'Vui lòng nhập vào năm học' },
              {
                pattern: new RegExp(/^(?:[0-9]{4}-[0-9]{4}:?)$/),
                message: 'Xin vui lòng nhập đúng định dạng',
              },
            ]}
          />
        </div>
      </div>
    );
  };
  const handelok = () => {
    form.validateFields().then(async (values) => {
      if (item) {
        await apiService.putAcedemicYear(item.id, values);
        setVisible(false);
        notification.success({ message: 'Thay đổi thành công' });
        setConfirmLoading(!confirmLoading);
        form.resetFields();
      } else {
        await apiService.postAcedemicYear({ year: values.year });
        setVisible(false);
        notification.success({ message: 'Thêm thành công' });
        setConfirmLoading(!confirmLoading);
        form.resetFields();
      }
    });
  };
  return (
    <CustomModal
      show={visible}
      handleOk={handelok}
      setShow={setVisible}
      header={showDetail ? 'Thêm' : 'Sửa'}
      label={'Năm học'}
      dataItem={item}
      name={item}
      FormItem={<FormItem />}
      form={form}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    />
  );
}
