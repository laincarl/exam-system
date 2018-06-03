import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Modal } from 'antd';
import axios from 'Axios';
import AppState from 'AppState';
import moment from 'moment';
import OnePart from '../common/OnePart';
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
    // this.setTime();
    this.start();
    window.onbeforeunload = function () {
      return 'You have unsaved changes!';
    };
  }
  componentWillUnmount() {
    window.onbeforeunload = null;
    clearInterval(this.timer);
  }
  // setTime = () => {
  //   const startTime = new Date();
  //   startTime.setMinutes(startTime.getMinutes() + 1);
  //   localStorage.setItem('start_time', startTime);
  // }
  start = () => {
    // 设置timer，更新倒计时
    this.timer = setInterval(() => {
      const { end_time } = ExamStore.currentExam;
      if (end_time) {
        // 取卷时间加考试时间限制，算出截止时间
        // const end_time = moment(start_time).add(limit_time, 'minutes');
        // 截止时间减去当前时间，算出时差，单位毫秒
        const during = moment.duration(moment(end_time) - moment(), 'ms');
        // console.log(during);
        // 如果时间差大于0则还没到时间限制
        if (during > 0) {
          const hour = during.get('hours');
          const min = during.get('minutes');
          const sec = during.get('seconds');
          this.setState({
            time: { sec, min, hour },
          });
        } else {
          console.log('时间到');
          clearInterval(this.timer);
        }
      }
    }, 1000);
  }
  handleSubmit = () => {
    const { answers, currentExam } = ExamStore;
    const { id, paper_id, title } = currentExam;
    console.log(id, paper_id, answers);
    this.setState({
      loading: true,
    });
    axios.post('/exams/submit', {
      id, title, paper_id, answers,
    }).then((result) => {
      console.log(result);
      // const { score, results } = result;
      this.setState({
        loading: false,
      });
      // ExamStore.setResult(result);
      AppState.history.push(`/exam/finish/${currentExam.id}`);
    }).catch((error) => {
      console.log(error);
      // message.error(error.response.data.message);
      this.setState({
        loading: false,
      });
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
    const { parts } = ExamStore.currentExam;
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
        <div>
          {
            parts.map((part, i) => <OnePart mode="side" index={i} part={part} />)
          }
        </div>
        <div style={{ margin: '15px 0 5px 0' }}>考试倒计时</div>
        <div>{`${hour}时${min}分${sec}秒`}</div>
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
