/*
 * @Author: LainCarl 
 * @Date: 2018-03-23 13:46:21 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-05 17:30:55
 * @Feature: 当前考试列表 
 */

import React, { Component } from 'react';
import axios from 'Axios';
import { Table, Button } from 'antd';
import AppState from 'AppState';
import Header from 'Header';
import moment from 'moment';

function compare(param1, param2) {
  // 如果两个参数均为字符串类型
  if (typeof param1 === 'string' && typeof param2 === 'string') {
    return param1.localeCompare(param2);
  }
  // 如果参数1为数字，参数2为字符串
  if (typeof param1 === 'number' && typeof param2 === 'string') {
    return -1;
  }
  // 如果参数1为字符串，参数2为数字
  if (typeof param1 === 'string' && typeof param2 === 'number') {
    return 1;
  }
  // 如果两个参数均为数字
  if (typeof param1 === 'number' && typeof param2 === 'number') {
    if (param1 > param2) return 1;
    if (param1 === param2) return 0;
    if (param1 < param2) return -1;
  }
  return 0;
}
function toExam(id) {
  AppState.history.push(`/exam/main/${id}`);
}
const columns = [{
  title: '名称',
  dataIndex: 'title',
  key: 'title',
  sorter: (a, b) => compare(a.title, b.title),
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  filters: [{
    text: '未开始',
    value: '未开始',
  }, {
    text: '进行中',
    value: '进行中',
  }, {
    text: '已结束',
    value: '已结束',
  }],
  filterMultiple: true,
  onFilter: (value, record) => record.status === value,
  render: (text, record) => {
    const { status, color, during } = record;
    return (<div style={{ color }} title={during}>{status}</div>);
  },
}, {
  title: '是否参加',
  dataIndex: 'join',
  key: 'join',
  filters: [{
    text: '已参加',
    value: 'join',
  }, {
    text: '未参加',
    value: false,
  }],
  filterMultiple: false,
  onFilter: (value, record) => (value === 'join' ? record.join : !record.join),
  render: join => <div>{join ? '已参加' : '未参加'}</div>,
}, {
  title: '开始时间',
  dataIndex: 'start_time',
  key: 'start_time',
  render: (text, record) => {
    const { range } = record;
    return (<div>
      {moment(range.start_time).format('YYYY-MM-DD HH:mm:ss')}
    </div>);
  },
}, {
  title: '结束时间',
  dataIndex: 'end_time',
  key: 'end_time',
  render: (text, record) => {
    const { range } = record;
    return (<div>
      {moment(range.end_time).format('YYYY-MM-DD HH:mm:ss')}
    </div>);
  },
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
        disabled={record.status !== '进行中' || record.join}
        type="primary"
        style={{
          width: 100,
          height: 30,
          // color: record.status === '进行中' && 'white',
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
    axios.get('/exams').then((exams) => {
      this.setState({
        exams,
        loading: false,
      });
    });
  }
  dataTransForm = exams => exams.map((exam) => {
    const { range, id } = exam;
    let status = '未开启';
    let color = '#52c41a';
    let during = '';
    if (moment(range.start_time).isBefore(new Date())
      && moment(range.end_time).isAfter(new Date())) {
      status = '进行中';
      during = `${moment().to(range.end_time)}关闭`;
    } else if (moment(range.start_time).isAfter(new Date())) {
      color = '#1890ff';
      status = '未开启';
      during = `${moment().to(range.start_time)}开启`;
    } if (moment(range.end_time).isBefore(new Date())) {
      color = '#FF9915';
      status = '已结束';
    }
    return {
      ...exam,
      ...{
        key: id, status, color, during,
      },
    };
  })
  render() {
    const { exams, loading } = this.state;
    return (
      <div>
        <Header hasBack title="考试列表" />
        <div style={{ padding: 20 }}>
          <Table
            columns={columns}
            dataSource={this.dataTransForm(exams)}
            loading={loading}
          />
        </div>
        {/* {exams.map(one => <OneExam key={one.id} data={one} />)} */}
      </div>
    );
  }
}


export default Exams;
