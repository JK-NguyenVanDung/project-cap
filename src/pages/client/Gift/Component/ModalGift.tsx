import React from 'react';
import CustomModal from '../../../../components/admin/Modal/Modal';
import defaultAVT from '../../../../assets/img/avatarSq.png';
import FormInput from '../../../../components/admin/Modal/FormInput';
export default function ModalGift({
  show,
  setShow,
}: {
  show: boolean;
  setShow: any;
}) {
  const FormItem = () => {
    return (
      <>
        <div className='flex'>
          <div>
            <div>
              <img src={defaultAVT} />
            </div>
            <div>
              <h1>Tên Sản Phẩm</h1>
              <p>Số Lượng: 3000</p>
              <p>Description</p>
            </div>
          </div>
          <div> 
            <FormInput type='number' />
          </div>
        </div>
      </>
    );
  };
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      FormItem={<FormItem />}
      header="Quy Đổi Quà"
      label={'Quy Đổi Quà'}
      notAdd
    />
  );
}
