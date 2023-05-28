import { Switch } from 'antd';
import { useState } from 'react';
import apiService from '../../api/apiService';

export default function ({
  item,
  surveyId,
  setConfirmLoading,
}: {
  item: any;
  surveyId: number;
  setConfirmLoading: any;
}) {
  async function publicSurvey() {
    try {
      await apiService
        .publishSurvey(surveyId)
        .finally(() => setConfirmLoading((prev: any) => !prev));
    } catch (err) {}
  }
  return (
    <>
      <Switch
        checked={item?.isPublish}
        onChange={publicSurvey}
        className={`w-fit  ${item?.isPublish ? 'bg-primary' : 'bg-gray-600'}`}
        checkedChildren="Công khai"
        unCheckedChildren=" Riêng tư"
      />
    </>
  );
}
