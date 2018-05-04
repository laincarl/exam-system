import React, { Component } from 'react';
import { Modal, Select, Form, Input, Button, message } from 'antd';
import axios from 'Axios';

const { Option } = Select;
const FormItem = Form.Item;
class AddUser extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { hideModal, reload } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('/user/adduser', values).then((data) => {
          if (data.success) {
            hideModal();
            message.success('添加成功');
            reload();
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
    const { hideModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (<Modal
      visible
      title="添加用户"
      onCancel={hideModal}
      footer={null}
    >
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="学工号"
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
          label="真实姓名"
        >
          {getFieldDecorator('real_name', {
            rules: [{
              max: 30, message: '最长30个字',
            }, {
              required: true, message: '请输入姓名',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
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
        <FormItem
          label="身份"
        >
          {getFieldDecorator('role', {
            rules: [{
              required: true, message: '请选择身份',
            }],
          })(<Select>
            <Option value="student">学生</Option>
            <Option value="teacher">教师</Option>
            <Option value="admin">管理员</Option>
          </Select>)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">添加</Button>
        </FormItem>
      </Form>
    </Modal>);
  }
}


export default Form.create()(AddUser);
