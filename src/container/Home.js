/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 15:51:28
 */

import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
import { Button } from 'antd';
import AppState from 'AppState';

class Home extends Component {
  toExamList = () => {
    AppState.history.push('/exam/exams');
  }
  render() {
    return (
      <div>
        Home
        {/* <Link to="exampage">示例</Link> */}
        <div>
          <Button onClick={this.toExamList}>考试列表</Button>
        </div>
      </div>
    );
  }
}


export default Home;
