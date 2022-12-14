import { useState, useEffect } from 'react';
import apiService from '../../../../api/apiService';
import { IProgramItem, IAccountItem, IChapterItem } from '../../../../Type';
import CustomButton from '../../../../components/admin/Button';

import View from '../../assets/svg/View.svg';
import { checkURL } from '../../../../helper/constant';
import { IFaculties } from '../../../../api/apiInterface';
import { API_URL } from '../../../../api/api';
import { actions } from '../../../../Redux';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import ViewContent from './ViewContent';
import ViewTest from './ViewTest';
export default function (props: any) {
  const program: IProgramItem = useAppSelector(
    (state) => state.form.setProgram,
  );
  const updateLike: boolean = useAppSelector(
    (state) => state.product.updateLike,
  );
  const selectedChapter: IChapterItem = useAppSelector(
    (state) => state.product.selectedChapter,
  );
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<IAccountItem>(null);
  useEffect(() => {
    props.setLoading && props.setLoading(true);
    getData();
    let time = setTimeout(() => {
      props.setLoading && props.setLoading(false);
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [program]);

  useEffect(() => {
    getDetail();
  }, [updateLike]);
  async function getDetail() {
    try {
      let res: any = await apiService.getProgram(program.programId);
      dispatch(actions.formActions.setProgramForm(res));
    } catch (err) {}
  }
  async function getData() {
    try {
      let res: any = await apiService.getAccounts();
      let response: any = await apiService.getFaculties();
      let fac: IFaculties = response.find(
        (item: IFaculties) => item.facultyId == program.facultyId,
      );

      res = res.reverse();

      const temp = res.map((v: any, index: number) => ({
        ...v,
        index: index + 1,
      }));
      if (temp) {
        let acc = temp.find(
          (item: any) => program.accountIdCreator == item.accountId,
        );
        setUser(acc);
      }
    } catch (err: any) {
      throw err.message;
    }
  }

  return (
    <>
      <div className=" w-[75%] max-w-[45rem]   h-fit my-4  mb-12 mx-2 flex flex-col justify-start items-center">
        <div className="shadow-lg p-6 rounded-xl w-full h-fit text-black bg-white  border flex flex-col justify-start items-center">
          <div className="w-full h-fit font-customFont ">
            {!selectedChapter?.isTest ? <ViewContent /> : <ViewTest />}
          </div>
        </div>
      </div>
    </>
  );
}
