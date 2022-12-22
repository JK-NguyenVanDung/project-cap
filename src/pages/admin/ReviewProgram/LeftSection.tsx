import { Form, message, notification, Select, Table } from 'antd';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import FormInput from '../../../components/admin/Modal/FormInput';
import CustomModal from '../../../components/admin/Modal/Modal';
import AddReviewer from '../../../components/admin/Review/AddReviewer';
import ReviewHistory from '../../../components/admin/Review/ReviewHistory';
import { errorText, GIRD12 } from '../../../helper/constant';
import { useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, IProgramItem } from '../../../Type';

const LeftSection = () => {
  const [showAddReviewerModal, setShowAddReviewerModal] = useState(false);

  const [showDeclinedModal, setShowDeclinedModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [detail, setDetail] = useState({});
  const [history, setHistory] = useState([
    {
      index: 1,
      reviewer: 'Dung',
      comment: 'Không tốt',
      reviewTime: '11:02 12/2/2023',
    },
  ]);
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const info: IAccountItem = useAppSelector((state) => state.auth.info);
  useEffect(() => {
    let time = setTimeout(async () => {
      // await getData();
    }, 100);
    return () => {
      clearTimeout(time);
    };
  }, [program]);

  const approve = async () => {
    await handleOk(true);

    setTimeout(() => {
      navigate(-1);
    }, 500);
    notification.success({
      message: 'Duyệt thành công',
    });
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
            message: 'Vui Lòng Nhập bình luận',
          },
        ]}
      />
    );
  };
  const handleOk = async (approved: boolean) => {
    form
      .validateFields()
      .then(async (values) => {
        if (values) {
          await apiService.setApproval({
            programId: program.programId,
            accountId: info.accountId,
            approved: approved,
            comment: values?.comment ? values?.comment : null,
            approvalDate: moment().local(),
          });
          setShowDeclinedModal(false);
          !approved &&
            notification.success({
              message: 'Thêm thành công',
            });
          form.resetFields();
        } else {
          setShowDeclinedModal(false);

          notification.error({
            message: 'Thêm không thành công',
          });
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())
      });
  };

  return (
    <div className="fixed shadow-md rounded-xl w-[15%] text-black bg-white h-fit m-4  p-4 pl-4 border flex flex-col justify-start items-center">
      <p className="border-b-2  text-2xl text-center text-primary border-primary border-opacity-20 text-bold">
        PHÊ DUYỆT KHOÁ HỌC
      </p>
      <CustomModal
        width={'50%'}
        show={showDeclinedModal}
        handleOk={() => handleOk(false)}
        setShow={setShowDeclinedModal}
        dataItem={detail}
        label={''}
        name={detail}
        FormItem={<DeclinedFI />}
        form={form}
        header={'Nhập lý do từ chối'}
      />
      <ReviewHistory
        show={showHistoryModal}
        programId={program?.programId}
        setShow={setShowHistoryModal}
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
