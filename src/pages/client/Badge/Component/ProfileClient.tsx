import React, { useEffect } from 'react';
import { Progress } from 'antd';
import avatarSqDefault from '../../../../assets/img/avatarSq.png';
import { Space } from '../../Programs/ResultProgram';
import Color from '../../../../components/constant/Color';
import { AiFillFlag } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../hook/useRedux';
import { actions } from '../../../../Redux';
import { useMsal } from '@azure/msal-react';
import HeaderClient from '../../../../components/Header/HeaderClient';

export default function ProfileClient() {
  const dispatch = useAppDispatch();
  const { accounts } = useMsal();
  const nameMenu = useAppSelector((state: any) => state.form.nameMenu);
  useEffect(() => {
    dispatch(
      actions.formActions.setNameMenu(`${accounts[0]?.name.split('-')[1]}`),
    );
  }, []);

  return (
    <>
      <div className="flex ">
        <div>
          <img className=" rounded-lg" src={avatarSqDefault} />
        </div>
        <Space sizeWidth={50} />
        <div className="w-3/5">
          <Space size={10} />
          <div>
            <h1 className="font-bold text-2xl text-gray-600">{nameMenu}</h1>
            <Space size={10} />
            <p className="font-thin italic">Bonus booster 24lv</p>
          </div>
          <Space size={20} />
          <Progress
            percent={50}
            status="active"
            strokeColor={`${Color.theme.DARK_GRAY}`}
          />
          <Space size={20} />
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <AiFillFlag color={Color.theme.DARK_GRAY} size={40} />
              </div>
              <Space sizeWidth={10} />
              <div>
                <h1>27</h1>
                <p>quiz passed</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <AiFillFlag color={Color.theme.DARK_GRAY} size={40} />
              </div>
              <Space sizeWidth={10} />
              <div>
                <h1>27</h1>
                <p>quiz passed</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <AiFillFlag color={Color.theme.DARK_GRAY} size={40} />
              </div>
              <Space sizeWidth={10} />
              <div>
                <h1>27</h1>
                <p>quiz passed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}