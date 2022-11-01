import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { IoEllipsisVertical } from 'react-icons/io5'
import Modal from './Modal'
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

const CategoryItem = z.object({
  categoryID: z.number(),
  categoryName: z.string(),
  categoryCode: z.string(),
})

type CategoryItem = z.infer<typeof CategoryItem>

function Row(props: CategoryItem) {
  const [openAction, setOpenAction] = useState(false)

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
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <IoEllipsisVertical className="text-black" />
          </a>
        </td>
      </tr>
    </>
  )
}
export default function Category() {
  return (
    <div className=" w-screen h-screen">
      <Table />
      <Modal />
    </div>
  )
}

function Table() {
  const sample = {
    categoryID: 1,
    categoryName: 'SA1',
    categoryCode: 'Sách 1',
  }
  return (
    <div className="w-full h-auto overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <Column />
        </thead>
        <tbody>
          <Row {...sample} />
          <Row {...sample} />
          <Row {...sample} />
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
