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
const sample = {
  categoryID: 1,
  categoryName: 'SA1',
  categoryCode: 'Sách 1',
}
let test = [sample, sample, sample]

function Row(props: CategoryItem) {
  const [openAction, setOpenAction] = useState(false)
  const dispatch = useAppDispatch()

  const [deleteAction, setDeleteAction] = useState(false)
  function handleAction() {
    setDeleteAction(false)
    setOpenAction(!openAction)
  }
  function handleDelete() {
    handleAction()
    test = test.filter((item) => item.categoryID != props.categoryID)
    dispatch(actions.categoryActions.setListAll)
  }

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {props.categoryCode}
        </th>
        <td className="py-4 px-6">{props.categoryName}</td>

        <td className="py-4 px-6 flex justify-center w-full pr-10">
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
                      variant="outlined"
                      className="flex flex-row justify-center items-center w-24"
                      color="gray"
                      onClick={() => setDeleteAction(!deleteAction)}
                    >
                      Huỷ
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      className="flex flex-row justify-center items-center w-24"
                      onClick={() => handleDelete()}
                    >
                      Xác Nhận
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </td>
      </tr>
    </>
  )
}
export default function Category() {
  return (
    <div className=" w-screen h-screen">
      <ToolBar />
      <Table />
      <Modal add={true} />
    </div>
  )
}

function SearchBar() {
  return (
    <form className="flex items-center">
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="min-w-[20rem] pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm"
          required
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

function ToolBar() {
  return (
    <div className="div justify-between px-4  items-center flex w-full h-24">
      <SearchBar />
      <div className="">
        <Button
          size="md"
          className="flex flex-row justify-center items-center"
          color="green"
        >
          <IoAddOutline className="mx-2 text-base  bg-white text-green-400 rounded  " />
          Thêm
        </Button>
      </div>
    </div>
  )
}

function Table() {
  const [data, setData] = useState(test)
  useEffect(() => {
    setData(test)
  }, [test])
  return (
    <div className="w-full h-auto overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <Column />
        </thead>
        <tbody>
          {data.map((e) => {
            return <Row key={e.categoryID} {...e} />
          })}
        </tbody>
      </table>
      <nav
        className="flex justify-between items-center pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a
              href="#"
              className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              100
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
