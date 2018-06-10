/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:52 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-19 16:24:04
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Permission from 'Permission';
import PermissionMenu from 'component/common/PermissionMenu';
import CheckPermission from 'util/CheckPermission';
import Main from './Main';
import ExamRoute from './exam/ExamRoute';
import PaperRoute from './paper/PaperRoute';
import UserRoute from './user/UserRoute';
import BankRoute from './bank/BankRoute';
// import Analyze from './analyze/Analyze';

let menus = [{
  path: 'main',
  icon: 'home',
  text: '基本信息',
  component: Main,
}, {
  path: 'user',
  icon: 'user',
  text: '用户管理',
  permission: ['admin'],
  component: Permission(UserRoute, ['admin']),
}, {
  path: 'bank',
  icon: 'profile',
  text: '题库管理',
  component: BankRoute,
}, {
  path: 'paper',
  icon: 'copy',
  text: '试卷管理',
  component: PaperRoute,
}, {
  path: 'exam',
  icon: 'switcher',
  text: '考试管理',
  component: ExamRoute,
}, 
// {
//   path: 'analyze',
//   icon: 'bar-chart',
//   text: '统计信息',
//   component: Analyze,
// }
];
class Manage extends Component {
  render() {
    const { match } = this.props;
    // console.log(this.props);
    menus = menus.filter(menu => !menu.permission || CheckPermission(menu.permission));
    // console.log(menus);
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <PermissionMenu menus={menus} />
        <div style={{ flex: 1 }}>
          <Switch>
            {
              menus.map(menu => <Route path={`${match.url}/${menu.path}`} component={menu.component} />)
            }
            {/* <Route path={`${match.url}/main`} component={Main} />
            <Route path={`${match.url}/exam`} component={ExamRoute} />
            <Route path={`${match.url}/paper`} component={PaperRoute} />           
            <Route path={`${match.url}/analyze`} component={Analyze} />
            <Route path={`${match.url}/bank`} component={BankRoute} />
            <Route path={`${match.url}/user`} component={UserRoute} /> */}
            <Redirect from={`${match.url}`} to={`${match.url}/main`} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default Permission(Manage, ['admin', 'teacher']);
