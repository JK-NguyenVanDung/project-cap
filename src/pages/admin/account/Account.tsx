import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, Space } from 'antd';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
// import Button from '../../../components/sharedComponents/Button'
import uniqueId, { removeVietnameseTones } from '../../../utils/uinqueId';
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
      title: 'S??T',
      dataIndex: 'phoneNumber',

      render: (phoneNumber: any) => (
        <p>{phoneNumber ? phoneNumber : 'Kh??ng c?? s??? ??i???n tho???i'}</p>
      ),
    },
    {
      title: 'Ng??nh',
      dataIndex: 'positionId',
      render: (id: any) => (
        <p>{id ? getPositionName(id) : 'Kh??ng c?? th??ng tin'}</p>
      ),
      width: GIRD12.COL2,
    },
    // {
    //   title: '?????a Ch???',
    //   dataIndex: 'address',
    //   key: 'address',
    // },

    {
      title: 'Vai tr??',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: any) => (
        <p>{roleId ? getRoleTitle(roleId) : 'Ch??a c?? vai tr??'}</p>
      ),
    },
    {
      title: 'L???n truy c???p g???n nh???t',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (item: any) => (
        <p>{item ? getDate(item) : 'Ch??a ????ng nh???p v??o h??? th???ng'}</p>
      ),
    },
    {
      title: 'Thao t??c',
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
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.email).match(reg);

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
          message.success('Thay ?????i th??nh c??ng');
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
            message.success('Th??m th??nh c??ng');

            setLoading(false);
            form.resetFields();
          } else {
            message.error('Email tr??n ???? t???n t???i tr??n h??? th???ng');
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
    //   label: 'Kh??ng c?? vai tr??',
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
      <div>
        <FormInput
          disabled={detail || showDetail ? true : false}
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Vui L??ng Nh???p V??o Email',
            },
            {
              pattern: new RegExp(
                /.(?!.*([(),.#/-])\1)*\@vlu.edu.vn$|(?!.*([(),.#/-])\1)*\@vanlanguni.vn$/,
              ),
              message: 'Vui L??ng Nh???p ????ng ?????nh D???ng Email Gi???ng Vi??n VLU',
            },

            {
              pattern: new RegExp(
                /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/,
              ),
              message: 'Vui L??ng Nh???p ????ng ?????nh D???ng Email Gi???ng Vi??n VLU ',
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
          disabled={showDetail ? true : false}
          name="roleId"
          options={getOptions()}
          type="select"
          label="Vai tr??"
          rules={[
            {
              required: true,
              message: 'Vui L??ng Ch???n Vai tr??',
            },
          ]}
        />
        {showDetail && (
          <FormInput
            disabled={true}
            name="phoneNumber"
            label="S??? ??i???n tho???i"
            placeholder="Kh??ng c?? th??ng tin s??? ??i???n tho???i"
          />
        )}
      </div>
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
        centered={true}
        show={showModal}
        setShow={setShowModal}
        dataItem={detail}
        label={'T??i Kho???n'}
        name={detail}
        handleOk={handleOk}
        FormItem={<FormItem />}
        dataFields={getDataFields()}
        form={form}
        header={'Ph??n Quy???n'}
      />
      {showDetail ? (
        <DetailAccount
          role={role}
          item={detail}
          setItem={setDetail}
          visible={showDetail}
          setVisible={setShowDetail}
        />
      ) : null}
    </>
  );
}
