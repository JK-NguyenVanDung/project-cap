import React from 'react';
import CustomButton from '../admin/Button';

export default function BottomButton({ onClick }: { onClick: any }) {
  return (
    <div className="flex w-2/6 absolute bottom-[-70] right-0 mt-10">
      <CustomButton
        type="default"
        text="Lưu"
        onClick={onClick}
        noIcon={true}
        className="w-4/5 my-3  h-10"
      />
      <CustomButton
        type="default"
        onClick={onClick}
        noIcon={true}
        className="w-4/5 my-3 h-10"
      />
    </div>
  );
}
