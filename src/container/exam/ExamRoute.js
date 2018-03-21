/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:49:01
 */

import React, { Component } from 'react';
import CheckPermission from 'CheckPermission';
import { Route, Switch, Redirect } from 'react-router-dom';
import ExamPage from './ExamPage';
import Result from './Result';


class ExamRoute extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <Switch>
        <Route exact path={`${match.url}/main/:id`} component={ExamPage} />
        <Route path={`${match.url}/result`} component={Result} />
        <Redirect from={`${match.url}`} to={`${match.url}/main`} />
      </Switch>
    );
  }
}


export default CheckPermission(ExamRoute);
