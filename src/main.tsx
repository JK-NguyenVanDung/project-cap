import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'
const baseUrl = window.location.href
  .toString()
  .includes('http://127.0.0.1:5173')
  ? '/'
  : '/SEP25Team17/'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
