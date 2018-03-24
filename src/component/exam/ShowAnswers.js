import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Modal } from 'antd';
import axios from 'Axios';
import AppState from 'AppState';
import OneQuestionBlock from './OneQuestionBlock';
import ExamStore from '../../store/exam/ExamStore';

const { confirm } = Modal;
@observer
class ShowAnswers extends Component {
  state = {
    time: {
      sec: 0,
      min: 0,
      hour: 0,
    },
    loading: false,
  }
  componentDidMount() {
    this.setTime();
    this.start();
  }
  componentWillUnmount() { 
    clearInterval(this.timer);
  }
  setTime = () => {
    const startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() + 1);
    localStorage.setItem('start_time', startTime);
  }
  start = () => {
    this.timer = setInterval(() => {
      let during = new Date(localStorage.getItem('start_time')) - new Date();
      if (during > 0) {
        during = new Date(during);
        this.setState({
          time: { sec: during.getSeconds(), min: during.getMinutes(), hour: during.getHours() - 8 },
        });
      } else {
        console.log('clear');
        clearInterval(this.timer);
      }
    }, 1000);
  }
  handleSubmit = () => {
    const { currentExam } = ExamStore;
    console.log(currentExam);
    this.setState({
      loading: true,
    });
    axios.post('/api/exams/submit', currentExam).then((result) => {
      console.log(result);
      // const { score, results } = result;
      this.setState({
        loading: false,
      });
      // ExamStore.setResult(result);
      AppState.history.push(`/exam/finish/${currentExam.id}`);
    });
  }
  showConfirm = () => {
    confirm({
      title: '确认交卷?',
      content: '交卷后将不可重新答题',
      okText: '确定',
      cancelText: '取消',
      onOk: this.handleSubmit,
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { questions } = ExamStore.currentExam;
    const { time, loading } = this.state;
    const { sec, min, hour } = time;
    // console.log(questions);
    return (
      <div style={{
        position: 'fixed',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
        background: 'white',
        bottom: 50,
        left: 20,
        zIndex: 10,
        width: 250,
        // height: 350,
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >

        <div style={{ fontSize: 18, fontWeight: 'bold', margin: '10px 0' }}>正在考试中</div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
        >
          {
            questions.map((one, i) =>
              <OneQuestionBlock key={one.id} checked={one.answers.length > 0} num={i + 1} />)
          }
        </div>
        <div style={{ margin: '15px 0 5px 0' }}>考试倒计时</div>
        <div>{`${hour}:${min}:${sec}`}</div>
        <div className="flex-space" />
        <Button
          loading={loading}
          style={{
            marginTop: 10,
            marginBottom: 10,
            background: '#52c41a',
            color: 'white',
            width: '90%',
          }}
          onClick={this.showConfirm}
        >交卷
        </Button>
      </div>
    );
  }
}


export default ShowAnswers;
