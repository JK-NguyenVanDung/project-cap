import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, Image, Modal, notification, Space } from 'antd';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { API_URL } from '../../../api/api';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useNavigateParams } from '../../../hook/useNavigationParams';
import { IoStatsChart } from 'react-icons/io5';
export default function Program() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();
  const info = useAppSelector((state) => state.auth.info);
  let paths = location.pathname.split('/');

  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Quản Lý Chương Trình`));
    getData().finally(() => setLoading(false));
  }, [loading, location]);
  async function handleDelete(item: any) {
    try {
      await apiService.delProgram(item.programId).then(() => {
        notification.success({ message: MESSAGE.SUCCESS.DELETE });
        setLoading(true);
      });
    } catch (err: any) {
      notification.error({
        message:
          'Chương trình hiện tại đang có nội dung hoặc đã được duyệt, xin vui lòng xoá hết nội dung của chương trình này để xoá chương trình hoặc ẩn chương trình đi',
      });
    }
  }

  function handleShowDetail(item: any) {
    dispatch(actions.formActions.setProgramForm(item));
    dispatch(
      actions.formActions.setNameMenu(
        `Khóa Học ${item.programName && item.programName}`,
      ),
    );
    navigate(`/admin/Program/showDetail`);
  }
  function handleResult(item: any) {
    dispatch(actions.formActions.setProgramForm(item));
    dispatch(
      actions.formActions.setNameMenu(
        `Kết quả: Khóa Học ${item.programName && item.programName}`,
      ),
    );
    navigate(`/admin/Program/Result`);
  }

  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên chương trình',
      dataIndex: 'programName',
      width: GIRD12.COL2,
    },
    {
      title: 'Ngày BĐĐK',
      dataIndex: 'registrationStartDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Ngày KTĐK',
      dataIndex: 'registrationEndDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Giờ đào tạo',
      dataIndex: 'trainingHours',
      width: '13%',
      render: (data: any) => <p>{data ? data : 0}</p>,
    },

    {
      title: 'Trạng thái',
      key: 'status',
      render: (data: any) => {
        return data.status == 'approved' ? (
          <h5 className="font-semibold text-primary">Đã Duyệt</h5>
        ) : data.status == 'denied' ? (
          <h5 className="font-semibold text-red-500">Từ Chối</h5>
        ) : data.status == 'save' ? (
          <h5 className="font-semibold text-yellow-800">Lưu Nháp</h5>
        ) : data.status == 'public' ? (
          <h5 className="font-semibold text-green-500">Công Khai</h5>
        ) : data.status == 'hide' ? (
          <h5 className="font-semibold text-purple-500">Riêng Tư</h5>
        ) : data.status == 'end' ? (
          <h5 className=" text-black font-bold">Kết Thúc</h5>
        ) : (
          <h5 className="font-semibold text-orange-500">Chờ Duyệt</h5>
        );
      },
    },

    {
      width: GIRD12.COL2,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <PopOverAction
            disabled={
              paths[paths.length - 1] === 'MyProgram' || info?.roleId === 2
                ? false
                : true
            }
            size="sm"
            detailType="chapter"
            handleEdit={() => handelDataProgram(item)}
            handleDelete={() => handleDelete(item)}
            handleShowDetail={() => handleShowDetail(item)}
            ExtraButton={
              <CustomButton
                text=""
                Icon={IoStatsChart}
                size="sm"
                color="blue-gray"
                tip="Thống kê khóa học"
                onClick={() => handleResult(item)}
              />
            }
          />
        );
      },
    },
  ];
  const goApplication = (item: any) => {
    return;
  };
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.programName).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  async function getData() {
    try {
      let res: any = await apiService.getPrograms();
      res = res.reverse();
      let temp;
      if (paths[paths.length - 1] === 'MyProgram') {
        temp = res.map((v: any, index: number) => {
          return {
            ...v,
            index: index + 1,
          };
        });
        temp = temp.filter((a: any) => a.accountIdCreator == info.accountId);
      } else {
        temp = res.map((v: any, index: number) => {
          return {
            ...v,
            index: index + 1,
          };
        });
      }

      // dispatch(actions.ProgramActions.setListAll(res))
      // dispatch(actions.ProgramActions.changeLoad(!loadData))
      setData(temp);
      setFilterData(temp);
    } catch (err: any) {
      throw err.message;
    }
  }
  function handelDataProgram(item?: any) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate('/admin/FormProgram');
  }
  // function temp() {
  //   dispatch(actions.formActions.setChapter(1));
  //   dispatch(actions.formActions.setContentId(22));
  //   navigateParams(`/admin/Program/Chapter/${1}/Test`, {
  //     id: 22,
  //   });
  // }

  return (
    //22
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        loading={loading}
        extra={[
          <CustomButton
            disabled={
              paths[paths.length - 1] === 'MyProgram' || info?.roleId === 2
                ? false
                : true
            }
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => {
              navigate('/admin/FormProgram');
              dispatch(actions.formActions.setProgramForm(null));
            }}
          />,
        ]}
      />
    </>
  );
}
