import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import react, { useState } from 'react';
import { IoQrCode, IoTrashOutline } from 'react-icons/io5';
import CustomButton from './Button';
import { size } from '@material-tailwind/react/types/components/button';
import { AiOutlineFileProtect } from 'react-icons/ai';
export default function PopOverAction({
  size,
  handleDelete,
  handleEdit,
  setLoading,
  deleteItem,
  handleShowDetail,
  handleAuth,
  ExtraButton,
  authType = null,
  variant,
  detailType,
  disabled = false,
  handleAtt,
}: {
  size?: size;
  handleDelete?: Function;
  handleEdit?: Function;
  setLoading?: React.MouseEventHandler;
  deleteItem?: string;
  handleShowDetail?: Function;
  ExtraButton?: any;
  handleAuth?: Function;
  variant?: any;
  authType?: string;
  detailType?: string;
  disabled?: boolean;
  handleAtt?: Function;
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
      <div className="flex w-max items-center gap-4 z-[100] ">
        {ExtraButton ? ExtraButton : null}
        {handleEdit && (
          <CustomButton
            size={size}
            type={'edit'}
            onClick={() => handleEdit()}
            disabled={disabled}
          />
        )}
        {handleAuth && (
          <CustomButton
            size={size}
            type={authType ? authType : 'auth'}
            onClick={() => handleAuth()}
            disabled={disabled}
          />
        )}

        {handleShowDetail && (
          <CustomButton
            size={size}
            type={detailType ? detailType : 'detail'}
            onClick={() => handleShowDetail()}
            disabled={disabled}
          />
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
                className={`flex flex-row justify-center items-center ${
                  size === 'sm' && 'px-1/2'
                }`}
                color="red"
                variant={variant ? variant : 'filled'}
                disabled={disabled}
              >
                <IoTrashOutline className="mx-2 text-base " />
                {/* <p className="font-serif">{'Xoá'}</p> */}
              </Button>
            </PopoverHandler>
            <PopoverContent className="z-20">
              <div className="flex w-max items-center flex-col gap-4">
                <p className="font-customFont font-bold text-black">
                  Xác nhận xoá {deleteItem}?
                </p>
                <div className="flex w-max items-center flex-row gap-4">
                  <CustomButton
                    type="cancel"
                    noIcon={true}
                    color="red"
                    onClick={() => close()}
                  />
                  <CustomButton
                    type="delete"
                    onClick={() => handleDel()}
                    text="Xác nhận"
                    noIcon={true}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
        {handleAtt && (
          <CustomButton
            tip="Điểm Danh"
            size="sm"
            color="cyan"
            Icon={IoQrCode}
            onClick={() => handleAtt()}
          />
        )}
      </div>
    </>
  );
}
