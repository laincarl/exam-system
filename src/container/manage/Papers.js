
import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Action from 'Action';
import AppState from 'AppState';

class Papers extends Component {
  state = {
    exams: [],
    loading: false,
  }
  componentDidMount() {
    this.getExams();
  }
  getExams = () => {
    this.setState({
      loading: true,
    });
    axios.get('/api/exams').then((exams) => {
      if (exams) {
        this.setState({
          exams,
          loading: false,
        });
      }
    });
  }
  toCreate = () => {
    AppState.history.push('/manage/createpaper');
  }
  render() {
    const { exams, loading } = this.state;
    const columns = [{
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div
          role="none"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Action data={[{
            action: () => { this.editExam(record.id); },
            text: '编辑',
          }]}
          />
        </div>
      ),
    }];
    return (
      <div>
        <Header
          title="试卷管理"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '新建考试',
              onClick: this.toCreate,
            },
          ]}
          refresh={this.getExams}
        />

        <div style={{ padding: '20px' }}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={exams.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Papers;
