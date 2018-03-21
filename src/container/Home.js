/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:32:38
 */

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'antd';
import AppState from 'AppState';
// import axios from 'Axios';
// import To from '../component/common/CommonFunction';

class Home extends Component {
  generateExam = () => {
    // axios.get
    AppState.history.push('/exam/main/10');
  }
  render() {
    return (
      <div>
        Home
        <Link to="exampage">示例</Link>
        <Button onClick={this.generateExam}>进入考试</Button>
      </div>
    );
  }
}


export default Home;
