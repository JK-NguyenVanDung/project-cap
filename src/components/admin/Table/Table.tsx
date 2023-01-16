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
  panigation,
}: {
  loading?: boolean;
  data?: any;
  columns?: any;
  title?: string;
  extra?: React.ReactNode;
  search?: boolean;
  onSearch?: React.FC | Function;
  key?: string;
  panigation?: any;
}) {
  return (
    // key={data} => gây ra lỗi search
    <div key={key ? key : null}>
      {search && (
        <div className="flex content-center items-center justify-between px-5 my-10">
          <SearchBar onSearch={onSearch} />
          {extra}
        </div>
      )}
      <Table
        loading={loading}
        className="tableContainer shadow-lg rounded-lg border-1"
        style={{
          margin: 20,
        }}
        dataSource={data}
        columns={columns}
        pagination={panigation}
      />
    </div>
  );
}
