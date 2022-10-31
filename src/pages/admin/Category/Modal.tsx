import React, { useEffect, useState } from 'react'
import { Input, Button, IconButton } from '@material-tailwind/react'
import { IoClose } from 'react-icons/io5'
export default function Modal(props: any) {
  return (
    <>
      <div className=" w-fit px-20 py-10  p-4  flex flex-col  justify-evenly">
        <div className="flex flex-row w-full justify-between items-center mb-6">
          <p className="text-xl text-black">
            {props.add ? 'Thêm Danh Mục' : 'Sửa Danh Mục'}{' '}
          </p>
          <IconButton variant="text" className="text-black">
            <IoClose className="text-xl" />
          </IconButton>
        </div>
        <div className="mb-6">
          <Input className="min-w-[20rem] " label="Mã Danh Mục" />
        </div>
        <div className="w-fit mb-6">
          <Input className="min-w-[20rem] " label="Tên Danh Mục" />
        </div>
        <div className=" mb-6 flex flex-row justify-evenly w-full">
          <Button fullWidth className="mx-2 bg-red-400" variant="filled">
            Xoá
          </Button>
          <Button fullWidth className="mx-2 " variant="filled">
            {props.add ? 'Thêm' : 'Sửa'}
          </Button>
        </div>
      </div>
    </>
  )
}
