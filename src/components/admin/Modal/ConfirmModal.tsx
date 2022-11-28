import { Modal } from 'antd';
import CustomButton from '../Button';
import React from 'react';
const ConfirmModal = ({
  show,
  setShow,
  handler,
  children,
  title,
}: {
  show: boolean;
  setShow: Function;
  handler: () => void;

  children: any;
  title?: string;
}) => {
  const handleOk = () => {
    setShow(false);
    handler();
  };
  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        title={
          <p className="font-customFont text-lg font-semibold mt-1">
            {`Xác nhận xoá ${title}?`}
          </p>
        }
        open={show}
        centered
        onCancel={handleCancel}
        footer={[
          <div className="flex justify-end my-2">
            <CustomButton
              text="Quay lại"
              size="md"
              color="red"
              variant="outlined"
              className="w-32 mr-4"
              noIcon
              key="back"
              onClick={handleCancel}
            />
            <CustomButton
              text="Xác nhận"
              size="md"
              color="red"
              className="w-32 mr-4"
              key="submit"
              noIcon
              onClick={handleOk}
            />
          </div>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
export default ConfirmModal;
