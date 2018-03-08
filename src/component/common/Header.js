/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 11:10:23 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-08 18:10:21
 */
import React, { Component } from 'react';
import { Popover } from 'antd';
import { withRouter } from 'react-router';
import { inject } from 'mobx-react';
import axios from 'Axios';
import './Header.css';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    // boxShadow: '0 -10px 50px #888',
    marginBottom: 15,
    borderBottom: '1px solid #ddd',
  },
  headIcon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginRight: 20,
  },
  headIconBig: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
};
@inject('AppState')
class Header extends Component {
  handleClick = () => {
    axios.post('/api/login', { test: 'sss' }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }
  to = (url) => {
    const { history } = this.props;
    history.push(url);
  }
  render() {
    const { AppState } = this.props;
    const account = (
      <div style={{ width: 170 }}>
        <div style={{ textAlign: 'center' }}>
          <img
            style={styles.headIconBig}
            src="https://i2.hdslb.com/bfs/face/ceb81f37a132d604be006558b5a85f9e055e4c5a.jpg@72w_72h.webp"
            alt=""
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'flex' }}>
            <div
              className="to-mainPage"
              style={{
                padding: 5, flex: 1, cursor: 'pointer', userSelect: 'none', textAlign: 'center',
              }}
            >个人中心
            </div>
            <div
              className="to-mainPage"
              style={{
                padding: 5, flex: 1, cursor: 'pointer', userSelect: 'none', textAlign: 'center',
              }}
            >个人中心
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              className="to-mainPage"
              style={{
                padding: 5, flex: 1, cursor: 'pointer', userSelect: 'none', textAlign: 'center',
              }}
            >个人中心
            </div>
            <div
              className="to-mainPage"
              style={{
                padding: 5, flex: 1, cursor: 'pointer', userSelect: 'none', textAlign: 'center',
              }}
            >个人中心
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div style={styles.container}>
        <div
          role="none"
          className="to-mainPage"
          style={{
            userSelect: 'none',
            cursor: 'pointer',
            height: '100%',
            width: 100,
            textAlign: 'center',
            lineHeight: '50px',
          }}
          onClick={() => { this.to('/'); }}
        >
          主页
        </div>
        <div role="none" onClick={this.handleClick}>
          测试
        </div>
        <div className="flex-space" />
        {AppState.userAuth ?
          <Popover placement="bottomRight" title={null} content={account} trigger="click">
            <img
              style={styles.headIcon}
              src="https://i2.hdslb.com/bfs/face/ceb81f37a132d604be006558b5a85f9e055e4c5a.jpg@72w_72h.webp"
              alt=""
            />
          </Popover>
          :
          <div
            role="none"
            className="to-mainPage"
            style={{
              userSelect: 'none',
              cursor: 'pointer',
              height: '100%',
              width: 100,
              textAlign: 'center',
              lineHeight: '50px',
            }}
            onClick={() => { this.to('/login'); }}
          >登录
          </div>}
      </div>
    );
  }
}


export default withRouter(Header);
