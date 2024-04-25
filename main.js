import React from "react";
import App from "./src/router";
import { createRoot } from 'react-dom/client';
import rem from './src/util/rem';
import './src/style/base.less'

rem(750, 100);
const appElement = document.getElementById('app');
const root = createRoot(appElement);
root.render( <App/> );

const page = window.location.pathname;
console.log('TEST')

const token = localStorage.getItem('token');
if (!token && page !== '/login') {
	console.log('请重新登陆')
  // 重定向到登录页面
  window.location.href = '/login';
}