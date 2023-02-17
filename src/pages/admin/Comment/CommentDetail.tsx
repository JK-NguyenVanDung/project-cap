import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { notification } from 'antd';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import moment from 'moment';
import noImg from '../../../assets/img/no-image.png';

import { useLocation } from 'react-router-dom';
import { useNavigateParams } from '../../../hook/useNavigationParams';

export default function () {
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
  const program = useAppSelector((state) => state.form.setProgram);

  let paths = location.pathname.split('/');

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
      await apiService.deleteComment(item.id);
      setReload(!reload);
      notification.success({ message: MESSAGE.SUCCESS.DELETE });
    } catch (err: any) {
      notification.error({
        message:
          'Chương trình hiện tại đang có nội dung hoặc đã được duyệt, xin vui lòng xoá hết nội dung của chương trình này để xoá chương trình hoặc ẩn chương trình đi',
      });
    }
  }

  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tài khoản bình luận',
      dataIndex: 'account',
      width: GIRD12.COL2,
      render: (item: any) => {
        return <p>{item.email}</p>;
      },
    },
    {
      width: GIRD12.COL2,
      title: 'Bình luận lúc',
      dataIndex: 'createdAt',
      render: (item: any) => {
        return <p>{moment(item).format('HH:MM - DD-MM-YYYY')}</p>;
      },
    },

    {
      title: 'Bình luận',

      dataIndex: 'content',
    },

    {
      width: '10%',

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <PopOverAction size="sm" handleDelete={() => handleDelete(item)} />
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
        const emailMatch = removeVietnameseTones(record.account?.email).match(
          reg,
        );

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
      setLoading(true);
      let res: any = await apiService.getComment(program.programId);
      res = res.reverse();
      let temp;

      temp = res.map((v: any, index: number) => {
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
        loading={loading || confirmLoading}
        extra={[
          <CustomButton
            noIcon
            size="md"
            variant="outlined"
            className="w-32 "
            text="Quay lại"
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(-1);
              dispatch(actions.formActions.setProgramForm(null));
            }}
          />,
        ]}
      />
    </>
  );
}
