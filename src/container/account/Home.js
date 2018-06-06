/*
 * @Author: LainCarl 
 * @Date: 2018-03-14 14:03:36 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-19 22:26:19
 */

import React, { Component } from 'react';
import { message, Table, Button, Tabs, Icon, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import AppState from 'AppState';
import axios from 'Axios';
import moment from 'moment';
import style from 'css/account.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
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
  AppState.history.push(`/exam/result/${id}`);
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
        onClick={() => { toDetail(record.exam_id); }}
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
    axios.get('/exams/results').then((results) => {
      this.setState({
        loading: false,
        results,
      });
    });
  }
  callback = (key) => {
    console.log(key);
  }
  handleUpload = (e) => {
    if (beforeUpload(e.target.files[0])) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post('/user/head', formData).then((data) => {
        AppState.setUserInfo({ url: data.url });
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        axios.post('/user/reset_password', values).then((data) => {
          console.log(data);
          message.success('更改成功');
          this.setState({ loading: false });
        }).catch(() => {
          this.setState({ loading: false });
        });
      }
    });
  }
  render() {
    const { loading, results } = this.state;
    const { name, url } = AppState.userInfo;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 3,
        },
      },
    };
    return (
      <div style={{
        margin: '20px auto',
        width: '70%',
        minHeight: 500,
        padding: 20,
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
      }}
      >
        <h2>个人中心</h2>
        <div className={style.title}>{name}</div>
        <div style={{ width: 100, height: 100, position: 'relative' }} className={style.container}>
          <input
            type="file"
            title="更换头像"
            className={style.input_upload}
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
          <div className={style.replace_icon}>
            更换头像
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={<span><Icon type="file-text" />考试记录</span>} key="1"><Table
            columns={columns}
            dataSource={results.map(result => ({ ...result, ...{ key: result.id } }))}
            loading={loading}
          />
          </TabPane>
          <TabPane tab={<span><Icon type="form" />更改密码</span>} key="2">
            <div style={{ marginTop: 20 }}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="旧密码"
                >
                  {getFieldDecorator('password_old', {
                    rules: [{
                      required: true,
                      message: '请输入旧密码',
                    }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="新密码"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: '请输入密码',
                    }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="再次输入密码"
                >
                  {getFieldDecorator('password_repeat', {
                    rules: [{
                      required: true,
                      message: '请输入密码',
                    }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...tailFormItemLayout}
                >
                  <Button type="primary" htmlType="submit" style={{ width: 100 }}>更改</Button>
                </FormItem>
              </Form>
            </div>
          </TabPane>
          <TabPane tab={<span><Icon type="bar-chart" />统计信息</span>} key="3">统计22</TabPane>
        </Tabs>
      </div>
    );
  }
}


export default Form.create()(Home);
