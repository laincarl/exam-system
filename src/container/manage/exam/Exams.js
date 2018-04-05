/*
 * @Author: LainCarl 
 * @Date: 2018-04-03 14:40:15 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-03 16:08:09
 * @Feature: 展示考试列表 
 */

import React, { Component } from 'react';

import { Table, Icon } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Action from 'Action';
import AppState from 'AppState';
import moment from 'moment';
import 'moment/locale/zh-cn';
import CreateExam from 'component/manage/exam/CreateExam';


moment.locale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '秒',
    m: '一分钟',
    mm: '%d分钟',
    h: '一小时',
    hh: '%d小时',
    d: '一天',
    dd: '%d天',
    M: '一月',
    MM: '%d月',
    y: '一年',
    yy: '%d年',
  },
});
class Exams extends Component {
  state = {
    exams: [],
    loading: false,
    visible: false,
  }
  componentDidMount() {
    this.getExams();
  }
  getExams = () => {
    this.setState({
      loading: true,
    });
    axios.get('/api/exams').then((exams) => {
      if (exams) {
        this.setState({
          exams,
          loading: false,
        });
      }
    });
  }
  createExam = () => {
    this.setState({
      visible: true,
    });
  }
  editExam = (id) => {
    AppState.history.push(`/manage/exam/${id}`);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { exams, visible, loading } = this.state;
    const columns = [{
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const { range } = record;
        let status = '未开启'; 
        let during = '';      
        if (moment(range.start_time).isBefore(new Date())
          && moment(range.end_time).isAfter(new Date())) {
          status = '进行中';
          during = `${moment().to(range.end_time)}关闭`;
        } else if (moment(range.start_time).isAfter(new Date())) {          
          status = '未开启';
          during = `${moment().to(range.start_time)}开启`;
        } if (moment(range.end_time).isBefore(new Date())) {
          status = '已结束';
        }        
        return (<div>{status}{during}</div>);
      },
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div
          role="none"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Action data={[{
            action: () => { this.editExam(record.id); },
            text: '编辑',
          }]}
          />
        </div>
      ),
    }];
    return (
      <div>
        <Header
          title="考试管理"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '新建考试',
              onClick: this.createExam,
            },
          ]}
          refresh={this.getExams}
        />
        {visible && <CreateExam handleCancel={this.handleCancel} />}
        <div style={{ padding: '20px' }}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={exams.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Exams;
