import { Form, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import { GIRD12 } from '../../../helper/constant';
import { IAccountItem } from '../../../Type';
import CustomModal from '../Modal/Modal';
import 'moment/locale/vi';
import { timeOut } from '../../../utils/uinqueId';
const ReviewHistory = ({
  show,
  setShow,
  programId,
}: {
  show: boolean;
  setShow: any;
  programId: number;
}) => {
  const handleOk = () => {};
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    getData().finally(() => timeOut(setLoading(false)));
  }, [programId]);
  async function getData() {
    try {
      let res: any = await apiService.getReviewHistory(programId);
      let acc: any = await apiService.getAccounts();

      let temp = res.reverse();
      temp = res.map((v: any, index: number) => {
        return {
          ...v,
          index: index + 1,
        };
      });
      if (temp) {
        setHistory(temp);
      }
      if (acc) {
        setAccounts(acc);
      }
    } catch (err: any) {
      throw err.message;
    }
  }
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL1,
    },
    {
      title: 'Người duyệt',
      dataIndex: 'accountId',
      key: 'accountId',
      render: (id: number) => (
        <p>
          {accounts?.find((item: IAccountItem) => item.accountId == id)?.email}
        </p>
      ),

      width: GIRD12.COL3,
    },
    {
      title: 'Bình luận',
      dataIndex: 'comment',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'approved',
      render: (data: boolean) => (
        <p className={`${!data ? 'text-red-500' : 'text-primary'}`}>
          {data ? 'Đã duyệt' : 'Từ chối'}
        </p>
      ),
    },
    {
      title: 'Thời gian duyệt',
      dataIndex: 'approvalDate',
      render: (data: Date) => (
        <p>{data && moment(data).local().format('HH:mm -  DD/MM/YYYY ')}</p>
      ),

      width: GIRD12.COL3,
    },
  ];
  const HistoryFI = () => {
    return (
      <>
        <Table
          loading={loading}
          className="tableContainer shadow-lg rounded-lg border-1"
          dataSource={history}
          columns={columns}
        />
      </>
    );
  };

  return (
    <CustomModal
      centered={false}
      width={'64%'}
      show={show}
      handleOk={null}
      setShow={setShow}
      dataItem={{}}
      name={{}}
      FormItem={<HistoryFI />}
      form={form}
      header={'Lịch sử '}
      showDetail
    />
  );
};

export default ReviewHistory;
