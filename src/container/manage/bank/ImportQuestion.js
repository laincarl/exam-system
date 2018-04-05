/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 16:56:22 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 14:01:24
 */

import React, { Component } from 'react';
import { Input, Button, message, Modal, Icon } from 'antd';
import Header from 'Header';
import { observer } from 'mobx-react';
import axios from 'Axios';
import QuestionShow from 'component/common/QuestionShow';
import QuestionStore from 'store/manage/bank/QuestionStore';

const { TextArea } = Input;

@observer
class ImportQuestion extends Component {
  state = {
    visible: false,
    question: '',
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  showModal=() => {
    this.setState({
      visible: true,
    });
  }
  analyQuestion = () => {
    const data = this.state.question;
    // 以下开始匹配问题以及答案
    // 试题格式示例 数字加顿号开头，选项大写，正确答案前面星号
    // 1、下面哪个是属性而不是标记（  ）。
    // A、IMG    B、FORM     *C、 HREF   D、TD
    // 将问题分割成单个问题
    const questionReg = /[0-9]+、([^]*?)(?=[0-9]+、|$)/g;
    // 从单个问题找题目
    const titleReg = /[0-9]+、([^]*?)\*?[A-Z]+、/g;
    // 找到选项
    const selectsReg = /([A-Z])+、([^]*?)(?=\*?[A-Z]+、|$)/g;
    // 找到答案
    const answersReg = /\*([A-Z])+、/g;
    let result;
    const questions = [];
    const { match } = this.props;
    const bankId = match.params.id;
    while (result = questionReg.exec(data)) {
      // console.log(result[1], regex2.lastIndex);
      // console.log(result);
      const question = {
        bankId,
        title: null,
        answers: [],
        selects: {},
      };
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
      // 单个试题解析完成后开始判断
      if (!question.title || !question.selects.length === 0 || question.answers.length === 0) {
        console.log(question);
        message.error('部分试题解析错误，请检查格式');
      } else {
        questions.push(question);
      }
    }
    // 解析完成后开始判断

    console.log(questions);
    this.setState({
      visible: false,     
    });
    QuestionStore.setQuestions(questions);
  }
  handleSubmit=() => {
    const { questions } = QuestionStore;
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
  render() {
    const { question, visible } = this.state;
    const { questions } = QuestionStore;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header
          hasBack
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '导入试题',
              onClick: this.showModal,
            },
          ]}
          title="试题导入"
        />
        <Modal
          visible={visible}
          title="试题导入"
          width={600}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>
            <TextArea
              autosize={{ minRows: 14, maxRows: 20 }}
              value={question}
              onChange={(e) => { this.setState({ question: e.target.value }); }}
            />
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={this.analyQuestion} style={{ marginTop: 10 }}>确定</Button>  
            </div>       
          </div>
        </Modal>
        <div style={{
           flex: 1, overflow: 'auto', padding: '10px 20px',
          }}
        >
          {questions.length === 0 && '没有可导入试题'}
          {questions.map((one, i) => <QuestionShow key={one.title} num={i + 1} index={i} />)}
          <Button type="primary" onClick={this.handleSubmit} style={{ marginTop: 10 }}>确认导入</Button>
        </div>    
      </div>
    );
  }
}


export default ImportQuestion;
