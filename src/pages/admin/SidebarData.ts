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
    path: '/admin',
  },
  {
    title: 'Quản Lý Tài Khoản',
    icon: BsFillHouseFill,
    path: '/admin/account',
  },
  {
    title: 'Quản Lý Khóa Học',
    icon: BsFillHouseFill,
    path: '/admin/course',
  },
  {
    title: 'Danh Mục',
    icon: BsFillHouseFill,
    path: '/admin/category',
  },
  {
    title: 'Quản Lý Học Viên',
    icon: BsFillHouseFill,
    path: '/admin/learner',
  },
  {
    title: 'Bài Kiểm Tra',
    icon: BsFillHouseFill,
    path: '/admin/test',
  },
]
