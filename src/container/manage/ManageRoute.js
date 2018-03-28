/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 12:28:52
 */

import React, { Component } from 'react';
import CheckPermission from 'CheckPermission';
import { Route, Switch, Redirect } from 'react-router-dom';
import ManageMenu from '../../component/manage/ManageMenu';
import Main from './Main';
import Test from './Test';
import Exams from './Exams';
import Papers from './Papers';
import CreatePaper from './CreatePaper';
import UserManage from './UserManage';
import BankRoute from './bank/BankRoute';

class Manage extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <ManageMenu match />
        <div style={{ flex: 1 }}>
          <Switch>
            <Route exact path={`${match.url}/main`} component={Main} />
            <Route path={`${match.url}/examlist`} component={Exams} />
            <Route path={`${match.url}/paperlist`} component={Papers} />
            <Route path={`${match.url}/createpaper`} component={CreatePaper} />
            <Route path={`${match.url}/analyze`} component={Test} />
            <Route path={`${match.url}/bank`} component={BankRoute} />
            <Route path={`${match.url}/user`} component={UserManage} />
            <Redirect from={`${match.url}`} to={`${match.url}/main`} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default CheckPermission(Manage, 'admin');
