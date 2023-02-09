import { Switch } from 'antd';
import { useState } from 'react';

export default function ({ state }: { state: boolean }) {
  const [switchType, setSwitchType] = useState(state);
  return (
    <>
      <Switch
        checked={switchType}
        onChange={setSwitchType}
        className="w-fit  bg-primary"
        checkedChildren="Công khai"
        unCheckedChildren=" Riêng tư"
      />
    </>
  );
}
