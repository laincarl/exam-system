/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:49:01
 */

import React, { Component } from 'react';
import Permission from 'Permission';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';

class Account extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <Switch>
          <Route exact path={`${match.url}/home`} component={Home} />
          <Redirect from={`${match.url}`} to={`${match.url}/home`} />
        </Switch>
      </div>
    );
  }
}


export default Permission(Account, ['admin', 'student']);
