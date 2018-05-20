/*
 * @Author: LainCarl 
 * @Date: 2018-04-05 15:39:13 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-05 16:10:28
 * @Feature: 错误提示页面  
 */

import React, { Component } from 'react';
import AppState from 'AppState';
import { Button } from 'antd';

class ExamEnd extends Component {
  render() {
    const { message } = this.props;
    return (
      <div
        style={{
          height: 420,
          width: 700,
          margin: '100px auto',
          background: '#228c80',
          borderRadius: 30,
          border: '20px solid #ddb06e',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: 'white',
            marginTop: 90,
            fontSize: 30,
          }}
        >
          {message}
        </div>
        <Button
          onClick={() => { AppState.history.goBack(); }}
          style={{
            marginTop: 90,
            background: '#bb8c3e',
            height: 50,
            width: 150,
            fontSize: 20,
            color: 'white',
            border: 'none',
          }}
        >返回
        </Button>
      </div>);
  }
}


export default ExamEnd;
