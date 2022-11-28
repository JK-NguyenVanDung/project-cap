import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, Image } from 'antd';
import uniqueId from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import ImagePlaceHolder from '../../../assets/img/menu-bg.jpeg';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../../Redux';
import { useAppDispatch } from '../../../hook/useRedux';
export default function Program() {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<IProgramItem>();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Array<IRoleItem>>();
  const [reload, setReload] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [form] = Form.useForm();

  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const handleEdit = (item: IProgramItem) => {
    setDetail(item);
    setShowModal(true);
  };
  const navigate = useNavigate();

  async function handleDelete(item: IProgramItem) {
    try {
      // await apiService.removeProgram(item.ProgramId);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message();
    }
  }
  const dispatch = useAppDispatch();

  function handleShowDetail(item: IProgramItem) {
    // navigate(`/admin/Program/${item.ProgramId}`);
    navigate(`/admin/Program/Chapter/${item.ProgramId}/Test`);

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
        <p className={`${data ? 'text-primary' : 'text-yellow-800'} font-bold`}>
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
              handleEdit={() => handleEdit(item)}
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
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  async function getData() {
    try {
      setLoading(true);
      // let res: any = await apiService.getPrograms();
      let res;
      let test = [
        {
          ProgramId: 1,
          FacultyId: 1,
          AccountIdCreator: 1,
          CategoryId: 1,
          ProgramName: 'test',
          Image: ImagePlaceHolder,
          StartDate: '11/12/2021',
          EndDate: '11/12/2021',
          IsPublish: false,
          Coin: 1,
        },
        {
          ProgramId: 2,

          FacultyId: 2,
          AccountIdCreator: 1,
          CategoryId: 1,
          ProgramName: 'test',
          Image: ImagePlaceHolder,
          StartDate: '11/12/2021',
          EndDate: '11/12/2021',
          IsPublish: false,
          Coin: 1,
        },
      ];
      res = test.reverse();
      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));
      // dispatch(actions.ProgramActions.setListAll(res))
      // dispatch(actions.ProgramActions.changeLoad(!loadData))
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

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (detail) {
          // await apiService.editProgram({

          // });
          setShowModal(false);
          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
        } else {
          await apiService.addProgram({});
          setShowModal(false);
          setReload(!reload);
          message.success('Thêm thành công');

          setLoading(false);
          form.resetFields();
        }
      })

      .catch((info) => {
        setLoading(false);
      });
  };

  const FormItem = () => {
    return (
      <>
        <FormInput
          disabled={false}
          name="name"
          label="Tên chương trình"
          rules={[
            {
              required: true,
              message: `Không được để trống tên chương trình`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          disabled={false}
          name="ProgramName"
          label="Mô tả chương trình"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          disabled={false}
          name="StartDate"
          label="Ngày bắt đầu"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          disabled={false}
          name="EndDate"
          label="Ngày kết thúc"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          disabled={false}
          name="Image"
          label="Ảnh banner"
          rules={[]}
        />
        <FormInput
          disabled={false}
          name="AccountIdCreator"
          label="Người tạo"
          rules={[]}
        />
        <FormInput
          disabled={false}
          name="CategoryId"
          label="Loại Chương Trình"
          rules={[]}
        />

        <FormInput
          disabled={false}
          name="Image"
          label="Hình Banner"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          disabled={false}
          name="Coin"
          label="Nhập số Coin"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          disabled={false}
          name="IsPublish"
          label="Trạng thái công khai"
          rules={[
            {
              required: true,
              message: `Không được để trống mô tả`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
      </>
    );
  };
  function getDataFields() {
    if (detail) {
      return {
        name: detail.ProgramName,
      };
    }
  }

  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
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
        isFocused={isFocused}
        show={showModal}
        setShow={setShowModal}
        dataItem={detail}
        label={'Chương Trình'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        dataFields={getDataFields()}
        form={form}
      />
    </>
  );
}
