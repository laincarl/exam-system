/*
 * @Author: LainCarl 
 * @Date: 2018-03-14 14:03:36 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 17:06:40
 */

import React, { Component } from 'react';
import { message, Table, Button } from 'antd';
import { observer } from 'mobx-react';
import AppState from 'AppState';
import axios from 'Axios';
import moment from 'moment';
import 'css/account.css';

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('只能上传图片文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过2MB!');
  }
  return isJPG && isLt2M;
}
function toDetail(id) {
  AppState.history.push(`/exam/main/${id}`);
}
const styles = {
  headIconBig: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
};
const columns = [{
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
        onClick={() => { toDetail(record.id); }}
      >查看详情
      </Button>
    </div>
  ),
}];

@observer
class Home extends Component {
  state = {
    loading: true,
    results: [],
  }
  componentDidMount() {
    this.getResults();
  }

  getResults = () => {
    axios.get('/api/exams/results').then((results) => {
      this.setState({
        loading: false,
        results,
      });
    });
  }
  handleUpload = (e) => {
    if (beforeUpload(e.target.files[0])) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post('/api/user/head', formData).then((data) => {
        AppState.setUserInfo({ url: data.url });
      });
    }
  }

  render() {
    const { loading, results } = this.state;
    const { name, url } = AppState.userInfo;

    return (
      <div style={{ margin: '20px 100px', padding: 20, boxShadow: '0 1px 6px rgba(0, 0, 0, .2)' }}>
        <h2>个人中心</h2>
        <div className="title">{name}</div>
        <div style={{ width: 100, height: 100, position: 'relative' }} className="head-upload-container">
          <input
            type="file"
            title="更换头像"
            className="input-upload"
            onChange={this.handleUpload}
            style={{
              position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
            }}
          />
          <img
            style={styles.headIconBig}
            src={url}
            alt=""
          />
          <div className="replace_icon">
            更换头像
          </div>
        </div>
        考试记录
        <Table
          columns={columns}
          dataSource={results.map(result => ({ ...result, ...{ key: result.id } }))}
          loading={loading}
        />
      </div>
    );
  }
}


export default Home;
