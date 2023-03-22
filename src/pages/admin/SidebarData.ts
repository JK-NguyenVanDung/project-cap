import { IconType } from 'react-icons';
import { BiClipboard } from 'react-icons/bi';
import {
  BsCalendar2DateFill,
  BsFillBarChartFill,
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsGiftFill,
  BsHouseFill,
} from 'react-icons/bs';
import { RiExchangeDollarFill } from 'react-icons/ri';

import {
  FaChartArea,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaComments,
  FaGifts,
} from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { RiDashboardFill } from 'react-icons/ri';

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
    title: 'Dashboard',
    icon: RiDashboardFill,
    path: '/admin/Dashboard',
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
  {
    title: 'Bình luận',
    icon: FaComments,
    path: '/admin/Comment',
  },
  {
    title: 'Đổi Coin',
    icon: RiExchangeDollarFill,
    path: '/admin/ExchangeCoin',
  },
  {
    title: 'Quà Tặng',
    icon: BsGiftFill,
    path: '/admin/ExchangeGift',
    children: [
      {
        title: 'Thống kê theo nhóm  ',
        icon: BsGiftFill,
        path: '/admin/ExchangeGift',
      },
      {
        title: 'Đổi Quà',
        icon: FaGifts,
        path: '/admin/ExchangeGift',
      },
    ],
  },
  {
    title: 'Thống kê',
    icon: BsFillBarChartFill,
    path: '/admin/Statistic/Faculty',
    children: [
      {
        title: 'Thống kê khoa/ban',
        icon: FaChartBar,
        path: '/admin/Statistic/Faculty',
      },
      {
        title: 'Thống kê theo nhóm  ',
        icon: FaChartArea,
        path: '/admin/Statistic/Category',
      },
    ],
  },
  {
    title: 'Quà Tặng',
    icon: IoPeopleCircle,
    path: '/admin/Gift',
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
  {
    title: 'Quà Tặng',
    icon: IoPeopleCircle,
    path: '/admin/Gift',
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
  {
    title: 'Quà Tặng',
    icon: IoPeopleCircle,
    path: '/admin/Gift',
  },
];
