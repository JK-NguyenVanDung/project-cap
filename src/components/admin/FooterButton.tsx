import React from 'react';
import CustomButton from './Button';

export default function FooterButton() {
  return (
    <div className="absolute flex w-2/5 bottom-5 right-0">
      <CustomButton text="Lưu" noIcon={true} className={`w-2/5 mx-3`} />
      <CustomButton noIcon={true} className={`w-2/5`} />
    </div>
  );
}
