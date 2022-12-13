import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, Image } from 'antd';
import uniqueId from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import ImagePlaceHolder from '../../../assets/img/menu-bg.jpeg';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { API_URL } from '../../../api/api';
import moment from 'moment';
import noImg from '../../../assets/img/no-image.png';
import EditProgram from './EditProgram';
import { useLocation } from 'react-router-dom';

import { useNavigateParams } from '../../../hook/useNavigationParams';
export default function Program() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    getData();
    let out = setTimeout(() => {
      setLoading(false);
      setConfirmLoading(false);
    }, 1000);
    return () => {
      clearTimeout(out);
    };
  }, [reload, location]);
  async function handleDelete(item: any) {
    try {
      let res: any = await apiService.getContentProgram(item.programId);
      console.log(res.length);
      if (res.length === 0) {
        await apiService.delProgram(item.programId);

        setReload(!reload);
        message.success(MESSAGE.SUCCESS.DELETE);
      } else {
        message.error(
          'Chương trình hiện tại đang có nội dung, xin vui lòng xoá hết nội dung của chương trình này để xoá chương trình',
        );
      }
    } catch (err: any) {
      throw err.message;
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
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },

    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Ngày BĐĐK',
      dataIndex: 'startDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Ngày KTĐK',
      dataIndex: 'endDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Giờ đào tạo',
      dataIndex: 'time',
      width: '10%',
      render: (data: any) => <p>{data ? data : 0}</p>,
    },

    {
      title: 'Trạng thái',
      dataIndex: 'isPublish',
      render: (status: any) => {
        return status ? (
          <a className="font-bold text-blue-500">{'Công khai'}</a>
        ) : (
          <a className="font-bold text-orange-500">{'Chưa công khai'}</a>
        );
      },
      width: '13%',
    },
    {
      width: GIRD12.COL2,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <PopOverAction
            size="sm"
            detailType="chapter"
            handleEdit={() => handelDataProgram(item)}
            handleDelete={() => handleDelete(item)}
            handleShowDetail={() => handleShowDetail(item)}
          />
        );
      },
    },
  ];

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(value, 'gi');
    let temp = data;
    const filteredData = temp
      .map((record: IProgramItem) => {
        const emailMatch = record.programName.match(reg);
        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  async function getData() {
    try {
      setLoading(true);
      let res: any = await apiService.getPrograms();
      res = res.reverse();
      let temp;
      let paths = location.pathname.split('/');
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
      throw err.message();
    }
  }
  function handelDataProgram(item?: any) {
    dispatch(actions.formActions.setProgramForm(item));
    navigate('/admin/EditProgram');
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
        loading={loading || confirmLoading}
        extra={[
          <CustomButton
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => {
              navigate('/admin/EditProgram');
              dispatch(actions.formActions.setProgramForm(null));
            }}
          />,
        ]}
      />
    </>
  );
}
