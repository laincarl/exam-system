/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 16:03:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:32:36
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'Axios';
import Spin from 'Spin';
import { Button } from 'antd';
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
    axios.get('/api/exams/exam?id=10').then((exam) => {
      console.log(exam);
      ExamStore.setQuestions(exam.questions.map(one => ({ ...one, ...{ answers: [] } })));
      this.setState({
        loading: false,
      });
    });
    // axios.get('/api/questions').then(questions => {
    //   console.log(questions);
    //   this.setState({
    //     questions
    //   })
    // })
  }
  handleSubmit = () => {
    const { questions } = ExamStore;
    console.log(questions);
    this.setState({
      loading: true,
    });    
    axios.post('/api/exams/submit', questions).then((result) => {
      console.log(result);
      this.setState({
        loading: false,
      });
    });
  }
  render() {
    const { loading } = this.state;
    const { questions } = ExamStore;
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
            <div style={{ textAlign: 'center' }}>
              <Button onClick={this.handleSubmit} type="primary" loading={loading}>提交</Button>
            </div>
          </div>
        </Spin>
      </div>

    );
  }
}


export default ExamPage;