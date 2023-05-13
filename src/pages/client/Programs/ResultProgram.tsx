import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderClient from '../../../components/Header/HeaderClient';
import Loading from '../../../components/sharedComponents/Loading';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { IProgramItem } from '../../../Type';
import logo from '../../../assets/logo.svg';

import { Image, Input } from 'antd';
import ResultProgramChart from '../../../components/Chart/ResultProgramChart';
import apiService from '../../../api/apiService';
import { API_URL } from '../../../api/api';
import CustomButton from '../../../components/admin/Button';

const { TextArea } = Input;

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
  const [dataResultProgram, setDataResultProgram]: any = useState();
  const [dataChart, setDataChart]: any = useState([]);
  useEffect(() => {
    const fetchResultProgram = async () => {
      try {
        const data: any = await apiService.getResultProgram(
          info.accountId,
          program.programId,
        );
        setLoading(true);
        if (data) {
          setDataResultProgram(data);
          setLoading(false);
          setDataChart(
            data?.resultTests.map((item: any) => {
              return {
                testTitle: item?.test?.testTitle ?? '',
                score: item?.score ?? '',
              };
            }),
          );
        }
      } catch (error: any) {
        throw error.message;
      }
    };
    fetchResultProgram();
  }, []);
  const goDetailBadge = () => {
    navigate('/detailBadge');
    dispatch(actions.formActions.setProgramId(program));
  };
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
                className="rounded-lg object-cover	h-full w-full"
                src={`${API_URL}/images/${program.image}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
                }}
                alt=""
              />
            </div>
            <Space sizeWidth={30} />
            <div className="w-2/6">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-600">Số Buổi Tham Dự: </h3>
                <h3 className=" text-black">
                  {dataResultProgram?.myAttendance ?? 0}/
                  {dataResultProgram?.totalAttendance ?? 0}
                </h3>
              </div>
              <Space size={30} />
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-600">Thời Gian Tham Dự: </h3>
                <h3 className=" text-black">
                  {dataResultProgram?.trainingHours ?? 0} Giờ
                </h3>
              </div>
              <Space size={30} />
              <TextArea
                rows={4}
                className="rounded-md font-bold"
                value={
                  dataResultProgram?.comment
                    ? `Nhận Xét Của Giảng Viên: ${dataResultProgram?.comment} `
                    : 'Nhận Xét Của Giảng Viên: . . .'
                }
                disabled
              />
              <Space size={30} />
              <CustomButton
                size="md"
                noIcon
                text="Xem chứng chỉ"
                onClick={goDetailBadge}
              />
            </div>
          </div>
          <Space size={15} />
        </div>
        <Space size={20} />
        <ResultProgramChart data={dataChart} />
        <Space size={20} />
      </div>
    </>
  );
}
