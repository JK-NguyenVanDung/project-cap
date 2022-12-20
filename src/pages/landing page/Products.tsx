import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import Button from '../../components/sharedComponents/Button';
import React, { useEffect, useState } from 'react';
import { IoTimeSharp } from 'react-icons/io5';
import People from '../../assets/landingPage/people.svg';
import { useDispatch } from 'react-redux';
import { actions } from '../../Redux';

const Product = React.forwardRef((props, ref: any) => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState(null);

  async function getData() {
    try {
      let res: any = await apiService.getPrograms();
      setPrograms(res);
    } catch (err: any) {
      throw err.message();
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <section ref={ref} className={`z-0  h-screen w-screen bg-gradient`}>
      <div className=" z-10 h-[20vh] separationBg w-full"></div>
      <div className="  z-20 relative min-h-[60vh]  px-20 bg-white text-black border-opacity-0">
        <div className="flex max-sm:flex-wrap  max-sm:mb-16 flex-row w-full h-20 items-center  md:px-[9rem] sd:px-0 justify-between mb-[0.75rem] ">
          <p className="max-sm:text-xl max-sm:w-full max-sm:mb-4  font-semibold md:text-3xl w-2/3">
            Một số khoá học nổi tiếng của chúng tôi
          </p>
          <Button
            onClick={() => navigate('/login')}
            className=" h-12 btn-transparent text-blue-700"
          >
            Xem thêm
          </Button>
        </div>
        <div className="products max-sm:flex-wrap  flex flex-row justify-evenly items-center w-full ">
          <ProductCard
            program={programs && programs[0]}
            title="Đắc Nhân Tâm"
            view="500 Học viên"
            hour="10 buổi"
            image="https://americastarbooks.com/wp-content/uploads/2018/11/noi-dung-sach-dac-nhan-tam-1280x720.jpg"
          />
          <ProductCard
            program={programs && programs[0]}
            title="Tiếng Anh Giao Tiếp"
            view="200 Học viên"
            hour="20 buổi"
            image="https://vcdn1-vnexpress.vnecdn.net/2020/09/12/English-4241-1599884287.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=lXq1p7RniKkjCoSZHhQ5PQ"
          />
          <ProductCard
            program={programs && programs[0]}
            title="Kỹ Năng Mềm"
            view="300 Học viên"
            hour="12 buổi"
            image="https://images.careerbuilder.vn/content/images/loi-ich-tu-nhung-ky-nang-mem-careerbuilder.jpg  "
          />
        </div>
      </div>
      <div className=" z-20  separationBg2 h-[20vh] w-full "></div>
    </section>
  );
});
const ProductCard = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleNavProduct() {
    navigate('/login');
    dispatch(actions.navActions.setNav(`/Courses/${props.product.name}`));

    dispatch(actions.productActions.setDetail(props.product));
  }
  return (
    <div className="max-sm:m-4  relative max-w-[16.7rem] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img className="rounded-t-lg h-40 w-full" src={props.image} alt="" />
      </a>
      <div className="py-3 px-5">
        <a>
          <h5 className=" text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>
        <div className=" ">
          <div className="inline-flex flex-row w-full h-16 min-w-0">
            <div className="inline-flex flex-row justify-between items-center ">
              <img src={People} className="pr-2" />
              <span>{props.view}</span>
            </div>
            <div className="inline-flex flex-row justify-between items-center pl-10 ">
              <IoTimeSharp className="text-lg text-primary" />
              <span className="pl-2 text-sm">{props.hour}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button
            onClick={() => handleNavProduct()}
            className="btn-primary btn-l"
          >
            Xem khoá học
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
