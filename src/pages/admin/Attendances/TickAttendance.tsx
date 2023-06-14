import { useEffect, useState } from 'react';
import { Form, Modal, notification, AutoComplete } from 'antd';
import { QrReader } from 'react-qr-reader';
import { Tabs } from 'antd';
import apiService from '../../../api/apiService';
import './index.css';
import CustomButton from '../../../components/admin/Button';
import { errorText } from '../../../helper/constant';
import axios from 'axios';
import { API_CONFIG, API_URL } from '../../../api/api';
import queryString from 'query-string';
export default function TickAttendance({
  item,
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

    {
      key: 'Code',
      label: `QR Code`,
      children: <RenderCode />,
    },
  ];
  const [listLearner, setListLearner] = useState([]);

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
    return () => {
      setDataQrCode('');
    };
  }, []);
  const onChange = (key: string) => {
    console.log(key);
  };

  function RenderEmail() {
    return (
      <>
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
            <AutoComplete
              options={listLearner?.map((item: any) => ({
                value: item.email,
                label: item.email,
              }))}
              style={{ marginTop: 10 }}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              placeholder="Nhập Email Người Học"
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

  function RenderCode() {
    return (
      <>
        <QrReader
          scanDelay={500}
          onResult={(result: any, error: any) => {
            if (!!result) {
              // notification.success({ message: result?.text });
              let newQR = dataQrCode !== result.text;
              if (newQR) {
                handleQr(result.text);
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
    if (code) {
      setDataQrCode((prevCode: string) =>
        prevCode !== code ? code : prevCode,
      );

      const params = {
        code: code,
        // attendanceId: item.attendance.id,
      };

      await axios
        .create({
          baseURL: API_URL,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
          },
          paramsSerializer: {
            encode: (params) => {
              queryString.stringify(params);
            },
          },
        })
        .post(API_CONFIG.ATTENDANCES.ATTENDANCES_CODE, params)
        .then(() => {
          alert(`Điểm danh Thành Công: ${code.toString()} `);
        })
        .catch((err) => {
          if (err?.response?.data?.message !== 'QRCode InValid') {
            alert(`Người Này Đã Điểm Danh Rồi`);
          } else {
            alert(`Mã QR Không Hợp Lệ`);
          }
        });
    }
    // console.count('1');
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
          notification.success({ message: 'Điểm Danh Thành Công' });
        }

        // setVisible(false);
        setConfirmLoading(false);
        setDataQrCode('');
      } catch (error: any) {
        // setVisible(false);
        setConfirmLoading(false);
        if (error === 'Request failed with status code 400') {
          notification.error({ message: 'Người Này Đã Điểm Danh Rồi' });
        } else {
          notification.error({ message: 'Điểm Danh Không Thành Công' });
        }
      }

      form.resetFields();
    });

    setDataQrCode('');
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
