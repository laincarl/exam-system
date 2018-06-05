/*
 * @Author: LainCarl 
 * @Date: 2018-06-04 20:33:51 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-06-04 20:49:11
 * @Feature: 展示考试详情，当前考试人数，成绩等等 
 */

import React, { Component } from 'react';
import Header from 'Header';
import Spin from 'Spin';
import axios from 'Axios';

class ExamDetail extends Component {
  state = {
    loading: true,
    exam: {},
  }
  componentDidMount() {
    this.getDetail();
    console.log(this.props.match.params);
  }
  getDetail = () => {
    this.setState({
      loading: true,
    });
    const { id } = this.props.match.params;
    axios.get(`/exams/exam/detail?id=${id}`).then((exam) => {
      this.setState({
        exam,
        loading: false,
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        loading: false,
      });
    });
  }
  render() {
    const { loading, exam } = this.state;
    return (
      <div>
        <Header
          hasBack
          title="考试详情"
          refresh={this.getDetail}
        />
        <Spin spinning={loading}>
          考试详情{exam.title}
        </Spin>
      </div>
    );
  }
}


export default ExamDetail;
