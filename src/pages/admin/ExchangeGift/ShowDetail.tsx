import React, { useState, useEffect } from 'react';
import { Form, notification, Image } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';

export default function ShowDetail({
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
  function getComment(item: any) {
    let text = '';
    if (!item) {
      return 'Chưa có nhận xét';
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
  useEffect(() => {
    form.setFieldsValue({
      item,
      commentAndReason: getComment(item),
      programName: item?.program.programName,
      statusProgram:
        item?.program?.status == 'public' ? 'Đang Công Khai' : 'Riêng Tư',
      emailLearner: item?.accountIdLearnerNavigation?.email,
      fullName: item?.accountIdLearnerNavigation?.fullName,
      statusLearner:
        item?.registerStatus == 'Approved'
          ? 'Đã Được Duyệt'
          : item?.registerStatus == 'UnApproved'
          ? 'Chưa Được Duyệt'
          : item?.registerStatus == 'Refuse'
          ? 'Bị Từ Chối'
          : 'Chưa Có Trạng Thái',
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
            placeholder="Chương Trình"
            disabled
            label="Tên Chương Trình"
            name="programName"
          />
          <FormInput
            placeholder="Trạng Thái Chương Trình"
            disabled
            label="Trạng Thái Chương Trình"
            name="statusProgram"
          />
          <FormInput
            placeholder="Nhận xét"
            disabled
            label="Nhận Xét"
            name="commentAndReason"
            type="textArea"
          />
        </div>
        <div className="w-full p-6">
          <FormInput
            placeholder="Email"
            disabled
            label="Email"
            name="emailLearner"
          />
          <FormInput
            placeholder="Họ Và Tên"
            disabled
            label="Họ Và Tên"
            name="fullName"
          />
          <FormInput
            placeholder="Trạng Thái Đơn Đăng Ký"
            disabled
            label="Trạng Thái"
            name="statusLearner"
          />
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      header={'Xem Chi Tiết Đơn Đăng Ký'}
      label={'Đơn Đăng Ký'}
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
