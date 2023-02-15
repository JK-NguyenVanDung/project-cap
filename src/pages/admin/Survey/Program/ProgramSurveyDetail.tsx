import React, { useEffect, useState } from 'react';
import { Form, message, Image, Tooltip, Tabs } from 'antd';
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
import {
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FaEdit, FaPencilAlt } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

export default function ProgramDetail() {
  const [form] = Form.useForm();

  const [listContent, setListContent]: any = useState([{ title: '1' }]);
  const program = useAppSelector((state) => state.form.setProgram);
  const reload = useAppSelector((state) => state.form.reload);
  const info = useAppSelector((state) => state.auth.info);

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
  useEffect(() => {
    let t = setTimeout(() => {
      fetchProgramContent();
    }, 100);
    return () => {
      clearTimeout(t);
    };
  }, [reload]);
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setListContent((items: any) => {
        const activeIndex = items.indexOf(
          items.find((e: any) => e.contentId === active.id),
        );
        const overIndex = items.indexOf(
          items.find((e: any) => e.contentId === over.id),
        );
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
  const addChapter = () => {
    dispatch(actions.formActions.setChapter(null));
    dispatch(actions.formActions.setProgramId(program.programId));

    navigate(`/admin/Program/Chapter/${'AddContent'}`);
  };
  const fetchProgramContent = async () => {
    // const response = await apiService.getContentProgram(program.programId);
    // if (response) {
    //   setListContent(response);
    // }
  };
  const handelCancel = () => {
    navigate('/admin/Program');
    form.resetFields();
    dispatch(actions.formActions.setNameMenu('Quản Lý Chương Trình'));
  };
  const handelOk = () => {
    navigate(-1);
    form.resetFields();
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  );
  let columns = [];
  columns.push({
    title: 'Câu hỏi',
    dataIndex: 'content',
    key: 'content',
    width: '45vw',
    align: 'center' as AlignType,
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
  const items = [
    {
      label: `Thông tin chung`,
      key: 'ttc',
      children: <SectionInfo selectedProgram={program} info={info} />,
    },
    {
      label: `Về Giảng viên`,
      key: 'vgv',
      children: <SectionFive selectedProgram={program} columns={columns} />,
    },
  ];
  return (
    <div className="w-full h-full relative">
      <div className="ml-[-10px]">
        <Breadcrumb
          router1={'/admin/Program'}
          name={'Chương Trình'}
          name2={`Chuyên Đề`}
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
