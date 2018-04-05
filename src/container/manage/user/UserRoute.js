/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 17:13:12
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Users from './Users';

class UserRoute extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <Switch>
        <Route exact path={`${match.url}/list`} component={Users} />             
        <Redirect from={`${match.url}`} to={`${match.url}/list`} />
      </Switch>
    );
  }
}


export default UserRoute;
