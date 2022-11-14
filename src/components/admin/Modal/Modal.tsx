import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

import { Input, Form, message } from 'antd';

import CustomButton from '../../../components/admin/Button';

import { IoClose } from 'react-icons/io5';
import { dismissType } from '@material-tailwind/react/types/generic';
export default function Modal({
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
}) {
  const dismiss: dismissType = {
    outsidePointerDown: !isFocused,
  };
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    form.resetFields();

    const setForm = () => {
      console.log(dataFields);
      form.setFieldsValue(dataFields ? dataFields : dataItem);
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);
  return (
    <Dialog
      dismiss={dismiss}
      className="text-black font-bold"
      open={show}
      handler={handleShow}
    >
      <DialogHeader>
        <div className="flex flex-row w-full justify-between items-center mb-6">
          <p className="font-bold font-customFont text-2xl text-black">
            {header ? header : dataItem ? `Sửa ${label}` : `Thêm ${label}`}
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
          <div className=" mb-6 flex flex-row justify-evenly w-full">
            <CustomButton
              size="md"
              onClick={() => handleOk()}
              fullWidth={true}
              className="mx-2"
              noIcon={true}
              text={header ? header : !dataItem ? 'Thêm' : 'Sửa'}
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
        </DialogFooter>
      </Form>
    </Dialog>
  );
}
