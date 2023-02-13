import { Switch } from 'antd';
import { useState } from 'react';
import apiService from '../../api/apiService';

export default function ({
  state,
  surveyId,
}: {
  state: boolean;
  surveyId: number;
}) {
  const [switchType, setSwitchType] = useState(state);
  async function publicSurvey() {
    setSwitchType(!switchType);
    try {
      let data = await apiService.publishSurvey(surveyId);
    } catch (err) {}
  }
  return (
    <>
      <Switch
        checked={switchType}
        onChange={publicSurvey}
        className={`w-fit  ${switchType ? 'bg-primary' : 'bg-gray-600'}`}
        checkedChildren="Công khai"
        unCheckedChildren=" Riêng tư"
      />
    </>
  );
}
