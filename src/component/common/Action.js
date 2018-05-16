/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:33:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-16 20:07:49
 */

import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class Action extends Component {
  onClick = (key) => {
    for (let a = 0; a < this.props.data.length; a += 1) {
      if (a === key.item.props.index) {
        this.props.data[a].action();
      }
    }
  }
  renderMenu = () => {
    const child = this.props.data.map(item =>
      (
        <Menu.Item
          key={Math.random()}
        >
          <div
            className="text-dot"
            style={{
              width: 80,
              height: 25,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item.text}
          </div>
        </Menu.Item>
      ));

    return child;
  }
  render() {
    const menu = (
      <Menu onClick={this.onClick.bind(this)}>
        {this.renderMenu()}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Icon
          type="ellipsis"
          style={{
            cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', transform: 'rotateZ(90deg)',
          }}
        />
      </Dropdown>);
  }
}
export default Action;
