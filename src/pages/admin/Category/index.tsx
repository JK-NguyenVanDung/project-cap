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
import { actions } from '../../../Redux'
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
import apiService from '../../../api/apiService'
import CustomButton from '../../../components/admin/Button'

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
  const load = useAppSelector((state) => state.category.loadData)

  const [deleteAction, setDeleteAction] = useState(false)
  function handleAction() {
    // setDeleteAction(!deleteAction)
    setOpenAction(!openAction)
  }
  async function handleDelete() {
    handleAction()

    try {
      await apiService.removeCategory(props.CategoryId)

      dispatch(actions.categoryActions.changeLoad(!load))

      message.success(MESSAGE.SUCCESS.DELETE)
    } catch (err: any) {
      throw err.message()
    }
  }
  const openEdit = () => {
    dispatch(actions.categoryActions.setDetail(props.CategoryId))
    dispatch(actions.formActions.showForm())
  }
  return (
    <>
      <div className="flex w-max items-center gap-4">
        <CustomButton type="edit" onClick={openEdit} />
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
            <Button
              size="sm"
              className="flex flex-row justify-center items-center"
              color="red"
            >
              <IoTrashOutline className="mx-2 text-base " />
              {/* <p className="font-serif">{'Xoá'}</p> */}
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div className="flex w-max items-center flex-col gap-4">
              Xác nhận xoá {props.CategoryName}?
              <div className="flex w-max items-center flex-row gap-4">
                <CustomButton
                  type="delete"
                  onClick={handleDelete}
                  text="Xác nhận"
                  noIcon={true}
                />
                <CustomButton
                  type="cancel"
                  noIcon={true}
                  onClick={handleAction}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

function SearchBar(props: any) {
  return (
    <form className="px-2 flex items-center ">
      <label className="sr-only">Search</label>
      <div className="relative w-full ">
        <input
          type="text"
          id="simple-search"
          className="shadow-xl min-w-[20rem] pr-10 bg-white border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <CustomButton size="md" onClick={openModal} />
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
        const nameMatch = record.CategoryName.match(reg)
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

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'CategoryName',
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
      let res = await apiService.getCategories()

      dispatch(actions.categoryActions.setListAll(res))
      dispatch(actions.categoryActions.changeLoad(!loadData))
      setLoading(false)
    } catch (err: any) {
      throw err.message()
    }
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setLoading(true)

    setData(dataList)
    setLoading(false)
  }, [loadData])
  // useEffect(() => {
  //   dispatch(actions.categoryActions.setListAll(test))
  // }, [loadData])
  return (
    <div className=" w-full h-auto overflow-x-auto   sm:rounded-lg">
      <ToolBar onChangeSearch={onChangeSearch} />

      <Table
        className="table shadow-lg mx-2"
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        loading={loading}
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}

export default function Category() {
  return (
    <div className=" w-full h-full font-bold">
      <TableSection />
      <Modal />
    </div>
  )
}
