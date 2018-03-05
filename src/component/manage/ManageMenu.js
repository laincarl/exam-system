/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:56 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:33:56 
 */

import React, { Component } from 'react';
import { Menu } from 'antd';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('AppState')
class ManageMenu extends Component {
  render() {
    const { AppState, match, history } = this.props;
    const currentMenu = AppState.currentLocation.pathname;
    console.log(match.url, AppState.currentLocation.pathname);
    return (
      <Menu
        mode="inline"
        style={{ width: 256 }}
        selectedKeys={[currentMenu]}
        onClick={({ key }) => {
          // console.log(key);
          if (currentMenu !== key) {
            history.push(key);
          }
        }}
      >
        <Menu.Item key={`${match.url}`}>首页</Menu.Item>
        <Menu.Item key={`${match.url}/test`}>test</Menu.Item>
       
      </Menu>
    );
  }
}


export default withRouter(ManageMenu);
