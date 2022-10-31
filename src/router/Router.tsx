import React from 'react'
import { Routes, Route, redirect } from 'react-router-dom'
import LandingPage from '../pages/landing page'
import MakeAdminRouter from './AdminRouter'

export const PageRouter = [
  {
    path: '/',
    element: <LandingPage />,
  },
]
let admin = true
export default function MakeRouterPage() {
  return (
    <>
      {PageRouter.map((route, index) => {
        return (
          <Routes key={index}>
            <Route path={route.path} element={route.element} />
          </Routes>
        )
      })}
      {admin && <MakeAdminRouter />}
    </>
  )
}
