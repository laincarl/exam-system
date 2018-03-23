/*
 * @Author: LainCarl 
 * @Date: 2018-03-23 13:46:21 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 15:08:54
 * @Feature: 当前考试列表 
 */

import React, { Component } from 'react';
import axios from 'Axios';
import { Table, Button } from 'antd';
import AppState from 'AppState';

function toExam(id) {
  AppState.history.push(`/exam/main/${id}`);
}
const columns = [{
  title: '名称',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '开始时间',
  dataIndex: 'start_time',
  key: 'start_time',
}, {
  title: '结束时间',
  dataIndex: 'end_time',
  key: 'end_time',
}, {
  title: '时间限制',
  dataIndex: 'limit_time',
  key: 'limit_time',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div
      role="none"
      onClick={(e) => { e.stopPropagation(); console.log(record); }}
    >
      <Button
        type="primary"
        style={{
          width: 100,
          height: 30,
          color: 'white',
        }}
        onClick={() => { toExam(record.id); }}
      >进入考试
      </Button>
    </div>
  ),
}];

class Exams extends Component {
  state = {
    exams: [],
    loading: true,
  }
  componentDidMount() {
    this.getExams();
  }
  getExams = () => {
    axios.get('/api/exams').then((exams) => {
      this.setState({
        exams,
        loading: false,
      });
    });
  }
  render() {
    const { exams, loading } = this.state;
    return (
      <div>
        考试列表
        <div style={{ padding: 20 }}>
          <Table
            columns={columns}
            dataSource={exams.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
        {/* {exams.map(one => <OneExam key={one.id} data={one} />)} */}
      </div>
    );
  }
}


export default Exams;
