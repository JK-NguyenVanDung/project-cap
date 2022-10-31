// eslint-disable-next-line import/newline-after-import
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Category from '../pages/admin/Category'
export const AdminRouter = [
  {
    path: '/Admin/Category',
    element: <Category />,
  },
]

export default function MakeAdminRouter() {
  return (
    <>
      {AdminRouter.map((route, index) => {
        return (
          <Routes key={index}>
            <Route path={route.path} element={route.element} />
          </Routes>
        )
      })}
    </>
  )
}
