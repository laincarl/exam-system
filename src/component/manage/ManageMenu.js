/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:56 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 15:14:09
 */

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('AppState')
class ManageMenu extends Component {
  render() {
    const { AppState, match, history } = this.props;
    let currentMenu = AppState.currentLocation.pathname;
    // console.log(match.url);
    // 匹配当前级别路由地址
    const pathReg = new RegExp(`${match.url}/[^/]*?((?=/)|$)`);
    if (currentMenu.match(pathReg)) {
      [currentMenu] = currentMenu.match(pathReg);
    }
    // console.log(currentMenu);
    // console.log('/manage/main/aa'.match(/\/manage\/[^/]*?((?=\/)|$)/));
    // console.log(AppState.currentLocation.pathname);
    return (
      <div style={{ borderRight: '1px solid rgb(211, 211, 211)', background: 'white' }}>
        <Menu
          mode="inline"
          style={{ width: 256, background: 'white' }}
          selectedKeys={[currentMenu]}
          onClick={({ key }) => {
          // console.log(key);
          if (currentMenu !== key) {
            history.push(key);
          }
        }}
        >
          <Menu.Item key={`${match.url}/main`}><Icon type="home" />基本信息</Menu.Item>
          <Menu.Item key={`${match.url}/user`}><Icon type="user" />用户管理</Menu.Item>
          <Menu.Item key={`${match.url}/exam`}><Icon type="switcher" />考试管理</Menu.Item>
          <Menu.Item key={`${match.url}/bank`}><Icon type="profile" />题库管理</Menu.Item>
          <Menu.Item key={`${match.url}/paper`}><Icon type="copy" />试卷管理</Menu.Item>
          <Menu.Item key={`${match.url}/analyze`}><Icon type="calculator" />统计信息</Menu.Item>
        </Menu>
      </div>
    );
  }
}


export default withRouter(ManageMenu);
