import React, { useEffect, useState, useRef } from 'react';
import { Form, message, Modal } from 'antd';
import CustomButton from '../../../../components/admin/Button';
import FormInput from '../../../../components/admin/Modal/FormInput';
import apiService from '../../../../api/apiService';
import { errorText, MESSAGE } from '../../../../helper/constant';
import { IQuestion, IQuestionType } from '../../../../Type';
import { useAppDispatch } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useNavigate } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';

import RadioGroup from '../../../../components/sharedComponents/RadioGroup';
import { TiDelete } from 'react-icons/ti';
import OptionalAnswer from '../../../../components/admin/OptionalAnswer';
import HeaderAdmin from '../../../../components/HeaderAdmin/HeaderAdmin';
import ConfirmModal from '../../../../components/admin/Modal/ConfirmModal';

interface IQuestionOption {
  value: number;
  text: string;
}
const defaultOptions = [
  {
    value: 1,
    text: '',
  },
  { value: 2, text: '' },
  {
    value: 3,
    text: '',
  },
  {
    value: 4,
    text: '',
  },
];
function getChar(c: number) {
  let n = (c + 9).toString(36).toUpperCase();
  return n;
}

export default function Question() {
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [finish, setFinish] = useState(false);

  const [chapter, setChapter] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [height, setHeight] = useState<string>('100');

  const [data, setData] = useState<Array<IQuestion>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(null);
  const [questionPosition, setQuestionPosition] = useState(1);

  const [radioOptions, setRadioOptions] =
    useState<Array<IQuestionOption>>(defaultOptions);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [questionTypeList, setQuestionTypeList] =
    useState<Array<IQuestionType>>(null);

  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Array<number>>([1]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onRadioChange = (value: any) => {
    if (selectedType === 2) {
      let a =
        selectedOptions.length > 0
          ? selectedOptions.find((e) => e === value)
          : false;
      if (a) {
        if (selectedOptions.length > 1) {
          setSelectedOptions((selectedOptions) =>
            selectedOptions.filter((item) => item !== value),
          );
        } else {
          message.error(`Phải có ít nhất 1 đáp án đúng`);
        }
      } else {
        if (selectedOptions.length < radioOptions.length - 1) {
          setSelectedOptions((selectedOptions) => [...selectedOptions, value]);
        } else {
          message.error(`Chỉ được chọn ${radioOptions.length - 1} đáp án đúng`);
        }
      }
    } else {
      setRadioValue(value);
    }
  };
  function goBack() {
    navigate(`/admin/Program/Chapter/${chapter}`);
  }
  function addMoreAnswer() {
    let last = radioOptions[radioOptions.length - 1];
    let next = getChar(last.value);
    if (next !== 'H') {
      setRadioOptions((items: any) => [
        ...items,
        { value: radioOptions.length + 1, text: '' },
      ]);
      setHeight((item) => String(Number.parseInt(item) + 12));
    } else {
      message.error('Đã đạt đến giới hạn số câu trả lời');
    }
  }

  function handleDeleteAnswer(e: any) {
    setRadioOptions((options: any) =>
      options.filter((item: IQuestionOption) => item.value !== e),
    );
    setRadioOptions((options: any) =>
      options.map((item: IQuestionOption, index: number) => {
        return {
          value: index + 1,
          text: item.text,
        };
      }),
    );
    setHeight((item) => String(Number.parseInt(item) - 12));
  }

  function handleDelete() {
    // goBack();
    try {
      // await apiService.removeProgram(item.ProgramId);

      setShowConfirm(!showConfirm);
      if (data.length <= 0) {
        navigate(`/admin/Program/${chapter}/Test`);
      } else {
        let index = currentQuestionIndex;
        let nextQuestion = data[index - 1] ? data[index - 1] : data[index + 1];
        if (nextQuestion) {
          setCurrentQuestionIndex(data.indexOf(nextQuestion));
          setCurrentQuestion(nextQuestion);
        } else {
          setCurrentQuestionIndex(0);
          setCurrentQuestion(null);
        }
      }
      // }
      // return message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message;
    }
  }

  async function getData() {
    try {
      setLoading(true);
      // let res: any = await apiService.getPrograms();

      // setData(temp);
      // dispatch(
      //   actions.formActions.setNameMenu(
      //     `Chương trình ${res[0].ProgramName && res[0].ProgramName}`,
      //   ),
      // );
      if (data.length < 1) {
        setData([
          {
            testsId: 0,
            typeId: 1,
            questionTitle: '',
            score: 1,
          },
        ]);
      }
      form.resetFields();

      const setForm = () => {
        let base = {
          typeId: currentQuestion.testsId,
          score: currentQuestion.score,
          questionTitle: currentQuestion.questionTitle,
        };
        radioOptions.map((item) => {
          let temp = {
            item: item,
          };
          base = { ...base, ...temp };
        });
        form.setFieldsValue(base);
      };

      if (currentQuestion) {
        setForm();
      }
      setLoading(false);
    } catch (err: any) {
      throw err.message;
    }
  }
  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Chương trình`));
    setChapter(2);
    async function getTypes() {
      try {
        let types: any = await apiService.getQuestionTypes();
        setQuestionTypeList(types);
        setSelectedType(1);
      } catch (err: any) {
        throw err.message;
      }
    }
    getTypes();
  }, []);
  useEffect(() => {
    getData();
  }, [reload]);

  function getOptions() {
    let arr = [];
    if (questionTypeList) {
      for (let i = 0; i < questionTypeList.length; i++) {
        arr.push({
          value: questionTypeList[i].typeId,
          label: questionTypeList[i].typeName,
        });
      }
    }
    return arr;
  }
  function handleMoveQuestion(index: number) {
    setCurrentQuestionIndex(index);
    setCurrentQuestion(data[index]);
    form.resetFields();

    const setForm = () => {
      let base = {
        typeId: currentQuestion.typeId,
        score: currentQuestion.score,
        questionTitle: currentQuestion.questionTitle,
      };
      let content = {};
      let contents = currentQuestion.questionContents;

      content = {
        ...base,
        ...contents.map((item) => {
          return item.content;
        }),
      };
      console.log(content);
      form.setFieldsValue(content);
    };
    if (data[index]) {
      setForm();
    }
    console.log(data);
  }
  function isAnswer(item: IQuestionOption) {
    let answer = selectedOptions.find((e: number) => e == item.value);
    console.log('type' + selectedType);
    if (selectedType === 2 && answer) {
      return true;
    } else if (selectedType === 1 && radioValue == item.value) {
      return true;
    }
    return false;
  }
  function handleFinish() {}

  function handleNextQuestion(values: any) {
    let result = Object.keys(values).map((key) => [values[key]]);
    for (let i = 0; i < 2; i++) {
      result.pop();
    }

    let out = {
      testsId: 1,
      typeId: values.typeId,
      questionTitle: values.questionTitle,
      score: values.score,
      questionContents: radioOptions.map(
        (item: IQuestionOption, index: number) => {
          return {
            content: result[index][0],
            isAnswer: isAnswer(item),
          };
        },
      ),
    };
    let next = {
      testsId: 0,
      typeId: 1,
      questionTitle: '',
      score: 1,
    };
    data.pop();
    setData((data) => [...data, next, out]);

    setCurrentQuestionIndex(data.length + 1);
    setCurrentQuestion(next);
  }

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);

        if (data) {
          // await apiService.editProgram({
          // });
          message.success('Tạo thành công');
          setLoading(false);
          form.resetFields();
          if (finish) {
            setReload(!reload);

            handleFinish();
          } else {
            handleNextQuestion(values);
          }
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
    <div
      ref={containerRef}
      className=" w-full flex flex-col mb-20 pb-1  "
      style={{
        height: height + 'vh',
      }}
    >
      <QuestionModal
        open={showQuestionModal}
        setOpen={(e: boolean) => setShowQuestionModal(e)}
      >
        <div className="flex flex-row flex-wrap justify-start ml-[0.3rem]">
          {data.map((item: IQuestion, index: number) => {
            return (
              <QuestionButton
                className="mb-5"
                text={`Câu ${index + 1}`}
                onClick={() => handleMoveQuestion(index)}
                active={index === currentQuestionIndex ? true : false}
              />
            );
          })}
        </div>
      </QuestionModal>
      <Form form={form} onFinish={handleOk}>
        <ConfirmModal
          show={showConfirm}
          setShow={setShowConfirm}
          handler={() => handleDelete()}
          title={`câu hỏi số ${questionPosition}`}
        >
          <p className="font-customFont text-xl font-[500]">
            Xoá câu hỏi số {questionPosition}
          </p>
        </ConfirmModal>
        <div className="px-5 h-screen">
          <div className="w-full h-14 flex items-center justify-between ">
            <p className="text-black text-lg font-bold font-customFont">
              Bài kiểm tra chương {chapter}
            </p>
            <HeaderAdmin />
          </div>
          <div className=" mr-0   font-customFont text-lg text-primary border flex flex-row items-center justify-between px-4 rounded-[10px] w-full border-border-gray h-12 my-4">
            <p>CÂU HỎI SỐ {questionPosition}</p>
            {/* {currentQuestionIndex !== -1 && ( */}
            <CustomButton
              color="red"
              Icon={TiDelete}
              text="Xoá câu hỏi"
              size="sm"
              textClassName="pr -2"
              variant="text"
              onClick={() => setShowConfirm(!showConfirm)}
            />
            {/* )} */}
          </div>

          <div className="flex flex-row ">
            <div className="flex flex-col w-1/3 pr-8">
              <div className="border w-full p-4 rounded-[10px] border-border-gray h-full">
                <FormInput
                  disabled={false}
                  type="select"
                  name="typeId"
                  label="Loại bài kiểm tra"
                  rules={[]}
                  defaultValue={selectedType}
                  getSelectedValue={(e: number) => setSelectedType(e)}
                  options={getOptions()}
                />
                <FormInput
                  disabled={false}
                  name="score"
                  label="Số điểm"
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống số điểm`,
                    },
                    {
                      pattern: new RegExp(/^(?!\s*$|\s).*$/),
                      message: errorText.space,
                    },
                    {
                      pattern: new RegExp(/^\d+$/),
                      message: 'Điểm phải thuộc kiểu số nguyên dương',
                    },
                  ]}
                />
                <FormInput
                  disabled={true}
                  label="Đáp án đúng"
                  rules={[]}
                  placeholder={getChar(radioValue)}
                />
                <FormInput
                  disabled={true}
                  type="select"
                  label="Số slide"
                  rules={[]}
                  options={[{ value: '1', label: '1' }]}
                />
              </div>
            </div>
            <div className=" w-full ">
              <FormInput
                disabled={false}
                type="textArea"
                name="questionTitle"
                label="Nhập câu hỏi "
                placeholder="Nhập câu hỏi"
                areaHeight={3}
                rules={[
                  {
                    required: true,
                    message: `Không được để trống câu hỏi`,
                  },
                  {
                    pattern: new RegExp(/^(?!\s*$|\s).*$/),
                    message: errorText.space,
                  },
                ]}
              />

              <div className="w-full mb-2 ">
                <div className="w-full flex items-center">
                  <label className="text-black font-bold font-customFont mr-3 ">
                    Nhập các câu trả lời
                  </label>
                  <CustomButton
                    text="Thêm đáp án"
                    size="sm"
                    textClassName="pr-4"
                    onClick={() => addMoreAnswer()}
                  />
                </div>
                <OptionalAnswer
                  handleDelete={(e: string) => handleDeleteAnswer(e)}
                  options={radioOptions}
                  onChange={onRadioChange}
                  value={radioValue}
                  values={selectedOptions}
                  type={selectedType === 2 && 'multiple'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0  bg-white w-full border-border-color  border-t flex flex-col items-end  ">
          <div className="w-full my-2 mt-4 h-12  px-4 ">
            {!showQuestionModal && (
              <div className="w-full flex  border rounded-[12px] border-primary h-full">
                <div className="px-2 w-[96%] h-full  overflow-clip  flex justify-start items-center ">
                  {data.map((item: IQuestion, index: number) => {
                    return (
                      <QuestionButton
                        text={`Câu ${index + 1}`}
                        onClick={() => handleMoveQuestion(index)}
                        active={index === currentQuestionIndex ? true : false}
                      />
                    );
                  })}
                </div>
                <CustomButton
                  size="sm"
                  variant="text"
                  Icon={IoIosArrowUp}
                  className="ml-2"
                  onClick={() => setShowQuestionModal(!showQuestionModal)}
                />
              </div>
            )}
          </div>

          <Form.Item noStyle>
            <div className="w-full h-fit flex items-center justify-end px-4 my-2 ">
              <CustomButton
                text="Phục hồi mặc định"
                size="md"
                variant="outlined"
                color="blue-gray"
                className=" mr-4"
                noIcon
                onClick={() => goBack()}
              />

              <button
                type="submit"
                className=" mr-4 hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-gray-500 hover:bg-blue-gray-500 text-white shadow-md shadow-blue-gray-500/20 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-fit false"
                formNoValidate
                onClick={() => setFinish(false)}
              >
                <p className="font-customFont  font-semibold">
                  Thêm tiếp câu hỏi
                </p>
              </button>
              <button
                type="submit"
                onClick={() => setFinish(true)}
                className=" hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg  bg-green-500 hover:bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-fit false"
                formNoValidate
              >
                <p className="font-customFont  font-semibold">Hoàn thành</p>
              </button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
const QuestionButton = ({
  text,
  active,
  onClick,
  className,
}: {
  text: string;
  active: boolean;
  onClick: any;
  className?: string;
}) => {
  return (
    <div className={`mr-4 ${className}`}>
      <CustomButton
        text={text}
        size="sm"
        variant={!active ? 'outlined' : 'filled'}
        color={!active ? `blue` : `purple`}
        noIcon
        className="w-24"
        onClick={onClick}
      />
    </div>
  );
};

const QuestionModal = ({
  children,
  open,
  setOpen,
}: {
  children?: any;
  open: boolean;
  setOpen: Function;
}) => {
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={'97%'}
        title={
          <p className="font-customFont font-bold pt-2">
            Danh sách các câu hỏi
          </p>
        }
      >
        {children}
      </Modal>
    </>
  );
};
