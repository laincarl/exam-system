
import React, { Component } from 'react';
import { Modal, Select, Form, Input, Button, Checkbox, message } from 'antd';
import Spin from 'Spin';
import axios from 'Axios';

const { Option } = Select;
const FormItem = Form.Item;
class EditUser extends Component {
  state = {
    loading: true,
    data: {},
  }

  componentDidMount() {
    const { currentEditId } = this.props;
    this.getUser(currentEditId);
  }

  getUser = (id) => {
    axios.get(`/user?id=${id}`).then((data) => {
      console.log(data);
      this.setState({
        data,
        loading: false,
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { hideModal, reload } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(values);
        this.setState({          
          loading: true,
        });
        axios.put('/user/edituser', { ...values, ...{ id: this.props.currentEditId } }).then(() => {
          hideModal();
          message.success('修改成功');
          reload();      
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
    const {
      hideModal,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { loading, data } = this.state;
    const { name, real_name, role } = data;
    return (<Modal
      visible
      title="修改用户"
      onCancel={hideModal}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="学工号"
          >
            {getFieldDecorator('name', {
              initialValue: name,
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
              initialValue: real_name,
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
            {getFieldDecorator('initPassword', {
              initialValue: false,
            })(<Checkbox>初始化密码</Checkbox>)}
          </FormItem>
          <FormItem
            label="身份"
          >
            {getFieldDecorator('role', {
              initialValue: role,
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
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </Spin>
    </Modal>);
  }
}


export default Form.create()(EditUser);
