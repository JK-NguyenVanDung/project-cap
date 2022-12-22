import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

import { Input, Form, Modal, ModalProps, FormProps } from 'antd';

import CustomButton from '../../../components/admin/Button';
import { IoClose } from 'react-icons/io5';
import { dismissType } from '@material-tailwind/react/types/generic';
export default function CustomModal({
  show,
  setShow,
  dataItem = null,
  label,
  handleOk,
  FormItem,
  dataFields,
  form,
  isFocused = true,
  header,
  showDetail,
  setShowDetail,
  centered = true,
  width,
  showButton,
  confirmLoading,
  initialValues,
  ModalProps,
  formProps,
  buttonText,
}: {
  handleOk?: any;
  name?: any;
  label?: string;
  dataItem?: any;
  show?: boolean;
  setShow?: (show: boolean) => void;
  FormItem?: React.ComponentProps<any>;
  dataFields?: any;
  form?: any;
  isFocused?: boolean;
  header?: string;
  showDetail?: boolean;
  setShowDetail?: Function;
  centered?: boolean;
  width?: number | string;
  confirmLoading?: boolean;
  buttonText?: string;
  showButton?: boolean;
  initialValues?: any;
  ModalProps?: ModalProps;
  formProps?: FormProps;
}) {
  const dismiss: dismissType = {
    outsidePointerDown: !isFocused,
  };
  const handleShow = () => {
    setShowDetail && setShowDetail(false);
    setShow(!show);
  };
  useEffect(() => {
    form?.resetFields();

    const setForm = () => {
      form?.setFieldsValue(dataItem ? dataItem : dataFields);
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);
  return (
    <Modal
      className="text-black font-bold w-full"
      title={
        <p className="font-bold mt-1 font-customFont text-xl text-black">
          {!dataItem ? `Thêm ${label}` : header ? header : `Sửa ${label}`}
        </p>
      }
      style={{ top: 20 }}
      open={show}
      onCancel={handleShow}
      onOk={handleShow}
      centered={centered}
      width={width}
      confirmLoading={confirmLoading}
      footer={
        !showDetail && (
          <div className=" my-5 flex flex-row justify-evenly w-full">
            <CustomButton
              size="md"
              fullWidth={true}
              noIcon={true}
              type="cancel"
              color="blue-gray"
              onClick={handleShow}
            />
            {showButton ? null : (
              <CustomButton
                size="md"
                onClick={() => handleOk()}
                fullWidth={true}
                className="mx-2"
                noIcon={true}
                color="blue-gray"
                text={
                  !dataItem
                    ? `Lưu`
                    : buttonText
                    ? buttonText
                    : header
                    ? header
                    : 'Lưu'
                }
              />
            )}
          </div>
        )
      }
      {...ModalProps}
    >
      {/* <DialogHeader>
        <div className="flex flex-row w-full justify-between items-center mb-6">
          <p className="font-bold font-customFont text-2xl text-black">
          </p>
          <IconButton
            variant="text"
            className="text-black"
            onClick={handleShow}
          >
            <IoClose className="text-xl" />
          </IconButton>
        </div>
      </DialogHeader> */}
      <Form
        initialValues={initialValues}
        form={form}
        className="formCategory w-full"
        {...formProps}
      >
        <div className=" w-full px-8 flex flex-col  justify-evenly">
          {FormItem}
        </div>
      </Form>
    </Modal>
  );
}
{
  /* <Dialog
      dismiss={dismiss}
      className="text-black font-bold w-full"
      open={show}
      handler={handleShow}
    >
      <DialogHeader>
        <div className="flex flex-row w-full justify-between items-center mb-6">
          <p className="font-bold font-customFont text-2xl text-black">
            {!dataItem ? `Thêm ${label}` : header ? header : `Sửa ${label}`}
          </p>
          <IconButton
            variant="text"
            className="text-black"
            onClick={handleShow}
          >
            <IoClose className="text-xl" />
          </IconButton>
        </div>
      </DialogHeader>
      <Form form={form} className="formCategory w-full">
        <DialogBody>
          <div className=" w-full px-8 flex flex-col  justify-evenly">
            {FormItem}
          </div>
        </DialogBody>
        <DialogFooter>
          {!showDetail && (
            <div className=" mb-6 flex flex-row justify-evenly w-full">
              <CustomButton
                size="md"
                onClick={() => handleOk()}
                fullWidth={true}
                className="mx-2"
                noIcon={true}
                text={!dataItem ? `Thêm` : header ? header : 'Sửa'}
              />

              <CustomButton
                size="md"
                fullWidth={true}
                noIcon={true}
                type="cancel"
                color="blue"
                onClick={handleShow}
              />
            </div>
          )}
        </DialogFooter>
      </Form>
    </Dialog> */
}
