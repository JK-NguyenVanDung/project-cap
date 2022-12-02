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
import { useAppDispatch } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../../components/admin/Modal/ConfirmModal';

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
  const [chapter, setChapter] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [iframe, setIframe] = useState(null);
  const [data, setData] = useState<IChapterItem>(null);
  const [form] = Form.useForm();
  const [switchType, setSwitchType] = useState(true);

  const frameRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function goBack() {
    navigate(`/admin/Program/${chapter}`);
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
    getData();
    setChapter(2);
  }, [reload]);
  function updateRef(e: string) {
    setIframe(e);
  }
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        let output = {
          ContentTitle: values.ContentTitle,
          ContentDescription: values.ContentDescription,
          Content: values.Content,
          ContentType: switchType ? 'Video' : 'Slide',
        };
        if (data) {
          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
          setIframe(null);
        } else {
          message.success('Thêm thành công');
          setLoading(false);
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
      <ConfirmModal
        show={showConfirm}
        setShow={setShowConfirm}
        handler={() => handleDelete()}
        title={`chương ${chapter}`}
      >
        <p className="font-customFont text-xl font-[500]">
          Xoá nội dung và bài kiểm tra của chương này{' '}
        </p>
      </ConfirmModal>
      <div className="w-full h-14 flex items-center justify-between border-b mb-8">
        <p className="text-black text-lg font-bold font-customFont">
          Nội dung chương {chapter}
        </p>
        <CustomButton text="Bài kiểm tra" noIcon onClick={() => {}} />
      </div>
      <Form form={form} onFinish={handleOk} className=" w-full ">
        <FormInput
          disabled={false}
          name="ContentTitle"
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
          name="ContentDescription"
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
            Nhúng video/slide
            <Switch
              checked={switchType}
              onChange={setSwitchType}
              className="ml-4 bg-primary"
              checkedChildren="Video"
              unCheckedChildren="Slide"
            />
          </label>
          <Form.Item
            name="Content"
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
              onChange={(e) => updateRef(e.target.value)}
              disabled={false}
              type="text"
              id="simple-search"
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
              onClick={() => navigate(-1)}
            />
            <CustomButton
              text="Xoá"
              size="md"
              color="red"
              className="w-32 mr-4"
              noIcon
              onClick={() => setShowConfirm(!showConfirm)}
            />

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
