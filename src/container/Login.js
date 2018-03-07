/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:35:03 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-07 21:55:14
 */

import React, { Component } from 'react';

import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'Axios';
import Spin from 'Spin';

const FormItem = Form.Item;
class Login extends Component {
  state = {
    spinning: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          spinning: true,
        });
        axios.post('/api/login', values).then((data) => {
          console.log(data);
          this.setState({
            spinning: false,
          });
          message.success('登录成功');
        }).catch((error) => {
          console.log(error);
        });
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{
        width: 400,
        margin: '100px auto',
        padding: '20px 40px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
      }}
      >
        <Spin spinning={this.state.spinning}>
          <div style={{ fontSize: '20px', marginBottom: '20px' }}>帐号登录</div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="学号">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入学号!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />)}
            </FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              立即登录
            </Button>
            <div style={{
              background: '#F8F9FA',
              color: '#B6B6B7',
              fontSize: '12px',
              padding: '10px',
              textAlign: 'center',
              marginTop: '20px',
            }}
            >
              首次使用学号登录，初始密码为学号的后六位
            </div>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(Login);
