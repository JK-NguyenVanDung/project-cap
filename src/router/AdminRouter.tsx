// eslint-disable-next-line import/newline-after-import
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Login from '../pages/authentication/Login'
import LandingPage from '../pages/landing page'
export const AdminRouter = [
  {
    path: '/admin',
    element: <Dashboard />,
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
