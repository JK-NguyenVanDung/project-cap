import React, { useEffect, useState } from 'react';
import { Form, message, Image, Tooltip } from 'antd';
import FormInput from '../../../../components/admin/Modal/FormInput';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { Breadcrumb } from '../../../../components/sharedComponents';
import { API_URL } from '../../../../api/api';
import CustomButton from '../../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import apiService from '../../../../api/apiService';
import { IoIosArrowForward } from 'react-icons/io';

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
  const [image, setImage] = useState();
  const [startDate, setStartDate]: any = useState();
  const [endDate, setEndDate]: any = useState();
  const [academicYear, setAcademicYear]: any = useState();
  const [faculty, setFaculty]: any = useState();
  const [isPublish, setIsPublish]: any = useState();
  const [category, setCategory]: any = useState();
  const [listContent, setListContent]: any = useState([{ title: '1' }]);
  const item = useAppSelector((state) => state.form.setProgram);
  const reload = useAppSelector((state) => state.form.reload);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let t = setTimeout(() => {
      Object.keys(item).forEach((key: any) => {
        form.setFieldValue(key, item[key]);
      });
      setImage(item.image);
      setStartDate(moment(item.startDate).format('DD-MM-YYYY'));
      setEndDate(moment(item.endDate).format('DD-MM-YYYY'));
      setAcademicYear(item.academicYear?.year ? item.academicYear?.year : '');
      setFaculty(item.faculty.facultyName);
      setCategory(item.category.categoryName);

      setIsPublish(item.isPublish);
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
    dispatch(actions.formActions.setProgramId(item.programId));

    navigate(`/admin/Program/Chapter/${'AddContent'}`);
  };
  const fetchProgramContent = async () => {
    const response = await apiService.getContentProgram(item.programId);
    if (response) {
      setListContent(response);
    }
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
      <div className="my-10 h-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={listContent.map((item: any) => item.contentId)}
            strategy={verticalListSortingStrategy}
          >
            {listContent.length > 0 &&
              listContent.map((item: any, index: number) => (
                <ChapterItem item={item} index={index} />
              ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex justify-end w-4/6 absolute right-0 top-[80vh] ">
        <CustomButton
          type="cancel"
          text="Quay Lại"
          onClick={() => handelCancel()}
          noIcon={true}
          color="blue-gray"
          className="w-2/5 my-3 mx-2 h-10"
        />
        {/* <CustomButton
          disabled
          type="cancel"
          text="Thêm Bài Kiểm Tra Cuối Kì"
          noIcon={true}
          variant="outlined"
          className="w-4/5 my-3 mx-2 h-10"
        /> */}
        <CustomButton
          type="cancel"
          text="Thêm Chương"
          noIcon={true}
          color="green"
          variant="outlined"
          className="w-2/5 my-3 mx-2 h-10"
          onClick={() => addChapter()}
        />
      </div>
    </div>
  );
}

const ChapterItem = ({ item, index }: { item: any; index: number }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item?.contentId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className=" relative w-full h-fit">
      <div className="absolute w-full top-[-10px] left-[95%]">
        <button className="mx-4">
          <TiDelete className="text-xl" />
        </button>
      </div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        key={item?.contentId}
        onClick={() => {
          navigate(`/admin/Program/Chapter/${index + 1}`);
          dispatch(actions.formActions.setChapter(index + 1));
          dispatch(actions.formActions.setContentId(item?.contentId));
          dispatch(actions.formActions.setProgramId(item?.programId));
        }}
        className="  chapterItem text-black  hover:text-white text-semibold my-5 p-4 rounded-2xl flex items-center justify-between bg-gray-200  hover:bg-primary "
      >
        <div className="flex w-full items-center">
          <Tooltip
            title="Để sắp xếp lại thứ tự, kéo và thả vào vị trí mong muốn"
            className="mr-4 h-full select-none cursor"
          >
            <HiChevronUpDown
              size={26}
              onClick={() => {}}
              className="text-primary icon font-bold"
            />
          </Tooltip>

          <p className="child font-bold font-customFont hover:text-white z-50">
            {/* Chương {index + 1}: */}
            {item.title}
          </p>
          <button className="mx-4">
            <FaPencilAlt />
          </button>
        </div>

        <IoIosArrowForward size={20} />
      </div>
    </div>
  );
};
