/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-06 11:12:31
 */

import React, { Component } from 'react';
import CheckPermission from 'CheckPermission';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from 'Header';
import ManageMenu from '../../component/manage/ManageMenu';
import Main from './Main';
import Test from './Test';

class Manage extends Component {
  render() {
    const { match } = this.props;
    console.log(this.props);
    return (
      <div>
        <Header />
        <div style={{ display: 'flex' }}>
          <ManageMenu match />
          <Switch>
            <Route exact path={`${match.url}/main`} component={Main} />
            <Route path={`${match.url}/examlist`} component={Test} />
            <Route path={`${match.url}/paperlist`} component={Test} />
            <Route path={`${match.url}/analyze`} component={Test} />
            <Redirect from={`${match.url}`} to={`${match.url}/main`} />
          </Switch>
        </div>        
      </div>
    );
  }
}

Manage.propTypes = {

};

export default CheckPermission(Manage);
