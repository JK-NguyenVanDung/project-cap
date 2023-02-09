import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, notification, DatePicker } from 'antd';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { ICategoryItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import { useAppSelector } from '../../../hook/useRedux';
import { AiOutlineSwapRight } from 'react-icons/ai';
import moment from 'moment';

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
  const handleEdit = (item: any) => {
    setDetail(item);
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
          'Nhóm chương trình này đang được lưu trong 1 chương trình, xin vui lòng xoá hoặc chọn nhóm chương trình khá trong chương trình đó để xoá nhóm chương trình này',
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
      title: 'Chương Trình',
      render: (data: any) => <span>{data.program.programName}</span>,
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'title',
    },
    {
      title: `Ngày Bắt Đầu => Ngày Kết Thúc`,
      width: GIRD12.COL10,
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
      title: 'Thao tác',
      render: (item: any) => {
        return (
          <>
            <PopOverAction
              size="sm"
              handleEdit={() => handleEdit(item)}
              handleDelete={() => handleDelete(item)}
              deleteItem={item.categoryName}
            />
          </>
        );
      },
    },
  ];

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: ICategoryItem) => {
        const emailMatch = removeVietnameseTones(record.categoryName).match(
          reg,
        );

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
    getData();
  }, [reload]);
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      const params = {
        programId: item.programId,
        title: values.title,
        startTime: dateTime[0],
        endTime: dateTime[1],
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
    });
  };
  function getDataFields() {
    if (detail) {
      return {
        title: detail.title,
      };
    }
  }
  const onChange = (value: any['value'] | any['value']) => {
    setDateTime(value);
  };
  const FormItem = () => {
    return (
      <>
        <FormInput
          name="title"
          label="Nhập Tiêu Đề"
          rules={[
            {
              required: true,
              message: `Không được để trống tên danh mục`,
            },
          ]}
        />
        <label className="text-start w-full mb-4 text-black font-bold font-customFont ">
          Ngày Bắt Đầu <AiOutlineSwapRight className="inline mx-4" />
          Ngày Kết Thúc
        </label>
        <Form.Item name="startDate">
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
          />
        </Form.Item>
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
        label={'Danh Mục'}
        name={detail}
        handleOk={handleOk}
        dataFields={getDataFields()}
        FormItem={<FormItem />}
        form={form}
      />
    </>
  );
}
