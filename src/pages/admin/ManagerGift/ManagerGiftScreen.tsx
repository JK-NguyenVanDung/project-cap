import React, { useState, useEffect } from 'react';
import CustomButton from '../../../components/admin/Button';
import PopOverAction from '../../../components/admin/PopOver';
import TableConfig from '../../../components/admin/Table/Table';
import uniqueId, {
  removeVietnameseTones,
  timeOut,
} from '../../../utils/uinqueId';
import { notification } from 'antd';
import AddManagerGift from './Component/AddManagerGift';
import DetailManagerGift from './Component/DetailManagerGift';
import apiService from '../../../api/apiService';
import { IGift } from '../../../api/apiInterface';
import { API_URL } from '../../../api/api';
import { useAppSelector } from '../../../hook/useRedux';

const ManagerGiftScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<IGift>();

  const [reload, setReload] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const reloadData = useAppSelector((item) => item.reload.reload);
  const [data, setData] = useState<Array<IGift>>([]);
  const [filterData, setFilterData] = useState([]);
  const fetchAllGift = async () => {
    try {
      const response: any = await apiService.getAllGift();
      const temp = response.map((v: IGift, index: number) => ({
        ...v,
        index: index + 1,
      }));
      setData(temp);
      setFilterData(temp);
    } catch (err: any) {
      throw err.message;
    }
  };
  useEffect(() => {
    fetchAllGift().finally(() => setReload(false));
  }, [reload, reloadData]);
  // useEffect(() => {
  //   setReload(true);
  //   setTimeout(() => {
  //     setReload(false);
  //   }, 3000);
  // }, [showModal, detail]);
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (data: any) => {
        return (
          <img
            className=" object-cover rounded-lg w-[300px] h-[180px]"
            src={`${API_URL}/images/${data}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
              // https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17/images/${item.image}
            }}
          />
        );
      },
      width: '20%',
    },
    {
      title: 'Tên Quà Tặng',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render: (data: any) => <p className="eclipse max-h-[50vh]">{data}</p>,
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
    setReload(!reload);
    async function deleteItem() {
      try {
        await apiService.deleteGift(item.giftId);
      } catch (err: any) {
        notification.error({
          message: 'Xóa không thành công',
        });
      }
    }
    deleteItem().finally(() => timeOut(setReload(!reload)));
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
        loading={reload || reloadData}
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
        loading={reload}
        setLoading={setReload}
      />
      <DetailManagerGift
        showModal={showDetail}
        setShowModal={setShowDetail}
        detail={detail}
      />
    </>
  );
};

export default ManagerGiftScreen;
