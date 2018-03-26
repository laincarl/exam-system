/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 15:51:28
 */

import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import AppState from 'AppState';
import background from '../assets/image/background.jpg';


class Home extends Component {
  toExamList = () => {
    AppState.history.push('/exam/exams');
  }
  toExam(id) {
    AppState.history.push(`/exam/main/${id}`);
  }
  render() {    
    return (
      <div style={{
        height: '100%',
        position: 'relative',
      }}
      >
        <div style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          backgroundImage: `url(${background})`,
          filter: 'blur(5px)',
        }}
        />
        Home
        {/* <Link to="exampage">示例</Link> */}
        <div style={{ margin: '200px auto', width: 650 }}>          
          <div style={{ display: 'flex' }}>
            <Input 
              style={{ height: 50, borderRadius: 0, fontSize: 20 }}             
              placeholder="输入考试号"
            />
            <Button 
              type="primary"
              style={{ height: 50, borderRadius: 0, fontSize: 20 }} 
              onClick={this.toExamList}
            >考试列表</Button>
          </div>
        </div>
        {/* <div>
          <Button onClick={this.toExamList}>考试列表</Button>
        </div> */}
      </div>
    );
  }
}


export default Home;
