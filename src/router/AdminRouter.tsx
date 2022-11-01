// eslint-disable-next-line import/newline-after-import
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Category from '../pages/admin/Category'

export const AdminRouter = [
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/Category',
    element: <Category />,
  },
]
export default function MakeAdminRouter() {
  return (
    <Routes>
      {AdminRouter.map((router, index) => {
        return <Route key={index} path={router.path} element={router.element} />
      })}
    </Routes>
  )
}
