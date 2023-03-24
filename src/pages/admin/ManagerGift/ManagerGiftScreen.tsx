import React, { useState, useEffect } from 'react';
import CustomButton from '../../../components/admin/Button';
import PopOverAction from '../../../components/admin/PopOver';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
import { notification } from 'antd';
import AddManagerGift from './Component/AddManagerGift';
import DetailManagerGift from './Component/DetailManagerGift';
import apiService from '../../../api/apiService';
import { IGift } from '../../../api/apiInterface';

const ManagerGiftScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<IGift>();

  const [reload, setReload] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [data, setData] = useState<Array<IGift>>([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const fetchAllGift = async () => {
      setReload(true);
      try {
        setReload(false);

        const response: any = await apiService.getAllGift();
        console.log(response);
        const temp = response.map((v: IGift, index: number) => ({
          ...v,
          index: index + 1,
        }));
        setData(temp);
        setFilterData(temp);
      } catch (err: any) {
        throw err.message;
      }
      setReload(false);
    };
    fetchAllGift();
  }, []);
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Tên Quà Tặng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giá Đổi',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Số Lượng Còn Lại',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thao tác',
      key: 'action',

      render: (data: any) => (
        <PopOverAction
          size="sm"
          handleEdit={() => handleEdit(data)}
          handleShowDetail={() => handleShowDetail(data)}
          handleDelete={() => handleDelete(data)}
        />
      ),
    },
  ];
  const handleEdit = (data: IGift) => {
    setShowModal(true);
    setDetail(data);
  };
  const handleDelete = async (item: IGift) => {
    try {
      await apiService.deleteGift(item.giftId);
      setReload(true);
    } catch (err: any) {
      notification.error({
        message: 'xóa không thành công',
      });
    } finally {
      setReload(false);
    }
  };
  const handleShowDetail = (data: IGift) => {
    setDetail(data);
    setShowDetail(true);
  };
  const openAdd = () => {
    setDetail(null);
    setShowModal(true);
  };
  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: IGift) => {
        const emailMatch = removeVietnameseTones(record.name).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };
  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        loading={reload}
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
      <AddManagerGift
        showModal={showModal}
        setShowModal={setShowModal}
        detail={detail}
      />
      <DetailManagerGift
        showModal={showDetail}
        setShowModal={setShowDetail}
        detail={detail}
        setDetail={setDetail}
      />
    </>
  );
};

export default ManagerGiftScreen;
