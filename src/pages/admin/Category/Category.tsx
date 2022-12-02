import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message } from 'antd';
import uniqueId from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { ICategoryItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';

export default function Category() {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<ICategoryItem>();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Array<IRoleItem>>();
  const [reload, setReload] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [form] = Form.useForm();

  const [data, setData] = useState<Array<ICategoryItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const handleEdit = (item: ICategoryItem) => {
    setDetail(item);
    setShowModal(true);
  };
  async function handleDelete(item: ICategoryItem) {
    try {
      await apiService.removeCategory(item.categoryId);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message();
    }
  }

  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL1,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      width: GIRD12.COL10,
    },
    {
      width: GIRD12.COL1,

      title: 'Thao tác',
      render: (item: ICategoryItem) => {
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
    const reg = new RegExp(value, 'gi');
    let temp = data;
    const filteredData = temp
      .map((record: ICategoryItem) => {
        const emailMatch = record.categoryName.match(reg);

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
      let res: any = await apiService.getCategories();
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

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (detail) {
          await apiService.editCategory({
            name: values.name,
            ID: detail.categoryId,
          });
          setShowModal(false);

          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
        } else {
          await apiService.addCategory({
            name: values.name,
          });
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
          label="Tên Danh Mục"
          rules={[
            {
              required: true,
              message: `Không được để trống tên danh mục`,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
            {
              pattern: new RegExp(/^.{1,50}$/),
              message: errorText.max50,
            },
          ]}
        />
      </>
    );
  };
  function getDataFields() {
    if (detail) {
      return {
        name: detail.categoryName,
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
        label={'Danh Mục'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        dataFields={getDataFields()}
        form={form}
      />
    </>
  );
}
