import React, { useEffect, useState } from 'react';
import TableConfig from '../../../../components/admin/Table/Table';
import { Switch, notification } from 'antd';
import uniqueId, { removeVietnameseTones } from '../../../../utils/uinqueId';
import CustomButton from '../../../../components/admin/Button';
import apiService from '../../../../api/apiService';
import { GIRD12, MESSAGE } from '../../../../helper/constant';
import { ISurveyItem } from '../../../../Type';
import PopOverAction from '../../../../components/admin/PopOver';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useNavigateParams } from '../../../../hook/useNavigationParams';
import AddSurvey from './AddSurvey';

import PrivateSwitch from '../../../../components/Survey/PrivateSwitch';
import { FaQuestion } from 'react-icons/fa';
export default function Survey() {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<ISurveyItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();
  const info = useAppSelector((state) => state.auth.info);
  let paths = location.pathname.split('/');

  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Quản lý Khảo sát chung`));
    getData();
    let out = setTimeout(() => {
      setLoading(false);
      setConfirmLoading(false);
    }, 1000);
    return () => {
      clearTimeout(out);
    };
  }, [confirmLoading, location]);
  async function handleDelete(item: any) {
    try {
      await apiService.deleteSurvey(item.surveyId);
      setConfirmLoading(!confirmLoading);
      notification.success({ message: MESSAGE.SUCCESS.DELETE });
    } catch (err: any) {
      notification.error({
        message:
          'Khảo sát hiện tại đang có nội dung hoặc đã được duyệt, xin vui lòng xoá hết nội dung của khảo sát này để xoá khảo sát hoặc ẩn khảo sát đi',
      });
    }
  }
  function handleShowDetail(item: any) {
    dispatch(actions.surveyActions.setSelectedSurvey(item));
    dispatch(
      actions.formActions.setNameMenu(`Khảo sát ${item.title && item.title}`),
    );
    navigate(`/admin/Survey/Detail`);
  }
  function handleAddQuestions(item: any) {
    dispatch(actions.surveyActions.setSelectedSurvey(item));
    dispatch(
      actions.formActions.setNameMenu(`Khảo sát ${item.title && item.title}`),
    );
    navigate(`/admin/Survey/Question`);
  }
  function openModal() {
    setDetail(null);
    setShowModal(true);
  }

  const handleEdit = (item: ISurveyItem) => {
    setDetail({
      title: item.title,
      surveyTime: [moment(item.startDate), moment(item.endDate)],
      accountIdCreate: item.accountIdCreate,
      surveyId: item.surveyId,
    });

    setShowModal(true);
  };
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên khảo sát',
      dataIndex: 'title',
      width: GIRD12.COL3,
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
      title: 'Người đã làm',
      dataIndex: 'countAccount',
      width: '12%',
      render: (data: any) => <p>{data ? data : 0}</p>,
    },

    {
      width: '15%',

      title: 'Trạng thái',
      render: (item: ISurveyItem) => {
        return (
          <PrivateSwitch state={item.isPublish} surveyId={item.surveyId} />
        );
      },
    },
    {
      width: GIRD12.COL0,

      title: 'Thao tác',
      render: (item: ISurveyItem) => {
        return (
          <PopOverAction
            size="sm"
            ExtraButton={
              <>
                <CustomButton
                  tip={'Tạo câu hỏi'}
                  iconClass="mx-2 text-base "
                  size="sm"
                  color="deep-orange"
                  Icon={FaQuestion}
                  onClick={() => handleAddQuestions(item)}
                />
              </>
            }
            handleEdit={() => handleEdit(item)}
            handleDelete={() => handleDelete(item)}
            handleShowDetail={() => handleShowDetail(item)}
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
        const emailMatch = removeVietnameseTones(record.title).match(reg);

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
      let res: any = await apiService.getSurveys();
      res = res.reverse();
      let temp;
      temp = res.map((v: any, index: number) => {
        return {
          ...v,
          index: index + 1,
        };
      });

      setData(temp);
      setFilterData(temp);
    } catch (err: any) {
      throw err.message;
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
        extra={[
          <CustomButton
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => openModal()}
          />,
        ]}
      />
      <AddSurvey
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        item={detail}
        setItem={setDetail}
        visible={showModal}
        setVisible={setShowModal}
      />
    </>
  );
}
