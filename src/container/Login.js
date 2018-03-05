/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:35:03 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:35:03 
 */

import React, { Component } from 'react';

import { Form, Icon, Input, Button } from 'antd';
import Spin from 'Spin';

const FormItem = Form.Item;
class Login extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div style={{ width: '500px', margin: '100px auto' }}>
          <Spin spinning>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入学号!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
              </FormItem>            
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
              </Button>
            </Form>
          </Spin>
        </div>
      );
    }
}

export default Form.create()(Login);
