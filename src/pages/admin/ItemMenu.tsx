import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';
import { matchRoutes, useLocation } from 'react-router-dom';

export default function ItemMenu({ params }: { params: any }) {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  let location = useLocation();

  return (
    <>
      <li
        className={`${
          location.pathname === params.path
            ? 'bg-white bg-opacity-25 rounded-lg mx-1 '
            : ''
        }${
          location.pathname === params.path ? ' text-primary' : 'text-primary'
        }hover:bg-white hover:text-white py-4 my-0 cursor-pointer flex max-w-full justify-center  h-12 text-center items-center  `}
        onClick={() => {
          navigation(params.path);
          dispatch(
            actions.formActions.setNameMenu(
              `${
                params.title == 'Trang Chủ'
                  ? params.title
                  : params.headTitle &&
                    params.headTitle.includes('Chương Trình')
                  ? 'Quản Lý ' + params.headTitle
                  : 'Quản Lý ' + params.title
              }`,
            ),
          );
        }}
      >
        <div id="icon">
          <params.icon className="ml-2 text-md " />
        </div>{' '}
        <div id="title" className="flex  ">
          <p
            className={`font-semibold ${
              params.textClassName ? params.textClassName : 'text-sm uppercase'
            }`}
          >
            {params.title}
          </p>
        </div>
      </li>
    </>
  );
}
