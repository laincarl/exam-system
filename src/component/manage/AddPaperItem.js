import React, { Component } from 'react';
import { Modal, Input, InputNumber, Form, Button, Select } from 'antd';
import axios from 'Axios';
import Spin from 'Spin';

const FormItem = Form.Item;
const { Option } = Select;
class AddPaperItem extends Component {
  state={
    banks: [],
    loading: false,
  }
  componentDidMount() {
    this.getBanks();
  }
  
  getBanks=(type) => {
    const { resetFields } = this.props.form;
    resetFields('bank');
    console.log(type);
    this.setState({
      loading: true,
    });
    axios.get(type ? `/banks?type=${type}` : '/banks').then((banks) => {
      this.setState({
        banks,
        loading: false,
      });
    });
  }
  handleCancel = () => {
    this.props.handleCancel();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, banks } = this.state;
    const options = banks.map(bank => <Option value={bank.id}>{bank.title}</Option>);
    return (<Modal
      visible
      title="添加大题"
      onCancel={this.handleCancel}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="题型"
          >
            {getFieldDecorator('type', {
            rules: [{
              required: true, message: '请选择题型',
            }],
          })(<Select onChange={this.getBanks}>
            <Option value="select_single">单选题</Option>
            <Option value="select_multi">多选题</Option>
            <Option value="blank">填空题</Option>
          </Select>)}
          </FormItem>
          <FormItem
            label="题库"
          >
            {getFieldDecorator('bank', {
            rules: [{
              required: true, message: '请选择题库',
            }],
          })(<Select>
            {options}
          </Select>)}
          </FormItem>
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
            label="题数"
          >
            {getFieldDecorator('limit_time', {
            rules: [{
              required: true, message: '请填写题数',
            }],
          })(<div>
            <InputNumber min={1} max={50} />
          </div>)}
          </FormItem>
          <FormItem>
            <div style={{ textAlign: 'right' }}>
              <Button key="back" onClick={this.handleCancel} style={{ marginRight: 10 }}>取消</Button>
              <Button key="submit" type="primary" htmlType="submit">
              确定
              </Button>
            </div>
          </FormItem>
        </Form>
      </Spin>
    </Modal>);
  }
}


export default Form.create()(AddPaperItem);
