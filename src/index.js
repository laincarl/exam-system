import React, { Component } from 'react';
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
