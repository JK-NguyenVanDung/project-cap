import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../../api/api';
import apiService from '../../../../api/apiService';
import TableConfig from '../../../../components/admin/Table/Table';
import { removeVietnameseTones } from '../../../../utils/uinqueId';
import { Space } from '../../Programs/ResultProgram';
export default function HistoryRedeem() {
  const [data, setData]: any = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchHistoryRedeem = async () => {
      const data: any = await apiService.getGiftMyExchange();
      setData(data.map((item: any) => item.gift));
      setFilterData(data);
    };
    fetchHistoryRedeem();
  }, []);

  const columns = [
    {
      title: 'Ảnh Sản Phẩm',
      dataIndex: 'image',
      key: 'image',
      width: 170,
      render: (data: any) => {
        return (
          <>
            <img
              src={data ? `${API_URL}/images/${data}` : ''}
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giá Coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];
  const onChangeSearch = (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const nameMatch = removeVietnameseTones(record.name).match(reg);

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
