import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import Button from '../../components/sharedComponents/Button';
import React, { useEffect, useState } from 'react';
import { IoTimeSharp } from 'react-icons/io5';
import People from '../../assets/landingPage/people.svg';
import { useDispatch } from 'react-redux';
import { actions } from '../../Redux';
import { IProgramItem } from '../../Type';
import { API_URL } from '../../api/api';

const Product = React.forwardRef((props, ref: any) => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Array<IProgramItem>>(null);
  const dispatch = useDispatch();

  async function getData() {
    try {
      let res: any = await apiService.getPrograms();
      setPrograms(res);
    } catch (err: any) {
      throw err.message();
    }
  }
  function handleNavProducts() {
    dispatch(actions.navActions.setNav(`/Courses/`));
    dispatch(actions.authActions.setInfo(null));
    navigate('/login');
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
            onClick={() => handleNavProducts()}
            className=" h-12 btn-transparent text-blue-700"
          >
            Xem thêm
          </Button>
        </div>
        <div className="products max-sm:flex-wrap  flex flex-row justify-evenly items-center w-full ">
          <ProductCard
            program={programs && programs[0]}
            title={programs && programs[0]?.programName}
            view={programs && programs[0]?.maxLearner + ' Học viên'}
            hour={programs && programs[0]?.trainingHours + ' buổi'}
            image={programs && programs[0]?.image}
          />
          <ProductCard
            program={programs && programs[6]}
            title={programs && programs[6]?.programName}
            view={programs && programs[6]?.maxLearner + ' Học viên'}
            hour={programs && programs[6]?.trainingHours + ' buổi'}
            image={programs && programs[6]?.image}
          />
          <ProductCard
            program={programs && programs[1]}
            title={programs && programs[1]?.programName}
            view={programs && programs[1]?.maxLearner + ' Học viên'}
            hour={programs && programs[1]?.trainingHours + ' buổi'}
            image={programs && programs[1]?.image}
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
    dispatch(actions.navActions.setNav(`/Courses/${props?.title}`));
    dispatch(actions.formActions.setProgramForm(props.program));
    dispatch(actions.authActions.setInfo(null));

    navigate('/login');
  }
  return (
    <div className="max-sm:m-4   relative max-w-[16.7rem] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img
          loading="lazy"
          className="rounded-t-lg h-40 w-full"
          src={`${API_URL}/images/${props?.image}`}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
            //https://cntttest.vanlanguni.edu.vn:18081/CP25Team02/images/${props.item.image}
          }}
        />
      </a>
      <div className="py-3 px-5">
        <a>
          <h5 className=" text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>
        <div className="flex w-full ">
          <div className="inline-flex  justify-between  px-2 flex-row w-full h-16 min-w-0">
            <div className="inline-flex flex-row justify-between items-center ">
              <img loading="lazy" src={People} className="pr-2" />
              <span className="w-fit ">{props.view}</span>
            </div>
            <div className="inline-flex flex-row justify-between items-center  ">
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
