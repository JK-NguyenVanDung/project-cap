import { IconType } from 'react-icons';
import {
  BsFillHouseFill,
  BsFillPersonBadgeFill,
  BsHouse,
} from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';

import { ImAddressBook, ImBooks } from 'react-icons/im';
import {
  IoApps,
  IoBook,
  IoAlbums,
  IoPeopleCircle,
  IoNewspaper,
} from 'react-icons/io5';
import { SlBadge } from 'react-icons/sl';
import { MdCollectionsBookmark } from 'react-icons/md';
import { GiBookmarklet } from 'react-icons/gi';

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
    title: 'Khóa học',
    icon: IoBook,
    path: '/Programs',
  },
  {
    title: 'Đơn Đăng Ký',
    icon: IoNewspaper,
    path: '/RegisteredPrograms',
  },
  {
    title: 'Khóa Học Của Tôi',
    icon: MdCollectionsBookmark,
    path: '/MyCourses',
  },
  {
    title: 'Đổi Quà Tặng',
    icon: MdCollectionsBookmark,
    path: '/Gift',
  },

  {
    title: 'Đổi Coin',
    icon: BsFillPersonBadgeFill,
    path: '/CoinExchanges',
  },

  {
    title: 'Hướng dẫn',
    icon: GiBookmarklet,
    path: '/Guide',
  },
];
