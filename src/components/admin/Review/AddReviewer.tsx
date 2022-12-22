import { Select, notification, message, Form } from 'antd';
import { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import { errorText } from '../../../helper/constant';
import { IProgramItem, IAccountItem } from '../../../Type';
import CustomModal from '../Modal/Modal';

const AddReviewer = ({
  show,
  setShow,
  program,
}: {
  show: boolean;
  setShow: any;
  program: IProgramItem;
}) => {
  const [form] = Form.useForm();

  const [accounts, setAccounts] = useState(null);
  async function getReviewers(id: number) {
    try {
      let res: any = await apiService.getListProgramsByReviewer(id);
      return res;
    } catch (err: any) {
      return false;
    }
  }

  useEffect(() => {
    show == true && accounts == null && getAccounts();
  }, [show]);
  async function getAccounts() {
    try {
      let res: any = await apiService.getAccounts();
      const temp = res.map((v: IAccountItem, index: number) => {
        return {
          value: v.accountId,
          label: v.email,
        };
      });
      setAccounts(temp);
    } catch (err: any) {
      throw err.message;
    }
  }
  const AddReviewerFI = () => {
    return (
      <div className="w-full mb-3 z-1">
        <label className="text-black font-bold font-customFont  ">
          Tên Người Duyệt
        </label>
        <Form.Item
          name="reviewerName"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Tên Người Duyệt',
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: '100%', marginTop: 20 }}
            placeholder="Tìm kiếm email để chọn"
            optionFilterProp="children"
            filterOption={(input: string, option: any) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA: any, optionB: any) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={accounts}
          />
        </Form.Item>
      </div>
    );
  };

  function checkAccountExist(item: number) {
    let res: any = getReviewers(item);
    return res === false
      ? res.find((e: any) => e.programId === program.programId)
      : false;
  }
  const handleAddReviewer = () => {
    form
      .validateFields()
      .then(async (value: any) => {
        await apiService.addReviewer({
          accountId: value.reviewerName,
          programId: program?.programId,
        });
        setShow(false);
        notification.success({ message: 'Thêm thành công' });
        form.resetFields();
      })

      .catch((info) => {
        notification.error({
          message: 'Tài khoản này đã nằm trong danh sách người duyệt',
        });
        // dispatch(actions.formActions.showError())
      });
  };
  return (
    <>
      <CustomModal
        width={'50%'}
        show={show}
        handleOk={handleAddReviewer}
        setShow={setShow}
        dataItem={{}}
        label={'Người Duyệt'}
        name={{}}
        FormItem={<AddReviewerFI />}
        form={form}
        header={'Thêm Người Duyệt'}
      />
    </>
  );
};

export default AddReviewer;
