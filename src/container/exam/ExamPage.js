/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 16:03:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-05 15:52:51
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'Axios';
import Spin from 'Spin';
// import { message } from 'antd';
// import AppState from 'AppState';
import ShowAnswers from 'component/exam/ShowAnswers';
import OnePart from 'component/common/OnePart';
import ExamStore from 'store/exam/ExamStore';
import ExamEnd from './ExamEnd';

@observer
class ExamPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      end: false,
      message: '',
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/exams/exam?id=${id}`).then((exam) => {
      if (exam.message) {
        this.setState({ end: true, message: exam.message });
      }
      console.log(exam);
      ExamStore.setCurrentExam(exam);
      this.setState({
        loading: false,
      });
    }).catch((error) => {
      if (error.message) {
        this.setState({ end: true, message: error.message });
      }
      // if (error.response) {
      //   // message.error(error.response.data.message);
      //   // AppState.history.replace('/exam/end');
      //   console.log(error.response);
      //   this.setState({ end: true, message: error.message.data });
      // } else {
      //   console.log(error);
      // }
    });
  }

  render() {
    const { loading, end, message } = this.state;
    const { parts, title } = ExamStore.currentExam;
    console.log(parts);
    return (
      end ? <ExamEnd message={message} /> : <div>
        <ShowAnswers />
        <Spin spinning={loading}>
          <div style={{
            width: '700px',
            minHeight: '500px',
            margin: '20px auto',
            padding: '20px 40px',
            boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
          }}
          >
            <div style={{ fontSize: 25, textAlign: 'center', marginTop: 10 }}>{title}</div>
            {
              parts.map((part, i) => <OnePart mode="exam" index={i} part={part} />)
              // questions.map((one, i) => <QuestionShow num={i + 1} data={one} />)
            }
          </div>
        </Spin>
      </div>
    );
  }
}


export default ExamPage;
