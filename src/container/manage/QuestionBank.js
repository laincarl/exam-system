/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:34:18 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:47:40
 */

import React, { Component } from 'react';
import { Icon, Modal, Button, Form, Input, message } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Bank from '../../component/manage/Bank';

const FormItem = Form.Item;


class QuestionBank extends Component {
  state = {
    banks: [],
    loading: false,
    visible: false,
  }
  componentDidMount() {
    axios.get('/api/banks').then((banks) => {
      this.setState({
        banks,
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
        axios.post('/api/banks/new', { title: values.title }).then((data) => {
          console.log(data);
          message.success('创建成功');
          this.setState({ visible: false, loading: false });
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data.message);
            message.error(error.response.data.message);
          } else {
            console.log(error);
          }
        });
      }
    });
  }
  render() {
    const { banks, visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Header
          title="题库管理"
          prefix={<Icon type="file-add" />}
          text="新建题库"
          onClick={this.showModal}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            banks.map(one => <Bank data={one} />)
          }
        </div>
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


export default Form.create()(QuestionBank);
