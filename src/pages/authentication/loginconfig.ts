import { Configuration, PopupRequest } from '@azure/msal-browser';

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: '69720f00-5f88-4633-88d3-f3d9a3c9a7b2',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:5173/',
    postLogoutRedirectUri: '/',
  },
};

export const loginRequest: PopupRequest = {
  scopes: ['User.Read'],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft-ppe.com/v1.0/me',
};