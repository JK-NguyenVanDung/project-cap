import { IconType } from 'react-icons';
import {
  BsCalendar2DateFill,
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsHouseFill,
} from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';

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
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/ListLeaner',
    children: [{ title: 'Tất Cả', icon: ImBooks, path: '/admin/ListLeaner' }],
  },
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
    children: [
      {
        title: 'Khoa Ban',
        icon: BsHouseFill,
        path: '/admin/Faculties',
      },
      {
        title: 'Nhóm chương trình',
        icon: FaClipboardList,
        path: '/admin/Category',
      },

      {
        title: 'Năm Học',
        icon: BsCalendar2DateFill,
        path: '/admin/AcedemicYear',
      },
      {
        title: 'Chức Vụ',
        icon: BsFillPersonBadgeFill,
        path: '/admin/Postions',
      },
    ],
  },

  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/admin/Program',
    children: [
      {
        title: 'Tất Cả',
        icon: ImBooks,
        path: '/admin/Program',
      },
      {
        title: 'Của Tôi',
        icon: ImAddressBook,
        path: '/admin/MyProgram',
      },
      {
        title: 'Chờ Duyệt',
        icon: GoVerified,
        path: '/admin/reviewProgram',
      },
    ],
  },
];

export const SideBarDataCT = [
  {
    title: 'Trang Chủ',
    icon: IoApps,
    path: '/admin',
  },
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/ListLeaner',
    children: [{ title: 'Tất Cả', icon: ImBooks, path: '/admin/ListLeaner' }],
  },
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
    children: [
      {
        title: 'Chức Vụ',
        icon: BsFillPersonBadgeFill,
        path: '/admin/Postions',
      },
      {
        title: 'Nhóm chương trình',
        icon: FaClipboardList,
        path: '/admin/Category',
      },
      {
        title: 'Khoa Ban',
        icon: BsHouseFill,
        path: '/admin/Faculties',
      },
      {
        title: 'Năm Học',
        icon: BsFillPersonBadgeFill,
        path: '/admin/AcedemicYear',
      },
    ],
  },

  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/admin/Program',
    children: [
      {
        title: 'Tất Cả',
        icon: ImBooks,
        path: '/admin/Program',
      },
      {
        title: 'Của Tôi',
        icon: ImAddressBook,
        path: '/admin/MyProgram',
      },
      {
        title: 'Chờ Duyệt',
        icon: GoVerified,
        path: '/admin/reviewProgram',
      },
    ],
  },
];

export const SideBarDataFacul = [
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/ListLeaner',
    children: [{ title: 'Tất Cả', icon: ImBooks, path: '/admin/ListLeaner' }],
  },
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
    children: [
      {
        title: 'Chức Vụ',
        icon: BsFillPersonBadgeFill,
        path: '/admin/Postions',
      },
      {
        title: 'Nhóm chương trình',
        icon: FaClipboardList,
        path: '/admin/Category',
      },
      {
        title: 'Khoa Ban',
        icon: BsHouseFill,
        path: '/admin/Faculties',
      },
      {
        title: 'Năm Học',
        icon: BsFillPersonBadgeFill,
        path: '/admin/AcedemicYear',
      },
    ],
  },

  {
    title: 'Chương Trình',
    icon: IoBook,
    path: '/admin/Program',
    children: [
      {
        title: 'Tất Cả',
        icon: ImBooks,
        path: '/admin/Program',
      },
      {
        title: 'Của Tôi',
        icon: ImAddressBook,
        path: '/admin/MyProgram',
      },
      {
        title: 'Chờ Duyệt',
        icon: GoVerified,
        path: '/admin/reviewProgram',
      },
    ],
  },
];
