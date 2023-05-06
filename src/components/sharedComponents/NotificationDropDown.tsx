import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import react, { useEffect, useState } from 'react';
import {
  IoNotificationsOutline,
  IoQrCode,
  IoTrashOutline,
} from 'react-icons/io5';
import { size } from '@material-tailwind/react/types/components/button';
import { AiOutlineFileProtect } from 'react-icons/ai';
import apiService from '../../api/apiService';
import { INotification } from '../../Type';
import moment from 'moment';
import Loading from './Loading';
import CustomButton from '../admin/Button';
export default function PopOverAction({
  size,
  handleDelete,
}: {
  size?: size;
  handleDelete?: Function;
}) {
  const [loading, setLoading] = useState(true);

  const [openAction, setOpenAction] = useState(false);
  const [totalData, setTotalData] = useState<Array<INotification>>([]);
  const [limit, setLimit] = useState(3);
  const [amount, setAmount] = useState(0);

  const [data, setData] = useState<Array<INotification>>([]);
  function handleAction() {
    setOpenAction(!openAction);
  }
  function close() {
    setOpenAction(false);
  }

  function updateAmount() {
    setLimit((prev) => prev + 3);
    setData(totalData.slice(0, limit));
  }
  async function getNotification() {
    let res: any = await apiService.getNotifications();
    let seen = res.filter((e: INotification) => e.isSeen === false);
    setData(res.slice(0, limit));
    setTotalData(res);
    setAmount(seen.length);
  }
  useEffect(() => {
    getNotification();
    let interval = setInterval(() => {
      getNotification();
    }, 10000);
    let time = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(time);
    };
  }, []);
  useEffect(() => {
    seenSlice(data);
  }, [data.length]);
  async function seenSlice(data: INotification[]) {
    setLoading(true);

    Promise.all([
      ...data.map((item) => {
        return !item.isSeen && apiService.seenNotification(item.id);
      }),
    ]).finally(() => setLoading(false));
  }
  function onRemove(id: number) {
    async function removeNoti() {
      await apiService.deleteNotification(id);
    }
    setLoading(true);
    removeNoti().finally(() => {
      getNotification(), setLoading(false);
    });
  }

  return (
    <>
      <div className="min-h-[20rem] h-fit  flex w-max items-center gap-4 z-[100] ">
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
              className="text-dark-blue mr-4"
              color="gray"
              size="md"
            >
              <p className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex justify-center items-center ">
                <p className="text-xs text-white font-bold">{amount}</p>
              </p>
              <IoNotificationsOutline className="text-[1.5rem]" />
            </IconButton>
          </PopoverHandler>
          <PopoverContent className="z-20 flex flex-col items-center justify-center w-fit">
            <Loading loading={loading} />
            {data.length > 0 ? (
              <div className="flex min-w-[20rem] w-0 items-center flex-col gap-4">
                {data.map((item) => {
                  return <NotificationCard item={item} onRemove={onRemove} />;
                })}
              </div>
            ) : (
              <p className="p-20">
                {!loading && 'Bạn hiện tại không có thông báo'}
              </p>
            )}
            <CustomButton
              disabled={
                totalData.length === 0 || totalData.length <= limit
                  ? true
                  : false
              }
              onClick={() => updateAmount()}
              className="btn btn-primary mt-4"
              text={'Xem thêm'}
              noIcon
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
const Types: any = {
  1: 'Người học đã được duyệt',
  2: 'Có khóa học mới vừa tạo',
  3: 'Khóa học đã được duyệt',
  4: 'Khóa học mới được công khai',
};

export const NotificationCard = ({
  item,
  onRemove,
}: {
  item: INotification;
  onRemove: Function;
}) => {
  return (
    <>
      <div
        id="toast-default"
        className="flex flex-col  w-full max-w-xs p-4 text-black  bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="flex justify-between w-full">
          <p className="font-medium text-lg">{Types[item?.type]}</p>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-black font-bold dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
            onClick={() => onRemove(item.id)}
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
          <div className="text-base font-normal">{item.value}</div>
          <p className="text-xs italic">
            Thông báo lúc{' '}
            {moment(item.createdAt).local().format('HH:MM - DD/MM/YYYY')}
          </p>
        </div>
      </div>
    </>
  );
};
