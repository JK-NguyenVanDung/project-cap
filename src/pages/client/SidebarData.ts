import { IconType } from 'react-icons';
import {
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsHouse,
} from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';

import { ImAddressBook, ImBooks } from 'react-icons/im';
import { IoApps, IoBook, IoAlbums, IoPeopleCircle } from 'react-icons/io5';

export interface ISidebar {
  title: string;
  icon: IconType;
  path: string;
  children?: Array<ISidebar>;
}
export const SideBarData = [
  {
    title: 'Trang Chủ',
    icon: IoApps,
    path: '/home',
  },
  // {
  //   title: 'Tài Khoản',
  //   icon: IoPeopleCircle,
  //   path: '/admin/Account',
  // },
  // {
  //   title: 'Danh Mục',
  //   icon: IoAlbums,
  //   path: '/admin/Category',
  // },

  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/Programs',
  },
  // {
  //   title: 'Học Viên',
  //   icon: BsFillPersonBadgeFill,
  //   path: '/admin/Learner',
  // },
];
