// eslint-disable-next-line import/newline-after-import
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBar from '../pages/admin'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Login from '../pages/authentication/Login'
import LandingPage from '../pages/landing page'
import Category from '../pages/admin/Category'
import Account from '../pages/admin/account/Account'

export const AdminRouter = [
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/Category',
    element: <Category />,
  },
  {
    path: '/admin/Account',
    element: <Account />,
  },
]
export default function MakeAdminRouter() {
  return (
    <Routes>
      {AdminRouter.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            element={<SideBar content={router.element} />}
          />
        )
      })}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}
