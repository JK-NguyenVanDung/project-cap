import React, { useEffect, useState } from 'react'
import {
  IoEllipsisVertical,
  IoTrashOutline,
  IoHammerOutline,
  IoSearch,
  IoAddOutline,
} from 'react-icons/io5'
import Modal from './Modal'
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux'
import { actions } from '../../../redux'
import { CategoryItem } from '../../../Type'
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  IconButton,
  Button,
} from '@material-tailwind/react'
import { GIRD12 } from '../../../helper/constant'
import { MESSAGE } from '../../../helper/constant'
import axios from 'axios'
// import { API_CONSTANTS } from '../../../api/api'

import { Table, message } from 'antd'
import * as collections from '../../../api/apiService'

function Column() {
  const col = ['Mã Danh Mục', 'Tên Danh Mục']
  return (
    <tr className="w-full">
      <th scope="col" className="w-[45%] py-3 px-6">
        Mã Danh Mục
      </th>
      <th scope="col" className="w-[45%] py-3 px-6">
        Tên Danh Mục
      </th>

      <th scope="col" className="w-[10%] py-3 px-6">
        Hành Động
      </th>
    </tr>
  )
}

function PopOver(props: CategoryItem) {
  const [openAction, setOpenAction] = useState(false)
  const dispatch = useAppDispatch()
  const dataList = useAppSelector((state) => state.category.listAll)

  const [deleteAction, setDeleteAction] = useState(false)
  function handleAction() {
    setDeleteAction(false)
    setOpenAction(!openAction)
  }
  function handleDelete() {
    handleAction()
    let test: Array<CategoryItem> = dataList.filter(
      (item: CategoryItem) => item.categoryID != props.categoryID
    )
    dispatch(actions.categoryActions.setListAll(test))
    message.success(MESSAGE.SUCCESS.DELETE)
  }
  function openEdit() {
    dispatch(actions.categoryActions.setDetail(props.categoryID))
    dispatch(actions.formActions.showForm())
  }
  return (
    <>
      <Popover
        handler={handleAction}
        open={openAction}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        placement="bottom-end"
      >
        <PopoverHandler>
          <IconButton
            onClick={() => setOpenAction(!openAction)}
            className="font-medium "
            variant="text"
          >
            <IoEllipsisVertical className="text-black" />
          </IconButton>
        </PopoverHandler>
        <PopoverContent>
          {!deleteAction ? (
            <div className="flex w-max items-center flex-col gap-4">
              <Button
                size="md"
                color="blue"
                className="flex flex-row justify-center items-center "
                onClick={() => openEdit()}
              >
                <IoHammerOutline className="mx-2 text-base" /> Sửa
              </Button>
              <Button
                size="md"
                className="flex flex-row justify-center items-center"
                color="red"
                onClick={() => setDeleteAction(!deleteAction)}
              >
                <IoTrashOutline className="mx-2 text-base " />
                Xoá
              </Button>
            </div>
          ) : (
            <div className="flex w-max items-center flex-col gap-4">
              Xác nhận xoá {props.categoryName}?
              <div className="flex w-max items-center flex-row gap-4">
                <Button
                  size="sm"
                  color="red"
                  className="flex flex-row justify-center items-center w-24"
                  onClick={() => handleDelete()}
                >
                  Xác Nhận
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  className="flex flex-row justify-center items-center w-24"
                  color="gray"
                  onClick={() => setDeleteAction(!deleteAction)}
                >
                  Huỷ
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}

function SearchBar(props: any) {
  return (
    <form className="flex items-center">
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="min-w-[20rem] pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm"
          onChange={(e) => props.onChangeSearch(e.target.value)}
        />
        <div className="flex absolute inset-y-0 right-0 items-center pl-3 ">
          <IconButton variant="text" color="gray">
            <IoSearch className="text-xl" />
          </IconButton>
        </div>
      </div>
    </form>
  )
}

function ToolBar(props: any) {
  const dispatch = useAppDispatch()

  function openModal() {
    dispatch(actions.categoryActions.setDetail(null))
    dispatch(actions.formActions.showForm())
  }
  return (
    <div className="div justify-between items-center flex w-full h-24">
      <SearchBar onChangeSearch={props.onChangeSearch} />
      <div className="">
        <Button
          size="md"
          className="mx-0 flex flex-row justify-start items-start"
          color="green"
          onClick={() => openModal()}
        >
          <IoAddOutline className="mx-2 text-base  bg-white text-green-400 rounded  " />
          Thêm
        </Button>
      </div>
    </div>
  )
}

function TableSection() {
  const dataList = useAppSelector((state) => state.category.listAll)

  const loadData = useAppSelector((state) => state.category.loadData)
  const [data, setData] = useState<Array<CategoryItem>>([])

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(value, 'gi')
    const filteredData = dataList
      .map((record: CategoryItem) => {
        const nameMatch = record.categoryName.match(reg)
        console.log(nameMatch)

        if (!nameMatch) {
          return null
        }
        return record
      })
      .filter((record) => !!record)

    setSearch(value)
    console.log(filteredData)
    setData(value != null ? filteredData : dataList)
  }
  let test = [
    {
      categoryID: 1,
      categoryName: 'Sách 1',
    },
    {
      categoryID: 2,
      categoryName: 'Sách 2',
    },
    {
      categoryID: 3,
      categoryName: 'Sách 3',
    },
  ]

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      width: GIRD12.COL10,
    },

    // {
    //   title: 'Tạo vào',
    //   dataIndex: 'createdAt',
    //   // render: (text) => <a>{text}</a>,
    //   width: GIRD12.COL1,
    // },

    // {
    //   title: 'Cập nhật vào',
    //   dataIndex: 'updatedAt',
    //   // render: (text) => <a>{text}</a>,
    //   width: GIRD12.COL1,
    // },
    {
      width: GIRD12.COL2,

      title: 'Hoạt động',
      render: (item: CategoryItem) => {
        return (
          <>
            <PopOver {...item} />
          </>
        )
      },
    },
  ]
  let dispatch = useAppDispatch()
  async function getData() {
    try {
      setLoading(true)

      const res = await collections.default.getCategory()

      dispatch(actions.categoryActions.setListAll(res.data))
      setData(res.data)
      setLoading(false)
    } catch (err: any) {}
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setLoading(true)
    getData()

    setData(dataList)
    setLoading(false)
  }, [loadData])
  // useEffect(() => {
  //   dispatch(actions.categoryActions.setListAll(test))
  // }, [loadData])
  return (
    <div className="px-4    w-full h-auto overflow-x-auto   sm:rounded-lg">
      <ToolBar onChangeSearch={onChangeSearch} />

      <Table loading={loading} dataSource={data} columns={columns} />
    </div>
  )
}

export default function Category() {
  return (
    <div className=" w-full h-full">
      <TableSection />
      <Modal />
    </div>
  )
}
