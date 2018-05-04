/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 16:56:22 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-25 12:40:48
 */

import React, { Component } from 'react';
import { Input, Button, message, Modal, Icon } from 'antd';
import Header from 'Header';
import { observer } from 'mobx-react';
import axios from 'Axios';
import Spin from 'Spin';
import QuestionShow from 'component/common/QuestionShow';
import QuestionStore from 'store/manage/bank/QuestionStore';
import AnalyQuestion from 'util/AnalyQuestion';

const { TextArea } = Input;

@observer
class ImportQuestion extends Component {
  state = {
    visible: false,
    type: '',
    bankId: null,
    question: '',
    loading: true,
  }
  componentDidMount() {
    this.getBank();
  }
  getBank = () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    axios.get(`/banks/bank?id=${id}`).then((bank) => {
      console.log(bank);
      const { type } = bank;
      this.setState({
        bankId: bank.id,
        type,
        loading: false,
      });
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  analyQuestion = () => {
    const data = this.state.question;
    const { bankId, type } = this.state;
    AnalyQuestion(data, bankId, type).then((questions) => {
      console.log(questions);
      this.setState({
        visible: false,
      });
      QuestionStore.setQuestions(questions);
    }).catch((error) => {
      // console.log(error, error.message);
      message.error(error.message);
    });
  }
  handleSubmit = () => {
    const { questions } = QuestionStore;
    axios.post('/questions/new', questions).then((data) => {
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
    const { question, loading, visible } = this.state;
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
          <Spin spinning={loading}>
            {questions.length === 0 && '没有可导入试题'}
            {questions.map((one, i) => <QuestionShow key={one.title} num={i + 1} index={i} />)}
            <Button type="primary" onClick={this.handleSubmit} style={{ marginTop: 10 }}>确认导入</Button>
          </Spin>
        </div>
      </div>
    );
  }
}


export default ImportQuestion;
