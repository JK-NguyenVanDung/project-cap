import React, { useEffect, useState } from 'react';
import { Form, message, Image, Tooltip, Tabs, Table } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { Breadcrumb } from '../../../../components/sharedComponents';
import { API_URL } from '../../../../api/api';
import CustomButton from '../../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import apiService from '../../../../api/apiService';
import { AlignType } from 'rc-table/lib/interface';

import { IoIosArrowForward } from 'react-icons/io';
import {
  SectionInfo,
  SectionFive,
  SectionNine,
  SectionSeven,
  SectionOther,
} from '../../../client/Survey/ProgramSurvey';
import { HiChevronUpDown } from 'react-icons/hi2';

import { actions } from '../../../../Redux';
import { IContentSurveyProgram } from '../../../../Type';

export default function ProgramDetail() {
  const [form] = Form.useForm();

  const [listContent, setListContent]: any = useState([]);
  const program = useAppSelector((state) => state.form.setProgram);
  const reload = useAppSelector((state) => state.form.reload);
  const info = useAppSelector((state) => state.auth.info);

  const [sectionSixData, setSectionSixData] = useState([]);
  const [sectionEightData, setSectionEightData] = useState([]);
  const [sectionTenData, setSectionTenData] = useState([]);
  const [sectionElevenData, setSectionElevenData] = useState([]);
  const [sectionTwelveData, setSectionTwelveData] = useState([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let t = setTimeout(() => {
      Object.keys(program).forEach((key: any) => {
        form.setFieldValue(key, program[key]);
      });

      fetchProgramContent();
    }, 100);
    return () => {
      clearTimeout(t);
    };
  }, []);

  const fetchProgramContent = async () => {
    const response: any = await apiService.getProgramStatistic(
      program.programId,
    );
    if (response) {
      setListContent(response);

      response.map((item: IContentSurveyProgram) => {
        if (item.number === 6) {
          console.log(item.number);
          setSectionSixData((data) => [
            ...data,
            { ...item, index: data.length + 1 },
          ]);
        } else if (item.number === 8) {
          setSectionEightData((data) => [
            ...data,
            { ...item, index: data.length + 1 },
          ]);
        } else if (item.number === 10) {
          setSectionTenData((data) => [
            ...data,
            { ...item, index: data.length + 1 },
          ]);
        } else if (item.number === 11) {
          setSectionElevenData((data) => [
            ...data,
            { ...item, index: data.length + 1 },
          ]);
        } else if (item.number === 12) {
          setSectionTwelveData((data) => [
            ...data,
            { ...item, index: data.length + 1 },
          ]);
        }
      });
    }
  };
  const handelCancel = () => {
    navigate('/admin/CourseSurvey');
    form.resetFields();
    dispatch(actions.formActions.setNameMenu('Khảo sát chương trình'));
  };
  const handelOk = () => {
    navigate(-1);
    form.resetFields();
  };

  let columns = [];
  columns.push({
    title: 'Câu hỏi',
    dataIndex: 'content',
    key: 'content',
    width: '45vw',
  });
  columns.push({
    title: 'Điểm trung bình',
    dataIndex: 'point',
    key: 'point',
    width: '8vw',
    align: 'center' as AlignType,
  });

  const operations = (
    <CustomButton
      type="cancel"
      text="Quay Lại"
      onClick={() => handelCancel()}
      noIcon={true}
    />
  );
  function getSectionData(section: Array<IContentSurveyProgram>) {
    if (listContent.length > 0) {
      let result: Array<IContentSurveyProgram> = [];

      section.forEach(function (o) {
        listContent.forEach(function (c: IContentSurveyProgram) {
          if (o.number === c.number) result.push(Object.assign({}, o, c));
        });
      });
      return result;
    }
  }

  const items = [
    {
      label: `Thông tin chung`,
      key: 'ttc',
      children: (
        <div className="mb-24">
          <SectionInfo
            selectedProgram={program}
            info={info}
            isReviewing={true}
          />{' '}
        </div>
      ),
    },
    {
      label: `Về Giảng viên`,
      key: 'vgv',
      children: (
        <div className="mb-4">
          <SectionFive
            selectedProgram={program}
            columns={columns}
            data={(section: any) => getSectionData(section)}
            SurveyTable={getTable(sectionSixData)}
          />{' '}
        </div>
      ),
    },
    {
      label: `Về Nội dung chương trình`,
      key: 'ndct',
      children: (
        <div className="mb-4">
          <SectionSeven
            columns={columns}
            data={(section: any) => getSectionData(section)}
            SurveyTable={getTable(sectionEightData)}
          />
        </div>
      ),
    },
    {
      label: `Về Công tác tổ chức`,
      key: 'cttc',
      children: (
        <div className="mb-4">
          <SectionNine
            columns={columns}
            SurveyTable={getTable(sectionTenData)}
            data={(section: any) => getSectionData(section)}
          />{' '}
        </div>
      ),
    },
    {
      label: `Nhận xét chung về Chương trình`,
      key: 'nxcvct',
      children: (
        <div className="mb-4">
          <SectionOther
            SurveyTable={getTable(sectionElevenData)}
            SurveyTableTwo={getTable(sectionTwelveData)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full h-full relative mx-4">
      <div className="ml-[-10px]">
        <Breadcrumb
          router1={'/admin/CourseSurvey'}
          name={'Khảo sát chương trình'}
          name2={`${program?.programName}`}
        />
      </div>
      <div className="text-xl my-4">NỘI DUNG KHẢO SÁT</div>
      <div className="my-2 h-full">
        <Tabs tabBarExtraContent={operations} items={items} />
      </div>
    </div>
  );
}

// const ChapterItem = ({ item, index }: { item: any; index: number }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: item?.contentId });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };
//   return (
//     <div className=" relative w-full h-fit">
//       <div className="absolute w-full top-[-10px] left-[95%]">
//         <button className="mx-4">
//           <TiDelete className="text-xl" />
//         </button>
//       </div>
//       <div
//         ref={setNodeRef}
//         style={style}
//         {...attributes}
//         {...listeners}
//         key={item?.contentId}
//         onClick={() => {
//           navigate(`/admin/Program/Chapter/${index + 1}`);
//           dispatch(actions.formActions.setChapter(index + 1));
//           dispatch(actions.formActions.setContentId(item?.contentId));
//           dispatch(actions.formActions.setProgramId(item?.programId));
//         }}
//         className="  chapterItem text-black  hover:text-white text-semibold my-5 p-4 rounded-2xl flex items-center justify-between bg-gray-200  hover:bg-primary "
//       >
//         <div className="flex w-full items-center">
//           <Tooltip
//             title="Để sắp xếp lại thứ tự, kéo và thả vào vị trí mong muốn"
//             className="mr-4 h-full select-none cursor"
//           >
//             <HiChevronUpDown
//               size={26}
//               onClick={() => {}}
//               className="text-primary icon font-bold"
//             />
//           </Tooltip>

//           <p className="child font-bold font-customFont hover:text-white z-50">
//             {/* Chương {index + 1}: */}
//             {item.title}
//           </p>
//           <button className="mx-4">
//             <FaPencilAlt />
//           </button>
//         </div>

//         <IoIosArrowForward size={20} />
//       </div>
//     </div>
//   );
// };

function getTable(data: any) {
  console.log(data);
  let columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '5vw',
      align: 'center' as AlignType,
    },
    {
      title: 'Ý kiến',
      dataIndex: 'answer',
      key: 'answer',

      align: 'center' as AlignType,
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} size="large" bordered />
    </>
  );
}
