/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 16:03:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 15:42:28
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'Axios';
import Spin from 'Spin';
import { message } from 'antd';
import AppState from 'AppState';
import ShowAnswers from '../../component/exam/ShowAnswers';
import SelectQuestion from '../../component/exam/SelectQuestion';
// import QuestionShow from '../component/common/QuestionShow';
import ExamStore from '../../store/exam/ExamStore';

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
      ExamStore.setCurrentExam({
        ...exam,
        ...{ questions: exam.questions.map(one => ({ ...one, ...{ answers: [] } })) },
      });
      this.setState({
        loading: false,
      });
    }).catch((error) => {
      if (error.response) {
        message.error(error.response.data.message);
        AppState.history.push('/404');
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
    const { questions } = ExamStore.currentExam;
    console.log(questions);
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
              questions.map((one, i) => <SelectQuestion key={one.id} num={i + 1} data={one} />)
              // questions.map((one, i) => <QuestionShow num={i + 1} data={one} />)
            }
          </div>
        </Spin>
      </div>

    );
  }
}


export default ExamPage;
