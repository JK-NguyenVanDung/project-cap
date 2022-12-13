import { Form, message, notification, Select, Table } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import { errorText, GIRD12 } from '../../../helper/constant';
import { useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, IProgramItem } from '../../../Type';

const LeftSection = () => {
  const [showAddReviewerModal, setShowAddReviewerModal] = useState(false);
  const [accounts, setAccounts] = useState(null);
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
  useEffect(() => {
    showAddReviewerModal == true && accounts == null && getAccounts();
    getReviewers();
  }, [showAddReviewerModal]);
  async function getReviewers() {
    try {
      let res: any = await apiService.getReviewers();
      const temp = res.map((v: IAccountItem, index: number) => {
        return {
          value: v.accountId,
          label: v.fullName,
        };
      });
      setReviewers(temp);
    } catch (err: any) {
      throw err.message;
    }
  }
  async function getAccounts() {
    try {
      let res: any = await apiService.getAccounts();
      const temp = res.map((v: IAccountItem, index: number) => {
        return {
          value: v.accountId,
          label: v.fullName,
        };
      });
      setAccounts(temp);
    } catch (err: any) {
      throw err.message;
    }
  }
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

  function checkAccountExist(item: number) {
    return reviewers.find((e: any) => e.accountId === item);
  }
  const handleAddReviewer = () => {
    console.log(1);
    form
      .validateFields()
      .then(async (value) => {
        let exist = checkAccountExist(value.reviewerName);
        console.log(exist);
        if (!exist) {
          await apiService.addReviewer({
            accountId: value.reviewerName,
            programId: program?.programId,
          });
          setShowAddReviewerModal(false);
          notification.success({ message: 'Thêm thành công' });
          setLoading(!loading);
          form.resetFields();
        } else {
          message.error('Tài khoản này đã nằm trong danh sách người duyệt');
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };

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
  const columnsReviewer = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL1,
    },
    {
      title: 'Người duyệt',
      dataIndex: 'reviewer',
      key: 'reviewer',
    },
  ];

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
            options={accounts}
          />
        </Form.Item>
        <label className="text-black font-bold font-customFont   ">
          Danh sách người duyệt
        </label>
        <Table
          loading={loading}
          className="tableContainer shadow-lg rounded-lg border-1 mt-4"
          dataSource={reviewers}
          columns={columnsReviewer}
        />
      </div>
    );
  };
  return (
    <div className="fixed shadow-md rounded-xl w-[15%] text-black bg-white h-fit m-4  p-4 pl-4 border flex flex-col justify-start items-center">
      <p className="border-b-2  text-2xl text-center text-primary border-primary border-opacity-20 text-bold">
        PHÊ DUYỆT KHOÁ HỌC
      </p>
      <CustomModal
        width={'50%'}
        show={showAddReviewerModal}
        handleOk={handleAddReviewer}
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
        handleOk={() => {}}
        setShow={setShowDeclinedModal}
        dataItem={detail}
        label={''}
        name={detail}
        FormItem={<DeclinedFI />}
        form={form}
        header={'Nhập lý do từ chối'}
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
