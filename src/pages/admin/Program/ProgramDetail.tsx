import React, { useEffect, useState } from 'react';
import { Form, message, Image, Tooltip } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { Breadcrumb } from '../../../components/sharedComponents';
import { API_URL } from '../../../api/api';
import CustomButton from '../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import apiService from '../../../api/apiService';
import { IoIosArrowForward } from 'react-icons/io';

import { HiChevronUpDown } from 'react-icons/hi2';

import { actions } from '../../../Redux';
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

export default function ProgramDetail() {
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [startDate, setStartDate]: any = useState();
  const [endDate, setEndDate]: any = useState();
  const [acedemicYear, setAcedemicYear]: any = useState();
  const [faculty, setFaculty]: any = useState();
  const [isPublish, setIsPublish]: any = useState();
  const [category, setCategory]: any = useState();
  const [listContent, setListContent]: any = useState([]);
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
      setAcedemicYear(item.academicYear?.year ? item.academicYear?.year : '');
      setFaculty(item.faculty.facultyName);
      setCategory(item.category.categoryName);
      4;
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
    console.log('Drag end called');
    const { active, over } = event;
    console.log('ACTIVE: ' + active.id);
    console.log('OVER :' + over.id);

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
    dispatch(actions.formActions.setNameMenu('Qu???n L?? Ch????ng Tr??nh'));
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
      <div className="ml-[10px]">
        <Breadcrumb
          router1={'/admin/Program'}
          name={'Ch????ng Tr??nh'}
          name2={`Chuy??n ?????`}
        />
      </div>
      <Form form={form} className="formCategory w-full px-5 mb-10">
        <div className="flex justify-between">
          <div>
            <FormInput
              label="T??n Ch????ng Tr??nh"
              name="programName"
              disabled={true}
            />
            <FormInput
              label="M?? T???"
              type="textArea"
              name="descriptions"
              disabled={true}
            />
            <FormInput
              className="mt-2"
              label="Ph??ng/Khoa"
              value={faculty}
              disabled={true}
            />
          </div>
          <div>
            <FormInput label="??i???m ?????t ???????c" name="coin" disabled={true} />
            <FormInput label="Ng??y B???t ?????u" value={startDate} disabled={true} />
            <FormInput label="Ng??y K???t th??c" value={endDate} disabled={true} />
            <FormInput label="Danh M???c" value={category} disabled={true} />
          </div>
          <div
            style={{
              width: '20%',
            }}
          >
            <label className="text-black font-bold font-customFont  mb-4">
              ???nh gi???i thi???u
            </label>

            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                marginTop: 13,
              }}
              src={`${API_URL}/images/${image}`}
            />
            <div className="mt-10">
              <FormInput
                className="min-w-[12rem]"
                label="H???c K??"
                name="semester"
                disabled={true}
              />
              <FormInput
                className="min-w-[12rem]"
                label="N??m H???c"
                value={acedemicYear}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div
          className="w-full bg-gray-400 my-10"
          style={{
            height: 1,
          }}
        />
        <h1 className="text-black mb-2 font-semibold font-customFont mr-2 h-full text-xl">
          Danh S??ch ch????ng
        </h1>
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
      </Form>

      <div className="flex w-4/6 absolute right-0 bottom-[-70px] ">
        <CustomButton
          type="cancel"
          text="Quay L???i"
          onClick={() => handelCancel()}
          noIcon={true}
          color="blue-gray"
          className="w-2/5 my-3 mx-2 h-10"
        />
        {/* <CustomButton
          disabled
          type="cancel"
          text="Th??m B??i Ki???m Tra Cu???i K??"
          noIcon={true}
          variant="outlined"
          className="w-4/5 my-3 mx-2 h-10"
        /> */}
        <CustomButton
          type="cancel"
          text="Th??m Ch????ng"
          noIcon={true}
          color="green"
          variant="outlined"
          className="w-3/5 my-3 mx-2 h-10"
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
      className="chapterItem text-black  hover:text-white text-semibold my-5 p-4 rounded-2xl flex items-center justify-between bg-gray-200  hover:bg-primary "
    >
      <div className="flex w-full items-center">
        <Tooltip
          title="????? s???p x???p l???i th??? t???, k??o v?? th??? v??o v??? tr?? mong mu???n"
          className="mr-4 h-full select-none cursor"
        >
          <HiChevronUpDown
            size={26}
            onClick={() => {}}
            className="text-primary icon font-bold"
          />
        </Tooltip>

        <p className="child font-bold font-customFont hover:text-white z-50">
          {/* Ch????ng {index + 1}: */}
          {item.contentTitle}
        </p>
      </div>

      <IoIosArrowForward size={20} />
    </div>
  );
};
