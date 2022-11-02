import React, { useState } from 'react'
import { Link, Router } from 'react-router-dom'

import LandingPage from './pages/landing page'
import MakeAdminRouter from './router/AdminRouter'
import 'antd/dist/antd.css'

import MakeRouterPage from './router/Router'
function App() {
  return (
    <>
      <MakeRouterPage />
      <MakeAdminRouter />
    </>
  )
}

export default App
