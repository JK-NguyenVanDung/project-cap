import React from 'react'
import { Table, Layout, PageHeader } from 'antd'
import './index.css'
import { Button } from '@material-tailwind/react'
import SearchBar from '../ToolBar/ToolBar'
export default function TableConfig({
  data,
  columns,
  title,
  extra,
  search,
}: {
  data?: any
  columns?: any
  title?: string
  extra?: React.ReactNode
  search?: boolean
}) {
  return (
    <div>
      <div className="flex content-center items-center justify-between px-5 my-10">
        {search && <SearchBar />}
        {extra}
      </div>
      <Table
        className="tableContainer shadow-lg rounded-lg border-1"
        style={{
          margin: 20,
        }}
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}
