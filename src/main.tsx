import React, { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './pages/authentication/loginconfig';

const Wrapper = ({ children }: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
const msalInstance = new PublicClientApplication(msalConfig);
let base =
  (document.querySelector('base')?.getAttribute('href') as string) ?? '/';
const baseUrl = window.location.href.toString().includes('5173')
  ? '/'
  : '/CP25Team02/';
createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* {baseUrl === '/' ? ( */}
    <MsalProvider instance={msalInstance}>
      <BrowserRouter basename={baseUrl}>
        <Wrapper>
          <App />
        </Wrapper>
      </BrowserRouter>
    </MsalProvider>
    {/* ) : (
      <MsalProvider instance={msalInstance}>
        <HashRouter>
          <Wrapper>
            <App />
          </Wrapper>
        </HashRouter>
      </MsalProvider>
    )} */}
  </Provider>,
);
