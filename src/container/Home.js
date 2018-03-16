/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:32:38
 */

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import MainHeader from 'MainHeader';
import { Button } from 'antd';
// import axios from 'Axios';

class Home extends Component {
  generateExam=() => {
    // axios.get
  }
  render() {
    return (
      <div>
        <MainHeader />
        Home        
        <Link to="exampage">示例</Link>
        <Button onClick={this.generateExam}>进入考试</Button>
      </div>
    );
  }
}


export default Home;
