/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 16:27:52
 */

import React, { Component } from 'react';
import Permission from 'Permission';
import { Route, Switch, Redirect } from 'react-router-dom';
import ExamPage from './ExamPage';
import Result from './Result';
import Exams from './Exams';
// import ExamEnd from './ExamEnd';
import Finish from './Finish';

class ExamRoute extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <Switch>
        <Route exact path={`${match.url}/main/:id`} component={ExamPage} />
        <Route path={`${match.url}/exams`} component={Exams} />
        {/* <Route path={`${match.url}/end`} component={ExamEnd} /> */}
        <Route path={`${match.url}/finish/:id`} component={Finish} />        
        <Route path={`${match.url}/result/:id`} component={Result} />
        <Redirect from={`${match.url}`} to={`${match.url}/main`} />
      </Switch>
    );
  }
}


export default Permission(ExamRoute, ['admin', 'student']);
