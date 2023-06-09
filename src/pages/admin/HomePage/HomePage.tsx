import { useEffect, useRef, useState } from 'react';
import apiService from '../../../api/apiService';
import { notification } from 'antd';
import videoBackground from '../../../assets/video/background.mp4';
import logo from '../../../assets/img/VLU_Full_Logo.png';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hook/useRedux';
import FormFirstTime from '../../client/Homepage/FormFirstTime';

export default function () {
  const navigate = useNavigate();

  const firstTimeLogin = useAppSelector((state) => state.auth.firstTimeLogin);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response: any = await apiService.getProfile();
    const { roleId, code, avatar } = response;

    if (roleId == 1) {
      navigate('/home');
      notification.error({
        message: 'Bạn Không Có Quyền Truy Cập Trang Admin',
      });
    }
  };

  return (
    <div className="">
      {firstTimeLogin && <FormFirstTime />}

      <Welcome />
    </div>
  );
}

export function Welcome() {
  const kindWords = [
    'Không phát hiện ra sai lầm thì sẽ mãi chìm đắm trong sai lầm và đi lạc phương hướng chẳng thể chạm đến quang vinh.',
    'Có sự tin tưởng là bạn đã chính là người thắng lợi, người có niềm tin sẽ làm những việc nhỏ bé trở thành vĩ đại, khiến những điều tầm thường trở thành kỳ tích.',
    'Thành công sẽ không bao giờ từ chối những con người dám nghĩ dám làm. Tôi tin bạn sẽ làm được tốt hơn thế.',
    'Đủ nghị lực thành công sẽ đến. Đủ mạnh mẽ để bước tới tương lai tươi sáng đang rộng mở chào đón bạn đấy.',
    ' Người thành công là người luôn tự tin đi tìm kiếm cơ hội cho mình, cơ hội này mất đi thì hãy mạnh mẽ đứng dậy bước tiếp.',
    'Ý chí sinh ra nghị lực, nghị lực sinh ra sức mạnh, sức mạnh làm nên thành công. Bạn hãy vững tin vào bản thân và mọi chuyện rồi sẽ tốt đẹp.',
    'Hạnh phúc không tùy thuộc bạn là ai, bạn được làm gì mà tùy thuộc bạn suy nghĩ như thế nào.',
    ' Đừng nên oán giận hay căm phẫn những chuyện không vui hay buồn phiền lại ập đến với mình, đến một lúc nào đó bạn sẽ thấy biết ơn và trân trọng chúng.',
  ];
  const [kindWord, setKindWord] = useState('');
  function getKindWord() {
    setKindWord(kindWords[getRandomArbitrary(0, kindWords.length - 1)]);
  }
  useEffect(() => {
    getKindWord();
  }, []);
  const setPlayBack = (e: any) => {
    e.playbackRate = 0.8;
  };
  return (
    <div className="bg-slate-500 max-sm:bg-gray-900 max-sm:w-fit ">
      <div className="">
        <div className="overlay bg-dark-red" />
        <video
          style={{
            height: '100vh',
            width: '100%',
            objectFit: 'cover',
          }}
          autoPlay
          preload={'none'}
          muted
          loop
          onCanPlay={(e) => setPlayBack(e)}
          id="myVideo"
          className="max-sm:hidden max-sm:h-full "
        >
          <source src={videoBackground} />
        </video>
      </div>
      <main className="fixed w-full h-full top-0 place-content-center items-center flex flex-col">
        <h1 className="text-[#fff] uppercase font-bold text-center max-sm:max-md:text-xl text-5xl mb-10 mt-10">
          <div className="max-sm:max-md:flex max-sm:max-md:justify-center ">
            <img src={logo} className="max-sm:max-md:w-[50%] " />
          </div>
          <p className="mt-8 ">L&D VLG Training</p>
        </h1>
        <p className="mt-4 text-2xl max-w-[50%] text-center text-white leading-10">
          {kindWord}
        </p>
        <div className="flex justify-center max-sm:flex-col w-full max-sm:items-center"></div>
        <div className=" container mx-auto px-6">
          <div className="mt-16 z- flex flex-col items-center">
            <div className="sm:w-2/3 max-sm:w-fit text-center py-6">
              <p className=" text-sm text-white font-bold mb-2 max-sm:max-md:px-12">
                © 2022 - Bản Quyền Thuộc Trường Đại học Văn Lang
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
