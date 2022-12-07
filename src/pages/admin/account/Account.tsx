import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, Space } from 'antd';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
// import Button from '../../../components/sharedComponents/Button'
import uniqueId from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import apiService from '../../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { actions } from '../../../Redux';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import { IoTrashOutline } from 'react-icons/io5';
import { IAccountItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import DetailAccount from './DetailAccount';

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<IAccountItem>();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Array<IRoleItem>>();
  const [positions, setPositions] = useState<Array<any>>();

  const [reload, setReload] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [form] = Form.useForm();

  const [data, setData] = useState<Array<IAccountItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const handleEdit = (item: any) => {
    setDetail(item);
    setShowModal(true);
  };
  function getRoleTitle(roleId: any) {
    if (role) {
      return role.find((e) => e.roleId === roleId)?.roleName;
    }
  }
  function getPositionName(posId: any) {
    if (positions) {
      return positions.find((e) => e.positionId === posId)?.roleName;
    }
  }
  const handleShowDetail = (item: any) => {
    // dispatch(actions.categoryActions.setDetail(data.ID))
    // dispatch(actions.formActions.showForm())
    setDetail(item);
    setShowDetail(true);
  };
  function getDate(date: string) {
    return (
      new Date(date).toLocaleTimeString() +
      ' - ' +
      new Date(date).toLocaleDateString()
    );
  }
  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL1,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: GIRD12.COL2,
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',

      render: (phoneNumber: any) => (
        <p>{phoneNumber ? phoneNumber : 'Không có số điện thoại'}</p>
      ),
    },
    {
      title: 'Ngành',
      dataIndex: 'positionId',
      render: (id: any) => (
        <p>{id ? getPositionName(id) : 'Không có thông tin'}</p>
      ),
      width: GIRD12.COL2,
    },
    // {
    //   title: 'Địa Chỉ',
    //   dataIndex: 'address',
    //   key: 'address',
    // },

    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: any) => (
        <p>{roleId ? getRoleTitle(roleId) : 'Chưa có vai trò'}</p>
      ),
    },
    {
      title: 'Lần truy cập gần nhất',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (item: any) => (
        <p>{item ? getDate(item) : 'Chưa đăng nhập vào hệ thống'}</p>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: GIRD12.COL1,

      render: (data: IAccountItem) => (
        <PopOverAction
          size="sm"
          handleAuth={() => handleEdit(data)}
          handleShowDetail={() => handleShowDetail(data)}
        />
      ),
    },
  ];

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(value, 'gi');
    let temp = data;
    const filteredData = temp
      .map((record: IAccountItem) => {
        const emailMatch = record.email.match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };

  async function getData() {
    try {
      setLoading(true);
      let res: any = await apiService.getAccounts();
      res = res.reverse();

      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));

      // dispatch(actions.categoryActions.setListAll(res))
      // dispatch(actions.categoryActions.changeLoad(!loadData))
      setData(temp);
      setFilterData(temp);

      setLoading(false);
    } catch (err: any) {
      throw err.message();
    }
  }
  function openAdd() {
    setShowModal(true);
    setDetail(null);
  }
  async function getRoles() {
    let res: any = await apiService.getRoles();
    setRole(res);
  }
  async function getPosition() {
    let res: any = await apiService.getPositions();
    setPositions(res);
  }

  useEffect(() => {
    getRoles();
    getData();
  }, [reload]);
  async function checkAccountExist(email: string) {
    let res: any = await apiService.getAccounts();
    let obj = res.find((e: IAccountItem) => e.email === email);
    return obj !== undefined ? true : false;
  }
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (detail) {
          await apiService.editAccount({
            accountId: detail.accountId,
            roleId: values.roleId,
          });
          setShowModal(false);
          // dispatch(actions.categoryActions.changeLoad(!loadData))
          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
        } else {
          let exist = checkAccountExist(values.email);
          if ((await exist) === false) {
            await apiService.addAccount({
              email: values.email,
              roleId: values.roleId,
            });
            setShowModal(false);
            setReload(!reload);
            message.success('Thêm thành công');

            setLoading(false);
            form.resetFields();
          } else {
            message.error('Email trên đã tồn tại trên hệ thống');
          }
        }
      })

      .catch((info) => {
        // dispatch(actions.formActions.showError())

        setLoading(false);
      });
  };

  function getOptions() {
    let arr = [];
    // if (!detail) {
    // arr.push({
    //   value: 0,
    //   label: 'Không có vai trò',
    // });
    // }
    if (role) {
      for (let i = 0; i < role.length; i++) {
        arr.push({
          value: role[i].roleId,
          label: role[i].roleName,
        });
      }
    }
    return arr;
  }

  const FormItem = () => {
    return (
      <>
        <FormInput
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Vào Email',
            },
            // {
            //   pattern: new RegExp(/.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$/),
            //   message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU',
            // },
            {
              pattern: new RegExp(
                /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/,
              ),
              message: 'Vui Lòng Nhập Đúng Định Dạng Email Giảng Viên VLU ',
            },
            {
              pattern: new RegExp(/^\w/),
              message: errorText.email,
            },
            {
              pattern: new RegExp(/^(?!\s*$|\s).*$/),
              message: errorText.space,
            },
          ]}
        />
        <FormInput
          name="roleId"
          options={getOptions()}
          type="select"
          label="Vai trò"
          rules={[
            {
              required: true,
              message: 'Vui Lòng Chọn Vai trò',
            },
          ]}
        />
      </>
    );
  };
  function getDataFields() {
    if (detail) {
      return {
        email: detail.email,
        roleId: detail.roleId ? detail.roleId : 0,
      };
    }
  }

  return (
    <>
      <TableConfig
        onSearch={onChangeSearch}
        search={true}
        data={data}
        columns={columns}
        extra={[
          <CustomButton
            type="add"
            size="md"
            key={`${uniqueId()}`}
            onClick={() => openAdd()}
          />,
        ]}
      />
      <CustomModal
        show={showModal}
        setShow={setShowModal}
        dataItem={detail}
        label={'Tài Khoản'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        dataFields={getDataFields()}
        form={form}
        header={'Phân Quyền'}
      />
      {showDetail ? (
        <DetailAccount
          item={detail}
          setItem={setDetail}
          visible={showDetail}
          setVisible={setShowDetail}
        />
      ) : null}
    </>
  );
}
