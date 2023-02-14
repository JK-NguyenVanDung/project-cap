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
import { HiClipboardDocument } from 'react-icons/hi2';
import { IoStar } from 'react-icons/io5';
export default function Survey() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [detail, setDetail] = useState(null);
  const range: any = useAppSelector((state) => state.survey.range);

  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const location = useLocation();
  const [switchType, setSwitchType] = useState(true);
  const selectedSurvey: ISurveyItem = useAppSelector(
    (state: any) => state.survey.selectedSurvey,
  );
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<ISurveyItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();
  const info = useAppSelector((state) => state.auth.info);
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
      await apiService.delProgram(item.surveyId);
      setReload(!reload);
      notification.success({ message: MESSAGE.SUCCESS.DELETE });
    } catch (err: any) {
      notification.error({
        message:
          'Chương trình hiện tại đang có nội dung hoặc đã được duyệt, xin vui lòng xoá hết nội dung của chương trình này để xoá chương trình hoặc ẩn chương trình đi',
      });
    }
  }

  function handleShowDetail(item: any) {
    dispatch(actions.formActions.setProgramForm(item));
    dispatch(
      actions.formActions.setNameMenu(
        `Khảo sát ${item.programName && item.programName}`,
      ),
    );
    navigate(`/admin/Survey/Detail`);
  }
  async function handleAddQuestions(item: any) {
    dispatch(actions.surveyActions.reset());

    await getSurveyData(item);

    dispatch(
      actions.formActions.setNameMenu(
        `Khảo sát ${item.programName && item.programName}`,
      ),
    );
    dispatch(actions.surveyActions.setIsReviewing(true));
    navigate(`/admin/Survey/${item.surveyId}`);
  }
  function openModal() {
    setDetail(null);
    setShowModal(true);
  }
  const handleEdit = (item: ISurveyItem) => {
    setDetail(item);
    setShowModal(true);
  };
  async function getSurveyData(item: any) {
    try {
      let res: any = await apiService.getAccountSurveyAnswers(
        selectedSurvey.surveyId,
        item.accountId,
      );

      res = res.map((item: any, index: number) => {
        return { ...item, index: index + 1 };
      });
      res &&
        dispatch(
          actions.surveyActions.setListCurrentQuestions(
            res.slice(range.base, range.limit),
          ),
        );

      dispatch(actions.surveyActions.setListQuestions(res));

      // dispatch(
      //   actions.formActions.setNameMenu(
      //     `${selectedTest ? selectedTest.testTitle : 'N/A'}`,
      //   ),
      // );
    } catch (err) {}
  }
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      width: GIRD12.COL3,
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: '12%',
      render: (data: any) => <p>{data ? data : 'N/A'}</p>,
    },

    // {
    //   width: '12%',

    //   title: 'Trạng thái',
    //   render: (item: ISurveyItem) => {
    //     return (
    //       <Switch
    //         checked={switchType}
    //         onChange={setSwitchType}
    //         className="w-fit  bg-primary"
    //         checkedChildren="Riêng tư"
    //         unCheckedChildren="Công khai"
    //       />
    //     );
    //   },
    // },
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
                  tip={'Xem đánh giá'}
                  iconClass="mx-2 text-base "
                  size="sm"
                  color="deep-orange"
                  Icon={IoStar}
                  onClick={() => handleAddQuestions(item)}
                />
              </>
            }
          />
        );
      },
    },
  ];

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.email).match(reg);

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
      let res: any = await apiService.getAccountSurveys(
        selectedSurvey.surveyId,
      );
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
      />
    </>
  );
}
