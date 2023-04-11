import React, { useEffect, useState, useRef } from 'react';
import { Form, message, Modal } from 'antd';

import { actions } from '../../../../../Redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import {
  IQuestionContent,
  ISurveyItem,
  ISurveyQuestion,
  ISurveyQuestionContent,
} from '../../../../../Type';
import apiService from '../../../../../api/apiService';
import HeaderAdmin from '../../../../../components/Header/HeaderAdmin';
import CustomButton from '../../../../../components/admin/Button';
import ConfirmModal from '../../../../../components/admin/Modal/ConfirmModal';
import FormInput from '../../../../../components/admin/Modal/FormInput';
import { errorText } from '../../../../../helper/constant';
import { useAppSelector, useAppDispatch } from '../../../../../hook/useRedux';
import Breadcrumb from '../../../../../components/sharedComponents/Breadcrumb';
import AnswerOption from '../../../../../components/Survey/AnswerOption';
import Loading from '../../../../../components/sharedComponents/Loading';

interface IQuestionOption {
  value: number;
}
const defaultOptions = [
  {
    value: 1,
  },
  { value: 2 },
  // {
  //   value: 3,
  // },
  // {
  //   value: 4,
  // },
];
function getChar(c: number) {
  let n = (c + 9).toString(36).toUpperCase();
  return n;
}

