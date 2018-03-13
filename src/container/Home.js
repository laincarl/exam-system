/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:32:38
 */

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import MainHeader from 'MainHeader';

class Home extends Component {
  render() {
    return (
      <div>
        <MainHeader />
       Home
        <Link to="login" >登录</Link>
        <Link to="manage" >manage</Link>
        <Link to="exampage">示例</Link>
      </div>
    );
  }
}


export default Home;
