import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { actions } from '../../../Redux';
import HeaderClient from '../../../components/Header/HeaderClient';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { useAppDispatch } from '../../../hook/useRedux';
import RadioButton from 'antd/lib/radio/radioButton';
import { Radio, Table } from 'antd';
import { useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';

export default function () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  let options = [1, 2, 3, 4, 5];
  let columns = [];

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
      key: option,
      align: 'center' as AlignType,

      render: (value: string) => {
        return (
          <>
            <input type="radio" name="gender" value="male"></input>
          </>
        );
      },
    });
  });
  return (
    <div className="bg-gray-50">
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
      <div className="mx-4  flex flex-col w-full h-screen items-center my-12 text-black">
        <div className="flex h-[40vh] flex-col w-full justify-evenly  items-center">
          <p className="font-semibold text-xl">
            Trung tâm Đào tạo và Phát triển (VLG)
          </p>

          <p className="font-bold text-2xl">ĐÁNH GIÁ CHẤT LƯỢNG CHƯƠNG TRÌNH</p>
          <p className="font-semibold text-xl">Khoá học Mobile 2023-2024</p>
          <p className="text-base ">
            Những phản hồi, góp ý của Thầy/Cô, Anh/Chị rất quan trọng để Trung
            tâm ĐT&PT tiếp tục nâng cao chất lượng chương trình trong tương lai.
            Xin cảm ơn các phản hồi từ Thầy/Cô, Anh/Chị!
          </p>
          <p className="self-start ">
            Chân thành cảm ơn các ý kiến đóng góp của người học!
          </p>
        </div>
        <div className="self-start	">
          <p className="text-xl font-bold ">I. THÔNG TIN CHUNG</p>
          <p className="">
            1. Email người học (giảng viên/ nhân viên nhà trường)
          </p>
          <p className="">dung.197pm31141@vanlanguni.vn</p>
          <p className="">II. NỘI DUNG KHẢO SÁT</p>
          <p className="">III. Ý KIẾN KHÁC</p>
          <p className="">10. Điều mà anh/chị hài lòng nhất về khoá học này?</p>
        </div>
        <div className="w-full  flex flex-col justify-evenly ">
          <SectionFive columns={columns} />
          <SectionSeven columns={columns} />
          <SectionNine columns={columns} />
          <SectionOther />
        </div>
      </div>
    </div>
  );
}
const SectionOther = () => {
  return (
    <>
      <p className="text-xl font-bold ">Nhận xét chung về Chương trình</p>
      <p className="">
        11. Thầy/Cô, Anh/Chị vui lòng chia sẻ những điều tâm đắc về chương trình
      </p>
      <p className="">
        12. Thầy/Cô, Anh/Chị vui lòng chia sẻ thêm các đề xuất để nâng cao chất
        lượng chương trình hoặc đề xuất về nội dung/ chương trình muốn tham dự
        tiếp theo
      </p>
    </>
  );
};

const SectionFive = ({ columns }: { columns: any }) => {
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
      <p className="text-xl font-bold ">Về Giảng viên?</p>

      <p className="">4. Họ & Tên Giảng viên phụ trách Chương trình? *</p>
      <p className="">{`          5. Quy ước: (1) hoàn toàn KHÔNG đồng ý; (2) KHÔNG đồng ý; (3) Đồng ý một phần; (4) Đồng ý; (5) Hoàn toàn đồng ý *
`}</p>
      <p className="">
        Trường hợp có nội dung đánh giá từ 1-2 điểm, Thầy/Cô Anh/Chị vui lòng
        chia sẻ góp ý tại câu kế tiếp
      </p>

      <Table
        columns={columns}
        dataSource={section5}
        size="large"
        bordered
        pagination={false}
      />

      <p className="">
        6. Thây/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp đến Giảng viên
      </p>
    </>
  );
};

const SectionSeven = ({ columns }: { columns: any }) => {
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

      <p className="">{`     7. Quy ước: (1) hoàn toàn KHÔNG đồng ý; (2) KHÔNG đồng ý; (3) Đồng ý một phần; (4) Đồng ý; (5) Hoàn toàn đồng ý *
`}</p>
      <p className="">
        Trường hợp có nội dung đánh giá từ 1-2 điểm, Thầy/Cô Anh/Chị vui lòng
        chia sẻ góp ý tại câu kế tiếp
      </p>

      <Table
        columns={columns}
        dataSource={section7}
        size="large"
        bordered
        pagination={false}
      />
      <p className="">
        8. Thây/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp về nội dung
        Chương trình
      </p>
    </>
  );
};

const SectionNine = ({ columns }: { columns: any }) => {
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

      <p className="">{`  
9. Quy ước: (1) hoàn toàn KHÔNG đồng ý; (2) KHÔNG đồng ý; (3) Đồng ý một phần; (4) Đồng ý; (5) Hoàn toàn đồng ý *
`}</p>
      <p className="">
        Trường hợp có nội dung đánh giá từ 1-2 điểm, Thầy/Cô Anh/Chị vui lòng
        chia sẻ góp ý tại câu kế tiếp
      </p>

      <Table
        columns={columns}
        dataSource={section9}
        size="large"
        bordered
        pagination={false}
      />
      <p className="">
        10. Thầy/Cô, Anh/Chị vui lòng chia sẻ thêm ý kiến đóng góp về công tác
        hậu cần
      </p>
    </>
  );
};
