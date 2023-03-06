import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderClient from '../../../components/Header/HeaderClient';
import Loading from '../../../components/sharedComponents/Loading';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import logo from '../../../assets/logo.svg';

import { Image, Input } from 'antd';
import ResultProgramChart from '../../../components/Chart/ResultProgramChart';

const { TextArea } = Input;

const DataChart = [
  {
    testTitle: 'abc',
    averageTestScore: 10,
  },
  {
    testTitle: 'ab2',
    averageTestScore: 25,
  },
  {
    testTitle: 'ab3',
    averageTestScore: 30,
  },
  {
    testTitle: 'ab4',
    averageTestScore: 50,
  },
];
export const Space = ({
  size,
  sizeWidth,
}: {
  size?: number;
  sizeWidth?: number;
}) => {
  return (
    <div
      style={{
        height: size ?? 0,
        width: sizeWidth ?? '100%',
      }}
    />
  );
};
export default function ResultProgram() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const info = useAppSelector((state: any) => state.auth.info);
  const program: IProgramItem = useAppSelector(
    (state: any) => state.form.setProgram,
  );
  return (
    <>
      <Space size={5} />
      <div className="m-5">
        <Loading loading={loading} />
        <div className="w-full  p-4 bg-white rounded-lg shadow-lg">
          <h1 className="font-bold text-lg text-gray-600">
            {program.programName}
          </h1>
          <Space size={2} />
          <p className="text-success">Bạn Đã hoàn Thành Khóa Học</p>
          <Space size={15} />
          <div className="flex">
            <div className="max-h-[60vh] w-[50vw] ">
              <img
                className="rounded-lg object-cover h-full w-full"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              />
            </div>
            <Space sizeWidth={10} />
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1 ml-3 mr-3 ">
                <h3 className="font-bold text-gray-600">Hoàn Thành Loại: </h3>
                <Space size={10} />
                <h3 className="font-bold text-gray-600">Điểm Trung Bình: </h3>
                <Space size={10} />
                <h3 className="font-bold text-gray-600">Số Buổi Tham Dự: </h3>
                <Space size={10} />
                <h3 className="font-bold text-gray-600">Thời Gian Tham Dự: </h3>
                <Space size={10} />
              </div>
              <div className="ml-4">
                <h3 className=" text-black">Giỏi </h3>
                <Space size={10} />
                <h3 className=" text-black">8,5 Điểm</h3>
                <Space size={10} />
                <h3 className=" text-black">10/24</h3>
                <Space size={10} />
                <h3 className=" text-black">2000 Giờ</h3>
                <Space size={10} />
              </div>
            </div>
          </div>
          <Space size={15} />
          <TextArea
            rows={6}
            placeholder="Nhận xét của giảng viên"
            className="rounded-md"
            disabled
          />
          <Space size={15} />
        </div>
        <ResultProgramChart data={DataChart} />
      </div>
    </>
  );
}
