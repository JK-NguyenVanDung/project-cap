import React, { useEffect, useState, useRef } from 'react';
import { Form, message, Modal, notification } from 'antd';
import CustomButton from '../../../../components/admin/Button';
import FormInput from '../../../../components/admin/Modal/FormInput';
import apiService from '../../../../api/apiService';
import { errorText, MESSAGE } from '../../../../helper/constant';
import { IQuestion, IQuestionContent, IQuestionType } from '../../../../Type';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useNavigate } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';

import RadioGroup from '../../../../components/sharedComponents/RadioGroup';
import { TiDelete } from 'react-icons/ti';
import OptionalAnswer from '../../../../components/admin/OptionalAnswer';
import HeaderAdmin from '../../../../components/Header/HeaderAdmin';
import ConfirmModal from '../../../../components/admin/Modal/ConfirmModal';
import Breadcrumb from '../../../../components/sharedComponents/Breadcrumb';

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

  const currentQuestion: IQuestion = useAppSelector(
    (state: any) => state.question.currentQuestion,
  );
  const radioValue = useAppSelector((state: any) => state.question.radioValue);
  const selectedOptions = useAppSelector(
    (state: any) => state.question.selectedOptions,
  );
  const selectedType = useAppSelector(
    (state: any) => state.question.selectedType,
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [height, setHeight] = useState<string>('100');

  const [data, setData] = useState<Array<IQuestion>>([]);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChangeSelectedType = (e: any) => {
    dispatch(actions.questionActions.setSelectedType(e));

    if (currentQuestion.typeId !== e && e === 2) {
      dispatch(actions.questionActions.setSelectedOptions([1]));
    }
  };
  const onRadioChange = (value: any) => {
    if (selectedType === 2) {
      let a =
        selectedOptions.length > 0
          ? selectedOptions.find((e: any) => e === value)
          : false;
      if (a) {
        if (selectedOptions.length > 1) {
          dispatch(
            actions.questionActions.setSelectedOptions(
              selectedOptions.filter((item: any) => item !== value),
            ),
          );
        } else {
          notification.error({ message: `Phải có ít nhất 1 đáp án đúng` });
        }
      } else {
        if (selectedOptions.length < radioOptions.length - 1) {
          dispatch(
            actions.questionActions.setSelectedOptions([
              ...selectedOptions,
              value,
            ]),
          );
        } else {
          notification.error({
            message: `Chỉ được chọn ${radioOptions.length - 1} đáp án đúng`,
          });
        }
      }
    } else {
      dispatch(actions.questionActions.setRadioValue(value));
    }
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
      notification.error({ message: 'Đã đạt đến giới hạn số câu trả lời' });
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

    if (currentQuestion.questionContents[numb - 1]) {
      try {
        await apiService.removeAnswer(
          currentQuestion.questionContents[numb - 1].questionContentId,
        );

        if (currentQuestion.questionContents[numb - 1].isAnswer) {
          let count = 0;

          for (let i = 0; i < currentQuestion.questionContents.length; i++) {
            if (currentQuestion.questionContents[i].isAnswer) {
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
        notification.error({
          message: 'Hiện tại không thể xóa đáp án này, vui lòng thử lại sau',
        });
        throw err.message;
      }
    } else {
    }

    // }
  }

  async function handleDelete() {
    // goBack();
    if (currentQuestion.questionId) {
      try {
        await apiService.removeQuestion(currentQuestion.questionId);

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
        // return notification.success({message:MESSAGE.SUCCESS.DELETE});
      } catch (err: any) {
        notification.error({
          message: 'Hiện tại không thể xóa câu hỏi này, vui lòng thử lại sau',
        });

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
    let contents = data.questionContents;
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
      dispatch(actions.questionActions.setSelectedType(1));
    } else {
      dispatch(actions.questionActions.setSelectedType(data.typeId));
    }

    dispatch(actions.questionActions.setRadioOptions(radioOptions));

    base.typeId === 2
      ? dispatch(actions.questionActions.setSelectedOptions(defaultChecked))
      : dispatch(actions.questionActions.setRadioValue(defaultChecked[0]));

    form.setFieldsValue(content);
  };
  const setForm = (index: number) => {
    let base = {
      typeId: data[index].typeId,
      score: data[index].score,
      questionTitle: data[index].questionTitle,
    };
    let content = {};
    let contents = data[index].questionContents;
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
      dispatch(actions.questionActions.setSelectedType(1));
    } else {
      dispatch(actions.questionActions.setSelectedType(data[index].typeId));
    }

    dispatch(actions.questionActions.setRadioOptions(radioOptions));

    base.typeId === 2
      ? dispatch(actions.questionActions.setSelectedOptions(defaultChecked))
      : dispatch(actions.questionActions.setRadioValue(defaultChecked[0]));

    form.setFieldsValue(content);
  };
  function restoreDefault() {
    form.resetFields();

    if (currentQuestion.questionId) {
      let base = {
        typeId: currentQuestion?.typeId,
        score: currentQuestion?.score,
        questionTitle: currentQuestion?.questionTitle,
      };

      let content = {};
      let contents = currentQuestion?.questionContents;

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
        }
        if (item.isAnswer) {
          if (currentQuestion?.typeId === 1) {
            dispatch(actions.questionActions.setRadioValue(index + 1));
          } else if (currentQuestion?.typeId === 2) {
            selected.push(index + 1);
          }
        }
      });

      selected.length > 0 &&
        dispatch(actions.questionActions.setSelectedOptions(selected));
      form.setFieldsValue(content);
    }
  }
  async function getData() {
    try {
      setLoading(true);
      let res: any = await apiService.getQuestions(testId);

      setData(res);
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
          score: res[0]?.score,
          questionTitle: res[0]?.questionTitle,
        };

        let content = {};
        let contents = res[0]?.questionContents;

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
            testsId: 0,
            typeId: 1,
            questionTitle: '',
            score: 1,
          },
        ]);

        setDataForm({
          testsId: 0,
          typeId: 1,
          questionTitle: '',
          score: 1,
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
    dispatch(actions.formActions.setNameMenu(`Chương trình`));
    // if (!hasQuestion) {
    //   dispatch(actions.questionActions.setRadioOptions(defaultOptions));
    //   dispatch(actions.questionActions.setSelectedOptions([1]));
    //   dispatch(actions.questionActions.setRadioValue(1));
    // }
    async function getTypes() {
      try {
        let types: any = await apiService.getQuestionTypes();
        dispatch(actions.questionActions.setQuestionTypeList(types));
      } catch (err: any) {
        throw err.message;
      }
    }

    getTypes();
    getData();
    return () => {
      let next = {
        testsId: testId,
        typeId: 1,
        questionTitle: '',
        score: 1,
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
  // useEffect(() => {
  //   let timer = setTimeout(async (e: any) => {
  //     dispatch(
  //       actions.questionActions.setRadioOptions(
  //         radioOptions.map((item: IQuestionOption, index: number) => {
  //           return {
  //             value: index + 1,
  //           };
  //         }),
  //       ),
  //     );
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [resetOption]);

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
  async function handleSubmit(values: any) {
    // let res: any = await apiService.getQuestions(testId);

    let result = Object.keys(values).map((key) => [values[key]]);
    for (let i = 0; i < 2; i++) {
      result.pop();
    }
    let outEdit = {
      typeId: selectedType,
      questionTitle: values.questionTitle,
      score: values.score,
      questionContents: radioOptions.map(
        (item: IQuestionOption, index: number) => {
          let output;
          let outQuestion =
            currentQuestion.questionContents &&
            currentQuestion.questionContents[index]
              ? currentQuestion.questionContents[index].questionContentId
                ? currentQuestion.questionContents[index]?.questionContentId
                : null
              : null;

          if (outQuestion === null) {
            output =
              currentQuestion && currentQuestion.questionId
                ? {
                    content: result[index][0],
                    isAnswer: isAnswer(item),
                  }
                : {
                    content: result[index][0],
                    isAnswer: isAnswer(item),
                  };
          } else {
            output =
              currentQuestion && currentQuestion.questionId
                ? {
                    questionContentId: outQuestion,
                    content: result[index][0],
                    isAnswer: isAnswer(item),
                  }
                : {
                    content: result[index][0],
                    isAnswer: isAnswer(item),
                  };
          }

          return output;
        },
      ),
    };
    let out = {
      testsId: testId,
      typeId: selectedType,
      questionTitle: values.questionTitle,
      score: values.score,
      questionContents: radioOptions.map(
        (item: IQuestionOption, index: number) => {
          let output =
            currentQuestion && currentQuestion.questionId
              ? {
                  questionContentId: currentQuestion.questionContents[index]
                    ?.questionContentId
                    ? currentQuestion.questionContents[index]?.questionContentId
                    : null,
                  content: result[index][0],
                  isAnswer: isAnswer(item),
                }
              : {
                  content: result[index][0],
                  isAnswer: isAnswer(item),
                };

          return output;
        },
      ),
    };
    if (
      currentQuestion.questionId &&
      selectedOptions.length !== radioOptions.length
    ) {
      if (!finish) {
        notification.success({ message: 'Lưu thành công' });
      }
      await apiService.editQuestion({
        output: outEdit,
        id: currentQuestion.questionId,
      });
    } else if (selectedOptions.length !== radioOptions.length) {
      if (!finish) {
        notification.success({ message: 'Tạo thành công' });
      }
      await apiService.addQuestion(out);
    } else {
      notification.error({ message: 'Phải có ít nhất 1 đáp án sai!' });
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

  function isAnswer(item: IQuestionOption) {
    let answer = selectedOptions.find((e: number) => e == item.value);
    if (selectedType === 2 && answer) {
      return true;
    } else if (selectedType === 1 && radioValue == item.value) {
      return true;
    }
    return false;
  }
  async function handleFinish(values: any) {
    // await handleSubmit(values);
    // notification.success({message:'Lưu lại thành công các câu hỏi'});

    goBack();
  }

  async function handleNextQuestion(values: any) {
    await handleSubmit(values);
    if (selectedOptions.length !== radioOptions.length) {
      form.resetFields();

      let next = {
        testsId: testId,
        typeId: 1,
        questionTitle: '',
        score: 1,
      };
      // data.pop();
      setHeight('100');
      let res: any = await apiService.getQuestions(testId);
      res.push(next);

      setData(res);
      dispatch(actions.questionActions.setRadioOptions(defaultOptions));
      dispatch(actions.questionActions.setSelectedType(1));
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
            if (selectedOptions.length !== radioOptions.length) {
              await handleSubmit(values);
              let res: any = await apiService.getQuestions(testId);

              setData(res);
              // dispatch(actions.questionActions.setCurrentQuestionIndex(res.length - 1));
              dispatch(
                actions.questionActions.setCurrentQuestion(
                  res[currentQuestionIndex],
                ),
              );
            }
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
              router1={'/admin/Program/'}
              router2={`/admin/Program/Chapter/${
                chapter ? chapter : 1
              }/Test?id=${chapter ? chapter : 1}`}
              name={'Chương Trình'}
              name2={'Bài kiểm tra'}
              name3={data ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}
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
                  options={getOptions()}
                />
                <FormInput
                  disabled={false}
                  name="score"
                  label="Số điểm"
                  placeholder="Nhập số điểm"
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
                  placeholder={
                    selectedType === 1
                      ? getChar(radioValue)
                      : selectedOptions.map((e: any) => {
                          return getChar(e);
                        })
                  }
                />
                {/* <FormInput disabled={false} label="Số slide" rules={[]} /> */}
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
                  onChange={onRadioChange}
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
                        key={item.questionId + index}
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
