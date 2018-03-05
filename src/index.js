/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:35:21 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:35:21 
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = (Cmt) => {
  ReactDOM.render(
    <AppContainer key={Math.random()}>
      <Cmt />
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(App);
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
