/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:33:52 
 */

import React, { Component } from 'react';
import CheckPermission from 'CheckPermission';
import { inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import ManageMenu from '../../component/manage/ManageMenu';
import Main from './Main';
import Test from './Test';

@inject('AppState')
class Manage extends Component {
  handleClick = () => {
    const { AppState } = this.props;
    AppState.setUserAuth(false);
  }
  render() {
    const { match } = this.props;
    console.log(this.props);
    return (
      <div>
        <ManageMenu match />
        <Switch>
          <Route exact path={match.url} component={Main} />
          <Route path={`${match.url}/test`} component={Test} />
        </Switch>
        <button onClick={this.handleClick}>更改</button>
        <div>manage</div>
      </div>
    );
  }
}

Manage.propTypes = {

};

export default CheckPermission(Manage);
