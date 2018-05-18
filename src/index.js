/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:35:21 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-05 17:25:35
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';

const render = (Cmt) => {
  ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
      <Cmt />
    </LocaleProvider>      
    ,
    document.getElementById('root'),
  );
};
render(App);
