import React, { useEffect, useState, useRef } from 'react';
import { Form, message, Modal } from 'antd';

import { actions } from '../../../../../Redux';
import { useNavigate } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import {
  IQuestionContent,
  ISurveyItem,
  ISurveyQuestion,
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

interface IQuestionOption {
  value: number;
}
const defaultOptions = [
  {
    value: 1,
  },
  { value: 2 },
  {
    value: 3,
  },
  {
    value: 4,
  },
];
function getChar(c: number) {
  let n = (c + 9).toString(36).toUpperCase();
  return n;
}

export default function Question() {
  const containerRef = useRef(null);

  const testId = useAppSelector((state: any) => state.question.testId);

  const chapter = useAppSelector((state: any) => state.question.chapter);

  const currentQuestionIndex = useAppSelector(
    (state: any) => state.question.currentQuestionIndex,
  );
  const hasQuestion = useAppSelector(
    (state: any) => state.question.hasQuestion,
  );
  const selectedSurvey: ISurveyItem = useAppSelector(
    (state: any) => state.survey.selectedSurvey,
  );

  const currentQuestion: ISurveyQuestion = useAppSelector(
    (state: any) => state.question.currentQuestion,
  );
  const radioValue = useAppSelector((state: any) => state.question.radioValue);
  const selectedOptions = useAppSelector(
    (state: any) => state.question.selectedOptions,
  );
  const selectedType = useAppSelector(
    (state: any) => state.survey.selectedType,
  );
  const questionTypeList = useAppSelector(
    (state: any) => state.question.questionTypeList,
  );
  const radioOptions = useAppSelector(
    (state: any) => state.question.radioOptions,
  );
  const [resetOption, setResetOption] = useState(false);

  const defaultValueQuestion = useAppSelector(
    (state: any) => state.question.detail,
  );
  const listAnswer = useAppSelector((state: any) => state.question.hasQuestion);
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

    // if (currentQuestion.typeId !== e && e === 2) {
    //   dispatch(actions.questionActions.setSelectedOptions([0]));
    // }
  };

  function goBack() {
    if (window.history.state && window.history.state.idx > 0) {
      // navigate(-1);
      navigate(
        `/admin/Program/Chapter/${chapter ? chapter : 1}/Test?id=${
          chapter ? chapter : 1
        }`,
        { replace: true },
      );
    } else {
      navigate(
        `/admin/Program/Chapter/${chapter ? chapter : 1}/Test?id=${
          chapter ? chapter : 1
        }`,
        { replace: true },
      );
    }
  }
  function addMoreAnswer() {
    let last = radioOptions[radioOptions.length - 1];
    let next = getChar(last.value);
    if (next !== 'G') {
      dispatch(
        actions.questionActions.setRadioOptions([
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

    // else {
    let op = radioOptions.filter(
      (item: IQuestionOption) => item.value !== Number(e),
    );

    let temp = op.map((item: IQuestionOption, index: number) => {
      return {
        value: index + 1,
      };
    });
    dispatch(actions.questionActions.setRadioOptions(temp));

    if (currentQuestion.contentQuestions[numb - 1]) {
      try {
        await apiService.removeAnswer(
          currentQuestion.contentQuestions[numb - 1].questionSurveyId,
        );

        if (currentQuestion.contentQuestions[numb - 1]) {
          let count = 0;

          for (let i = 0; i < currentQuestion.contentQuestions.length; i++) {
            if (currentQuestion.contentQuestions[i]) {
              count++;
            }
          }
          if (count < 2) {
            dispatch(actions.questionActions.setSelectedOptions([1]));
            dispatch(actions.questionActions.setRadioValue(1));
          }
        }
        setReload(!reload);

        // let res: any = await apiService.getQuestions(testId);
        // let cur = res.find(
        //   (e: IQuestion) => e.questionId === currentQuestion.questionId,
        // );
        // dispatch(actions.questionActions.setCurrentQuestion(cur[0]));
        // dispatch(
        //   actions.questionActions.setCurrentQuestionIndex(res.indexOf(cur[0])),
        // );
      } catch (err: any) {
        throw err.message;
      }
    } else {
    }

    // }
  }

  async function handleDelete() {
    // goBack();
    if (currentQuestion.questionSurveyId) {
      try {
        await apiService.removeQuestion(currentQuestion.questionSurveyId);

        let res: any = await apiService.getQuestions(testId);

        setShowConfirm(!showConfirm);
        if (res.length < 1 || !res) {
          navigate(-1);
        } else {
          let index = currentQuestionIndex;
          let nextQuestion = res[index + 1];

          if (nextQuestion) {
            dispatch(
              actions.questionActions.setCurrentQuestionIndex(
                res.indexOf(nextQuestion),
              ),
            );
            setDataForm(nextQuestion);
          } else {
            dispatch(actions.questionActions.setCurrentQuestionIndex(0));
            dispatch(actions.questionActions.setCurrentQuestion(res[0]));
            setDataForm(res[0]);
          }
        }
        setData(res);
        // }
        // return message.success(MESSAGE.SUCCESS.DELETE);
      } catch (err: any) {
        throw err.message;
      }
    } else {
      let newData: any = data.pop();
      setData((data) => data.filter((e) => e != newData));
      if (data.length < 1) {
        navigate(-1);
      } else {
        dispatch(
          actions.questionActions.setCurrentQuestionIndex(data.length - 1),
        );
        dispatch(
          actions.questionActions.setCurrentQuestion(data[data.length - 1]),
        );
      }
      setForm(data.length - 1);
    }
  }
  const setDataForm = (data: any) => {
    let base = {
      typeId: data.typeId,
      score: data.score,
      questionTitle: data.questionTitle,
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
      dispatch(actions.surveyActions.setSelectedType(data.typeId));
    }

    dispatch(actions.questionActions.setRadioOptions(radioOptions));

    base.typeId === 2
      ? dispatch(actions.questionActions.setSelectedOptions(defaultChecked))
      : dispatch(actions.questionActions.setRadioValue(defaultChecked[0]));

    form.setFieldsValue(content);
  };
  const setForm = (index: number) => {
    let base = {
      typeId: data[index].isChoice,

      questionTitle: data[index].title,
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

    dispatch(actions.questionActions.setRadioOptions(radioOptions));

    form.setFieldsValue(content);
  };
  function restoreDefault() {
    form.resetFields();

    if (currentQuestion.questionSurveyId) {
      let base = {
        typeId: currentQuestion?.isChoice ? 0 : 1,
        questionTitle: currentQuestion?.title,
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
            actions.questionActions.setRadioOptions([
              ...radioOptions,
              {
                value: index + 1,
              },
            ]),
          );
          setHeight((item) => String(Number.parseInt(item) + 9));
        }
        if (item.isAnswer) {
          if (currentQuestion?.isChoice) {
            dispatch(actions.questionActions.setRadioValue(index + 1));
          } else {
            selected.push(index + 1);
          }
        }
      });

      form.setFieldsValue(content);
    }
  }
  async function getData() {
    try {
      setLoading(true);
      // let res: any = await apiService.getSurveys();
      let res: any = [];
      // setData(res);
      // dispatch(
      //   actions.formActions.setNameMenu(
      //     `Chương trình ${res[0].ProgramName && res[0].ProgramName}`,
      //   ),
      // );
      dispatch(actions.questionActions.setCurrentQuestionIndex(0));

      form.resetFields();
      const setDefault = () => {
        let base = {
          typeId: res[0]?.typeId,
          questionTitle: res[0]?.questionTitle,
        };

        let content = {};
        let contents = res[0]?.contentQuestions;

        content = {
          ...base,
          ...contents?.map((item: IQuestionContent) => {
            return item.content;
          }),
        };
        let selected: any = [];
        contents?.map((item: IQuestionContent, index: number) => {
          if (item.isAnswer) {
            if (res[0]?.typeId === 1) {
              dispatch(actions.questionActions.setRadioValue(index + 1));
            } else if (res[0]?.typeId === 2) {
              selected.push(index + 1);
            }
          }
        });
        selected.length > 0 &&
          dispatch(actions.questionActions.setSelectedOptions(selected));
        form.setFieldsValue(content);
      };

      if (res.length < 1) {
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
      } else {
        dispatch(actions.questionActions.setCurrentQuestion(res[0]));
        setDefault();
        setDataForm(res[0]);
      }

      setLoading(false);
    } catch (err: any) {
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
      dispatch(actions.questionActions.setRadioOptions(defaultOptions));

      dispatch(actions.questionActions.setSelectedOptions([1]));
      dispatch(actions.questionActions.setRadioValue(1));
      dispatch(actions.questionActions.setCurrentQuestionIndex(0));
      dispatch(actions.questionActions.setCurrentQuestion(next));
      form.setFieldValue('score', 1);
    };
  }, [reload]);

  async function handleSubmit(values: any) {
    // let res: any = await apiService.getQuestions(testId);

    let result = Object.keys(values).map((key) => [values[key]]);
    for (let i = 0; i < 2; i++) {
      result.pop();
    }
    let outEdit = {
      surveyId: selectedSurvey.surveyId,
      isChoice: selectedType,
      title: values.questionTitle,

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

          if (outQuestion === null) {
            output =
              currentQuestion && currentQuestion.questionSurveyId
                ? {
                    content: result[index][0],
                  }
                : {
                    content: result[index][0],
                  };
          } else {
            output =
              currentQuestion && currentQuestion.questionSurveyId
                ? {
                    questionContentId: outQuestion,
                    content: result[index][0],
                  }
                : {
                    content: result[index][0],
                  };
          }

          return output;
        },
      ),
    };
    let out = {
      surveyId: selectedSurvey.surveyId,
      isChoice: selectedType,
      title: values.questionTitle,
      contentQuestions: radioOptions.map(
        (item: IQuestionOption, index: number) => {
          let output =
            currentQuestion && currentQuestion.questionSurveyId
              ? {
                  questionContentId: currentQuestion.contentQuestions[index]
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
        },
      ),
    };
    console.log(outEdit);
    console.log(out);
    if (
      currentQuestion.questionSurveyId &&
      selectedOptions.length !== radioOptions.length
    ) {
      if (!finish) {
        message.success('Lưu thành công');
      }
      // await apiService.updateSurveyQuestion(
      //   currentQuestion.questionSurveyId,
      //   outEdit,
      // );
    } else if (selectedOptions.length !== radioOptions.length) {
      if (!finish) {
        message.success('Tạo thành công');
      }
      // await apiService.addSurveyQuestion(out);
    } else {
      message.error('Phải có ít nhất 1 đáp án sai!');
    }
  }
  function handleMoveQuestion(index: number) {
    dispatch(actions.questionActions.setCurrentQuestionIndex(index));
    dispatch(actions.questionActions.setCurrentQuestion(data[index]));

    form.resetFields();
    setHeight('100');

    if (data[index]) {
      setForm(index);
    }
  }

  async function handleFinish(values: any) {
    await handleSubmit(values);
    message.success('Lưu lại thành công các câu hỏi');

    goBack();
  }

  async function handleNextQuestion(values: any) {
    await handleSubmit(values);
    if (selectedOptions.length !== radioOptions.length) {
      form.resetFields();

      let next = {
        testsId: testId,
        typeId: 0,
        questionTitle: '',
        score: 1,
      };
      // data.pop();
      setHeight('100');
      let res: any = await apiService.getQuestions(testId);
      res.push(next);

      setData(res);
      dispatch(actions.questionActions.setRadioOptions(defaultOptions));
      dispatch(actions.surveyActions.setSelectedType(true));
      dispatch(actions.questionActions.setSelectedOptions([1]));
      dispatch(actions.questionActions.setRadioValue(1));
      dispatch(actions.questionActions.setCurrentQuestionIndex(res.length - 1));
      dispatch(actions.questionActions.setCurrentQuestion(res[res.length - 1]));
      form.setFieldValue('score', 1);
    }
  }

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);

        if (data) {
          // await apiService.editProgram({
          // });
          setLoading(false);
          if (onlySave) {
            await handleSubmit(values);
            // let res: any = await apiService.getQuestions(testId);

            // setData(res);
            // dispatch(actions.questionActions.setCurrentQuestionIndex(res.length - 1));
            // dispatch(
            //   actions.questionActions.setCurrentQuestion(
            //     res[currentQuestionIndex],
            //   ),
            // );

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

      <Form form={form} onFinish={handleOk}>
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
        <div className="px-5 h-screen">
          <div className="w-full h-14 flex items-center justify-between ">
            <p className="text-black text-lg font-bold font-customFont">
              Bài kiểm tra chương {chapter}
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
                  getSelectedValue={(e: number) => handleChangeSelectedType(e)}
                  options={typeOptions}
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
