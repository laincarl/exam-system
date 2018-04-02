/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-02 21:55:36
 */

import React, { Component } from 'react';
import CheckPermission from 'CheckPermission';
import { Route, Switch, Redirect } from 'react-router-dom';
import ManageMenu from '../../component/manage/ManageMenu';
import Main from './Main';
import Exams from './Exams';
import PaperRoute from './paper/PaperRoute';
import UserManage from './UserManage';
import BankRoute from './bank/BankRoute';
import Analyze from './analyze/Analyze';

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
            <Route path={`${match.url}/paper`} component={PaperRoute} />           
            <Route path={`${match.url}/analyze`} component={Analyze} />
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
