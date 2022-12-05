import React, { useEffect, useState, useRef, MouseEventHandler } from 'react';
import TableConfig from '../../../../components/admin/Table/Table';
import { Form, message, Switch, Input } from 'antd';
import uniqueId from '../../../../utils/uinqueId';
import CustomButton from '../../../../components/admin/Button';
import CustomModal from '../../../../components/admin/Modal/Modal';
import FormInput from '../../../../components/admin/Modal/FormInput';
import apiService from '../../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../../helper/constant';
import { IChapterItem } from '../../../../Type';
import PopOverAction from '../../../../components/admin/PopOver';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../../components/admin/Modal/ConfirmModal';
import { IChapter } from '../../../../api/apiInterface';
import { Breadcrumb } from '../../../../components/sharedComponents';
import { useNavigateParams } from '../../../../hook/useNavigationParams';

const Frame = React.forwardRef((props: any, ref: any) => {
  return (
    <>
      {props.iframe && (
        <div className="w-full">
          <label className="text-black font-bold font-customFont">
            Xem duyệt video/slide
          </label>
          <div className=" h-[27rem] overflow-scroll font-bold  grid place-items-center	 rounded-lg w-full  mt-4 border">
            <div
              ref={ref}
              className="py-8 "
              dangerouslySetInnerHTML={{ __html: props.iframe }}
            />
          </div>
        </div>
      )}
    </>
  );
});

export default function ChapterInfo() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [iframe, setIframe] = useState(null);
  const [data, setData] = useState<IChapterItem>(null);
  const [form] = Form.useForm();
  const [switchType, setSwitchType] = useState(true);
  const [contents, setListContent] = useState([]);
  const frameRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();

  const contentId = useAppSelector((state) => state.form.contentId);

  const itemChapter = useAppSelector((state) => state.form.setChapter);
  const programId = useAppSelector((state) => state.form.programId);

  const handleDelete = async () => {
    try {
      navigate(`/admin/Program/showDetail`);
      await apiService.delChapter(contentId);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message;
    }
  };
  function navToTest() {
    navigateParams(`/admin/Program/Chapter/${itemChapter}/Test`, {
      id: contentId,
    });
  }
  async function getData() {
    try {
      setLoading(true);
      // let res: any = await apiService.getPrograms();
      let res: any = await apiService.getContent(contentId);

      // let ques: any = await apiService.getQuestions(res.testId);
      setData(res);

      form.resetFields();
      const setForm = () => {
        updateRef(res.content);
        form.setFieldsValue(res ? res : []);
      };
      if (res.contentType == 'Slide') {
        setSwitchType(false);
      } else {
        setSwitchType(true);
      }
      if (res) {
        setForm();
      }

      setLoading(false);
    } catch (err: any) {
      throw err.message;
    }
  }
  function goBack() {
    navigate('/admin/Program/showDetail');
  }

  useEffect(() => {
    if (itemChapter) {
      getData();
    }
  }, [reload]);
  function updateRef(e: string) {
    setIframe(e);
  }

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const response: any = await apiService.getContentProgram(programId);
        console.log(response);
        let nextChapter = response[response.length - 1];
        let outputAdd = {
          chapter: nextChapter ? nextChapter.chapter + 1 : 1,
          programId: programId,
          contentTitle: values.contentTitle,
          contentDescription: values.contentDescription,
          content: values.content,
          contentType: switchType ? 'Video' : 'Slide',
        };

        let output = {
          chapter: itemChapter,
          programId: programId,
          contentTitle: values.contentTitle,
          contentDescription: values.contentDescription,
          content: values.content,
          contentType: switchType ? 'Video' : 'Slide',
        };

        if (data) {
          let res: any = await apiService.putContent(contentId, output);
          const response: any = await apiService.getContentProgram(programId);

          let temp = response.filter(
            (item: any) => res.contentId === item.contentId,
          )[0];

          message.success('Thay đổi thành công');
          dispatch(actions.formActions.setChapter(response.indexOf(temp) + 1));
          dispatch(actions.formActions.setContentId(res.contentId));

          setReload(!reload);

          setLoading(false);
          form.resetFields();
          setIframe(null);
        } else {
          let res: any = await apiService.postContent(outputAdd);
          const response: any = await apiService.getContentProgram(programId);

          let temp = response.filter(
            (item: any) => res.contentId === item.contentId,
          )[0];

          dispatch(actions.formActions.setChapter(response.indexOf(temp) + 1));
          dispatch(actions.formActions.setContentId(res.contentId));

          message.success('Thêm thành công');
          setReload(!reload);

          form.resetFields();
          setIframe(null);
        }
      })

      .catch((info) => {
        setLoading(false);
      });
  };
  return (
    <div className="w-full h-screen px-5">
      <div className="ml-[-0.7rem]">
        <Breadcrumb
          name="Chương Trình"
          router1="/admin/Program"
          name2="Chuyên Đề"
        />
      </div>
      <ConfirmModal
        show={showConfirm}
        setShow={setShowConfirm}
        handler={() => handleDelete()}
        title={`chương ${itemChapter?.toString()}`}
      >
        <p className="font-customFont text-xl font-[500]">
          Xoá nội dung và bài kiểm tra của chương này{' '}
        </p>
      </ConfirmModal>
      <div className="w-full h-14 flex items-center justify-between border-b mb-8">
        <p className="text-black text-lg font-bold font-customFont">
          Nội dung chương {itemChapter?.toString()}
        </p>
        {itemChapter && (
          <CustomButton
            text="Bài kiểm tra"
            noIcon
            onClick={() => navToTest()}
          />
        )}
      </div>
      <Form form={form} onFinish={handleOk} className=" w-full ">
        <FormInput
          disabled={false}
          name="contentTitle"
          label="Tên chương"
          rules={[
            {
              required: true,
              message: `Không được để trống tên chương`,
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
          label="Mô tả chương "
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

        <div className="w-full mb-6 z-100">
          <label className="text-black font-bold font-customFont ">
            Nhúng {switchType ? 'Video' : 'Sline'}
            <Switch
              checked={switchType}
              onChange={setSwitchType}
              className="ml-4 bg-primary"
              checkedChildren="Video"
              unCheckedChildren="Slide"
            />
          </label>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: `Không được để trống nội dung`,
              },
              {
                pattern: new RegExp(/^<iframe .*\iframe>$/),
                message: `Đường dẫn nhúng không Hợp Lệ`,
              },
            ]}
          >
            <Input
              defaultValue=""
              onChange={(e) => updateRef(e.target.value)}
              disabled={false}
              type="text"
              className="text-black font-customFont  font-bold min-w-[20rem] mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập đường dẫn nhúng"
              required
            ></Input>
          </Form.Item>
        </div>

        <Frame iframe={iframe} ref={frameRef} />
        <Form.Item label=" " colon={false}>
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
            {itemChapter && (
              <CustomButton
                text="Xoá"
                size="md"
                color="red"
                className="w-32 mr-4"
                noIcon
                onClick={() => setShowConfirm(!showConfirm)}
              />
            )}

            <button
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
