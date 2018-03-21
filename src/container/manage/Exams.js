/*eslint-disable */
import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { Table, Modal, Icon, Form, message, Input, Button, DatePicker } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Action from 'Action';

moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Locale = {
  lang: {
    placeholder: 'Select date',
    rangePlaceholder: [
      '开始日期',
      '结束日期',
    ],
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: '确定',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: '选择时间',
    dateSelect: '选择日期',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
};
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
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}


function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}
class Exams extends Component {
  state = {
    exams: [],
    loading: false,
    visible: false,
  }
  componentDidMount() {
    axios.get('/api/exams').then((exams) => {
      exams && this.setState({
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const { title, range } = values;
        console.log({ title, 'start': moment(range[0]).format('YYYY-MM-DD HH:mm:ss'), end: moment(range[1]).format('YYYY-MM-DD HH:mm:ss') });
        axios.post('/api/exams/new', { title: values.title }).then((data) => {
          console.log(data);
          message.success('创建成功');
          this.setState({ visible: false, loading: false });
        }).catch((error) => {
          if (error.response) {
            message.error(error.response.data.message);
          } else {
            console.log(error);
          }
        });
      }
    });
  }
  render() {
    const { exams, visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
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
              label="开始和结束时间"
            >
              {getFieldDecorator('range', {
                rules: [{
                  required: true, message: '请选择开始和结束日期',
                }],
              })(<RangePicker
                style={{ width: '100%' }}
                locale={Locale}
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />)}
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
        <div style={{ padding: '20px' }}>
          <Table
            columns={columns}
            dataSource={exams.map(one => ({ ...one, ...{ key: one.id } }))}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Form.create()(Exams);
