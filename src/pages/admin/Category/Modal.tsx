import React, { useEffect, useState } from 'react'
import {
  Input,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { IoClose } from 'react-icons/io5'
export default function Modal(props: any) {
  const [open, setOpen] = useState(true)
  function handleOpen() {
    setOpen(!open)
  }
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <div className="flex flex-row w-full justify-between items-center mb-6">
            <p className="text-xl text-black">
              {props.add ? 'Thêm Danh Mục' : 'Sửa Danh Mục'}{' '}
            </p>
            <IconButton
              variant="text"
              className="text-black"
              onClick={handleOpen}
            >
              <IoClose className="text-xl" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className=" w-full px-20   flex flex-col  justify-evenly">
            <div className="w-full mb-6">
              <Input className="min-w-[20rem] " label="Mã Danh Mục" />
            </div>
            <div className="w-full mb-6">
              <Input className="min-w-[20rem] " label="Tên Danh Mục" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className=" mb-6 flex flex-row justify-evenly w-full">
            <Button fullWidth className="mx-2" color="red" variant="filled">
              Xoá
            </Button>
            <Button fullWidth className="mx-2" color="green" variant="filled">
              {props.add ? 'Thêm' : 'Sửa'}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  )
}
