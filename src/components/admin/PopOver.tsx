import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import react, { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import CustomButton from './Button';

export default function PopOverAction({
  data,
  handleDelete,
  handleEdit,
  setLoading,
  deleteItem,
  handleShowDetail,
}: {
  data: any;
  handleDelete?: Function;
  handleEdit?: Function;
  setLoading?: React.MouseEventHandler;
  deleteItem?: string;
  handleShowDetail?: Function;
}) {
  const [openAction, setOpenAction] = useState(false);

  function handleAction() {
    setOpenAction(!openAction);
  }
  function close() {
    setOpenAction(false);
  }
  async function handleDel() {
    handleAction();
    handleDelete();
  }
  return (
    <>
      <div className="flex w-max items-center gap-4">
        {handleEdit && (
          <CustomButton type="edit" onClick={() => handleEdit()} />
        )}
        {handleShowDetail && (
          <CustomButton type="detail" onClick={() => handleShowDetail()} />
        )}
        {handleDelete && (
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
                <p className="font-customFont font-bold text-black">
                  Xác nhận xoá {deleteItem}?
                </p>
                <div className="flex w-max items-center flex-row gap-4">
                  <CustomButton
                    type="delete"
                    onClick={() => handleDel()}
                    text="Xác nhận"
                    noIcon={true}
                  />
                  <CustomButton
                    type="cancel"
                    noIcon={true}
                    onClick={() => close()}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
}
