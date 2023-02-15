import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { actions } from '../../../Redux';
import HeaderClient from '../../../components/Header/HeaderClient';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import RadioButton from 'antd/lib/radio/radioButton';
import { Form, Input, Radio, Table, notification } from 'antd';
import { useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';
import CustomButton from '../../../components/admin/Button';
import { FiSend } from 'react-icons/fi';
import FormInput from '../../../components/admin/Modal/FormInput';
import { errorText } from '../../../helper/constant';
import {
  IContentSurveyProgram,
  IProgramItem,
  ISurveyProgram,
} from '../../../Type';
import moment from 'moment';
import apiService from '../../../api/apiService';
export default function () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const info = useAppSelector((state) => state.auth.info);

  const selectedProgram: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  let options = [1, 2, 3, 4, 5];
  let columns = [];
  const [form] = Form.useForm();
  columns.push({
    title: '',
    dataIndex: 'content',
    key: 'content',
    width: '45vw',
    align: 'center' as AlignType,
  });
  options.forEach((option, i) => {
    columns.push({
      title: option,

      align: 'center' as AlignType,

      render: (item: any) => {
        return (
          <>
            <Form.Item
              name={item.number}
              rules={[{ required: true, message: 'Vui lòng chọn 1 đáp án' }]}
            >
              <Radio.Group
                name={item.number}
                className="flex justify-center items-center"
              >
                <Radio
                  type="radio"
                  name={item.number}
                  value={option.toString()}
                ></Radio>
              </Radio.Group>
            </Form.Item>
          </>
        );
      },
    });
  });
  function goBack() {
    navigate(-1);
  }
  function handleSubmit() {
    form
      .validateFields()
      .then(async (values) => {
        let result = [];

        for (const [key, value] of Object.entries(values)) {
          result.push({
            number: Number(key),
            point: isNaN(Number(value)) ? null : Number(value),
            answer: value ? value.toString() : null,
          });
        }

        let out: ISurveyProgram = {
          accountId: info.accountId,
          programId: selectedProgram.programId,
          contentSurveyPrograms: result,
        }; //       ...values,
        console.log(out);
        try {
          await apiService.doProgramSurvey(out);
          navigate(`/Programs/${selectedProgram.programId}/Chapters`);
        } catch (err) {
          notification.error({
            message:
              'Hiện tại không thể thực hiện khảo sát, xin vui lòng làm lại sau',
          });
        }
      })
      .catch(() => {
        notification.error({
          message: 'Vui lòng chọn hết các câu hỏi bắt buộc',
        });
      });
  }
  return (
    <div className="bg-gray-50 h-full">
      <div className="w-full h-24 py-4 bg-white flex items-center justify-between ">
        <div className="z-0 max-sm:hidden  overflow-hidden bg-white relative flex flex-col justify-center content-center items-center w-1/5">
          <a
            onClick={() => {
              navigate('/home');
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
            }}
            className=" hover:text-primary text-black relative my-2  px-2 w-full flex flex-row items-center justify-center"
          >
            <img className="w-[14%] h-fit " src={logo} />
            <p className="text-lg font-bold text-center mx-2">VLG TRAINING</p>
          </a>
        </div>

        <div className="w-full h-14 flex items-center justify-between ">
          <div className="flex flex-col justify-center items-start w-full">
            <p className="ml-2 max-sm:text-[12px] max-sm:hidden  text-black text-lg font-bold font-customFont">
              Bảng khảo sát:
            </p>
            <div className="w-full  bg-white ">
              <Breadcrumb
                router1={-1}
                name={
                  location.pathname.split('/')[1] === 'admin'
                    ? 'Khảo sát'
                    : 'Trang chủ'
                }
                name2={'Bảng khảo sát: '}
              />
            </div>
          </div>
          <HeaderClient />
        </div>
      </div>
      <div className="px-24  flex flex-col w-full h-screen items-center my-12 text-black">
        <div className="flex h-[50vh] flex-col w-full justify-evenly  items-center">
          <p className="font-semibold text-xl">
            Trung tâm Đào tạo và Phát triển (VLG)
          </p>

          <p className="font-bold text-2xl">ĐÁNH GIÁ CHẤT LƯỢNG CHƯƠNG TRÌNH</p>
          <p className="text-base ">
            Những phản hồi, góp ý của Thầy/Cô, Anh/Chị rất quan trọng để Trung
            tâm ĐT&PT tiếp tục nâng cao chất lượng chương trình trong tương lai.
            Xin cảm ơn các phản hồi từ Thầy/Cô, Anh/Chị!
          </p>
          <p className="self-start ">
            Chân thành cảm ơn các ý kiến đóng góp của người học!
          </p>
        </div>
        <SectionInfo selectedProgram={selectedProgram} info={info} />
        <div className="w-full  flex flex-col justify-evenly ">
          <Form form={form}>
            <SectionFive columns={columns} selectedProgram={selectedProgram} />
            <SectionSeven columns={columns} />
            <SectionNine columns={columns} />
            <SectionOther />
          </Form>
        </div>
        <div className="flex w-full justify-end items-center ">
          <CustomButton
            className="w-32"
            text="Quay lại"
            type="goBack"
            noIcon
            onClick={goBack}
          />

          <CustomButton
            onClick={handleSubmit}
            className="mx-2 my-8"
            text="Gửi Đánh Giá"
            Icon={FiSend}
          />
        </div>
      </div>
    </div>
  );
}
export const SectionInfo = ({
  selectedProgram,
  info,
}: {
  selectedProgram: IProgramItem;
  info: any;
}) => {
  return (
    <>
      <div className="self-start w-full mb-4	">
        <p className="text-xl font-bold ">THÔNG TIN CHUNG</p>
        <p className="mt-4">
          1. Tên chương trình Thây/Cô, Anh/Chị đã tham dự?
          <span className="text-red-500"> * </span>
        </p>

        <Input
          value={selectedProgram ? selectedProgram.programName : 'N/A'}
          disabled={true}
          type="text"
          className={` font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        ></Input>

        <p className="mt-4">
          2. Thời hạn tham gia? <span className="text-red-500"> * </span>
        </p>

        <Input
          value={
            selectedProgram
              ? moment(selectedProgram.startDate).format('DD/MM/YYYY') +
                ' - ' +
                moment(selectedProgram.endDate).format('DD/MM/YYYY')
              : 'N/A'
          }
          disabled={true}
          type="text"
          className={` font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        ></Input>

        <p className="mt-4">3. Email của Thầy/Cô, Anh/Chị</p>

        <Input
          value={info ? info.email : 'N/A'}
          disabled={true}
          type="text"
          className={` font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        ></Input>
      </div>
    </>
  );
};
export const SectionOther = ({
  SurveyTable,
  SurveyTableTwo,
}: {
  SurveyTable?: any;
  SurveyTableTwo?: any;
}) => {
  return (
    <>
      <p className="text-xl font-bold ">Nhận xét chung về Chương trình</p>
      <br className="my-2"></br>
      {!SurveyTable ? (
        <FormInput
          label="11. Thầy/Cô, Anh/Chị vui lòng chia sẻ những điều tâm đắc về chương trình"
          name="11"
          placeholder="Nhập ý kiến"
          rules={[
            // { required: true, message: 'Vui lòng nhập vào tên khảo sát' },

            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            // {
            //   pattern: new RegExp(/^.{1,50}$/),
            //   message: 'Đạt tối đa số lượng ký tự cho phép',
            // },
          ]}
        />
      ) : (
        <>
          <p className="mt-4">
            11. Thầy/Cô, Anh/Chị vui lòng chia sẻ những điều tâm đắc về chương
            trình
          </p>
          {SurveyTable}
        </>
      )}

      <br className="my-2"></br>
      {!SurveyTable ? (
        <FormInput
          label="   12. Thầy/Cô, Anh/Chị vui lòng chia sẻ thêm các đề xuất để nâng cao chất
        lượng chương trình hoặc đề xuất về nội dung/ chương trình muốn tham dự
        tiếp theo"
          name="12"
          placeholder="Nhập ý kiến"
          rules={[
            // { required: true, message: 'Vui lòng nhập vào tên khảo sát' },

            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            // {
            //   pattern: new RegExp(/^.{1,50}$/),
            //   message: 'Đạt tối đa số lượng ký tự cho phép',
            // },
          ]}
        />
      ) : (
        <>
          <p className="mt-4">
            12. Thầy/Cô, Anh/Chị vui lòng chia sẻ thêm các đề xuất để nâng cao
            chất lượng chương trình hoặc đề xuất về nội dung/ chương trình muốn
            tham dự tiếp theo
          </p>
          {SurveyTableTwo}
        </>
      )}
    </>
  );
};

export const SectionFive = ({
  columns,
  selectedProgram,
  SurveyTable = null,
  data,
}: {
  columns: any;
  selectedProgram: IProgramItem;
  SurveyTable?: any;
  data?: Function;
}) => {
  const section5 = [
    {
      number: 5.1,
      answer: 0,
      content: ` Giảng viên có tác phong chuyên nghiệp (giờ giấc, trang phục, giáo cụ…) `,
    },
    {
      number: 5.2,
      answer: 0,
      content: ` Giảng viên có phương pháp truyền đạt rõ ràng, dễ hiểu, giải đáp thỏa đáng các thắc mắc liên quan đến nội dung chương trình `,
    },
  ];
  return (
    <>
      <p className="text-xl font-bold  ">Về Giảng viên</p>

      <p className="mt-4">
        4. Họ & Tên Giảng viên phụ trách Chương trình?{' '}
        <span className="text-red-500"> * </span>{' '}
      </p>

      <Input
        value={selectedProgram ? selectedProgram.lecturers : 'N/A'}
        disabled={true}
        type="text"
        className={` font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
      ></Input>

      <p className="my-4  ">
        {`5. Quy ước: (1) hoàn toàn KHÔNG đồng ý; (2) KHÔNG đồng ý; (3) Đồng ý một phần; (4) Đồng ý; (5) Hoàn toàn đồng ý 
`}
        <span className="text-red-500"> * </span>{' '}
      </p>
      <p className="mb-2">
        Trường hợp có nội dung đánh giá từ 1-2 điểm, Thầy/Cô Anh/Chị vui lòng
        chia sẻ góp ý tại câu kế tiếp
      </p>

      <Table
        columns={columns}
        dataSource={data ? data(section5) : section5}
        size="large"
        bordered
        pagination={false}
      />

      <br className="my-2"></br>
      {!SurveyTable ? (
        <FormInput
          label="        6. Thây/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp đến Giảng viên
        "
          name="6"
          placeholder="Nhập ý kiến"
          rules={[
            // { required: true, message: 'Vui lòng nhập vào tên khảo sát' },

            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            // {
            //   pattern: new RegExp(/^.{1,50}$/),
            //   message: 'Đạt tối đa số lượng ký tự cho phép',
            // },
          ]}
        />
      ) : (
        <>
          <p className="mt-4">
            6. Thây/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp đến Giảng
            viên
          </p>
          {SurveyTable}
        </>
      )}
    </>
  );
};

export const SectionSeven = ({
  columns,
  SurveyTable = null,
  data,
}: {
  columns: any;
  SurveyTable?: any;
  data?: Function;
}) => {
  const section7 = [
    {
      number: 7.1,
      answer: 0,
      content: ` Nội dung chương trình phù hợp, thiết thực với công việc `,
    },
    {
      number: 7.2,
      answer: 0,
      content: ` Thời lượng phù hợp với nội dung và mục tiêu chung của chương trình `,
    },
    {
      number: 7.3,
      answer: 0,
      content: ` Chương trình hữu ích, có thể ứng dụng vào thực tế và đáp ứng được mong đợi của Thầy/Cô, Anh/Chị `,
    },
  ];

  return (
    <>
      <p className="text-xl font-bold ">Về Nội dung chương trình</p>

      <p className="my-2">
        {`     7. Quy ước: (1) hoàn toàn KHÔNG đồng ý; (2) KHÔNG đồng ý; (3) Đồng ý một phần; (4) Đồng ý; (5) Hoàn toàn đồng ý 
`}
        <span className="text-red-500"> * </span>{' '}
      </p>
      <p className="mb-2">
        Trường hợp có nội dung đánh giá từ 1-2 điểm, Thầy/Cô Anh/Chị vui lòng
        chia sẻ góp ý tại câu kế tiếp
      </p>

      <Table
        columns={columns}
        dataSource={data ? data(section7) : section7}
        size="large"
        bordered
        pagination={false}
      />

      <br className="my-2"></br>

      {!SurveyTable ? (
        <FormInput
          label=" 8. Thây/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp về nội dung
        Chương trình"
          name="8"
          placeholder="Nhập ý kiến"
          rules={[
            // { required: true, message: 'Vui lòng nhập vào tên khảo sát' },

            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            // {
            //   pattern: new RegExp(/^.{1,50}$/),
            //   message: 'Đạt tối đa số lượng ký tự cho phép',
            // },
          ]}
        />
      ) : (
        <>
          <p className="mt-4">
            8. Thây/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp về nội
            dung Chương trình
          </p>
          {SurveyTable}
        </>
      )}
    </>
  );
};

export const SectionNine = ({
  columns,
  SurveyTable = null,
  data,
}: {
  columns: any;
  SurveyTable?: any;
  data?: Function;
}) => {
  const section9 = [
    {
      number: 9.1,
      answer: 0,
      content: ` Thầy/Cô, Anh/Chị được thông báo đầy đủ thông tin và được tư vấn/ hỗ trợ tốt trong quá trình tham dự chương trình `,
    },
    {
      number: 9.2,
      answer: 0,
      content: ` Công tác hậu cần (phòng học, công cụ, thiết bị, tài liệu…) được sắp xếp và trang bị tốt `,
    },
  ];
  return (
    <>
      <p className="text-xl font-bold ">Về Công tác tổ chức</p>

      <p className="my-2">
        {`  
9. Quy ước: (1) hoàn toàn KHÔNG đồng ý; (2) KHÔNG đồng ý; (3) Đồng ý một phần; (4) Đồng ý; (5) Hoàn toàn đồng ý 
`}
        <span className="text-red-500"> * </span>{' '}
      </p>
      <p className="mb-2">
        Trường hợp có nội dung đánh giá từ 1-2 điểm, Thầy/Cô Anh/Chị vui lòng
        chia sẻ góp ý tại câu kế tiếp
      </p>

      <Table
        columns={columns}
        dataSource={data ? data(section9) : section9}
        size="large"
        bordered
        pagination={false}
      />

      <br className="my-2"></br>

      {!SurveyTable ? (
        <FormInput
          label="10. Thầy/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp về công tác
        hậu cần"
          name="10"
          placeholder="Nhập ý kiến"
          rules={[
            // { required: true, message: 'Vui lòng nhập vào tên khảo sát' },

            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            // {
            //   pattern: new RegExp(/^.{1,50}$/),
            //   message: 'Đạt tối đa số lượng ký tự cho phép',
            // },
          ]}
        />
      ) : (
        <>
          <p className="mt-4">
            10. Thầy/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp về công
            tác hậu cần
          </p>
          {SurveyTable}
        </>
      )}
    </>
  );
};
