/*
 * @Author: LainCarl 
 * @Date: 2018-06-04 20:33:51 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-06-04 20:49:11
 * @Feature: 展示考试详情，当前考试人数，成绩等等 
 */

import React, { Component } from 'react';
import Header from 'Header';
import Spin from 'Spin';
import axios from 'Axios';
import { Card, Tooltip, Icon, Tabs, Table, Button } from 'antd';
// import { Chart, Geom, Axis } from 'bizcharts';
import Chart from 'bizcharts/lib/components/Chart';
import Geom from 'bizcharts/lib/components/Geom';
import Axis from 'bizcharts/lib/components/Axis';
import AppState from 'AppState';
import moment from 'moment';
import ChartTooltip from 'bizcharts/lib/components/Tooltip';
import style from './ExamDetail.less';

function toDetail(id) {
  AppState.history.push(`/exam/result/${id}`);
}
const columns = [{
  title: '学号',
  dataIndex: 'user',
  key: 'user',
  render: user => user.name,
  // sorter: (a, b) => compare(a.title, b.title),
}, {
  title: '学生名字',
  dataIndex: 'user',
  key: 'real_name',
  render: user => user.real_name,
  // sorter: (a, b) => compare(a.title, b.title),
}, {
  title: '分数',
  dataIndex: 'user_score',
  key: 'user_score',
}, {
  title: '参加时间',
  dataIndex: 'create_time',
  key: 'create_time',
  render: create_time => (<div>
    {moment(create_time).format('YYYY-MM-DD HH:mm:ss')}
  </div>),
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div
      role="none"
      onClick={(e) => { e.stopPropagation(); console.log(record); }}
    >
      <Button
        type="primary"
        style={{
          width: 100,
          height: 30,
        }}
        onClick={() => { toDetail(record.exam_id); }}
      >查看详情
      </Button>
    </div>
  ),
}];
// 定义度量
const cols = {
  score: { alias: '分数' },
  number: { alias: '学号' },
};
const { TabPane } = Tabs;
class ExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      current: 1,
      exam: { results: [] },
    };
  }


  componentDidMount() {
    this.getDetail();
    console.log(this.props.match.params);
  }


  getDetail = () => {
    this.setState({
      loading: true,
    });
    const { id } = this.props.match.params;
    axios.get(`/exams/exam/detail?id=${id}`).then((exam) => {
      this.setState({
        exam,
        loading: false,
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        loading: false,
      });
    });
  }
  render() {
    const { loading, exam, current } = this.state;
    const {
      title, results, limit_time, total_score,
    } = exam;
    const num = results.length;
    console.log(current);
    const data = results.map((result) => {
      const { user, user_score } = result;
      return {
        number: user.name,
        score: user_score,
      };
    });
    // 数据源
    // const data = [
    //   { number: 'Sports', score: 275, income: 2300 },
    //   { number: 'Strategy', score: 115, income: 667 },
    //   { number: 'Action', score: 120, income: 982 },
    //   { number: 'Shooter', score: 350, income: 5271 },
    //   { number: 'Other', score: 150, income: 3710 },
    // ];
    return (
      <div>
        <Header
          hasBack
          title="考试详情"
          refresh={this.getDetail}
        />
        <Spin spinning={loading}>
          <div style={{ display: 'flex' }}>
            <Card
              className={style.card}
              title="考试名称"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
            >
              <div className={style.content}>
                {title}
              </div>
            </Card>
            <Card
              className={style.card}
              title="考试时间"
            >
              <div className={style.content}>
                {limit_time} 分钟
              </div>
            </Card>
            <Card
              className={style.card}
              title="考试总分"
            >
              <div className={style.content}>
                {total_score} 分
              </div>
            </Card>
            <Card
              className={style.card}
              title="当前参加人数"
            >
              <div className={style.content}>
                {num} 人
              </div>
            </Card>
          </div>
          <div
            className={style.tab_container}
          >
            <div className={style.tab_title}>成绩统计</div>
            <Tabs
              defaultActiveKey="1"
            >
              <TabPane tab="图表" key="1">
                <div style={{ marginTop: 30 }}>
                  <Chart height={400} width={800} data={data} scale={cols}>
                    <Axis name="number" />
                    <Axis name="score" />
                    {/* <Legend position="top" dy={-20} /> */}
                    <ChartTooltip />
                    <Geom type="interval" size={20} position="number*score" color="number" />
                  </Chart>
                </div>
              </TabPane>
              <TabPane tab="列表" key="2">
                <Table
                  pagination={{ pageSize: 5 }}
                  columns={columns}
                  dataSource={results.map(result => ({ ...result, ...{ key: result.id } }))}
                />
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </div>
    );
  }
}


export default ExamDetail;
