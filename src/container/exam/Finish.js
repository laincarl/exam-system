import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import axios from 'Axios';
import AppState from 'AppState';

class Finish extends Component {
  state={
    user_score: 0,
    total_score: 0,
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/exams/result?id=${id}`).then((result) => {
      console.log(result);
      const { user_score, total_score } = result;
      this.setState({
        user_score,
        total_score,
      });
    }).catch((error) => {
      if (error.response) { 
        AppState.history.replace('/404');
      } else {
        console.log(error);
      }
    });
  }
  
  toResult = () => {
    const { id } = this.props.match.params;
    AppState.history.push(`/exam/result/${id}`);
  }
  render() {
    const { user_score, total_score } = this.state;
    return (
      <div style={{
        width: '50%',
        height: '450px',
        borderRadius: '5px',
        margin: '50px auto',
        boxShadow: '0 2px 8px #ddd',
      }}
      >
        <div style={{
          display: 'flex',
          borderRadius: '5px 5px 0 0',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#009ee7',
          color: 'white',
          fontSize: 20,
          height: 60,
        }}
        >
          <Icon type="check-circle" style={{ marginRight: 8 }} />
          答题已结束，感谢您的参加
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20',
        }}
        >
          <img
            src={AppState.userInfo.url}
            alt=""
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
            }}
          />
          <div style={{ fontSize: 20, marginTop: 5 }}>{AppState.userInfo.real_name}</div>
          <div style={{ marginTop: 20 }}>
            <span style={{ fontWeight: 'bold', fontSize: 28 }}>{user_score}分</span>
            <span style={{ fontSize: 18, color: '#aaa', marginLeft: 3 }}>({total_score}分)</span>
          </div>
          <div style={{ fontSize: 18, color: '#aaa', margin: '10px 0 50px 0' }}>
            {user_score >= total_score * 0.8 ? '考的不错，再接再厉' : '下次继续努力，加油!'}
          </div>
          <Button
            onClick={this.toResult}
            style={{
              background: '#ffa400',
              width: 150,
              color: 'white',
              border: 'none',
            }}
          >查看对错
          </Button>
        </div>
      </div>
    );
  }
}


export default Finish;
