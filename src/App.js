/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:32 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 17:24:50
 */

import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
// import { HashRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainHeader from 'MainHeader';
import { Home, NotFoundPage, Login, ManageRoute, Account, ExamRoute } from './container';
import RouterContainer from './RouterContainer';

import AppState from './store/AppState';
import './App.less';

const stores = {
  // Key can be whatever you want
  AppState,
  // ...other stores
};

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <MainHeader />
            <RouterContainer>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/manage" component={ManageRoute} />
                <Route path="/account" component={Account} />   
                <Route path="/exam" component={ExamRoute} />
                <Route path="/404" component={NotFoundPage} />
                {/* 其他重定向到 404 */}
                <Redirect from="*" to="/404" />
              </Switch>
            </RouterContainer>
          </div>
            
          {/* <ChangeTracker /> */}
        </Router>
      </Provider>
    );
  }
}
export default hot(module)(App);

