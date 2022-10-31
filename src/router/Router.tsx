import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing page'

export const PageRouter = [
  {
    path: '/',
    elememt: <LandingPage />,
  },
]
export default function MakeRouterPage() {
  return (
    <>
      {PageRouter.map((route, index) => {
        return (
          <Routes key={index}>
            <Route path={route.path} element={route.elememt} />
          </Routes>
        )
      })}
    </>
  )
}
