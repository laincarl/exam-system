/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:38 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:33:38 
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react';
import AppState from 'AppState';

const Permission = (WrappedComponent, role = ['student']) => {
  @observer
  class WrapComponent extends Component {
    componentDidMount() {
      this.checkAuth();
    }
    componentWillReact() {
      this.checkAuth();
    }
    checkAuth = () => {
      const { userAuth } = AppState;
      if (!userAuth) {
        this.props.history.replace('/login');
      }
    }
    render() {
      const { userAuth, userInfo } = AppState;
      return userAuth && role.includes(userInfo.role) ? <WrappedComponent {...this.props} /> : null;
    }
  }
  return withRouter(WrapComponent);
};

export default Permission;
