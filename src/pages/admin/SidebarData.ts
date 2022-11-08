import { IconType } from 'react-icons'
import { BsFillHouseFill, BsFillPersonBadgeFill } from 'react-icons/bs'
import { IoApps, IoBook, IoAlbums, IoPeopleCircle } from 'react-icons/io5'

export interface ISidebar {
  title: string
  icon: IconType
  path: string
}
export const SideBarData = [
  {
    title: 'Trang Chủ',
    icon: IoApps,
    path: '/admin',
  },
  {
    title: 'Quản Lý Tài Khoản',
    icon: IoPeopleCircle,
    path: '/admin/Account',
  },
  {
    title: 'Quản Lý Khóa Học',
    icon: IoBook,
    path: '/admin/Course',
  },
  {
    title: 'Quản lý Danh Mục',
    icon: IoAlbums,
    path: '/admin/Category',
  },
  {
    title: 'Quản Lý Học Viên',
    icon: BsFillPersonBadgeFill,
    path: '/admin/Learner',
  },
]
