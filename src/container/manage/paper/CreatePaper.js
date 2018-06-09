/*
 * @Author: LainCarl 
 * @Date: 2018-03-26 13:39:24 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-26 16:18:29
 * @Feature: 新建试卷 
 */

import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Icon, Select, message } from 'antd';
import axios from 'Axios';
import Header from 'Header';
import Spin from 'Spin';
import NumberToChinese from 'util/NumberToChinese';

const FormItem = Form.Item;
const { Option } = Select;
class CreatePaper extends Component {
  state = {
    banks: [],
    loading: false,
    items: [{
      type: 'select_single',
      num: 0,
    }],
  }
  componentDidMount() {
    this.getBanks();
  }
  getBanks = () => {
    const { resetFields } = this.props.form;
    resetFields('banks');
    this.setState({
      loading: true,
    });
    axios.get('/banks').then((banks) => {
      this.setState({
        banks,
        loading: false,
      });
    });
  }
  addItem = (values) => {
    console.log(values);
  }
  remove = (index) => {
    const { items } = this.state;
    if (items.length > 1) {
      items.splice(index, 1);
      this.setState({
        items,
      });
    } else {
      message.info('至少含有一个大题');
    }
  }

  add = () => {
    const { items } = this.state;
    this.setState({ items: [...items, [...{}]] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {
          title, banks, nums, scores, types,
        } = values;
        const paper = {
          title,
          parts: types.map((type, i) => ({
            type,
            bank_id: banks[i],
            num: nums[i],
            score: scores[i],
          })),
        };
        axios.post('/papers/new', paper).then((data) => {
          console.log(data);
          message.success('创建成功');
          this.setState({ loading: false });
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
    const { getFieldDecorator, getFieldValue, resetFields } = this.props.form;
    const { items, loading, banks } = this.state;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
    };
    let total_score = 0;
    const formItems = items.map((item, index) => {
      const type = getFieldValue(`types[${index}]`);
      const score = getFieldValue(`scores[${index}]`);
      const num = getFieldValue(`nums[${index}]`);
      total_score += score * num || 0;
      const options =
        banks
          .filter(bank => bank.type === type)
          .map(bank => <Option value={bank.id}>{bank.title}</Option>);
      return (
        <div style={{ position: 'relative' }}>
          <div>
            <FormItem
              {...formItemLayout}
              label={`第${NumberToChinese(index + 1)}大题：`}
            >
              {score * num || 0}分
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="题型"
            >
              <div style={{ position: 'relative' }}>
                {getFieldDecorator(`types[${index}]`, {
                  rules: [{
                    required: true,
                    message: "Please input passenger's name or delete this field.",
                  }],
                })(<Select
                  onSelect={() => { resetFields(`banks[${index}]`); }}
                >
                  <Option value="select_single">单选题</Option>
                  <Option value="select_multi">多选题</Option>
                  <Option value="blank">填空题</Option>
                </Select>)}
                <Icon
                  style={{ position: 'absolute', top: 9, right: -28 }}
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(index)}
                />
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="题库"
            >
              {getFieldDecorator(`banks[${index}]`, {
                rules: [{
                  required: true, message: '请选择题库',
                }],
              })(<Select>
                {options}
              </Select>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="题数"
            >
              {getFieldDecorator(`nums[${index}]`, {
                initialValue: 10,
                rules: [{
                  required: true,
                  message: "Please input passenger's name or delete this field.",
                }],
              })(<InputNumber min={1} max={20} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="单项分数"
            >
              {getFieldDecorator(`scores[${index}]`, {
                initialValue: 1,
                rules: [{
                  required: true,
                  message: "Please input passenger's name or delete this field.",
                }],
              })(<InputNumber min={1} max={20} />)}
            </FormItem>
          </div>
        </div>
      );
    });
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header
          hasBack
          title="新建试卷"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '添加大题',
              onClick: this.add,
            },
          ]}
          refresh={this.getBanks}
        />
        <div style={{ padding: 20, flex: 1, overflow: 'auto' }}>
          <Spin spinning={loading}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="标题"
              >
                {getFieldDecorator('title', {
                  rules: [{
                    required: true,
                    message: '请输入标题',
                  }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="总分："
              >
                {total_score}分
              </FormItem>
              {formItems}
              <FormItem>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 100, width: 100 }}>保存</Button>
              </FormItem>
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
}


export default Form.create()(CreatePaper);
