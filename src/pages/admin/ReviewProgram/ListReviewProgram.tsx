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
import { useAppDispatch } from '../../../hook/useRedux';
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
    getListReviewProgram();
  }, [loading, confirmLoading]);
  const handelEdit = (item: any) => {
    setDetail(item);
    setAddListReviewProgram(true);
  };
  const Columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên chương trình',
      dataIndex: 'programName',
    },
    {
      title: 'Trạng thái',
      key: 'isPublish',
      render: (data: any) => {
        console.log(data);
        return data.isPublish ? (
          <CustomButton
            type="Success"
            Icon={AiFillUnlock}
            text="Công Khai"
            className="font-bold text-white"
            color="green"
            onClick={() => handelApprove(data)}
          />
        ) : (
          <CustomButton
            type="error"
            Icon={AiFillLock}
            color="red"
            text="Riêng Tư"
            className="font-bold text-white"
            onClick={() => handelApprove(data)}
          />
        );
      },
      width: GIRD12.COL2,
    },
    {
      title: 'Thao tác',
      key: 'action',

      render: (data: any) => (
        <PopOverAction
          size="sm"
          authType="addReviewer"
          handleAuth={() => handelEdit(data)}
          handleShowDetail={() => handelDataProgram(data)}
        />
      ),
      width: GIRD12.COL2,
    },
  ];
  function handelDataProgram(data: any) {
    dispatch(actions.formActions.setProgramForm(data));
    navigate('/admin/reviewDetail');
  }
  function handelApprove(items: any) {
    Modal.confirm({
      title: 'xác nhận',
      icon: <AiFillWarning size={30} color={Color.warning} />,
      content: 'Bạn có chắc chắn công khai chương trình này ?',
      okText: 'yes',
      okType: 'danger',
      onOk() {
        const ApproveShipper = async () => {
          // const data = await apiService.ApproveShiper(items.id);
          if (data) {
            message.success('duyệt thành công thành công');
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }
        };
        ApproveShipper();
      },
      onCancel() {
        message.error('hủy');
      },
    });
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
