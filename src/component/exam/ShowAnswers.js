import React, { Component } from 'react';
import { observer } from 'mobx-react';
import OneQuestionBlock from './OneQuestionBlock';
import ExamStore from '../../store/exam/ExamStore';

@observer
class ShowAnswers extends Component {
  state = {
    time: {
      sec: 0,
      min: 0,
      hour: 0,
    },
  }
  componentDidMount() {
    this.setTime();
    this.start();
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


  render() {
    const { questions } = ExamStore;
    const { time } = this.state;
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
        height: 250,
        padding: '5px',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
      }}
      >
        {
          questions.map((one, i) =>
            <OneQuestionBlock key={one.id} checked={one.answers.length > 0} num={i + 1} />)
        }
        <div>{`${hour}时${min}分${sec}秒`}</div>
      </div>
    );
  }
}


export default ShowAnswers;
