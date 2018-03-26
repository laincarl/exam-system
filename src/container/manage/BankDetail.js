/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 16:56:22 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:57:03
 */
/*eslint-disable */
import React, { Component } from 'react';
import { Icon, Form, Input, Tooltip, Button, message } from 'antd';
import Header from 'Header';
import axios from 'Axios';

const FormItem = Form.Item;


const { TextArea } = Input;


class BankDetail extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { description } = values;
        const questionReg = /[0-9]+、([^]*?)(?=[0-9]+、|$)/g;
        const titleReg = /[0-9]+、([^]*?)\*?[A-Z]+、/g;
        const selectsReg = /([A-Z])+、([^]*?)(?=\*?[A-Z]+、|$)/g;
        const answersReg = /\*([A-Z])+、/g;
        let result;
        const questions = [];
        const { match } = this.props;
        const bankId = match.params.id;
        while (result = questionReg.exec(description)) {
          // console.log(result[1], regex2.lastIndex);
          // console.log(result);
          let question = {
            bankId,
            title: null,
            answers: [],
            selects: {},
          }
          let answer;
          while (answer = answersReg.exec(result[0])) {
            // console.log(answer, regex2.lastIndex);
            // console.log(answer[1].trim());
            question.answers.push(answer[1].trim());
          }
          let select;
          while (select = selectsReg.exec(result[0])) {
            // console.log(answer, regex2.lastIndex);
            // console.log(select[1].trim());
            question.selects[select[1].trim()] = (select[2].trim());
          }
          let title;
          while (title = titleReg.exec(result[0])) {
            // console.log(answer, regex2.lastIndex);
            // console.log('title', title);
            question.title = title[1].trim();
          }
          questions.push(question);
        }
        console.log(questions);
        axios.post('/api/questions/new', questions).then((data) => {
          console.log(data);
          message.success('导入成功');
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
    // const { match } = this.props;
    // console.log(match.params.id);
    const { getFieldDecorator } = this.props.form;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <Header
          hasBack
          title="题库详情"          
        />
        <div style={{ width: 500 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  max: 30, message: '最长30个字',
                }, {
                  // required: true, message: '请输入标题',
                }],
              })(<Input />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  描述&nbsp;
                  <Tooltip title="对于题库的描述">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('description')(<TextArea autosize={{ minRows: 1, maxRows: 6 }} />)}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}


export default Form.create()(BankDetail);
