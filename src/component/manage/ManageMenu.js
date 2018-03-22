/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:56 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-08 19:07:40
 */

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('AppState')
class ManageMenu extends Component {
  render() {
    const { AppState, match, history } = this.props;
    const currentMenu = AppState.currentLocation.pathname;
    // console.log(AppState.currentLocation.pathname);
    return (
      <div style={{ borderRight: '1px solid rgb(211, 211, 211)', background: '#fafafa' }}>
        <Menu
          mode="inline"
          style={{ width: 256, background: '#fafafa' }}
          selectedKeys={[currentMenu]}
          onClick={({ key }) => {
          // console.log(key);
          if (currentMenu !== key) {
            history.push(key);
          }
        }}
        >
          <Menu.Item key={`${match.url}/main`}><Icon type="home" />基本信息</Menu.Item>
          <Menu.Item key={`${match.url}/user`}><Icon type="home" />用户管理</Menu.Item>
          <Menu.Item key={`${match.url}/examlist`}><Icon type="switcher" />考试管理</Menu.Item>
          <Menu.Item key={`${match.url}/questionbank`}><Icon type="switcher" />题库管理</Menu.Item>
          <Menu.Item key={`${match.url}/paperlist`}><Icon type="copy" />试卷管理</Menu.Item>
          <Menu.Item key={`${match.url}/analyze`}><Icon type="calculator" />统计信息</Menu.Item>
        </Menu>
      </div>
    );
  }
}


export default withRouter(ManageMenu);
