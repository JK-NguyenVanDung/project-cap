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
import { useAppDispatch } from '../../../hook/useRedux';
import { API_URL } from '../../../api/api';
import moment from 'moment';
import noImg from '../../../assets/img/no-image.png';
import EditProgram from './EditProgram';
import { useNavigateParams } from '../../../hook/useNavigationParams';
export default function Program() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
      setConfirmLoading(false);
    }, 1000);
  }, [reload]);
  async function handleDelete(item: any) {
    try {
      await apiService.delProgram(item.programId);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message();
    }
  }

  function handleShowDetail(item: any) {
    navigate(`/admin/Program/showDetail`);
    dispatch(actions.formActions.setProgramForm(item));
    dispatch(
      actions.formActions.setNameMenu(
        `Khóa Học ${item.programName && item.programName}`,
      ),
    );
  }

  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },
    {
      title: 'Banner',
      width: GIRD12.COL4,
      render: (data: any) => (
        <div className="flex flex-row w-full items-center">
          <Image
            width={50}
            src={data.image ? `${API_URL}/images/${data.image}` : noImg}
            placeholder={
              <Image preview={false} src={ImagePlaceHolder} width={50} />
            }
          />
          <p className="font-customFont ml-5  text-black">{data.ProgramName}</p>{' '}
        </div>
      ),
    },

    {
      title: 'Tên Danh Mục',
      dataIndex: 'programName',
      width: GIRD12.COL2,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      width: GIRD12.COL2,
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      width: GIRD12.COL2,
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Tổng coin',
      dataIndex: 'coin',
      width: '10%',
      render: (data: any) => <p>{data ? data : 0}</p>,
    },

    // {
    //   title: 'Cập nhật vào',
    //   dataIndex: 'updatedAt',
    //   // render: (text) => <a>{text}</a>,
    //   width: GIRD12.COL1,
    // },
    {
      width: GIRD12.COL2,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <PopOverAction
            size="sm"
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
        const emailMatch = record.ProgramName.match(reg);
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
      const temp = res.map((v: any, index: number) => {
        return {
          ...v,
          index: index + 1,
        };
      });
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

  return (
    <>
      <CustomButton
        onClick={() =>
          navigateParams(`/admin/Program/Chapter/${8}/Test`, { id: 8 })
        }
        text="qua test nhanh"
        noIcon
      />

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
