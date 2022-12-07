import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './pages/authentication/loginconfig';

const msalInstance = new PublicClientApplication(msalConfig);
let base =
  (document.querySelector('base')?.getAttribute('href') as string) ?? '/';
const baseUrl = window.location.href.toString().includes('5173')
  ? '/'
  : '/SEP25Team17/';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {baseUrl === '/' ? (
      <MsalProvider instance={msalInstance}>
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
      </MsalProvider>
    ) : (
      <MsalProvider instance={msalInstance}>
        <HashRouter>
          <App />
        </HashRouter>
      </MsalProvider>
    )}
  </Provider>,
);
