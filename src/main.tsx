import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './pages/authentication/loginconfig'
// const baseUrl = window.location.href
//   .toString()
//   .includes('http://127.0.0.1:5173')
//   ? '/'
//   : '/SEP25Team17/'

const msalInstance = new PublicClientApplication(msalConfig)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
