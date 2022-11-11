import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'
let base =
  (document.querySelector('base')?.getAttribute('href') as string) ?? '/'
const baseUrl = window.location.href
  .toString()
  .includes('http://127.0.0.1:5173')
  ? '/'
  : '/SEP25Team17/'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {baseUrl === '/' ? (
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
      ) : (
        <HashRouter>
          <App />
        </HashRouter>
      )}
    </Provider>
  </React.StrictMode>
)
