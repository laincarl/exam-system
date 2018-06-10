/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:34:18 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 12:30:38
 */

import React, { Component } from 'react';
import { Icon, Modal, Button, Select, Form, Input, message } from 'antd';
import { questionType } from 'Constants';
import Header from 'Header';
import axios from 'Axios';
import Spin from 'Spin';
import Bank from 'component/manage/Bank';

const FormItem = Form.Item;
const { Option } = Select;

class Banks extends Component {
  state = {
    banks: [],
    loading: false,
    visible: false,
  }
  componentDidMount() {
    this.getBanks();
  }
  getBanks = () => {
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log('Received values of form: ', values);
        axios.post('/banks/new', values).then((data) => {
          console.log(data);
          message.success('创建成功');
          this.setState({ visible: false, loading: false });
          this.getBanks();
        }).catch(() => {

        });
      }
    });
  }
  render() {
    const { banks, visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    // console.log(questionType);
    return (
      <div>
        <Header
          title="题库管理"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '新建题库',
              onClick: this.showModal,
            },
          ]}
          refresh={this.getBanks}
        />
        <Spin spinning={loading}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
              banks.map(one => <Bank data={one} />)
            }
          </div>
        </Spin>
        <Modal
          visible={visible}
          title="新建题库"
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
              label="题型"
            >
              {getFieldDecorator('type', {
            rules: [{
              required: true, message: '请选择题型',
            }],
          })(<Select>
            {
              Object.keys(questionType).map(type => 
                <Option value={type}>{questionType[type]}</Option>)              
            }
           
          </Select>)}
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
      </div>
    );
  }
}


export default Form.create()(Banks);
