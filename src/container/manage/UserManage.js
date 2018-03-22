import React, { Component } from 'react';
import { Icon, Form, Input, Button, message } from 'antd';
import Header from 'Header';
import axios from 'Axios';

const FormItem = Form.Item;

class UserManage extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { name, password } = values;
        axios.post('/api/user/adduser', { name, password, role: 'student' }).then((data) => {
          if (data.success) {
            message.success('添加成功');
          } else {
            message.error(data.message);
          }
          // console.log(data);
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data.message);
            message.error(error.response.data.message);
          } else {
            console.log(error);
          }
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
          offset: 8,
        },
      },
    };
    return (
      <div>
        <Header
          hasBack
          title="用户管理"
          prefix={<Icon type="reload" />}
          text="刷新"
          onClick={() => {
            console.log('headerclick');
          }}
        />
        <div style={{ width: 500 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('name', {
                rules: [{
                  max: 30, message: '最长30个字',
                }, {
                  required: true, message: '请输入用户名',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {getFieldDecorator('password', {
                rules: [{
                  max: 30, message: '最长30个字',
                }, {
                  required: true, message: '请输入密码',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">添加</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

UserManage.propTypes = {

};

export default Form.create()(UserManage);
