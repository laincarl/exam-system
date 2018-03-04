import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Button } from 'antd';
@inject('routing')
class MenuTest extends Component {
  render() {
    const { routing, history } = this.props;
    const currentMenu = routing.currentMenu();
    return (
      <div style={{ display: 'block' }}>
        当前路由{currentMenu}
        <Button>sss</Button>
      </div>
    );
  }
}
export default withRouter(MenuTest);
