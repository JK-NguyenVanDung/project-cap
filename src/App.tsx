import React, { useState } from 'react'
import { Link, Router, BrowserRouter } from 'react-router-dom'

import LandingPage from './pages/landing page'
import MakeAdminRouter from './router/AdminRouter'
import 'antd/dist/antd.css'

import MakeRouterPage from './router/Router'
function App() {
  return (
    <>
      <LandingPage />
    </>
  )
}

export default App