export default function Question() {
  const containerRef = useRef(null);

  const currentQuestionIndex = useAppSelector(
    (state: any) => state.survey.currentQuestionIndex,
  );
  const hasQuestion = useAppSelector((state: any) => state.survey.hasQuestion);
  const selectedSurvey: ISurveyItem = useAppSelector(
    (state: any) => state.survey.selectedSurvey,
  );

  const currentQuestion: ISurveyQuestion = useAppSelector(
    (state: any) => state.survey.currentQuestion,
  );

  const selectedType = useAppSelector(
    (state: any) => state.survey.selectedType,
  );

  const radioOptions = useAppSelector(
    (state: any) => state.survey.radioOptions,
  );

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [finish, setFinish] = useState(false);
  const [onlySave, setOnlySave] = useState(false);
  const typeOptions = [
    {
      value: true,
      label: 'Trắc nghiệm',
    },
    {
      value: false,
      label: 'Tự luận',
    },
  ];
  const [showConfirm, setShowConfirm] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [height, setHeight] = useState<string>('100');

  const [data, setData] = useState<Array<ISurveyQuestion>>([]);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChangeSelectedType = (e: any) => {
    dispatch(actions.surveyActions.setSelectedType(e));

    // if (currentQuestion.isChoice !== e && e === 2) {
    //   dispatch(actions.surveyActions.setSelectedOptions([0]));
    // }
  };

  function goBack() {
    navigate(-1);
  }
  function addMoreAnswer() {
    let last = radioOptions[radioOptions.length - 1];
    let next = getChar(last.value);
    if (next !== 'G') {
      dispatch(
        actions.surveyActions.setRadioOptions([
          ...radioOptions,
          { value: radioOptions.length + 1, text: '' },
        ]),
      );
      setHeight((item) => String(Number.parseInt(item) + 12));
    } else {
      message.error('Đã đạt đến giới hạn số câu trả lời');
    }
  }

  async function handleDeleteAnswer(e: any) {
    let numb = Number(e);
    setLoading(true);
    // else {
    let op = radioOptions.filter(
      (item: IQuestionOption) => item.value !== Number(e),
    );

    let temp = op.map((item: IQuestionOption, index: number) => {
      return {
        value: index + 1,
      };
    });
    dispatch(actions.surveyActions.setRadioOptions(temp));
    console.log(currentQuestion.contentQuestions);
    if (
      currentQuestion?.contentQuestions &&
      currentQuestion?.contentQuestions[numb - 1] != null
    ) {
      try {
        await apiService.deleteSurveyContent(
          currentQuestion.contentQuestions[numb - 1].contentSurveyId,
        );

        if (currentQuestion.contentQuestions[numb - 1]) {
          let count = 0;

          for (let i = 0; i < currentQuestion.contentQuestions.length; i++) {
            if (currentQuestion.contentQuestions[i]) {
              count++;
            }
          }
        }
        setReload(!reload);

        // let res: any = await apiService.getQuestions(selectedSurvey.surveyId);
        // let cur = res.find(
        //   (e: IQuestion) => e.questionId === currentQuestion.questionId,
        // );
        // dispatch(actions.surveyActions.setCurrentQuestion(cur[0]));
        // dispatch(
        //   actions.surveyActions.setCurrentQuestionIndex(res.indexOf(cur[0])),
        // );
      } catch (err: any) {
        throw err.message;
      }
    } else {
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);

    // }
  }

  async function handleDelete() {
    // goBack();
    setLoading(true);
    if (currentQuestion.questionSurveyId) {
      try {
        await apiService.deleteSurveyQuestions(
          currentQuestion.questionSurveyId,
        );

        // }
        // return message.success(MESSAGE.SUCCESS.DELETE);
      } catch (err: any) {
        message.error('Không thể xoá câu hỏi đã được khảo sát');
        setLoading(false);
        throw err.message;
      }
      try {
        let res: any = await apiService.getSurveyQuestions(
          selectedSurvey.surveyId,
        );

        setShowConfirm(!showConfirm);
        if (res.length < 1 || !res) {
          navigate(-1);
        } else {
          let index = currentQuestionIndex;
          let nextQuestion = res[index + 1];

          if (nextQuestion) {
            dispatch(
              actions.surveyActions.setCurrentQuestionIndex(
                res.indexOf(nextQuestion),
              ),
            );
            setDataForm(nextQuestion);
          } else {
            dispatch(actions.surveyActions.setCurrentQuestionIndex(0));
            dispatch(actions.surveyActions.setCurrentQuestion(res[0]));
            setDataForm(res[0]);
          }
        }
        setData(res);
      } catch (err: any) {
        message.error('asd');
        setLoading(false);
        throw err.message;
      }
    } else {
      let newData: any = data.pop();
      setData((data) => data.filter((e) => e != newData));
      if (data.length < 1) {
        navigate(-1);
      } else {
        dispatch(
          actions.surveyActions.setCurrentQuestionIndex(data.length - 1),
        );
        dispatch(
          actions.surveyActions.setCurrentQuestion(data[data.length - 1]),
        );
      }
      setForm(data.length - 1);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }
  const setDataForm = (data: any) => {
    let base = {
      isChoice: data.isChoice,
      score: data.score,
      title: data.title,
    };
    let content = {};
    let contents = data.contentQuestions;
    let radioOptions: any = [];
    let defaultChecked: any = [];

    content = contents
      ? {
          ...base,
          ...contents.map((item: IQuestionContent, index: number) => {
            radioOptions.push({
              value: index + 1,
            });
            item.isAnswer && defaultChecked.push(index + 1);
            // if (index > 3) {
            //   setHeight((item) => String(Number.parseInt(item) + 12));
            // }
            return item.content;
          }),
        }
      : {
          ...base,
          ...defaultOptions.map((item, index: number) => {
            radioOptions.push({
              value: index + 1,
            });
            return '';
          }),
        };
    !contents && defaultChecked.push(1);
    if (!contents) {
      dispatch(actions.surveyActions.setSelectedType(true));
    } else {
      dispatch(actions.surveyActions.setSelectedType(data.isChoice));
    }

    dispatch(actions.surveyActions.setRadioOptions(radioOptions));

    form.setFieldsValue(content);
  };
  const setForm = (index: number) => {
    let base = {
      isChoice: data[index].isChoice,

      title: data[index].title,
    };
    let content = {};
    let contents = data[index].contentQuestions;
    let radioOptions: any = [];
    let defaultChecked: any = [];

    content = contents
      ? {
          ...base,
          ...contents.map((item: IQuestionContent, index: number) => {
            radioOptions.push({
              value: index + 1,
            });
            item.isAnswer && defaultChecked.push(index + 1);
            // if (index > 3) {
            //   setHeight((item) => String(Number.parseInt(item) + 12));
            // }
            return item.content;
          }),
        }
      : {
          ...base,
          ...defaultOptions.map((item, index: number) => {
            radioOptions.push({
              value: index + 1,
            });
            return '';
          }),
        };
    !contents && defaultChecked.push(1);
    if (!contents) {
      dispatch(actions.surveyActions.setSelectedType(true));
    } else {
      dispatch(actions.surveyActions.setSelectedType(data[index]?.isChoice));
    }

    dispatch(actions.surveyActions.setRadioOptions(radioOptions));

    form.setFieldsValue(content);
  };
  function restoreDefault() {
    form.resetFields();

    if (currentQuestion.questionSurveyId) {
      let base = {
        isChoice: true,
        title: currentQuestion?.title,
      };

      let content = {};
      let contents = currentQuestion?.contentQuestions;

      content = {
        ...base,
        ...contents?.map((item: IQuestionContent) => {
          return item.content;
        }),
      };
      let selected: any = [];
      contents?.map((item: IQuestionContent, index: number) => {
        if (index > 3) {
          dispatch(
            actions.surveyActions.setRadioOptions([
              ...radioOptions,
              {
                value: index + 1,
              },
            ]),
          );
          setHeight((item) => String(Number.parseInt(item) + 9));
        }
      });

      form.setFieldsValue(content);
    }
  }
  async function getData() {
    try {
      setLoading(true);
      let res: any = await apiService.getSurveyQuestions(
        selectedSurvey.surveyId,
      );

      setData(res);
      // dispatch(
      //   actions.formActions.setNameMenu(
      //     `Chương trình ${res[0].ProgramName && res[0].ProgramName}`,
      //   ),
      // );
      dispatch(actions.surveyActions.setCurrentQuestionIndex(0));

      form.resetFields();
      const setDefault = () => {
        let base = {
          surveyId: selectedSurvey.surveyId,
          isChoice: res[0].isChoice,
          title: res[0]?.title,
        };

        let content = {};
        let contents = res[0]?.contentQuestions;

        content = {
          ...base,
          ...contents?.map((item: ISurveyQuestionContent) => {
            return item.content;
          }),
        };

        form.setFieldsValue(content);
      };

      dispatch(actions.surveyActions.setCurrentQuestion(res[0]));
      setDefault();
      setDataForm(res[0]);

      setLoading(false);
    } catch (err: any) {
      setData([
        {
          surveyId: selectedSurvey.surveyId,
          isChoice: true,
          title: '',
        },
      ]);

      setDataForm({
        surveyId: selectedSurvey.surveyId,
        isChoice: true,
        title: '',
      });
      setLoading(false);

      throw err.message;
    }
  }
  useEffect(() => {
    getData();
    return () => {
      let next = {
        surveyId: selectedSurvey.surveyId,
        isChoice: true,
        title: '',
      };
      // data.pop();
      setData([next]);
      dispatch(actions.surveyActions.setRadioOptions(defaultOptions));
      dispatch(actions.surveyActions.setCurrentQuestionIndex(0));
      dispatch(actions.surveyActions.setCurrentQuestion(next));
      form.setFieldValue('score', 1);
    };
  }, [reload]);

  async function handleSubmit(values: any) {
    // let res: any = await apiService.getQuestions(selectedSurvey.surveyId);
    let result = Object.keys(values).map((key) => [values[key]]);
    for (let i = 0; i < 2; i++) {
      result.pop();
    }
    console.log(result);

    let outEdit = {
      surveyId: selectedSurvey.surveyId,
      isChoice: selectedType,
      title: values.title,

      contentQuestions: radioOptions.map(
        (item: IQuestionOption, index: number) => {
          let output;
          let outQuestion =
            currentQuestion.contentQuestions &&
            currentQuestion.contentQuestions[index]
              ? currentQuestion.contentQuestions[index].contentSurveyId
                ? currentQuestion.contentQuestions[index]?.contentSurveyId
                : null
              : null;

          if (selectedType) {
            if (outQuestion === null) {
              output = {
                content: result[index][0],
              };
            } else {
              output =
                currentQuestion && currentQuestion.questionSurveyId
                  ? {
                      contentSurveyId: outQuestion,
                      content: result[index][0],
                    }
                  : {
                      content: result[index][0],
                    };
            }
          }

          return output;
        },
      ),
    };

    let out = {
      surveyId: selectedSurvey.surveyId,
      isChoice: selectedType,
      title: values.title,
      contentQuestions: selectedType
        ? radioOptions.map((item: IQuestionOption, index: number) => {
            let output =
              currentQuestion && currentQuestion.questionSurveyId
                ? {
                    contentSurveyId: currentQuestion.contentQuestions[index]
                      ?.contentSurveyId
                      ? currentQuestion.contentQuestions[index]?.contentSurveyId
                      : null,
                    content: result[index][0],
                    // isAnswer: isAnswer(item),
                  }
                : {
                    content: result[index][0],
                    // isAnswer: isAnswer(item),
                  };

            return output;
          })
        : null,
    };
    try {
      if (currentQuestion.questionSurveyId) {
        await apiService.updateSurveyQuestion(
          currentQuestion.questionSurveyId,
          outEdit,
        );
        if (!finish) {
          message.success('Lưu thành công');
        }
      } else {
        await apiService.addSurveyQuestion(out);
        if (!finish) {
          message.success('Tạo thành công');
        }
      }
    } catch (err) {
      message.error('Tạo không thành công');

      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }
  function handleMoveQuestion(index: number) {
    dispatch(actions.surveyActions.setCurrentQuestionIndex(index));
    dispatch(actions.surveyActions.setCurrentQuestion(data[index]));

    form.resetFields();

    if (data[index]) {
      setForm(index);
    }
  }

  async function handleFinish(values: any) {
    setLoading(true);
    await handleSubmit(values);
    message.success('Lưu lại thành công các câu hỏi');
    setLoading(false);

    goBack();
  }

  async function handleNextQuestion(values: any) {
    setLoading(true);

    await handleSubmit(values);

    form.resetFields();

    let next = {
      testsId: selectedSurvey.surveyId,
      isChoice: true,
      title: '',
    };
    // data.pop();
    let res: any = await apiService.getSurveyQuestions(selectedSurvey.surveyId);
    res.push(next);

    setData(res);
    dispatch(actions.surveyActions.setRadioOptions(defaultOptions));
    dispatch(actions.surveyActions.setSelectedType(true));

    dispatch(actions.surveyActions.setCurrentQuestionIndex(res.length - 1));
    dispatch(actions.surveyActions.setCurrentQuestion(res[res.length - 1]));
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        console.log(data);
        if (data) {
          // await apiService.editProgram({
          // });
          setLoading(false);
          if (onlySave) {
            await handleSubmit(values);
            let res: any = await apiService.getSurveyQuestions(
              selectedSurvey.surveyId,
            );

            setData(res);
            dispatch(
              actions.surveyActions.setCurrentQuestionIndex(res.length - 1),
            );
            dispatch(
              actions.surveyActions.setCurrentQuestion(
                res[currentQuestionIndex],
              ),
            );

            setOnlySave(false);
          } else if (finish) {
            await handleFinish(values);
            setReload(!reload);
          } else {
            handleNextQuestion(values);
          }
        } else {
          // await apiService.addProgram({});
          // setReload(!reload);
          setLoading(false);
        }
      })

      .catch((info) => {
        setLoading(false);
      });
  };
  return (
    <>
      <Loading loading={loading} className="bg-opacity-20" />

      <div
        ref={containerRef}
        className="block overflow-auto  questionCont w-full mb-[10rem]  h-fit min-h-fit"
        // style={{
        //   height: height + 'vh',
        // }}
      >
        <QuestionModal
          open={showQuestionModal}
          setOpen={(e: boolean) => setShowQuestionModal(e)}
        >
          <div className="flex flex-row flex-wrap justify-start ml-[0.3rem]">
            {data.map((item: ISurveyQuestion, index: number) => {
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

        <Form
          form={form}
          onFinish={handleOk}
          className={`${loading ? 'collapse' : 'visible'}`}
        >
          <ConfirmModal
            show={showConfirm}
            setShow={setShowConfirm}
            handler={() => handleDelete()}
            title={`câu hỏi số ${currentQuestionIndex + 1}`}
          >
            <p className="font-customFont text-xl font-[500]">
              Xoá câu hỏi số {currentQuestionIndex + 1}
            </p>
          </ConfirmModal>
          <div className="px-5 h-fit">
            <div className="w-full h-14 flex items-center justify-between ">
              <p className="text-black text-lg ml-2 font-bold font-customFont">
                Bài khảo sát: {selectedSurvey?.title}
              </p>
              <HeaderAdmin />
            </div>
            <div className="pl-[-2rem] pt-[-2rem]">
              <Breadcrumb
                router1={'/admin/Survey/'}
                name={'Khảo sát'}
                name2={data ? 'Sửa câu hỏi khảo sát' : 'Thêm câu hỏi khảo sát'}
              />
            </div>
            <div className=" mr-0   font-customFont text-lg text-primary border flex flex-row items-center justify-between px-4 rounded-[10px] w-full border-border-gray h-12 my-4">
              <p>CÂU HỎI SỐ {currentQuestionIndex + 1}</p>
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

            <div
              className={`flex flex-row ${loading ? 'collapse' : 'visible'} `}
            >
              <div className="flex flex-col w-1/3 pr-8">
                <div className="border w-full p-4 rounded-[10px] border-border-gray h-full">
                  <FormInput
                    disabled={false}
                    type="select"
                    name="isChoice"
                    label="Loại câu hỏi"
                    rules={[]}
                    defaultValue={selectedType}
                    getSelectedValue={(e: number) =>
                      handleChangeSelectedType(e)
                    }
                    options={typeOptions}
                  />
                </div>
              </div>
              <div className=" w-full ">
                <FormInput
                  disabled={false}
                  type="textArea"
                  name="title"
                  label="Nhập câu hỏi "
                  placeholder="Nhập câu hỏi"
                  areaHeight={selectedType ? 3 : 18}
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

                {selectedType && (
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
                    <AnswerOption
                      handleDelete={(e: string) => handleDeleteAnswer(e)}
                      onChange={() => {}}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed bottom-0  bg-white w-full border-border-color  border-t flex flex-col items-end  ">
            <div className="w-full my-2 mt-4 h-12  px-4 ">
              {!showQuestionModal && (
                <div className="w-full flex  border rounded-[12px] border-primary h-full">
                  <div className="px-2 w-[96%] h-full  overflow-clip  flex justify-start items-center ">
                    {data.map((item: ISurveyQuestion, index: number) => {
                      return (
                        <QuestionButton
                          key={item.questionSurveyId + index}
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
                  onClick={() => restoreDefault()}
                />
                <button
                  type="submit"
                  onClick={() => setOnlySave(true)}
                  className=" mr-4 hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg  bg-cyan-500 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-fit false"
                  formNoValidate
                >
                  <p className="font-customFont  font-semibold">Lưu câu hỏi</p>
                </button>
                <button
                  type="submit"
                  className=" mr-4 hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-gray-500 hover:bg-blue-gray-500 text-white shadow-md shadow-blue-gray-500/20 hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-fit false"
                  formNoValidate
                  onClick={() => setFinish(false)}
                >
                  <p className="font-customFont  font-semibold">
                    Lưu và thêm tiếp câu hỏi
                  </p>
                </button>

                {hasQuestion ? (
                  <button
                    type="submit"
                    onClick={() => setFinish(true)}
                    className=" hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg  bg-green-500 hover:bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-fit false"
                    formNoValidate
                  >
                    <p className="font-customFont  font-semibold">Quay lại</p>
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => setFinish(true)}
                    className=" hover:color-white submitBtn h-10 middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg  bg-green-500 hover:bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex flex-row justify-center items-center w-fit false"
                    formNoValidate
                  >
                    <p className="font-customFont  font-semibold">Hoàn thành</p>
                  </button>
                )}
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
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
        color={!active ? `blue` : `orange`}
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
