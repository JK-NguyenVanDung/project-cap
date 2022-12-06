import { IconType } from 'react-icons';
import {
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsHouse,
} from 'react-icons/bs';
import { IoApps, IoBook, IoAlbums, IoPeopleCircle } from 'react-icons/io5';

export interface ISidebar {
  title: string;
  icon: IconType;
  path: string;
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
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Learner',
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
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Learner',
  },
];
