import { Form } from 'antd';
import FormInput from '../../../components/admin/Modal/FormInput';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import apiService from '../../../api/apiService';
import { IFaculties } from '../../../api/apiInterface';
import CustomButton from '../../../components/admin/Button';
import TableConfig from '../../../components/admin/Table/Table';
import { GIRD12 } from '../../../helper/constant';
import { removeVietnameseTones } from '../../../utils/uinqueId';
import { ExportCSV } from '../../../components/Statistic/ExportButton';

import { useAppDispatch } from '../../../hook/useRedux';
import { actions } from '../../../Redux';
export default function () {
  const [form] = Form.useForm();
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');

  const [filterData, setFilterData] = useState([]);

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: 'STT',
      render: (data: any) => <p>{data && data.index ? data.index : 0}</p>,
      width: GIRD12.COL0,
    },

    {
      title: 'Tên khoa/ban',
      dataIndex: 'name',
      width: GIRD12.COL2,
    },
    {
      title: 'Số lượng chương trình',
      dataIndex: 'countProgram',
      width: GIRD12.COL2,
    },
  ];

  const onChangeSearch = async (value: string) => {
    const reg = new RegExp(removeVietnameseTones(value), 'gi');
    let temp = filterData.slice();
    const filteredData = temp
      .map((record: any) => {
        const emailMatch = removeVietnameseTones(record.name).match(reg);

        if (!emailMatch) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);
    setData(value.trim() !== '' ? filteredData : filterData);
  };
  const getAcademicYear = async () => {
    const res: any = await apiService.getAcademicYear();
    if (res) {
      setYears(res);
    }
  };

  async function getData(yearId?: number) {
    setLoading(true);
    setSelectedYear(years[years.length - 1].year);

    try {
      let response: any = await apiService.getFacultyStatistic(
        yearId ? yearId : years[years.length - 1].id,
      );
      response = response.statistics.reverse();
      response = response.map((v: any, index: number) => {
        return {
          ...v,
          index: index + 1,
        };
      });
      setData(response);
      setFilterData(response);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {}
  }
  async function submit() {
    form.validateFields().then(async (data: any) => {
      getData(data.yearId);
    });
  }
  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Thống kê theo khoa`));
    getAcademicYear();
  }, []);
  useEffect(() => {
    getData();
  }, [years]);
  return (
    <>
      <div className="">
        <TableConfig
          onSearch={onChangeSearch}
          search={true}
          data={data}
          columns={columns}
          loading={loading}
          extra={
            <div className="">
              <Form form={form} className="formCategory w-full px-5 mb-10">
                <div className="flex mt-6 justify-between items-center  w-1/4 ">
                  <div className="ml-12 w-fit">
                    <FormInput
                      labelLeft={true}
                      className="min-w-[5rem]"
                      label="Năm học"
                      type="select"
                      name="yearId"
                      options={years.map((item: any) => ({
                        value: item.id,
                        label: item.year,
                      }))}
                      getSelectedValue={(e: any) => setSelectedYear(e.year)}
                    />
                  </div>
                  <div className="ml-12 mt-2">
                    <CustomButton
                      size="sm"
                      text="Lọc thống kê"
                      noIcon
                      className="w-32 py-3 mr-12"
                      onClick={() => submit()}
                    />
                  </div>
                  <ExportCSV
                    csvData={data.map((item) => {
                      return {
                        STT: item.index,
                        TenKhoaBan: item.name,
                        SoChuongTrinh: item.countProgram,
                      };
                    })}
                    fileName={`Thống kê theo khoa - ${selectedYear}-${selectedFaculty}`}
                  />
                </div>
              </Form>
            </div>
          }
        />
      </div>
    </>
  );
}
