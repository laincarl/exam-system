/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:35:03 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:32:43
 */

import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { withRouter } from 'react-router';
import { inject } from 'mobx-react';
import Cookies from 'js-cookie';
import axios from 'Axios';
import Spin from 'Spin';

const FormItem = Form.Item;
@inject('AppState')
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
    };
  }
  componentDidMount() {
    // 登录过后，就跳出去
    const { history, AppState } = this.props;
    if (AppState.userAuth) {
      history.push('/');
    }
  }

  handleSubmit = (e) => {
    const { history, AppState } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          spinning: true,
        });
        axios.post('/user/accesstoken', values).then((data) => {
          console.log(data);
          this.setState({
            spinning: false,
          });
          Cookies.set('token', data.token);
          message.success('登录成功'); 
          AppState.setUserAuth(true);
          history.push('/');
          window.location.reload();
        }).catch((error) => {
          this.setState({
            spinning: false,
          });
          if (error.response) {
            console.log(error.response.data.message);
            message.error(error.response.data.message);
          } else {
            console.log(error);
          }
        });
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div style={{ paddingTop: 100 }} />
        <div style={{
        width: 400,
        margin: '0 auto',
        padding: '20px 40px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
      }}
        >
          <Spin spinning={this.state.spinning}>
            <div style={{ fontSize: '20px', marginBottom: '20px' }}>帐号登录</div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="学工号">
                {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入学工号!' }],
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
              首次使用学工号登录，初始密码为学工号的后六位
              </div>            
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
}

export default withRouter(Form.create()(Login));
