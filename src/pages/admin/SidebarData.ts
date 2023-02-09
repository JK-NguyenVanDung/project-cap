import { IconType } from 'react-icons';
import { BiClipboard } from 'react-icons/bi';
import {
  BsCalendar2DateFill,
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsHouseFill,
} from 'react-icons/bs';
import { FaClipboard, FaClipboardList } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { HiClipboardDocumentList } from 'react-icons/hi2';

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
    children: [
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
        icon: BsCalendar2DateFill,
        path: '/admin/AcademicYear',
      },
      {
        title: 'Chức Vụ',
        icon: BsFillPersonBadgeFill,
        path: '/admin/Position',
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
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Published',
  },
  {
    title: 'Khảo sát',
    icon: FaClipboard,
    path: '/admin/Survey',
    children: [
      {
        title: 'Khảo sát chung',
        icon: FaClipboardList,
        path: '/admin/Survey',
      },
      {
        title: 'Khảo sát chương trình',
        icon: HiClipboardDocumentList,
        path: '/admin/CourseSurvey',
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
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
    children: [
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
        icon: BsCalendar2DateFill,
        path: '/admin/AcademicYear',
      },
      {
        title: 'Chức Vụ',
        icon: BsFillPersonBadgeFill,
        path: '/admin/Position',
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
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Published',
  },
];

export const SideBarDataFacul = [
  {
    title: 'Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
    children: [
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
        icon: BsCalendar2DateFill,
        path: '/admin/AcademicYear',
      },
      {
        title: 'Chức Vụ',
        icon: BsFillPersonBadgeFill,
        path: '/admin/Position',
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
  {
    title: 'Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Published',
  },
];
