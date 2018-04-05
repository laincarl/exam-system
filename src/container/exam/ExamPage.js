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
import AppState from 'AppState';
import ShowAnswers from 'component/exam/ShowAnswers';
import OnePart from 'component/common/OnePart';
import ExamStore from 'store/exam/ExamStore';

@observer
class ExamPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/exams/exam?id=${id}`).then((exam) => {
      console.log(exam);
      ExamStore.setCurrentExam(exam);
      this.setState({
        loading: false,
      });
    }).catch((error) => {
      if (error.response) {
        // message.error(error.response.data.message);
        AppState.history.replace('/exam/end');
      } else {
        console.log(error);
      }
    });
    // axios.get('/api/questions').then(questions => {
    //   console.log(questions);
    //   this.setState({
    //     questions
    //   })
    // })
  }

  render() {
    const { loading } = this.state;
    const { parts } = ExamStore.currentExam;
    console.log(parts);
    return (
      <div>
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
