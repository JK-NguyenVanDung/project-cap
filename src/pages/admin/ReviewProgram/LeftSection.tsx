import { Form, message, notification, Select, Table } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import AddReviewer from '../../../components/admin/Review/AddReviewer';
import { errorText, GIRD12 } from '../../../helper/constant';
import { useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, IProgramItem } from '../../../Type';

const LeftSection = () => {
  const [showAddReviewerModal, setShowAddReviewerModal] = useState(false);
  const [reviewers, setReviewers] = useState(null);

  const [showDeclinedModal, setShowDeclinedModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );

  useEffect(() => {
    let time = setTimeout(async () => {
      // await getData();
    }, 100);
    return () => {
      clearTimeout(time);
    };
  }, [program]);

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

  return (
    <div className="fixed shadow-md rounded-xl w-[15%] text-black bg-white h-fit m-4  p-4 pl-4 border flex flex-col justify-start items-center">
      <p className="border-b-2  text-2xl text-center text-primary border-primary border-opacity-20 text-bold">
        PHÊ DUYỆT KHOÁ HỌC
      </p>
      <CustomModal
        width={'50%'}
        show={showDeclinedModal}
        handleOk={() => {}}
        setShow={setShowDeclinedModal}
        dataItem={detail}
        label={''}
        name={detail}
        FormItem={<DeclinedFI />}
        form={form}
        header={'Nhập lý do từ chối'}
      />
      <AddReviewer
        show={showAddReviewerModal}
        setShow={setShowAddReviewerModal}
        program={program}
      />
      <History
        showHistoryModal={showHistoryModal}
        detail={detail}
        history={history}
        setShowHistoryModal={setShowHistoryModal}
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

const History = ({
  showHistoryModal,
  setShowHistoryModal,
  history,
  detail,
}: {
  showHistoryModal: boolean;
  setShowHistoryModal: any;
  history: any[];
  detail: any;
}) => {
  const handleOk = () => {};
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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

  return (
    <CustomModal
      width={'64%'}
      show={showHistoryModal}
      handleOk={null}
      setShow={setShowHistoryModal}
      dataItem={detail}
      name={detail}
      FormItem={<HistoryFI />}
      form={form}
      header={'Lịch sử '}
      showDetail
    />
  );
};
export default LeftSection;
