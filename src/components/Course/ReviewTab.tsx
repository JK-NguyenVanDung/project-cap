import react, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { IProgramItem } from '../../Type';
import Input from '../sharedComponents/Input';
import Loading from '../sharedComponents/Loading';
import { Image } from 'antd';
import avatar from '../../assets/img/default.png';
import moment from 'moment';
import { IoMdSend } from 'react-icons/io';

const ReviewTab = ({ program }: { program: IProgramItem }) => {
  const [toDoList, setToDoList]: any = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [textComment, setTextComment]: any = useState('');
  const [checkComment, setCheckComment] = useState(false);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const dataComment = await apiService.getComment(program.programId);
        if (dataComment) {
          setToDoList(dataComment);
          setCheckData(true);
          // const dataAccount = await apiService.getAccount
        }
      } catch (error) {
        console.log(error);
      }
    };
    setTextComment('');
    setTimeout(() => {
      setCheckData(false);
    }, 3000);
    fetchComment();
  }, [checkComment]);
  const handelComment = (event: any) => {
    const values = {
      programId: program.programId,
      content: textComment,
    };
    const fetchSentComment = async () => {
      setCheckComment(true);
      const data = await apiService.sentComment(values);
      if (data) {
        setCheckComment(false);
      }
    };
    if (event === 'Enter') {
      fetchSentComment();
      setTextComment('');
    }
  };
  const handelClickComment = () => {
    const values = {
      programId: program.programId,
      content: textComment,
    };
    const fetchSentComment = async () => {
      setCheckComment(true);
      const data = await apiService.sentComment(values);
      if (data) {
        setCheckComment(false);
      }
    };
    fetchSentComment();
    setTextComment('');
  };
  return (
    <>
      <div className="flex justify-between my-3">
        <div className="w-full">
          <input
            value={textComment}
            onKeyDown={(event) => handelComment(event.key)}
            onChange={(values) => setTextComment(values.target.value)}
            placeholder="Nhập Bình Luận"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="ml-5" onClick={() => handelClickComment()}>
          <IoMdSend className="text-primary cursor-pointer" size={35} />
        </div>
      </div>
      <Loading loading={checkData} className="h-fit mt-10" />
      {checkData
        ? null
        : toDoList.map((item: any, index: number) => {
            return (
              <>
                <div key={index} className="m-3">
                  <div className="flex">
                    <Image
                      preview={false}
                      className="rounded-full"
                      width={50}
                      height={50}
                      src={avatar}
                    />
                    <div className="w-full ml-3">
                      <div className="p-2 pr-20 rounded-lg  bg-gray-300  h-2/3">
                        <p className="font-extrabold text-black text-base pl-3">
                          {item.account.email}
                        </p>
                        <p className="text-gray-700 font-normal text-sm p-2 mt-1 pb-10">
                          {item.content}
                        </p>
                      </div>
                      <p className="p-0 m-0 text-xs text-gray-600 text-end">
                        <span>Thời Gian: </span>
                        {moment(item.createdAt).format('DD-MM-YYYY')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
    </>
  );
};

export default ReviewTab;
