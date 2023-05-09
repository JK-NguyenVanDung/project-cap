export const isHosting = true;
export const reRoute = isHosting ? '/CP25Team02/#' : '/';
export const path = isHosting
  ? 'https://cntttest.vanlanguni.edu.vn/CP25Team02'
  : 'http://localhost:5173';

//local:
//http://localhost:5173
//server:
//https://cntttest.vanlanguni.edu.vn/CP25Team02/

export const apiPath = isHosting
  ? 'https://cntttest.vanlanguni.edu.vn/SEP25Team17/'
  : 'https://localhost:7206';
//server:
// https://cntttest.vanlanguni.edu.vn/SEP25Team17/
//local:
// https://localhost:7206

export const exitPath = isHosting ? '/CP25Team02' : '/';
// server: /CP25Team02
