import { IAnswer, IQuestion, ITest } from '../../Type';

import { useAppSelector } from '../../hook/useRedux';

const ReviewQuestionItem = ({
  question,
  index,
}: {
  question?: IQuestion;
  index?: number;
}) => {
  const answers: Array<IAnswer> = useAppSelector((state) => state.test.answers);
  function isSelected(questionId: number) {
    let isAnswer = answers?.find(
      (ids: IAnswer) => ids.questionId == questionId,
    );
    return isAnswer ? true : false;
  }

  return (
    <>
      <div className="w-full items-center flex justify-between h-fit bg-gray-200 text-black  my-4 p-2 px-4 rounded-xl">
        <div className="flex w-fit items-center ">
          <div className="bg-gray-400 text-black rounded-3xl py-1 px-3 mr-4 text-center">
            <p className="text-lg text-bold">{index ? index : '0'}</p>
          </div>
          <p className="text-lg text-bold">
            {isSelected(question.questionId)
              ? 'Đã có đáp án'
              : 'Chưa có đáp án'}
          </p>
        </div>
        <p className="text-lg text-bold text-primary">
          {question?.questionTitle ? question?.score + ' điểm' : 'N/A'}
        </p>
      </div>
    </>
  );
};
export default ReviewQuestionItem;
