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
import EditProgram from './EditProgram';
import SideBar from '..';
import { BsReverseLayoutSidebarInsetReverse } from 'react-icons/bs';
import { useNavigateParams } from '../../../hook/useNavigationParams';
import { API_URL } from '../../../api/api';
export default function Program() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);

  const navigate = useNavigateParams();

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
      setConfirmLoading(false);
    }, 1000);
  }, [reload]);
  async function handleDelete(item: IProgramItem) {
    try {
      await apiService.delProgram(item.programId);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message();
    }
  }

  function handleShowDetail(item: IProgramItem) {
    // navigate(`/admin/Program/${item.ProgramId}`);

    navigate(`/admin/Program/Chapter/${item.programId}/Test`, {
      id: item.programId,
    });

    // navigate(`/admin/Program/Chapter/${item.programId}`);
    dispatch(
      actions.formActions.setNameMenu(
        `Khóa Học ${item.programName && item.programName}`,
      ),
    );
  }
  console.log(data);

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
            src={`${API_URL}/images/${data.image}`}
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
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      width: GIRD12.COL2,
    },
    {
      title: 'Tổng coin',
      dataIndex: 'coin',
      width: '10%',
      render: (data: any) => <p>{data ? data : 0}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPublish',
      width: GIRD12.COL2,
      render: (data: boolean) => (
        <p className={`${data ? 'text-primary' : 'text-yellow-800'} font-bold`}>
          {data ? 'Công khai' : 'Chưa công khai'}
        </p>
      ),
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
      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));
      // dispatch(actions.ProgramActions.setListAll(res))
      // dispatch(actions.ProgramActions.changeLoad(!loadData))
      setData(temp);
      setFilterData(temp);
    } catch (err: any) {
      throw err.message();
    }
  }
  function handelDataProgram(item: any) {
    item.id
      ? navigate('/admin/EditProgram', item.id)
      : navigate('/admin/EditProgram', 'add');
  }

  return (
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
            onClick={() => handelDataProgram(data)}
          />,
        ]}
      />
    </>
  );
}
