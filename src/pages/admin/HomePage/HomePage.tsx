import React, { useEffect, useRef, useState } from 'react';
import apiService from '../../../api/apiService';
import { Form, notification, Select, Modal } from 'antd';
import videoBackground from '../../../assets/video/background.mp4';
import logo from '../../../assets/img/VLU_Full_Logo.png';

import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomButton from '../../../components/admin/Button';

const kindWords = [
  'Không phát hiện ra sai lầm thì sẽ mãi chìm đắm trong sai lầm và đi lạc phương hướng chẳng thể chạm đến quang vinh.',
  'Có sự tin tưởng là bạn đã chính là người thắng lợi, người có niềm tin sẽ làm những việc nhỏ bé trở thành vĩ đại, khiến những điều tầm thường trở thành kỳ tích.',
  'Thành công sẽ không bao giờ từ chối những con người dám nghĩ dám làm. Tôi tin bạn sẽ làm được tốt hơn thế.',
  'Đủ nghị lực thành công sẽ đến. Đủ mạnh mẽ để bước tới tương lai tươi sáng đang rộng mở chào đón bạn đấy.',
  ' Người thành công là người luôn tự tin đi tìm kiếm cơ hội cho mình, cơ hội này mất đi thì hãy mạnh mẽ đứng dậy bước tiếp.',
  'Ý chí sinh ra nghị lực, nghị lực sinh ra sức mạnh, sức mạnh làm nên thành công. Bạn hãy vững tin vào bản thân và mọi chuyện rồi sẽ tốt đẹp.',
  'Hạnh phúc không tùy thuộc bạn là ai, bạn được làm gì mà tùy thuộc bạn suy nghĩ như thế nào.',
  ' Đừng nên oán giận hay căm phẫn những chuyện không vui hay buồn phiền lại ập đến với mình, đến một lúc nào đó bạn sẽ thấy biết ơn và trân trọng chúng.',
];

export default function Dashboard() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataFct, setDataFct]: any = useState([]);
  const [positons, setPositons]: any = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getPositions();
    getFacuties();
    fetchInfo();
  }, []);
  const getPositions = async () => {
    const reponse = await apiService.getPositions();
    if (reponse) {
      setPositons(reponse);
    }
  };
  const getFacuties = async () => {
    const reponse = await apiService.getFaculties();
    if (reponse) {
      setDataFct(reponse);
    }
  };
  const fetchInfo = async () => {
    const response: any = await apiService.getProfile();
    const { roleId } = response;
    const { code } = response;
    if (!code) {
      setVisible(true);
    }
    if (roleId == 1) {
      navigate('/home');
      notification.error({ message: 'Đăng Nhập Không Thành Công' });
    }
  };
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const data: any = await apiService.infoAccount(values);
        if (data) {
          setVisible(false);
          notification.success({ message: 'Cập Nhật Thông Tin Thành Công' });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div className="">
      <Modal
        open={visible}
        title="Cập Nhật Thông tin Người Dùng"
        footer={
          <div className=" my-5 flex flex-row justify-evenly w-full">
            <CustomButton
              size="md"
              fullWidth={true}
              noIcon={true}
              type="add"
              color="blue-gray"
              onClick={() => handelOk()}
              text="Lưu"
            />
          </div>
        }
      >
        <Form
          form={form}
          initialValues={{
            midifier: 'public',
          }}
        >
          <div className="w-full bg-white rounded-3xl px-4 flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-2xl mb-10">
              Thông Tin Của Bạn
            </h1>
            <FormInput
              className="w-full"
              name="address"
              label="Địa Chỉ"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Chức Vụ',
                },
              ]}
            />
            <FormInput
              className="w-full"
              name="phoneNumber"
              label="Số Điện Thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Số Điện Thoại',
                },
              ]}
            />
            <FormInput
              className="w-full"
              name="code"
              label="Mã Số Sinh Viên"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Mã Số Sinh Viên',
                },
              ]}
            />
            <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
              Chức Vụ Của Bạn
            </label>
            <Form.Item
              className="w-full "
              name="positionId"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Chức Vụ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn Chức Vụ"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={positons.map((item: any) => ({
                  value: item.positionId,
                  label: item.positionName,
                }))}
              />
            </Form.Item>
            <label className="text-start w-full mb-4 text-black font-bold font-customFont">
              Phòng/Khoa
            </label>
            <Form.Item
              className="w-full "
              name="facultyId"
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Vào Phòng/Khoa',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn Phòng/Khoa"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataFct.map((item: any) => ({
                  value: item.facultyId,
                  label: item.facultyName,
                }))}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Welcome />
    </div>
  );
}

export function Welcome() {
  const videoRef = useRef(null);

  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.8;
  };
  return (
    <div className="bg-slate-500 max-sm:bg-gray-900 max-sm:w-fit ">
      <div className="">
        <div className="overlay bg-dark-red" />
        <video
          style={{
            height: '100vh',
            width: '100%',
            objectFit: 'cover',
          }}
          src={videoBackground}
          autoPlay
          muted
          loop
          onCanPlay={() => setPlayBack()}
          id="myVideo"
          ref={videoRef}
          className="max-sm:hidden bg-red-100"
        />
      </div>
      <main className="fixed max-sm:relative w-full h-full top-0 place-content-center items-center flex flex-col">
        <h1 className="text-[#fff] uppercase font-bold text-center max-sm:text-3xl text-5xl mb-10 mt-10">
          <img src={logo} />
          <p className="mt-8 ">VLG Training</p>
        </h1>
        <p className="mt-4 text-2xl max-w-[50%] text-center">
          {kindWords[getRandomArbitrary(0, kindWords.length - 1)]}
        </p>
        <div className="flex justify-center max-sm:flex-col w-full max-sm:items-center"></div>
        <div className=" container mx-auto px-6">
          <div className="mt-16 z- flex flex-col items-center">
            <div className="sm:w-2/3 max-sm:w-fit text-center py-6">
              <p className=" text-sm text-white font-bold mb-2">
                © 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
