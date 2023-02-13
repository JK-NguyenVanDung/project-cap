import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { actions } from '../../../Redux';
import HeaderClient from '../../../components/Header/HeaderClient';
import Breadcrumb from '../../../components/sharedComponents/Breadcrumb';
import { useAppDispatch } from '../../../hook/useRedux';

export default function () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-50">
      <div className="w-full h-24 py-4 bg-white flex items-center justify-between ">
        <div className="z-0 max-sm:hidden  overflow-hidden bg-white relative flex flex-col justify-center content-center items-center w-1/5">
          <a
            onClick={() => {
              navigate('/home');
              dispatch(actions.formActions.setNameMenu(`${'Trang Chủ'}`));
            }}
            className=" hover:text-primary text-black relative my-2  px-2 w-full flex flex-row items-center justify-center"
          >
            <img className="w-[14%] h-fit " src={logo} />
            <p className="text-lg font-bold text-center mx-2">VLG TRAINING</p>
          </a>
        </div>

        <div className="w-full h-14 flex items-center justify-between ">
          <div className="flex flex-col justify-center items-start w-full">
            <p className="ml-2 max-sm:text-[12px] max-sm:hidden  text-black text-lg font-bold font-customFont">
              Bảng khảo sát:
            </p>
            <div className="w-full  bg-white ">
              <Breadcrumb
                router1={-1}
                name={
                  location.pathname.split('/')[1] === 'admin'
                    ? 'Khảo sát'
                    : 'Trang chủ'
                }
                name2={'Bảng khảo sát: '}
              />
            </div>
          </div>
          <HeaderClient />
        </div>
      </div>
      <div className="mx-4  flex flex-col w-full h-screen items-center my-12 text-black">
        <div className="flex h-[40vh] flex-col w-full justify-evenly  items-center">
          <p className="font-bold text-2xl">
            PHIẾU KHẢO SÁT Ý KIẾN CỦA NGƯỜI HỌC VỀ
          </p>
          <p className="font-semibold text-xl">Khoá học Mobile 2023-2024</p>
          <p className="text-base ">
            Khảo sát được thực hiện nhằm đánh giá mức độ hài lòng của người học
            về mức độ đáp ứng của khoá huấn luyện của Trường và chất lượng dịch
            vụ của đội ngũ hỗ trợ. Những ý kiến nhận xét trung thực, khách quan
            của người học là cơ sở giúp nhà trường có những cải thiện, điều
            chỉnh để nâng cao chất lượng phục vụ ở các năm tiếp theo. Nhà trường
            rất mong nhận được các ý kiến đóng góp của các anh/chị cho các nội
            dung dưới dây.
          </p>
          <p className="self-start ">
            Chân thành cảm ơn các ý kiến đóng góp của người học!
          </p>
        </div>
        <div className="self-start	">
          <p className="text-xl font-bold ">I. THÔNG TIN CHUNG</p>
          <p className="">
            1. Email người học (giảng viên/ nhân viên nhà trường)
          </p>
          <p className="">dung.197pm31141@vanlanguni.vn</p>
          <p className="">II. NỘI DUNG KHẢO SÁT</p>
          <p className="">III. Ý KIẾN KHÁC</p>
          <p className="">10. Điều mà anh/chị hài lòng nhất về khoá học này?</p>
          <p className="">11. Anh/chị mong muốn nhà trường cải thiện gì?</p>
        </div>
      </div>
    </div>
  );
}
