/*
 * @Author: LainCarl 
 * @Date: 2018-03-22 14:21:10 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-07 11:37:53
 * @Feature: 根据id展示特定考试结果
 */

import React, { Component } from 'react';

import { message } from 'antd';
import Spin from 'Spin';
import axios from 'Axios';
// import AppState from 'AppState';
import OnePart from 'component/common/OnePart';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      result: {
        exam_id: 0,
        exam_title: '',
        user_score: 0,
        parts: [],
      },
    };
  }
  componentDidMount() {
    console.log(this.props.match.params);
    const { id } = this.props.match.params;
    axios.get(`/exams/result?id=${id}`).then((result) => {
      console.log(result);
      // ExamStore.setResult(result);
      this.setState({
        result,
        loading: false,
      });
    }).catch((error) => {
      if (error.response) {
        message.error(error.response.data.message);
        // AppState.history.replace('/404');
      } else {
        console.log(error);
      }
    });
  }
  render() {
    const { result, loading } = this.state;
    const {
      user_score, total_score, limit_time, exam_title, parts, 
    } = result;
    console.log(parts);
    return (
      <div>
        <Spin spinning={loading}>
          <div style={{
            width: '700px',
            minHeight: '500px',
            margin: '20px auto',
            padding: '20px 40px',
            boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
          }}
          >
            <div style={{ fontSize: 25, textAlign: 'center', marginTop: 10 }}>{exam_title}</div>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              {`本试卷共${parts.length}大题，总分${total_score}分，考试时间${limit_time}分钟`}
            </div>
            <div style={{ margin: '10px 0 20px 0', fontSize: 18 }}>得分：{user_score}</div>
            {parts.map((part, i) => <OnePart mode="result" index={i} part={part} />)}
          </div>
        </Spin>
      </div>

    );
  }
}


export default Result;
