import { BiLike } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { IChapterItem, IProgramItem, ITest } from '../../../../Type';
import moment from 'moment';
import CustomButton from '../../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../../../Redux';
import apiService from '../../../../api/apiService';

const instruction = `Bài kiểm tra này bao gồm 5 câu hỏi trắc nghiệm. Để thành công với các câu đố, điều quan trọng là phải trò chuyện với các chủ đề. Hãy ghi nhớ những điều sau:
Thời gian - Bạn cần hoàn thành mỗi lần thử của mình trong một lần ngồi, vì bạn được phân bổ 30 phút cho mỗi lần thử.
Câu trả lời - Bạn có thể xem lại các lựa chọn câu trả lời của mình và so sánh chúng với câu trả lời đúng sau lần thử cuối cùng của bạn.

Để bắt đầu, hãy nhấp vào nút "Bắt đầu". Khi hoàn tất, hãy nhấp vào nút "Nộp bài".`;
export default function (props: any) {
  const navigate = useNavigate();

  const program: IProgramItem = useAppSelector(
    (state: any) => state.form.setProgram,
  );
  const selectedChapter: IChapterItem = useAppSelector(
    (state) => state.product.selectedChapter,
  );
  const selectedTest: ITest = useAppSelector(
    (state) => state.test.selectedTest,
  );
  const content = [
    {
      title: 'Hạn làm bài:',
      value: moment(program?.endDate).format('DD/MM/YYYY').toString(),
    },
    {
      title: 'Thời gian làm:',
      value: selectedTest?.time ? selectedTest?.time + ' phút' : 0 + ' phút',
    },
    { title: 'Số lần làm:', value: '1' },
    {
      title: 'Số câu hỏi:',
      value: selectedTest?.questionCount ? selectedTest?.questionCount : 'N/A',
    },
    selectedChapter?.isDone && {
      title: 'Tổng số câu trả lời:',
      value: '10/10 câu',
    },

    selectedChapter.isDone && { title: 'Kết quả', value: '100 điểm' },
  ];
  const dispatch = useAppDispatch();
  function shuffleArray(array: []) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  const range: any = useAppSelector((state) => state.test.range);

  async function getData() {
    try {
      let res: any = await apiService.getQuestions(selectedTest.testId);
      if (selectedTest.isRandom) {
        res = shuffleArray(res);
      }
      res = res.map((item: any, index: number) => {
        return { ...item, index: index + 1 };
      });
      res &&
        dispatch(
          actions.testActions.setListCurrentQuestions(
            res.slice(range.base, range.limit),
          ),
        );

      dispatch(actions.testActions.setListQuestions(res));

      dispatch(
        actions.formActions.setNameMenu(
          `${selectedTest ? selectedTest.testTitle : 'N/A'}`,
        ),
      );
    } catch (err) {}
  }

  async function navToTest() {
    await getData();
    dispatch(
      actions.testActions.setTime({
        minutes: selectedTest.time,
        seconds: 1,
      }),
    );
    navigate(`/Test/${selectedTest.testId}`);
  }
  return (
    <>
      <p className="py-4 text-2xl font-semibold text-primary">
        Bài kiểm tra:{' '}
        {selectedTest?.testTitle ? selectedTest?.testTitle : 'N/A'}
      </p>
      {!selectedChapter.isDone && (
        <div className="flex w-full text-base font-light">
          <p>Vui lòng đọc hướng dẫn phía dưới: </p>
        </div>
      )}
      <div className="mb-12 mt-4 w-full">
        {content.map((item: { title: string; value: any }) => {
          return (
            <div className="flex w-[70%] items-center justify-between  mt-4 text-base">
              <div className="flex items-center ">
                <span className="text-start font-semibold">{item.title}</span>
              </div>
              <div className="flex items-center w-[20%]  font-light">
                <span className="text-start ">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {!selectedChapter.isDone ? (
        <>
          <span className="text-xl text-start font-semibold"> Hướng dẫn</span>

          <p className="py-2 text-md  text-[#141522]">
            Bài kiểm tra này bao gồm 5 câu hỏi trắc nghiệm. Để thành công với
            các câu đố, điều quan trọng là phải trò chuyện với các chủ đề. Hãy
            ghi nhớ những điều sau:
          </p>
          <p className="py-2 text-md  text-[#141522]">
            Thời gian - Bạn cần hoàn thành mỗi lần thử của mình trong một lần
            ngồi, vì bạn được phân bổ 30 phút cho mỗi lần thử.
          </p>

          <p className="py-2 text-md  text-[#141522]">
            Câu trả lời - Bạn có thể xem lại các lựa chọn câu trả lời của mình
            và so sánh chúng với câu trả lời đúng sau lần thử cuối cùng của bạn.
          </p>
          <p className="py-2 text-md  text-[#141522]">
            Để bắt đầu, hãy nhấp vào nút "Bắt đầu". Khi hoàn tất, hãy nhấp vào
            nút "Nộp bài".
          </p>
          <div className="w-full flex justify-center items-center my-4">
            <CustomButton
              onClick={() => navToTest()}
              noIcon
              text="Bắt đầu"
              className={`w-2/5 mx-3 h-10`}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
