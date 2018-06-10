
import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Action from 'Action';
import AppState from 'AppState';

class Papers extends Component {
  state = {
    papers: [],
    loading: false,
  }
  componentDidMount() {
    this.getPapers();
  }
  getPapers = () => {
    this.setState({
      loading: true,
    });
    axios.get('/papers').then((papers) => {
      if (papers) {
        this.setState({
          papers,
          loading: false,
        });
      }
    });
  }
  toCreate = () => {
    AppState.history.push('/manage/paper/create');
  }
  toDetail=(id) => {
    AppState.history.push(`/manage/paper/detail/${id}`);
  }
  render() {
    const { papers, loading } = this.state;
    const columns = [{
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }, 
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   key: 'status',
    // }, 
    {
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
              text: '新建试卷',
              onClick: this.toCreate,
            },
          ]}
          refresh={this.getPapers}
        />

        <div style={{ padding: '20px' }}>
          <Table
            onRow={record => ({
              onClick: () => { this.toDetail(record.id); }, // 点击行
            })}
            rowKey="id"
            columns={columns}
            dataSource={papers.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Papers;
