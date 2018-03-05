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

const CheckPermission = (WrappedComponent) => {
  @observer
  class WrapComponent extends Component {
    componentDidMount() {
      this.checkAuth();
    }
    componentWillReact() {
      this.checkAuth();
    }
    checkAuth=() => {
      const { userAuth } = AppState;
      if (!userAuth) {
        this.props.history.push('login');
      }
    }
    render() {
      const { userAuth } = AppState;
      
      return userAuth ? <WrappedComponent {...this.props} /> : null;
    }
  }

  return withRouter(WrapComponent);
};

export default CheckPermission;
