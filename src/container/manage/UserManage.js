import React, { Component } from 'react';
import { Table, Modal, Select, Icon, Form, Input, Button, message } from 'antd';
import Header from 'Header';
import Action from 'Action';
import axios from 'Axios';

const { Option } = Select;
const FormItem = Form.Item;
const roles = {
  student: '学生',
  teacher: '教师',
  admin: '管理员',
};
const columns = [{
  title: '学工号',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '姓名',
  dataIndex: 'real_name',
  key: 'real_name',
}, {
  title: '身份',
  dataIndex: 'role',
  key: 'role',
  render: role => roles[role],
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div
      role="none"
      onClick={(e) => { e.stopPropagation(); console.log(record); }}
    >
      <Action data={[{
        action: this.test,
        text: 'test',
      }]}
      />
    </div>
  ),
}];


class UserManage extends Component {
  state = {
    loading: true,
    users: [],
    visible: false,
  }
  componentDidMount() {
    this.getAllUser();
  }
  getAllUser = () => {
    this.setState({
      loading: true,
    });
    axios.get('/api/user/alluser').then((users) => {
      this.setState({
        users,
        loading: false,
      });
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { resetFields } = this.props.form;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('/api/user/adduser', values).then((data) => {
          if (data.success) {
            this.setState({
              visible: false,
            });
            resetFields();
            message.success('添加成功');
            this.getAllUser();
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
    const { loading, users, visible } = this.state;

    return (
      <div>
        <Header
          title="用户管理"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '添加用户',
              onClick: this.showModal,
            },
          ]}
          refresh={this.getAllUser}
        />
        <Modal
          visible={visible}
          title="添加用户"
          onCancel={this.hideModal}
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
        </Modal>
        <div style={{ padding: '20px' }}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={users.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Form.create()(UserManage);
