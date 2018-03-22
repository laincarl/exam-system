/*
 * @Author: LainCarl 
 * @Date: 2018-03-22 14:21:10 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-22 14:43:07
 * @Feature: 根据id展示特定考试结果
 */

import React, { Component } from 'react';
// import { observer } from 'mobx-react';
import { message } from 'antd';
import Spin from 'Spin';
import axios from 'Axios';
import AppState from 'AppState';
// import { withRouter } from 'react-router';
import ResultShow from '../../component/exam/ResultShow';
// import ExamStore from '../../store/exam/ExamStore';

// @observer
class Result extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      result: {
        exam_id: 0,
        exam_title: '',
        score: 0,
        results: [],
      },
    };
  }
  componentDidMount() {
    console.log(this.props.match.params);
    const { id } = this.props.match.params;
    axios.get(`/api/exams/result?id=${id}`).then((result) => {
      console.log(result);
      // ExamStore.setResult(result);
      this.setState({
        result,
        loading: false,
      });
    }).catch((error) => {
      if (error.response) {
        message.error(error.response.data.message);
        AppState.history.push('/404');
      } else {
        console.log(error);
      }
    });
  }
  render() {
    const { result, loading } = this.state;
    const { score, results } = result;
    console.log(results);
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
            <div>{score}</div>
            {
              results.map((one, i) => <ResultShow num={i + 1} data={one} />)
            }
          </div>
        </Spin>
      </div>

    );
  }
}


export default Result;
