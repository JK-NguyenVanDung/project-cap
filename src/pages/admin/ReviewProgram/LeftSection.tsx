import { Form, notification, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText, GIRD12 } from '../../../helper/constant';
import { useAppSelector } from '../../../hook/useRedux';

const LeftSection = () => {
  const [showAddReviewerModal, setShowAddReviewerModal] = useState(false);

  const [showDeclinedModal, setShowDeclinedModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const program: any = useAppSelector((state) => state.form.setProgram);
  useEffect(() => {}, [program]);
  const [detail, setDetail] = useState({});
  const [history, setHistory] = useState([
    {
      index: 1,
      reviewer: 'Dung',
      comment: 'Không tốt',
      reviewTime: '11:02 12/2/2023',
    },
  ]);

  const approve = () => {
    notification.success({ message: 'Duyệt thành công' });

    setTimeout(() => {
      navigate(-1);
    }, 500);
  };
  const goBack = () => {
    navigate(-1);
  };
  const [form] = Form.useForm();

  const handleOk = () => {};

  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL1,
    },
    {
      title: 'Người duyệt',
      dataIndex: 'reviewer',
      key: 'reviewer',
      width: GIRD12.COL2,
    },
    {
      title: 'Bình luận',
      dataIndex: 'comment',
    },
    {
      title: 'Thời gian duyệt',
      dataIndex: 'reviewTime',
      width: GIRD12.COL3,
    },
  ];

  const HistoryFI = () => {
    return (
      <>
        <Table
          loading={loading}
          className="tableContainer shadow-lg rounded-lg border-1"
          dataSource={history}
          columns={columns}
        />
      </>
    );
  };
  const DeclinedFI = () => {
    return (
      <FormInput
        name="comment"
        type="textArea"
        label="Bình luận"
        areaHeight={10}
        rules={[
          {
            required: true,
            message: 'Vui Lòng Chọn Vai trò',
          },
        ]}
      />
    );
  };
  const AddReviewerFI = () => {
    return (
      <div className="w-full mb-3 z-1">
        <label className="text-black font-bold font-customFont  ">
          Tên Người Duyệt
        </label>
        <Form.Item
          name="reviewerName"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Tên Người Duyệt',
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: '100%', marginTop: 20 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input: string, option: any) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA: any, optionB: any) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Not Identified',
              },
              {
                value: '2',
                label: 'Closed',
              },
              {
                value: '3',
                label: 'Communicated',
              },
              {
                value: '4',
                label: 'Identified',
              },
              {
                value: '5',
                label: 'Resolved',
              },
              {
                value: '6',
                label: 'Cancelled',
              },
            ]}
          />
        </Form.Item>
      </div>
    );
  };
  return (
    <div className="fixed shadow-md rounded-xl w-[15%] text-black bg-white h-fit m-4  p-4 pl-4 border flex flex-col justify-start items-center">
      <p className="border-b-2  text-2xl text-center text-primary border-primary border-opacity-20 text-bold">
        PHÊ DUYỆT KHOÁ HỌC
      </p>
      <CustomModal
        show={showAddReviewerModal}
        handleOk={handleOk}
        setShow={setShowAddReviewerModal}
        dataItem={detail}
        label={'Người Duyệt'}
        name={detail}
        FormItem={<AddReviewerFI />}
        form={form}
        header={'Thêm Người Duyệt'}
      />
      <CustomModal
        width={'50%'}
        show={showDeclinedModal}
        handleOk={handleOk}
        setShow={setShowDeclinedModal}
        dataItem={detail}
        label={''}
        name={detail}
        FormItem={<DeclinedFI />}
        form={form}
        header={'Nhập lý do từ chối'}
      />
      <CustomModal
        width={'64%'}
        show={showHistoryModal}
        handleOk={handleOk}
        setShow={setShowHistoryModal}
        dataItem={detail}
        name={detail}
        FormItem={<HistoryFI />}
        form={form}
        header={'Lịch sử '}
        showDetail
      />
      <CustomButton
        noIcon
        color="blue-gray"
        text="Lịch sử duyệt"
        className="mb-4 mt-8 w-full h-10"
        onClick={() => setShowHistoryModal(!showHistoryModal)}
      />
      <CustomButton
        noIcon
        color="green"
        text="Thêm người duyệt"
        className="mb-4 w-full h-10"
        onClick={() => setShowAddReviewerModal(!showAddReviewerModal)}
      />{' '}
      <CustomButton
        noIcon
        color="blue"
        text="Duyệt"
        className="mb-4 w-full h-10"
        onClick={() => approve()}
      />{' '}
      <CustomButton
        noIcon
        color="red"
        text="Từ chối"
        className="mb-4 w-full h-10"
        onClick={() => setShowDeclinedModal(!showDeclinedModal)}
      />
      <CustomButton
        noIcon
        color="blue"
        variant={'outlined'}
        text="Quay lại"
        className="mb-12 w-full h-10"
        onClick={() => goBack()}
      />
    </div>
  );
};

export default LeftSection;
