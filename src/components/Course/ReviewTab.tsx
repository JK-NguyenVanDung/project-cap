import react, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { IProgramItem } from '../../Type';
import Input from '../sharedComponents/Input';
import Loading from '../sharedComponents/Loading';
import { Image } from 'antd';
import avatar from '../../assets/img/test.jpg';
import moment from 'moment';

const ReviewTab = ({ program }: { program: IProgramItem }) => {
  const [toDoList, setToDoList]: any = useState([]);
  const [checkData, setCheckData] = useState(false);
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
    setTimeout(() => {
      setCheckData(false);
    }, 3000);
    fetchComment();
  }, []);

  return (
    <>
      <div>
        <Input />
      </div>
      {/* <Loading loading={checkData} className="h-fit mt-10" /> */}
      {checkData
        ? null
        : toDoList.map((item: any, index: number) => {
            return (
              <>
                <div key={index} className="m-3">
                  <div className="flex">
                    <Image
                      preview={false}
                      className="rounded-full p-1 "
                      width={70}
                      height={70}
                      src={avatar}
                    />
                    <div>
                      <div className="p-2 pr-20 rounded-lg  bg-gray-300 max-w-fit h-2/3">
                        <p className="font-extrabold text-black text-lg pl-3">
                          {item.account.fullName}
                        </p>
                        <p className="text-gray-700 font-normal text-base p-2 mt-1 pb-10">
                          {item.content}
                        </p>
                        <p>
                          Thời Gian:{' '}
                          {moment(item.createdAt).format('DD-MM-YYYY')}
                        </p>
                      </div>
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
