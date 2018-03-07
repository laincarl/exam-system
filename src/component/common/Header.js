/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 11:10:23 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-07 21:54:22
 */
import React, { Component } from 'react';
import { Popover } from 'antd';
import { withRouter } from 'react-router';
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
};
class Header extends Component {
  handleClick=() => {
    axios.post('/api/login', { test: 'sss' }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    const { history } = this.props;
    const account = (
      <div>
        <div className="">个人中心</div>
        <div>个人中心</div>
        <div>个人中心</div>
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
          onClick={() => { history.push('/'); }}
        >
          主页
        </div>
        <div role="none" onClick={this.handleClick}>
          测试
        </div>
        <div className="flex-space" />
        <Popover placement="bottomRight" title={null} content={account}>
          <img
            style={styles.headIcon}
            src="https://i2.hdslb.com/bfs/face/ceb81f37a132d604be006558b5a85f9e055e4c5a.jpg@72w_72h.webp"
            alt=""
          />
        </Popover>
      </div>
    );
  }
}


export default withRouter(Header);
