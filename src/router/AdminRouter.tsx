// eslint-disable-next-line import/newline-after-import
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SideBar from '../pages/admin'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Login from '../pages/authentication/Login'
import LandingPage from '../pages/landing page'
import Category from '../pages/admin/Category'
import Account from '../pages/admin/account/Account'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react'
import { loginRequest } from '../pages/authentication/loginconfig'
import { callMsGraph } from '../pages/authentication/graph'
import Logined from './Logined'

export const AdminRouter = [
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/Account',
    element: <Account />,
  },
  {
    path: '/admin/Category',
    element: <Category />,
  },
  {
    path: '/admin/Course',
    element: <Account />,
  },
  {
    path: '/admin/Learner',
    element: <Account />,
  },
  {
    path: '/admin/Test',
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
      <Route path="/login" element={<Logined />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}
