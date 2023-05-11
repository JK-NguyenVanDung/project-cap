import React, { useEffect, useState } from 'react';
import { Form, message, Image, Tooltip, Select } from 'antd';
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
import { IProgramItem } from '../../../Type';
import { AxiosResponse } from 'axios';
const { Option } = Select;

export default function ProgramDetail() {
  const [form] = Form.useForm();
  const [image, setImage] = useState('');
  const [listContent, setListContent]: any = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const item: IProgramItem = useAppSelector((state) => state.form.setProgram);
  const reload = useAppSelector((state) => state.form.reload);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [positions, setPositions]: any = useState([]);
  console.log(item.programPositions);

  useEffect(() => {
    setPositions(
      item.programPositions.map((item) => item.position.positionName),
    );

    item && setImage(item?.image);
    item
      ? form.setFieldsValue({
          acedemicYearName: item.academicYear.year ?? '',
          programName: item.programName ?? '',
          descriptions: item.descriptions ?? '',
          categoryName: item.category?.categoryName ?? '',
          TrainingHours: item.trainingHours ?? '',
          semester: item.semester ?? '',
          MaxLearner: item.maxLearner ?? '',
          coin: item.coin ?? '',
          startDate:
            moment(item.startDate).local().format('DD-MM-YYYY mm:hh') ?? '',
          endDate:
            moment(item.endDate).local().format('DD-MM-YYYY mm:hh') ?? '',
          facultyName: item.faculty.facultyName ?? '',
          image: item.image ?? '',
          lecturers: item.lecturers ?? '',
          registrationEndDate:
            moment(item.registrationEndDate)
              .local()
              .format('DD-MM-YYYY mm:hh') ?? '',
          registrationStartDate:
            moment(item.registrationStartDate)
              .local()
              .format('DD-MM-YYYY mm:hh') ?? '',
        })
      : null;
    fetchProgramContent();
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
        const overIndex: any = items.indexOf(
          items.find((e: any) => e.contentId === over.id),
        );
        sortData(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
  async function sortData(newArr: any) {
    try {
      await apiService.sortProgram({
        contents: newArr.map((item: any, index: number) => {
          return {
            contentId: item.contentId,
            chapter: index + 1,
          };
        }),
      });
    } catch (err) {}
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

  function handelViewMore() {
    setViewMore(!viewMore);
  }
  return (
    <div className="w-full h-full relative">
      <div className="ml-[10px] mb-6">
        <Breadcrumb
          router1={'/admin/Program'}
          name={'Chương Trình'}
          name2={item?.programName}
        />
      </div>
      <Form form={form} className="formCategory w-full px-5 mb-10">
        <div className=" flex justify-between">
          <div className="w-2/5">
            <FormInput
              label="Tên Chương Trình"
              name="programName"
              disabled={true}
            />
            <FormInput
              label="Mô Tả"
              type="textArea"
              name="descriptions"
              disabled={true}
              areaHeight={11.5}
            />

            {viewMore && (
              <>
                <FormInput
                  className="mt-2"
                  label="Phòng/Khoa"
                  name="facultyName"
                  disabled={true}
                />
                <FormInput
                  label="Danh Mục"
                  name="categoryName"
                  disabled={true}
                />
              </>
            )}
          </div>
          <div className="w-2/5 pr-12 pl-12">
            <FormInput
              label="Số Giờ Đào Tạo"
              name="TrainingHours"
              disabled={true}
            />
            <FormInput label="Coin" name="coin" disabled={true} />
            <FormInput
              label="Số Lượng Học Viên Tối Đa"
              name="MaxLearner"
              disabled={true}
            />
            {viewMore && (
              <>
                <label className="text-black font-bold font-customFont">
                  Chức vụ
                </label>
                <div className="my-2">
                  {positions.map((item: any) => {
                    return (
                      <ul
                        role="list"
                        className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400 my-1"
                      >
                        <li>{item}</li>
                      </ul>
                    );
                  })}
                </div>

                <FormInput label="Điểm Đạt Được" name="coin" disabled={true} />
                <FormInput
                  label="Ngày Bắt Đầu"
                  name="startDate"
                  disabled={true}
                />
              </>
            )}
          </div>
          <div className="w-2/5">
            <label className="text-black font-bold font-customFont  mb-4">
              Ảnh giới thiệu
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
            <div className="mt-10 mb-11">
              <FormInput label="Học Kì" name="semester" disabled={true} />
              <FormInput
                label="Năm Học"
                name="acedemicYearName"
                disabled={true}
              />
            </div>
            <FormInput
              label="Ngày Bắt Đầu Đăng Ký"
              name="registrationStartDate"
              disabled={true}
            />
            <FormInput
              label="Ngày Kết Thúc Đăng Ký"
              name="registrationEndDate"
              disabled={true}
            />
            <FormInput label="Ngày Kết thúc" name="endDate" disabled={true} />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <CustomButton
            type="cancel"
            text={viewMore ? 'Ẩn Bớt' : `Xem Thêm`}
            noIcon={true}
            color={viewMore ? 'gray' : `blue`}
            variant="outlined"
            className="w-1/5 my-3 mx-2 h-10 "
            onClick={handelViewMore}
          />
        </div>
        <div
          className="w-full bg-gray-400 my-10"
          style={{
            height: 1,
          }}
        />
        <h1 className="text-black mb-2 font-semibold font-customFont mr-2 h-full text-xl">
          Danh Sách chương
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
          {item.contentTitle}
        </p>
      </div>

      <IoIosArrowForward size={20} />
    </div>
  );
};
