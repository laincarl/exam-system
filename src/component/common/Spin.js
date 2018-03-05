/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:32 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:34:32 
 */

import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

class MySpin extends Component {
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <div>
        <Spin indicator={antIcon} {...this.props} />
      </div>
    );
  }
}


export default MySpin;
