import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import react, { useState } from 'react';
import {
  IoNotificationsOutline,
  IoQrCode,
  IoTrashOutline,
} from 'react-icons/io5';
import CustomButton from './Button';
import { size } from '@material-tailwind/react/types/components/button';
import { AiOutlineFileProtect } from 'react-icons/ai';
export default function PopOverAction({
  size,
  handleDelete,
}: {
  size?: size;
  handleDelete?: Function;
}) {
  const [openAction, setOpenAction] = useState(false);
  const [data, setData] = useState([
    {
      a: 1,
    },
    {
      a: 1,
    },
    {
      a: 1,
    },
  ]);
  function handleAction() {
    setOpenAction(!openAction);
  }
  function close() {
    setOpenAction(false);
  }

  return (
    <>
      <div className="min-h-[20rem]  flex w-max items-center gap-4 z-[100] ">
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
              variant="text"
              className="text-dark-blue"
              color="gray"
              size="md"
            >
              <IoNotificationsOutline className="text-xl" />
            </IconButton>
          </PopoverHandler>
          <PopoverContent className="z-20">
            <div className="flex min-w-[20rem] w-0 items-center flex-col gap-4">
              {data.map((item) => {
                return <NotificationCard item={item} />;
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export const NotificationCard = (item: any) => {
  return (
    <>
      <div
        id="toast-default"
        className="flex flex-col  w-full max-w-xs p-4 text-black  bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="flex justify-between w-full">
          <p className="font-bold text-lg">Tiêu Đề</p>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-black font-bold dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="">
          <div className="text-base font-normal">Nội Dung.</div>
          <p className="text-xs italic">Thông báo lúc 12:00 6/4/2023</p>
        </div>
      </div>
    </>
  );
};
