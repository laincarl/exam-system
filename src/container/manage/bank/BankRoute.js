/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 12:30:08
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Banks from './Banks';
import BankDetail from './BankDetail';
import ImportQuestion from './ImportQuestion';

class BankRoute extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <Switch>
        <Route exact path={`${match.url}/list`} component={Banks} /> 
        <Route path={`${match.url}/import/:id?`} component={ImportQuestion} />
        <Route path={`${match.url}/detail/:id?`} component={BankDetail} />
        <Redirect from={`${match.url}`} to={`${match.url}/list`} />
      </Switch>
    );
  }
}


export default BankRoute;
