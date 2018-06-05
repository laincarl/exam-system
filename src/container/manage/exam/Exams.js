/*
 * @Author: LainCarl 
 * @Date: 2018-04-03 14:40:15 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-06-04 20:35:02
 * @Feature: 展示考试列表 
 */

import React, { Component } from 'react';

import { Table, message, Icon } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Action from 'Action';
import AppState from 'AppState';
import moment from 'moment';
import CreateExam from 'component/manage/exam/CreateExam';

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
    axios.get('/exams').then((exams) => {
      if (exams) {
        this.setState({
          exams,
          loading: false,
        });
      }
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
  createExam = () => {
    this.setState({
      visible: true,
    });
  }
  toDetail = (id) => {
    AppState.history.push(`/manage/exam/detail/${id}`);
  }
  closeExam=(id) => {
    axios.delete(`/exams/exam?id=${id}`).then((data) => {
      this.getExams();
      message.success('删除成功');
      console.log(data);
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.getExams();
  }

  render() {
    const { exams, visible, loading } = this.state;
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
            action: () => { this.toDetail(record.id); },
            text: '详情',
          }, {
            action: () => { this.closeExam(record.id); },
            text: '删除',
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
            dataSource={this.dataTransForm(exams)}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Exams;
