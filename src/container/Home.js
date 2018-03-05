/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:34:55 
 */

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
       Home
        <Link to="login" >登录</Link>
      </div>
    );
  }
}


export default Home;
