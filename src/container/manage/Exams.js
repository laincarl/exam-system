import React, { Component } from 'react';
import { Table, Modal, Icon } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Action from 'Action';

const columns = [{
  title: '名称',
  dataIndex: 'title',
  key: 'title',
  render: text => <a href="#">{text}</a>,
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '创建时间',
  dataIndex: 'create_time',
  key: 'create_time',
}, {
  title: 'Action',
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

class Exams extends Component {
  state = {
    exams: [],
    loading: false,
    visible: false,
  }
  componentDidMount() {
    axios.get('/api/exams').then((exams) => {
      this.setState({
        exams,
      });
    });
  }
  createExam = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { exams, visible, loading } = this.state;
    console.log(exams);
    return (
      <div>
        <Header
          title="试卷管理"
          prefix={<Icon type="file-add" />}
          text="新建试卷"
          onClick={this.createExam}
        />

        <Modal
          visible={visible}
          title="新建试卷"
          onCancel={this.handleCancel}
          footer={null}
        />
        <Table 
          columns={columns} 
          dataSource={exams.map(one => ({ ...one, ...{ key: one.id } }))} 
          loading={loading}
        />
      </div>
    );
  }
}

export default Exams;
