import React, { useEffect, useState } from 'react';
import { Form, message, Input } from 'antd';
import CustomButton from '../../../../components/admin/Button';
import FormInput from '../../../../components/admin/Modal/FormInput';
import apiService from '../../../../api/apiService';
import { errorText } from '../../../../helper/constant';
import { IChapterItem, ITest } from '../../../../Type';
import { useAppDispatch } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';
import RadioGroup from '../../../../components/sharedComponents/RadioGroup';

const ConfirmModal = ({
  show,
  setShow,
  handler,
  children,
  chapterNumber,
}: {
  show: boolean;
  setShow: Function;
  handler: () => void;

  children: any;
  chapterNumber?: number;
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
            {`Xác nhận xoá chương ${chapterNumber}?`}
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

const radioOptions = [
  {
    label: 'Có',
    value: true,
  },
  { label: 'Không', value: false },
];

export default function Test() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [chapter, setChapter] = useState(1);
  const [contentId, setContentId] = useState(1);

  contentId;
  const [showConfirm, setShowConfirm] = useState(false);
  const [data, setData] = useState<ITest>(null);
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onRadioChange = (value: any) => {
    setRadioValue(value);
  };
  function goBack() {
    navigate(`/admin/Program/Chapter/${chapter}`);
  }
  function goQuestion() {
    navigate(`/admin/Program/Chapter/${chapter}/Test/Question`);
  }
  function handleDelete() {
    goBack();
    // try {
    //   // await apiService.removeProgram(item.ProgramId);
    //   message.success(MESSAGE.SUCCESS.DELETE);
    //   navigate(`/admin/Program/${chapter}`);
    // } catch (err: any) {
    //   throw err.message;
    // }
  }

  async function getData() {
    try {
      setLoading(true);
      let res: any = await apiService.getPrograms();

      dispatch(
        actions.formActions.setNameMenu(
          `Chương trình ${res[0].ProgramName && res[0].ProgramName}`,
        ),
      );
      form.resetFields();

      const setForm = () => {
        form.setFieldsValue(data ? data : []);
      };

      if (data) {
        setForm();
      }

      setLoading(false);
    } catch (err: any) {
      throw err.message;
    }
  }

  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Chương trình`));
    getData();
    setChapter(2);
  }, [reload]);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        let output = {
          contentId: contentId,
          contentTitle: values.contentTitle,
          contentDescription: values.contentDescription,
          time: values.time,
          chapter: chapter,
          isRandom: radioValue,
        };
        if (data) {
          // await apiService.editProgram({
          // });
          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
        } else {
          // await apiService.addProgram({});
          // setReload(!reload);
          message.success('Thêm thành công');
          setLoading(false);
          form.resetFields();
        }
      })

      .catch((info) => {
        setLoading(false);
      });
  };
  return (
    <div className="w-full h-screen px-5">
      <ConfirmModal
        show={showConfirm}
        setShow={setShowConfirm}
        handler={() => handleDelete()}
        chapterNumber={chapter}
      >
        <p className="font-customFont text-xl font-[500]">
          Xoá nội dung và bài kiểm tra của chương này{' '}
        </p>
      </ConfirmModal>
      <div className="w-full h-14 flex items-center justify-between border-b mb-8">
        <p className="text-black text-lg font-bold font-customFont">
          Bài kiểm tra chương {chapter}
        </p>
      </div>
      <Form form={form} onFinish={handleOk} className=" w-full ">
        <FormInput
          disabled={false}
          name="contentTitle"
          label="Tên bài kiểm tra"
          rules={[
            {
              required: true,
              message: `Không được để trống tên bài kiểm tra`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />

        <FormInput
          disabled={false}
          type="textArea"
          name="contentDescription"
          label="Mô tả bài kiểm tra"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />

        <FormInput
          disabled={false}
          name="time"
          label="Thời gian làm bài (tính bằng phút)"
          placeholder="Nhập thời gian làm bài"
          rules={[
            {
              required: true,
              message: `Không được để trống thời gian làm bài`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            {
              pattern: new RegExp(/^\d+$/),
              message: 'Thời gian phải thuộc kiểu số nguyên dương',
            },
          ]}
          IconRight={IoTimeOutline}
        />

        <div className="w-full mb-6 z-100">
          <label className="text-black font-bold font-customFont ">
            Ngẫu nhiên hoá câu hỏi
          </label>

          <RadioGroup
            options={radioOptions}
            onChange={onRadioChange}
            value={radioValue}
          />
        </div>
        <div className="w-full mb-6 z-100">
          <p className="text-black font-bold font-customFont ">
            Tổng số câu hỏi
          </p>
          <div className="flex justify-start items-end">
            <Input
              disabled
              type="text"
              className={`mr-4 text-black font-customFont  font-bold min-w-[12rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/5 pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              placeholder={`${
                data ? 'Hiện tại có 10 câu hỏi' : 'Hiện tại chưa có câu hỏi nào'
              }`}
            ></Input>
            <CustomButton
              // disabled={data ? false : true}
              text="Thêm câu hỏi"
              size="md"
              className="pl-2"
              color="green"
              onClick={() => goQuestion()}
            />
          </div>
        </div>
        <Form.Item label="" colon={false}>
          <div className="w-full h-14 flex items-center justify-end mt-8">
            <CustomButton
              text="Quay lại"
              size="md"
              variant="outlined"
              className="w-32 mr-4"
              noIcon
              color="blue-gray"
              onClick={() => goBack()}
            />

            <button
              type="submit"
              className=" hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-gray-500 hover:bg-blue-gray-500 text-white shadow-md shadow-blue-gray-500/20 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-32 false"
              formNoValidate
            >
              <p className="font-customFont  font-semibold">Lưu</p>
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
