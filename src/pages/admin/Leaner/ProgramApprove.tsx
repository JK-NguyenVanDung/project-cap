import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
export default function ProgramApprove() {
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const info = useAppSelector((state) => state.auth.info);

  useEffect(() => {
    getData();
  }, []);

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
      width: GIRD12.COL2,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <PopOverAction
            size="sm"
            detailType="chapter"
            handleEdit={() => goLeaner(item)}
            handleShowDetail={() => goApplication(item)}
          />
        );
      },
    },
  ];
  function goLeaner(item: any) {
    dispatch(actions.formActions.setProgramForm(item));

    navigate('/admin/ListLeaner');
  }
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

  return (
    //22
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        loading={loading || confirmLoading}
      />
    </>
  );
}
