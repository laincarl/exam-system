/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-06 11:13:09
 */

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Header from 'Header';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
       Home
        <Link to="login" >登录</Link>
        <Link to="manage" >manage</Link>
        <Link to="exampage">示例</Link>
      </div>
    );
  }
}


export default Home;
