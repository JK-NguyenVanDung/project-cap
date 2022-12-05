import React, { useEffect, useState } from 'react';
import { Form, message, Input } from 'antd';
import CustomButton from '../../../../components/admin/Button';
import FormInput from '../../../../components/admin/Modal/FormInput';
import apiService from '../../../../api/apiService';
import { errorText, MESSAGE } from '../../../../helper/constant';
import { IChapterItem, ITest } from '../../../../Type';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';
import RadioGroup from '../../../../components/sharedComponents/RadioGroup';
import { useLocation } from 'react-router-dom';
import ConfirmModal from '../../../../components/admin/Modal/ConfirmModal';
import { Breadcrumb } from '../../../../components/sharedComponents';

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
  const chapter = useAppSelector((state) => state.form.setChapter);
  const location = useLocation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(0);
  const contentId = useAppSelector((state) => state.form.contentId);

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
    dispatch(
      actions.questionActions.setHasQuestion(questionAmount > 0 ? true : false),
    );
    dispatch(actions.questionActions.setChapter(chapter));

    data && dispatch(actions.questionActions.setTestId(data.testId));
    navigate(`/admin/Program/Chapter/${chapter}/Test/Question`);
  }
  async function handleDelete() {
    try {
      await apiService.removeTest(data.testId);
      message.success(MESSAGE.SUCCESS.DELETE);
      navigate(`/admin/Program/Chapter/${chapter}`);
    } catch (err: any) {
      throw err.message;
    }
  }

  async function getData() {
    try {
      setLoading(true);
      // let res: any = await apiService.getPrograms();
      let res: any = await apiService.getTest(Number(contentId));

      let ques: any = await apiService.getQuestions(res.testId);
      setQuestionAmount(ques.length);
      setData(res);

      form.resetFields();
      // res.chapter && setChapter(res.chapter);
      setRadioValue(res.isRandom);
      const setForm = () => {
        form.setFieldsValue(res ? res : []);
      };

      if (res) {
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
    console.log(contentId);
  }, [reload]);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values: ITest) => {
        setLoading(true);
        const temp = [];
        let output = {
          contentId: contentId,
          testTitle: values.testTitle,
          // testDescription: values.,
          time: values.time,
          chapter: chapter,
          isRandom: radioValue,
        };
        if (data) {
          let id = data.testId;
          let res: any = await apiService.editTest({ output: output, id: id });
          setData(res);
          dispatch(actions.formActions.setContentId(res.contentId));

          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
        } else {
          let res: any = await apiService.addTest(output);
          setData(res);
          dispatch(actions.formActions.setContentId(res.contentId));

          setReload(!reload);
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
    <>
      <div className="pl-2 pt-2">
        <Breadcrumb
          router1={'/admin/Program/'}
          name={'Chương Trình'}
          name2={data ? 'Sửa bài kiểm tra' : 'Thêm bài kiểm tra'}
        />
      </div>
      <div className="w-full h-fit px-5 ">
        <ConfirmModal
          show={showConfirm}
          setShow={setShowConfirm}
          handler={() => handleDelete()}
          title={'bài kiểm tra chương ' + chapter?.toString()}
        >
          <p className="font-customFont text-xl font-[500]">
            Xoá bài kiểm tra và các câu hỏi?
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
            name="testTitle"
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

          {/* <FormInput
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
        /> */}

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
                  questionAmount > 0
                    ? `Hiện tại có ${questionAmount} câu hỏi`
                    : 'Hiện tại chưa có câu hỏi nào'
                }`}
              ></Input>
              <CustomButton
                disabled={data ? false : true}
                text={questionAmount > 0 ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}
                size="md"
                className="pl-2"
                color="green"
                onClick={() => goQuestion()}
              />
            </div>
          </div>
          <Form.Item noStyle label="" colon={false}>
            <div className="w-full h-14 flex items-center justify-end mt-12">
              <CustomButton
                text="Quay lại"
                size="md"
                variant="outlined"
                className="w-32 mr-4"
                noIcon
                color="blue-gray"
                onClick={() => goBack()}
              />
              {data && (
                <CustomButton
                  text="Xoá"
                  size="md"
                  className="w-32 mr-4"
                  noIcon
                  color="red"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              )}
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
    </>
  );
}
