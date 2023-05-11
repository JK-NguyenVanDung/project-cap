import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IAccountItem, IProgramItem, IRoleItem } from '../../../Type';
import { actions } from '../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { useNavigate } from 'react-router-dom';
import { Space, notification } from 'antd';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { AiFillIdcard, AiOutlineFileProtect } from 'react-icons/ai';
import { IoPersonAdd } from 'react-icons/io5';
export default function () {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [addLearner, setAddLearner] = useState(false);

  const [filterData, setFilterData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const info = useAppSelector((state) => state.auth.info);
  info;
  useEffect(() => {
    async function getProgramPublish() {
      try {
        let response: any = await apiService.getSupportPrograms(info.accountId);

        response = response.reverse();
        let res = response.map((item: any, index: number) => {
          return {
            ...item.program,
            index: index + 1,
          };
        });
        setData(res);
        setFilterData(res);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(actions.formActions.setNameMenu(`Quản lý chương trình hỗ trợ`));

    getProgramPublish().finally(() => setLoading(false));
  }, [loading]);
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên chương trình',
      dataIndex: 'programName',
      width: GIRD12.COL4,
    },
    {
      title: 'Giảng Viên',
      dataIndex: 'lecturers',
      width: GIRD12.COL1,
    },
    // {
    //   title: 'Số Lượng Học Viên',
    //   dataIndex: 'countLearner',
    //   width: '12%',
    // },
    // {
    //   title: 'Đơn Đăng Ký Chờ Duyệt',
    //   dataIndex: 'countApplication',
    //   width: '12%',
    // },
    {
      width: GIRD12.COL1,

      title: 'Thao tác',
      render: (item: IProgramItem) => {
        return (
          <Space>
            <CustomButton
              tip="Xem Danh Sách Điểm Danh"
              size="sm"
              color="cyan"
              Icon={BsFillPersonBadgeFill}
              onClick={() => goAttendances(item)}
            />
          </Space>
        );
      },
    },
  ];
  function openAddSupporter(program: IProgramItem) {
    setDetail(program);
    setAddLearner(true);
  }
  function goAttendances(item: any) {
    dispatch(actions.formActions.setProgramForm(item));
    dispatch(actions.formActions.setRole('support'));

    navigate('/admin/Attendance');
  }

  function goLearner(item: any) {
    dispatch(actions.formActions.setProgramForm(item));

    navigate('/admin/ListLearner');
  }
  const goApplication = (item: any) => {
    dispatch(actions.formActions.setProgramForm(item));
    navigate('/admin/Application');
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
      .filter((record: any) => !!record);

    setData(value.trim() !== '' && filteredData ? filteredData : filterData);
  };
  const handleSubmit = async (values: any, form: any, valueLearner: any) => {
    //reload
    dispatch(actions.reloadActions.setReload());
    setLoading(true);

    // if (detail) {
    //   const data = await apiService.updateLearner(
    //     detail.learnerId,
    //     values,
    //   );
    //   if (data) {
    //     notification.success({ message: 'Thay đổi thành công' });
    //   }
    //   setShowModal(false);
    //   form.resetFields();
    // } else {
    const data: null = null;
    //await apiService.addLearner(valueLearner);

    if (data) {
      notification.success({ message: 'Thêm thành công' });
    }
    setAddLearner(false);
    form.resetFields();
    // }

    setTimeout(() => {
      setLoading(false);

      dispatch(actions.reloadActions.setReload());
    }, 1000);
  };
  return (
    <div className="max-sm:w-fit max-sm:mr-12 max-md:mr-12">
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        loading={loading}
      />
    </div>
  );
}
