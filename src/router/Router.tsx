import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/authentication/Login'
import HomePage from '../pages/client/HomePage/HomePage'
import LandingPage from '../pages/landing page'

export const PageRouter = [
  {
    path: '/Home',
    element: <HomePage />,
  },
]
export default function MakeRouterPage() {
  return (
    <>
      <Routes>
        {PageRouter.map((router, index) => {
          return (
            <Route key={index} path={router.path} element={router.element} />
          )
        })}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  )
}
