/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:40 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-08 18:50:55
 */

import React, { Component } from 'react';
import { Input, Select, Table, Button, Pagination } from 'antd';
import { inject } from 'mobx-react';
import AppState from 'AppState';
import Spin from 'Spin';
import axios from 'Axios';
import Header from 'Header';
import moment from 'moment';

const InputGroup = Input.Group;
const { Option } = Select;
function toDetail(id) {
  AppState.history.push(`/exam/result/${id}`);
}
const columns = [{
  title: '学号',
  dataIndex: 'user',
  key: 'user',
  render: user => user.name,
  // sorter: (a, b) => compare(a.title, b.title),
}, {
  title: '学生名字',
  dataIndex: 'user',
  key: 'real_name',
  render: user => user.real_name,
  // sorter: (a, b) => compare(a.title, b.title),
}, {
  title: '考试名称',
  dataIndex: 'exam_title',
  key: 'exam_title',
  // sorter: (a, b) => compare(a.title, b.title),
}, {
  title: '分数',
  dataIndex: 'user_score',
  key: 'user_score',
}, {
  title: '总分',
  dataIndex: 'total_score',
  key: 'total_score',
}, {
  title: '考试时间',
  dataIndex: 'limit_time',
  key: 'limit_time',
}, {
  title: '参加时间',
  dataIndex: 'create_time',
  key: 'create_time',
  render: create_time => (<div>
    {moment(create_time).format('YYYY-MM-DD HH:mm:ss')}
  </div>),
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
        }}
        onClick={() => { toDetail(record.exam_id); }}
      >查看详情
      </Button>
    </div>
  ),
}];
@inject('AppState')
class Main extends Component {
  state = {
    loading: true,
    filter: 'real_name',
    current_page: 0,
    total_page: 0,
    results: [],
  }
  componentDidMount() {
    this.getResults();
  }

  getResults = (page = 0, filter = '', filterText = '') => {
    console.log(page);
    this.setState({
      loading: true,
    });
    axios.get(`/exams/manage/results?page=${page || 0}&filter=${filter}&filterText=${filterText}`).then((data) => {
      const {
        total_page, current_page, count, results,
      } = data;
      this.setState({
        loading: false,
        current_page,
        total_page,
        results,
      });
      console.log({ total_page, current_page, count });
    });
  }
  search = (e) => {
    const { filter } = this.state;
    const filterText = e.target.value;
    console.log(this.state.filter, e.target.value);
    this.getResults(0, filter, filterText);
  }
  render() {
    const {
      loading, results, filter, current_page, total_page,
    } = this.state;
    return (
      <div>
        <Header
          hasBack
          title="基本信息"
          refresh={this.getResults}
        />
        {/* <div>manage</div> */}
        <Spin spinning={loading}>
          <InputGroup compact>
            <Select
              defaultValue={filter}
              onChange={(value) => { this.setState({ filter: value }); }}
            >
              <Option value="real_name">学生名字</Option>
              <Option value="exam_title">考试名称</Option>
            </Select>
            <Input style={{ width: '50%' }} placeholder="输入关键字" onPressEnter={this.search} />
          </InputGroup>
          <Table
            pagination={false}
            columns={columns}
            dataSource={results.map(result => ({ ...result, ...{ key: result.id } }))}
          />
          <div style={{ display: 'flex' }}>
            <div className="flex-space" />
            <Pagination
              style={{
                marginTop: 30,
                marginRight: 50,
              }}
              onChange={(page) => {
                console.log(page);
                this.getResults(page - 1);
              }}
              current={current_page + 1}
              pageSize={1}
              total={total_page}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default Main;
