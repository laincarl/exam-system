import React, { Component } from 'react';
import { Table, Icon, Modal, message } from 'antd';
import Header from 'Header';
import Action from 'Action';
import axios from 'Axios';
import EditUser from 'component/manage/EditUser';
import AddUser from 'component/manage/AddUser';

const { confirm } = Modal;
const roles = {
  student: '学生',
  teacher: '教师',
  admin: '管理员',
};
class UserManage extends Component {
  state = {
    loading: true,
    users: [],
    addVisible: false,
    editVisible: false,
    currentEditId: 0,
  }
  componentDidMount() {
    this.getAllUser();
  }
  getAllUser = () => {
    this.setState({
      loading: true,
    });
    axios.get('/user/alluser').then((users) => {
      this.setState({
        users,
        loading: false,
      });
    });
  }
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  }
  hideAddModal = () => {
    this.setState({
      addVisible: false,
    });
  }
  showEditModal = (id) => {
    this.setState({
      currentEditId: id,
      editVisible: true,
    });
  }
  hideEditModal = () => {
    this.setState({
      editVisible: false,
    });
  }
  showConfirm = (id) => {
    confirm({
      title: '确认删除?',
      content: '删除后将不可恢复',
      okText: '确定',
      cancelText: '取消',
      onOk: () => { this.deleteUser(id); },
    });
  }
  deleteUser = (id) => {
    console.log(id);
    axios.delete(`/user/deluser?id=${id}`).then((data) => {
      message.success(data);
      this.getAllUser();
    });
  }
  columns = [{
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
        onClick={(e) => { e.stopPropagation(); }}
      >
        <Action data={[{
          action: () => { this.showEditModal(record.id); },
          text: '编辑',
        }, {
          action: () => { this.showConfirm(record.id); },
          text: '删除',
        }]}
        />
      </div>
    ),
  }];
  render() {
    const {
      loading, users, addVisible, editVisible, currentEditId,
    } = this.state;

    return (
      <div>
        <Header
          title="用户管理"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '添加用户',
              onClick: this.showAddModal,
            },
          ]}
          refresh={this.getAllUser}
        />
        {addVisible && <AddUser
          reload={this.getAllUser}
          hideModal={this.hideAddModal}
        />}
        {
          editVisible && <EditUser
            reload={this.getAllUser}
            currentEditId={currentEditId}
            hideModal={this.hideEditModal}
          />
        }

        <div style={{ padding: '20px' }}>
          <Table
            pagination={{ pageSize: 8 }}
            rowKey="id"
            columns={this.columns}
            dataSource={users.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default UserManage;
