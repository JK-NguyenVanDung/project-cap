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
export default function Program() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const dispatch = useAppDispatch();

  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);

  const navigate = useNavigateParams();

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  async function handleDelete(item: IProgramItem) {
    try {
      // await apiService.removeProgram(item.ProgramId);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message();
    }
  }

  function handleShowDetail(item: IProgramItem) {
    // navigate(`/admin/Program/${item.ProgramId}`);
    dispatch(
      actions.formActions.setNameMenu(
        `Chương trình ${item.ProgramName && item.ProgramName}`,
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
      title: 'Tên danh mục',
      width: GIRD12.COL4,
      render: (data: IProgramItem) => (
        <div className="flex flex-row w-full items-center">
          <Image
            width={50}
            src={data.Image}
            placeholder={
              <Image preview={false} src={ImagePlaceHolder} width={50} />
            }
          />
          <p className="font-customFont ml-5  text-black">{data.ProgramName}</p>{' '}
        </div>
      ),
    },

    {
      title: 'Ngày bắt đầu',
      dataIndex: 'StartDate',
      width: GIRD12.COL2,
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'EndDate',
      width: GIRD12.COL2,
    },
    {
      title: 'Tổng coin',
      dataIndex: 'Coin',
      width: '10%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'IsPublish',
      width: GIRD12.COL2,
      render: (data: boolean) => (
        <p className={`${data ? 'text-primary' : 'text-yellow-700'}`}>
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
          <>
            <PopOverAction
              size="sm"
              data={item}
              handleEdit={() => console.log('edit')}
              handleDelete={() => handleDelete(item)}
              handleShowDetail={() => handleShowDetail(item)}
              deleteItem={item.ProgramName}
            />
          </>
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
  function handelDataProgram() {
    navigate('/admin/EditProgram', {
      state: {
        data,
      },
    });
  }

  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        loading={loading}
        extra={[
          <CustomButton
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => handelDataProgram()}
          />,
        ]}
      />
    </>
  );
}
