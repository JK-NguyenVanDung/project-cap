import React, { useState, useEffect } from 'react';
import { Form, notification, Image } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import CustomModal from '../../../../components/admin/Modal/Modal';
import { API_URL } from '../../../../api/api';
import moment from 'moment';

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
        item?.status == 'approved'
          ? 'Đã Được Duyệt'
          : item?.status == 'pending'
          ? 'Chưa Được Duyệt'
          : 'Bị Từ Chối',
    });
    setLoading(true);
    if (item) {
      setLoading(false);
    }
  }, [item, loading]);

  const FormItem = () => {
    return (
      <>
        <div className="flex justify-around">
          <div className="w-full p-6">
            <FormInput
              placeholder="Người Muốn Đổi"
              disabled
              label="Tên Người Muốn Đổi"
              name="exchanger"
            />
            <FormInput
              placeholder="Môn Học Muốn Đổi"
              disabled
              label="Tên Môn Học Muốn Đổi"
              name="program"
            />
            <div className="flex w-full justify-between items-center ">
              <div className="flex justify-start  items-center">
                <FormInput
                  placeholder="Số Coin"
                  disabled
                  label="Số Coin"
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
            <p className="text-base font-thin">
              {!item.reviewDate
                ? `*Ảnh gửi vào lúc ` +
                  moment(item.sentDate).zone(10).format('HH:mm -  DD/MM/YYYY ')
                : `*Ảnh được xem xét vào lúc ` +
                  moment(item.reviewDate)
                    .zone(10)
                    .format('HH:mm -  DD/MM/YYYY ') +
                  ' bởi ' +
                  item?.reviewer}
            </p>
          </div>
          <div className="w-full p-6">
            <img
              className="w-full h-full"
              src={`${API_URL}/images/${item.image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
              }}
              alt=""
            />
          </div>
        </div>
        <div className="mx-6">
          <FormInput
            placeholder="Nhận xét"
            disabled
            label="Nhận Xét"
            name="comment"
            type="textArea"
          />
        </div>
      </>
    );
  };
  return (
    <CustomModal
      show={visible}
      setShow={setVisible}
      header={'Chi Tiết Đơn Đổi Coin'}
      label={'Đơn Đăng Ký'}
      dataItem={item}
      name={item}
      FormItem={<FormItem />}
      form={form}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      width={'80%'}
      showButton={true}
    />
  );
}
