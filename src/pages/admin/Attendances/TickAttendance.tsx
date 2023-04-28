import React, { useEffect, useState } from 'react';
import { Form, Modal, Select, notification } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import { QrReader } from 'react-qr-reader';
import { Tabs } from 'antd';
import apiService from '../../../api/apiService';
import './index.css';
import CustomButton from '../../../components/admin/Button';
import { errorText } from '../../../helper/constant';
import { useAppDispatch } from '../../../hook/useRedux';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function TickAttendance({
  item,
  setItem,
  visible,
  setVisible,
}: {
  item: any;
  setItem: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [dataQrCode, setDataQrCode]: any = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const items: any['items'] = [
    {
      key: 'Email',
      label: `Email`,
      children: <RenderEmail />,
    },
    // {
    //   key: 'Điểm danh tất cả',
    //   label: `Tất cả`,
    //   children: <button onClick={() => approveAll()}>all</button>,
    // },
    {
      key: 'Code',
      label: `QR Code`,
      children: <RenderCode />,
    },
  ];
  const [listLearner, setListLearner] = useState([]);
  // function approveAll() {
  //   let promises = listLearner.map((learner) => {
  //     const params = {
  //       email: learner.email,
  //       attendanceId: item.attendance.id,
  //     };
  //     return apiService.AttdendanceEmail(params);
  //   });
  //   Promise.all(promises);
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await apiService.getNotAttendance(
          item?.attendance.id,
        );

        const res: any = await apiService.getAttendanceId(item?.attendance?.id);

        let resArr = res.accountAttendances.map((item: any) => {
          return {
            account: item.account,
            isAttending: true,
          };
        });
        let newArr = response.map((item: any) => {
          return {
            account: item,
            isAttending: false,
          };
        });
        let final: any = [...newArr, ...resArr];
        final = final.map((item: any, index: number) => {
          return {
            index: index + 1,

            ...item.account,
          };
        });
        console.log(final);
        setListLearner(final);
      } catch (err) {}
    };
    fetchData();
  }, []);
  const onChange = (key: string) => {
    console.log(key);
  };
  function RenderEmail() {
    return (
      <>
        {' '}
        <Form form={form}>
          <label>Nhập Email</label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Vào Email',
              },
              // {
              //   pattern: new RegExp(
              //     /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/,
              //   ),
              //   message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU',
              // },

              // {
              //   pattern: new RegExp(
              //     /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/,
              //   ),
              //   message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU ',
              // },
              {
                pattern: new RegExp(/^\w/),
                message: errorText.email,
              },
              {
                pattern: new RegExp(/^(?!\s*$|\s).*$/),
                message: errorText.space,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn Người Học"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listLearner?.map((item: any) => ({
                value: item.accountId,
                label: item.email,
              }))}
            />
          </Form.Item>
        </Form>
        <div className=" mt-20 mb-4 flex flex-row justify-evenly w-full">
          <CustomButton
            size="md"
            fullWidth={true}
            noIcon={true}
            type="cancel"
            color="blue-gray"
            onClick={() => handelCancel()}
            text="Đóng"
          />
          <CustomButton
            size="md"
            onClick={() => handleOk()}
            fullWidth={true}
            className="mx-2"
            noIcon={true}
            color="blue-gray"
            text="Lưu"
          />
        </div>
      </>
    );
  }
  // function RenderMSNV() {
  //   return (
  //     <>
  //       {' '}
  //       <Form form={form}>
  //         <Form.Item
  //           name="email"
  //           rules={[
  //             {
  //               required: true,
  //               message: 'Vui Lòng Nhập Vào Email',
  //             },

  //             {
  //               pattern: new RegExp(/^(?!\s*$|\s).*$/),
  //               message: errorText.space,
  //             },
  //           ]}
  //         >
  //           <Select
  //             showSearch
  //             placeholder="Chọn Người Học"
  //             optionFilterProp="children"
  //             filterOption={(input: any, option: any) =>
  //               (option?.label ?? '')
  //                 .toLowerCase()
  //                 .includes(input.toLowerCase())
  //             }
  //             options={listLearner?.map((item: any) => ({
  //               value: item.accountId,
  //               label: item.email,
  //             }))}
  //           />
  //         </Form.Item>
  //       </Form>
  //       <div className=" mt-20 mb-4 flex flex-row justify-evenly w-full">
  //         <CustomButton
  //           size="md"
  //           fullWidth={true}
  //           noIcon={true}
  //           type="cancel"
  //           color="blue-gray"
  //           onClick={() => handelCancel()}
  //           text="Đóng"
  //         />
  //         <CustomButton
  //           size="md"
  //           onClick={() => handleOk()}
  //           fullWidth={true}
  //           className="mx-2"
  //           noIcon={true}
  //           color="blue-gray"
  //           text="Lưu"
  //         />
  //       </div>
  //     </>
  //   );
  // }
  // function RenderBar() {
  //   return (
  //     <>
  //       <BarcodeScannerComponent
  //         delay={1000}
  //         onUpdate={(error: any, result: any) => {
  //           if (result) {
  //             // notification.success({ message: result?.text });
  //             if (result) {
  //               // && dataQrCode == ''

  //               setDataQrCode(result?.text);
  //             }
  //             //   setInterval(async () => {

  //             // }, 3000);
  //           }
  //         }}
  //       />
  //       {/* {dataQrCode ? <p>Kết Quả Mã QR: {dataQrCode}</p> : null} */}
  //       <div className=" mt-4 mb-4 flex flex-row justify-evenly w-full">
  //         <CustomButton
  //           size="md"
  //           fullWidth={true}
  //           noIcon={true}
  //           type="cancel"
  //           color="blue-gray"
  //           onClick={() => handelCancel()}
  //           text="Đóng"
  //         />
  //         {/* <CustomButton
  //           size="md"
  //           onClick={() => handleQr()}
  //           fullWidth={true}
  //           className="mx-2"
  //           noIcon={true}
  //           color="blue-gray"
  //           text="Gửi mã code"
  //         /> */}
  //       </div>
  //     </>
  //   );
  // }
  function RenderCode() {
    return (
      <>
        <QrReader
          scanDelay={500}
          onResult={(result: any, error: any) => {
            if (!!result) {
              // notification.success({ message: result?.text });
              if (result && dataQrCode == '') {
                setTimeout(async () => {
                  handleQr(result);
                }, 1000);
              }
              //   setInterval(async () => {

              // }, 3000);
            }
          }}
          constraints={{
            facingMode: 'environment',
          }}
        />
        {dataQrCode ? <p>Kết Quả Mã QR: {dataQrCode}</p> : null}
        <div className=" mt-4 mb-4 flex flex-row justify-evenly w-full">
          <CustomButton
            size="md"
            fullWidth={true}
            noIcon={true}
            type="cancel"
            color="blue-gray"
            onClick={() => handelCancel()}
            text="Đóng"
          />
          {/* <CustomButton
            size="md"
            onClick={() => handleQr()}
            fullWidth={true}
            className="mx-2"
            noIcon={true}
            color="blue-gray"
            text="Gửi mã code"
          /> */}
        </div>
      </>
    );
  }
  // useEffect(() => {
  //   let time = setTimeout(async () => {
  //     handleQr();
  //   }, 1000);
  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, [dataQrCode !== '']);
  const handleQr = async (code: string) => {
    try {
      if (code) {
        const params = {
          code: dataQrCode,
          // attendanceId: item.attendance.id,
        };

        let res = await apiService.AttdendanceCode(params);
        res &&
          notification.success({
            message: `Điểm danh thành công: ${dataQrCode.toString()} `,
          });
      }
      // setVisible(false);
      // console.count('1');
    } catch (error) {
      // setVisible(false);

      notification.error({
        message: `Điểm danh không thành công: ${dataQrCode.toString()} `,
      });
    }
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        setConfirmLoading(true);
        if (values.email) {
          const params = {
            email: values.email,
            attendanceId: item.attendance.id,
          };
          await apiService.AttdendanceEmail(params);
          notification.success({ message: 'Điểm Danh thành công' });
        }

        // setVisible(false);
        setConfirmLoading(false);
        setDataQrCode('');
      } catch (error) {
        // setVisible(false);
        setConfirmLoading(false);
        setDataQrCode('');
        notification.error({ message: 'Điểm Danh không thành công' });
      }
      form.resetFields();
    });
  };

  const handelCancel = () => {
    form.resetFields();
    setVisible(false);
    setConfirmLoading(false);
    setDataQrCode('');
  };
  return (
    <Modal
      title="Điểm Danh"
      open={visible}
      onOk={handleOk}
      onCancel={handelCancel}
      confirmLoading={confirmLoading}
      footer={<></>}
    >
      <Tabs defaultActiveKey="Email" items={items} onChange={onChange} />
    </Modal>
  );
}
