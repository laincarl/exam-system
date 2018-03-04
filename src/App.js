import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MainMenu from './component/common/MainMenu';
import DevRouter from './Router';
import menuStore from './store/menuStore';

const stores = {
  // Key can be whatever you want
  routing: menuStore,
  // ...other stores
};

export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>
          <div>
            <div>
              <MainMenu />
            </div>
            <div>
              <DevRouter />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
