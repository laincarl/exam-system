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
class PermissionMenu extends Component {
  render() {
    const {
      AppState, match, history, menus, 
    } = this.props;
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
          {
          menus.map(menu => <Menu.Item key={`${match.url}/${menu.path}`}><Icon type={menu.icon} />{menu.text}</Menu.Item>)
        }          
        </Menu>
      </div>
    );
  }
}


export default withRouter(PermissionMenu);
