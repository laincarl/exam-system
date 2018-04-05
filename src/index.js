/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:35:21 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-05 17:25:35
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';

const render = (Cmt) => {
  ReactDOM.render(
    <AppContainer key={Math.random()}>
      <LocaleProvider locale={zh_CN}>
        <Cmt />
      </LocaleProvider>      
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(App);
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
