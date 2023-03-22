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
      ...item,

      status:
        item?.status == 'Approved'
          ? 'Đã Được Duyệt'
          : item?.status == 'UnApproved'
          ? 'Chưa Được Duyệt'
          : item?.status == 'Refuse'
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
            placeholder="Người Đổi"
            disabled
            label="Tên Người Đổi"
            name="exchanger"
          />
          <FormInput
            placeholder="Quà muốn đổi"
            disabled
            label="Quà muốn đổi"
            name="gift"
          />
          <div className="flex w-full justify-between items-center ">
            <div className="flex justify-start  items-center">
              <FormInput
                placeholder="Số lượng quà còn lại"
                disabled
                label="Số lượng quà còn lại"
                name="coin"
              />
            </div>
            <div className="flex justify-start  items-center">
              <FormInput
                placeholder="Trạng Thái"
                disabled
                label="Trạng Thái"
                name="status"
              />
            </div>
          </div>
        </div>
        <div className="w-full p-6">
          <FormInput
            placeholder="Số Điện Thoại"
            disabled
            label="Số Điện Thoại"
            name="phone"
          />

          <FormInput
            placeholder="Nhận xét"
            disabled
            label="Nhận Xét"
            name="commentAndReason"
            type="textArea"
          />
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      header={'Xem Chi Tiết Đơn Đổi Quà'}
      label={'Xem Chi Tiết Đơn Đổi Quà'}
      dataItem={item}
      notAdd
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
