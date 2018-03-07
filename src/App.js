/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:32 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-06 16:11:22
 */

import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage, Login, Manage, ExamPage } from './container';
import RouterContainer from './RouterContainer';
import AppState from './store/AppState';
import './App.css';

const stores = {
  // Key can be whatever you want
  AppState,
  // ...other stores
};

export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>
          <RouterContainer>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/manage" component={Manage} />
              <Route path="/exampage" component={ExamPage} />              
              <Route path="/404" component={NotFoundPage} />
              {/* 其他重定向到 404 */}
              <Redirect from="*" to="/404" />
            </Switch>
          </RouterContainer>
          {/* <ChangeTracker /> */}
        </Router>
      </Provider>
    );
  }
}
