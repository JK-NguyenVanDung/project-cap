import { IconType } from 'react-icons'
import { BsFillHouseFill } from 'react-icons/bs'
export interface ISidebar {
  title: string
  icon: IconType
  path: string
}
export const SideBarData = [
  {
    title: 'Trang Chủ',
    icon: BsFillHouseFill,
    path: '/Dashboard',
  },
  {
    title: 'Quản Lý Tài Khoản',
    icon: BsFillHouseFill,
    path: '/account',
  },
  {
    title: 'Quản Lý Khóa Học',
    icon: BsFillHouseFill,
    path: '/couse',
  },
  {
    title: 'Quản Lý Học Viên',
    icon: BsFillHouseFill,
    path: '/learner',
  },
  {
    title: 'Bài Kiểm Tra',
    icon: BsFillHouseFill,
    path: '/test',
  },
]
