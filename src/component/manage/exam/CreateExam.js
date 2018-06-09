/*
 * @Author: LainCarl 
 * @Date: 2018-04-03 14:49:27 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-05 17:25:39
 * @Feature: 创建一个考试 
 */

import React, { Component } from 'react';
import { Modal, Select, Form, message, Input, Button, DatePicker, InputNumber } from 'antd';

import axios from 'Axios';
import Spin from 'Spin';
import moment from 'moment';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

// function ranges(start, end) {
//   const result = [];
//   for (let i = start; i < end; i += 1) {
//     result.push(i);
//   }
//   return result;
// }

function disabledDate(current) {
  // 今天之前的天不可选
  return current && current < moment().endOf('day').subtract(1, 'days');
}


// function disabledRangeTime(_, type) {
//   if (type === 'start') {
//     return {
//       disabledHours: () => ranges(0, 60).splice(4, 20),
//       disabledMinutes: () => ranges(30, 60),
//       disabledSeconds: () => [55, 56],
//     };
//   }
//   return {
//     disabledHours: () => ranges(0, 60).splice(20, 4),
//     disabledMinutes: () => ranges(0, 31),
//     disabledSeconds: () => [55, 56],
//   };
// }
class CreateExam extends Component {
  state = {
    loading: true,
    papers: [],
  }
  componentDidMount() {
    this.getPapers();
  }
  getPapers = () => {
    this.setState({
      loading: true,
    });
    axios.get('/papers').then((papers) => {
      this.setState({
        papers,
        loading: false,
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        // moment(range[0]).format('YYYY-MM-DD HH:mm:ss')
        console.log(values);
        const { range } = values;
        const exam = { ...values, ...{ range: { start_time: range[0], end_time: range[1] } } };
        axios.post('/exams/new', exam).then((data) => {
          console.log(data);
          message.success('创建成功');
          this.setState({ loading: false });
          this.props.handleCancel();
        }).catch(() => {
          this.setState({ loading: false });
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, papers } = this.state;
    const options = papers.map(paper => <Option value={paper.id}> {paper.title}</Option>);
    return (
      <Spin spinning={loading}>
        <Modal
          visible
          title="新建考试"
          onCancel={this.props.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="名称"
            >
              {getFieldDecorator('title', {
                rules: [{
                  max: 30, message: '最长30个字',
                }, {
                  required: true, message: '名称不能为空',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              label="试卷"
            >
              {getFieldDecorator('paper_id', {
                rules: [{
                  required: true, message: '请选择试卷',
                }],
              })(<Select>
                {options}
              </Select>)}
            </FormItem>
            <FormItem
              label="开始和结束时间"
            >
              {getFieldDecorator('range', {
                rules: [{
                  required: true, message: '请选择开始和结束日期',
                }],
              })(<RangePicker
                style={{ width: '100%' }}
                disabledDate={disabledDate}
                // disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />)}
            </FormItem>
            <FormItem
              label="考试时间（分钟）"
            >
              {getFieldDecorator('limit_time', {
                initialValue: 50,
                rules: [{
                  required: true, message: '请填写考试时间',
                }],
              })(<InputNumber min={1} max={500} />)}
            </FormItem>
            <FormItem>
              <div style={{ textAlign: 'right' }}>
                <Button key="back" onClick={this.handleCancel} style={{ marginRight: 10 }}>取消</Button>
                <Button key="submit" type="primary" loading={loading} htmlType="submit">
                  确定
                </Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </Spin>);
  }
}


export default Form.create()(CreateExam);
