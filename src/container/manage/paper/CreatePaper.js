/*
 * @Author: LainCarl 
 * @Date: 2018-03-26 13:39:24 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-26 16:18:29
 * @Feature: 新建试卷 
 */

import React, { Component } from 'react';
import { Form, Input, message, InputNumber, Button, Icon } from 'antd';
import axios from 'Axios';
import Header from 'Header';
import PaperItem from '../../../component/manage/PaperItem';
import AddPaperItem from '../../../component/manage/AddPaperItem';

const FormItem = Form.Item;
class CreatePaper extends Component {
  state = {
    visible: false,
    loading: false,
    items: [{
      title: '单选题',
    }, {
      title: '多选题',
    }],
  }
  addItem = (values) => {
    console.log(values);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const parts = [
          {
            type: 'select_single',
            bank_id: 4,
            num: 10,
            score: 1,
            // questions: ['5abc923a40db290bc009d42a'],
          },
        ];
        axios.post('/api/papers/new', { title: values.title, parts }).then((data) => {
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
    const { loading, items, visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Header
          hasBack
          title="新建试卷"
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '添加大题',
              onClick: () => { this.setState({ visible: true }); },
            },
          ]}
        />
        {visible &&
          <AddPaperItem
            handleSubmit={this.addItem}
            handleCancel={() => { this.setState({ visible: false }); }}
          />}
        <div style={{ margin: '0 20px' }}>
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
              label="考试时间"
            >
              {getFieldDecorator('limit_time', {
                initialValue: 50,
                rules: [{
                  required: true, message: '请填写考试时间',
                }],
              })(<div>
                <InputNumber min={1} max={500} />{' '}分钟
              </div>)}
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
        </div>
        <div>
          <div style={{ textAlign: 'center', fontSize: 25 }}>这里是考试标题</div>
          {items.map((item, i) => <PaperItem index={i} key={Math.random()} title={item.title} />)}
        </div>
      </div>
    );
  }
}


export default Form.create()(CreatePaper);
