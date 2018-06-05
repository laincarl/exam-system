/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-06-04 20:36:04
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Exams from './Exams';
import ExamDetail from './ExamDetail';

class ExamRoute extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <Switch>
        <Route exact path={`${match.url}/list`} component={Exams} />
        <Route exact path={`${match.url}/detail/:id`} component={ExamDetail} />
        <Redirect from={`${match.url}`} to={`${match.url}/list`} />
      </Switch>
    );
  }
}


export default ExamRoute;
