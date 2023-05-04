import React from 'react';
import { Table, Layout, PageHeader } from 'antd';
import './index.css';
import { Button } from '@material-tailwind/react';
import SearchBar from '../ToolBar/ToolBar';
import { boolean } from 'zod';
export default function TableConfig({
  loading,
  data,
  columns,
  title,
  extra,
  search = true,
  onSearch,
  key,
  pagination,
}: {
  loading?: boolean;
  data?: any;
  columns?: any;
  title?: string;
  extra?: React.ReactNode;
  search?: boolean;
  onSearch?: React.FC | Function;
  key?: string;
  pagination?: any;
}) {
  return (
    // key={data} => gây ra lỗi search

    <div
      key={key ? key : null}
      className="max-sm:w-fit max-sm:mr-4 max-md:mr-4"
    >
      {search && (
        <div
          className="flex content-center items-center justify-between px-5 my-10  max-sm:px-0 max-sm:pl-5  max-md:px-0 max-md:pl-5
        max-sm:max-md:mr-4"
        >
          <SearchBar onSearch={onSearch} />
          {extra}
        </div>
      )}
      <Table
        loading={loading}
        className="tableContainer2 shadow-lg rounded-lg border-1 "
        style={{
          margin: 20,
        }}
        dataSource={data}
        columns={columns}
        pagination={pagination}
      />
    </div>
  );
}
