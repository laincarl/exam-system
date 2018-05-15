/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:40 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-08 18:50:55
 */

import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('AppState')
class Main extends Component {
  render() {
    return (
      <div>      
        <div>manage</div>
      </div>
    );
  }
}

export default Main;
