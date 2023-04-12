import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../../api/api';
import apiService from '../../../../api/apiService';
import TableConfig from '../../../../components/admin/Table/Table';
import { removeVietnameseTones } from '../../../../utils/uinqueId';
import { Space } from '../../Programs/ResultProgram';
import moment from 'moment';
export default function HistoryRedeem() {
  const [data, setData]: any = useState([]);

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchHistoryRedeem = async () => {
      const data: any = await apiService.getGiftMyExchange();
      // setData(data.map((item: any) => item.gift));
      let res = data.reverse();
      setData(res);

      setFilterData(res);
    };
    fetchHistoryRedeem();
  }, []);

  const columns = [
    {
      title: 'Ảnh Sản Phẩm',
      key: 'image',
      width: 170,
      render: (data: any) => {
        return (
          <>
            <img
              src={data ? `${API_URL}/images/${data.gift.image}` : ''}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
              }}
            />
          </>
        );
      },
    },
    {
      title: 'Tên Sản Phẩm',

      key: 'name',
      render: (data: any) => {
        return <>{data?.gift?.name}</>;
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',

      render: (data: any) => {
        return (
          <>
            {' '}
            <p>
              {data === 'Approved' ? (
                <p className="text-green-600">Đã Nhận Quà</p>
              ) : data === 'Pending' ? (
                <p className="text-yellow-800">Chưa Nhận Quà</p>
              ) : (
                <p className="text-error">Bị Từ Chối</p>
              )}
            </p>
          </>
        );
      },
      key: 'status',
    },

    {
      title: 'Đặt Lúc',
      dataIndex: 'createdAt',
      render: (data: any) => {
        return <>{moment(data).local().format('HH:mm - DD/MM/YYYY')}</>;
      },
      key: 'coin',
    },
    {
      title: 'Giá Coin',
      render: (data: any) => {
        return <>{data?.gift?.coin}</>;
      },
      key: 'coin',
    },
    {
      title: 'Số Lượng Đặt',
      render: (data: any) => {
        return <>{data?.quantity}</>;
      },
      key: 'quantity',
    },
    {
      title: 'Tổng coin',
      key: 'quantity',
      render: (data: any) => {
        return <>{data?.quantity * data?.gift?.coin}</>;
      },
    },
  ];
  const onChangeSearch = (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const nameMatch = removeVietnameseTones(record.gift.name).match(reg);

        if (!nameMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value?.trim() !== '' ? filteredData : filterData);
  };
  return (
    <>
      <Space size={1} />
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
      />
    </>
  );
}
