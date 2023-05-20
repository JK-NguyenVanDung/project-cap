import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../Redux';
import AdminGuide from '../../../assets/pdf/AdminGuide.pdf';
const Guide = () => {
  // let file =  File(AdminGuide)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.formActions.setNameMenu(`Hướng dẫn sử dụng`));
  }, []);
  return (
    <div>
      <object
        width="100%"
        className="h-screen   pr-[0.1rem]"
        data={AdminGuide}
        type="application/pdf"
      ></object>
    </div>
  );
};
export default Guide;
