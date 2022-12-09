import { IconType } from 'react-icons';
import {
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsHouse,
} from 'react-icons/bs';

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
    path: '/admin',
  },
  {
    title: 'Tài Khoản',
    icon: IoPeopleCircle,
    path: '/admin/Account',
  },
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
  },
  {
    title: 'Phòng Ban',
    icon: BsHouse,
    path: '/admin/Faculties',
  },
  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/admin/Program',
    children: [
      {
        title: 'Tất Cả Chương Trình',
        icon: ImBooks,
        path: '/admin/Program',
      },
      {
        title: 'Chương Trình Của Tôi',
        icon: ImAddressBook,
        path: '/admin/MyProgram',
      },
    ],
  },
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Learner',
  },
];

export const SideBarDataCT = [
  {
    title: 'Trang Chủ',
    icon: IoApps,
    path: '/admin',
  },
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
  },
  {
    title: 'Phòng Ban',
    icon: BsHouse,
    path: '/admin/Faculties',
  },
  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/admin/Program',
  },
];

export const SideBarDataFacul = [
  {
    title: 'Trang Chủ',
    icon: IoApps,
    path: '/admin',
  },
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
  },
  {
    title: 'Phòng Ban',
    icon: BsHouse,
    path: '/admin/Faculties',
  },
  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/admin/Program',
  },
];
