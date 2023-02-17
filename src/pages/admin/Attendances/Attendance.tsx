import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, notification, DatePicker, Space } from 'antd';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { ICategoryItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { AiOutlineSwapRight, AiOutlineFileProtect } from 'react-icons/ai';
import moment from 'moment';
import TickAttendance from './TickAttendance';
import DetailAttendances from './DetailAttendances';
import { actions } from '../../../Redux';

const { RangePicker } = DatePicker;
export default function Attendance() {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const item = useAppSelector((state) => state.form.setProgram);
  const [form] = Form.useForm();
  const [dateTime, setDateTime] = useState([]);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [openAtt, setOpenAtt] = useState(false);
  const dispatch = useAppDispatch();

  const [valueAtten, setValueAtten] = useState();
  const handleEdit = (item: any) => {
    setDetail({
      ...item,
      surveyTime: [moment(item.startDate), moment(item.endDate)],
    });
    setShowModal(true);
  };
  async function handleDelete(item: any) {
    try {
      await apiService.delAttendance(item.id);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      notification.error({
        message:
          'Nhóm chương trình này đang được lưu trong 1 chương trình, xin vui lòng xoá hoặc chọn nhóm chương trình khác trong chương trình đó để xoá nhóm chương trình này',
      });
    }
  }
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL1,
    },

    {
      title: 'Tiêu Đề',
      render: (data: any) => <span>{data.attendance?.title}</span>,
    },
    {
      title: `Ngày Bắt Đầu => Ngày Kết Thúc`,
      render: (data: any) => (
        <span>
          {moment(data.startTime).format('DD-MM-YYYY hh:mm')}
          <span>
            <AiOutlineSwapRight className="inline mx-4" />
          </span>
          {moment(data.endTime).format('DD-MM-YYYY hh:mm')}
        </span>
      ),
    },
    {
      title: 'Người Học',
      dataIndex: 'countLearner',
      key: 'countLearner',
    },
    {
      title: 'Người Đăng Ký',
      dataIndex: 'countAttendance',
      key: 'countAttendance',
    },
    {
      title: 'Thao tác',
      render: (item: any) => {
        return (
          <>
            <PopOverAction
              size="sm"
              handleEdit={() => handleEdit(item)}
              handleDelete={() => handleDelete(item)}
              handleShowDetail={() => handelDetail(item)}
              handleAtt={() => handelTick(item)}
            />
          </>
        );
      },
    },
  ];
  const handelTick = (item: any) => {
    setOpenAtt(true);
    setValueAtten(item);
  };
  const handelDetail = (item: any) => {
    setDetail(item);
    setShowDetail(true);
  };
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(
          record.attendance?.title,
        ).match(reg);

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
      let res: any = await apiService.getAttendance(item.programId);
      res = res.reverse();
      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));

      setData(temp);
      setFilterData(temp);

      setLoading(false);
    } catch (err: any) {
      throw err.message();
    }
  }
  function openAdd() {
    setShowModal(true);
    setDetail(null);
  }

  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(
        `Điểm danh: Khóa Học ${item.programName && item.programName}`,
      ),
    );
    getData();
    form.setFieldsValue(detail);
  }, [reload]);
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      const params = {
        programId: item.programId,
        title: values.title,
        startTime: moment(values.surveyTime[0]).toISOString(),
        endTime: moment(values.surveyTime[1]).toISOString(),
      };
      if (detail) {
        try {
          const data = await apiService.putAttendance(params, detail.id);
          setLoading(true);
          if (data) {
            setLoading(false);
            message.success('Thay đổi thành công');
            form.resetFields();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const data = await apiService.postAttendance(params);
          setLoading(true);
          if (data) {
            setLoading(false);
            message.success('Thay đổi thành công');
            form.resetFields();
          }
        } catch (error) {
          console.log(error);
        }
      }
      setReload(!reload);
      setShowModal(!showModal);
    });
    setLoading(false);
  };
  const onChange = (value: any['value'] | any['value']) => {
    setDateTime(value);
  };
  const FormItem = () => {
    return (
      <>
        <FormInput
          name="title"
          label="Tiêu Đề"
          rules={[
            {
              required: true,
              message: `Không được để trống tên danh mục`,
            },
          ]}
        />
        <div className="w-full h-fit mb-3 z-1">
          <label className="text-black font-bold font-customFont ">
            {'Thời Gian Bắt Đầu - Kết Thúc'}
          </label>
          <Form.Item
            className={'mt-4'}
            name={'surveyTime'}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn thời gian bắt đầu - kết thúc',
              },
            ]}
          >
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']}
              className={`  font-customFont  font-bold  mt-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
              onBlur={() => {}}
            />
          </Form.Item>
        </div>
      </>
    );
  };

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
            onClick={() => openAdd()}
          />,
        ]}
      />
      <CustomModal
        show={showModal}
        setShow={setShowModal}
        dataItem={detail}
        label={'Điểm Danh'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        form={form}
      />
      <TickAttendance
        item={valueAtten}
        setItem={setValueAtten}
        visible={openAtt}
        setVisible={setOpenAtt}
      />
      {showDetail && (
        <DetailAttendances
          item={detail}
          setItem={setDetail}
          visible={showDetail}
          setVisible={setShowDetail}
        />
      )}
    </>
  );
}
