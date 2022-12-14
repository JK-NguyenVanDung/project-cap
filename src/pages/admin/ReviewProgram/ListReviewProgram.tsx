import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import CustomButton from '../../../components/admin/Button';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { Button, message, Modal, notification, Popconfirm } from 'antd';
import { GIRD12, MESSAGE } from '../../../helper/constant';
import PopOverAction from '../../../components/admin/PopOver';
import { AiFillUnlock, AiFillLock, AiFillWarning } from 'react-icons/ai';
import moment from 'moment';
import Color from '../../../components/constant/Color';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import AddReviewer from '../../../components/admin/Review/AddReviewer';
export default function ListReviewPrograms() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [addListReviewProgram, setAddListReviewProgram] = useState(false);
  const [detail, setDetail] = useState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const info: any = useAppSelector((state) => state.auth.info);
  const [approve, setApprove] = useState(false);
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    async function getListReviewProgram() {
      try {
        let response: any = await apiService.getReviewProgram();
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        });
        setData(res);
        setTimeout(() => {
          setLoading(false);
          setFilterData(res);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    const getListReviewProgramId = async () => {
      try {
        let response: any = await apiService.getListProgramsByReviewer(
          info.accountId,
        );
        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item.program,
            index: index + 1,
          };
        });
        setData(res);
        setTimeout(() => {
          setLoading(false);
          setFilterData(res);
          setConfirmLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };

    info.roleId === 2 ? getListReviewProgram() : getListReviewProgramId();
  }, [loading, confirmLoading]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddListReviewProgram(true);
  };
  const Columns = [
    {
      title: 'T??n ch????ng tr??nh',
      dataIndex: 'programName',
      width: GIRD12.COL2,
    },
    {
      title: 'Ng??y B????K',
      dataIndex: 'startDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Ng??y KT??K',
      dataIndex: 'endDate',
      render: (item: any) => {
        return <p>{moment(item).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Gi??? ????o t???o',
      dataIndex: 'time',
      width: '13%',
      render: (data: any) => <p>{data ? data : 0}</p>,
    },

    {
      title: 'Tr???ng th??i',
      key: 'status',
      render: (data: any) => {
        return data.status == 'approved' ? (
          <h5 className="text-bold text-primary">???? Duy???t</h5>
        ) : data.status == 'denied' ? (
          <h5 className="text-bold text-red-500">T??? Ch???i</h5>
        ) : data.status == 'save' ? (
          <h5 className="text-bold text-yellow-800">L??u nh??p</h5>
        ) : data.status == 'public' ? (
          <h5 className="text-bold text-green-500">C??ng Khai</h5>
        ) : data.status == 'hide' ? (
          <h5 className="text-bold text-purple-500">Ri??ng t??</h5>
        ) : (
          <h5 className="text-bold text-orange-500">Ch??? Duy???t</h5>
        );
      },
      width: '18%',
    },
    {
      title: 'Thao t??c',
      key: 'action',

      render: (data: any) => (
        <>
          {info.roleId === 2 || info.roleId === 4 ? (
            <PopOverAction
              size="sm"
              authType="addReviewer"
              handleAuth={() => handelEdit(data)}
              handleShowDetail={() => handelDataProgram(data)}
            />
          ) : (
            <PopOverAction
              size="sm"
              authType="addReviewer"
              handleShowDetail={() => handelDataProgram(data)}
            />
          )}
        </>
      ),
      width: GIRD12.COL2,
    },
  ];
  function handelDataProgram(data: any) {
    dispatch(actions.formActions.setProgramForm(data));
    navigate('/admin/reviewDetail');
  }
  function handelApprove(items: any) {
    setApprove(true);
    setItemData(items);
  }
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
      .filter((record: any) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  function handelAdd() {
    setAddListReviewProgram(true);
    setDetail(null);
  }

  return (
    <>
      <AddReviewer
        show={addListReviewProgram}
        setShow={setAddListReviewProgram}
        program={detail}
      />
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={Columns}
        loading={loading || confirmLoading}
        // extra={[
        //   <CustomButton
        //     type="add"
        //     size="md"
        //     key={`${uniqueId()}`}
        //     onClick={() => handelAdd()}
        //   />,
        // ]}
      />
    </>
  );
}
