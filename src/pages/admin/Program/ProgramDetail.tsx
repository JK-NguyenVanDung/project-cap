import React, { useEffect, useState } from 'react';
import TableConfig from '../../../components/admin/Table/Table';
import { Form, message, Image } from 'antd';
import uniqueId from '../../../utils/uinqueId';
import CustomButton from '../../../components/admin/Button';
import CustomModal from '../../../components/admin/Modal/Modal';
import FormInput from '../../../components/admin/Modal/FormInput';
import apiService from '../../../api/apiService';
import { errorText, GIRD12, MESSAGE } from '../../../helper/constant';
import { IProgramItem, IRoleItem } from '../../../Type';
import PopOverAction from '../../../components/admin/PopOver';
import ImagePlaceHolder from '../../../assets/img/menu-bg.jpeg';
import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
import { useNavigate } from 'react-router-dom';

export default function ProgramDetail() {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState<IProgramItem>();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Array<IRoleItem>>();
  const [reload, setReload] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [form] = Form.useForm();

  const [data, setData] = useState<Array<IProgramItem>>([]);
  const [filterData, setFilterData] = useState([]);
  const handleEdit = (item: IProgramItem) => {
    setDetail(item);
    setShowModal(true);
  };
  const dispatch = useAppDispatch();

  async function handleDelete(item: IProgramItem) {
    try {
      // await apiService.removeProgram(item.ProgramId);

      setReload(!reload);
      message.success(MESSAGE.SUCCESS.DELETE);
    } catch (err: any) {
      throw err.message();
    }
  }

  async function getData() {
    try {
      setLoading(true);
      let res: any = await apiService.getPrograms();
      let test = [
        {
          FacultyId: 1,
          AccountIdCreator: 1,
          CategoryId: 1,
          ProgramName: 'test',
          Image: ImagePlaceHolder,
          StartDate: '11/12/2021',
          EndDate: '11/12/2021',
          IsPublish: false,
          Coin: 1,
        },
        {
          FacultyId: 2,
          AccountIdCreator: 1,
          CategoryId: 1,
          ProgramName: 'test',
          Image: ImagePlaceHolder,
          StartDate: '11/12/2021',
          EndDate: '11/12/2021',
          IsPublish: false,
          Coin: 1,
        },
      ];
      res = test.reverse();
      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));
      dispatch(
        actions.formActions.setNameMenu(
          `Khoá học ${res[0].ProgramName && res[0].ProgramName}`,
        ),
      );

      // dispatch(actions.ProgramActions.setListAll(res))
      // dispatch(actions.ProgramActions.changeLoad(!loadData))
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

  useEffect(() => {
    getData();
  }, [reload]);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (detail) {
          // await apiService.editProgram({

          // });
          setShowModal(false);
          // dispatch(actions.ProgramActions.changeLoad(!loadData))
          message.success('Thay đổi thành công');
          setReload(!reload);

          setLoading(false);
          form.resetFields();
        } else {
          await apiService.addProgram({});
          setShowModal(false);
          setReload(!reload);
          // dispatch(actions.ProgramActions.changeLoad(!loadData))
          message.success('Thêm thành công');

          setLoading(false);
          form.resetFields();
        }
      })

      .catch((info) => {
        setLoading(false);
      });
  };
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <Form form={form} className="formCategory w-full px-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="...">
            <FormInput
              disabled={false}
              name="name"
              label="Tên chương"
              rules={[
                {
                  required: true,
                  message: `Không được để trống tên chương trình`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            />
          </div>

          <div className="row-span-1">
            <FormInput
              disabled={false}
              name="Coin"
              label="Nhúng video/slide:"
              rules={[
                {
                  required: true,
                  message: `Không được để trống mô tả`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            />
          </div>

          <div className="row-span-4 bg-red-100 ...">
            <FormInput
              disabled={false}
              type="textArea"
              name="ProgramName"
              label="Mô tả chương trình"
              rules={[
                {
                  required: true,
                  message: `Không được để trống mô tả`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            />
          </div>

          <div className="row-span-2">
            <FormInput
              type="upload"
              disabled={false}
              name="Image"
              label="Ảnh banner"
              rules={[]}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
