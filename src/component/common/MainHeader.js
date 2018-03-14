/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 11:10:23 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 16:21:39
 */
import React, { Component } from 'react';
import { Popover, Button, Icon } from 'antd';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
// import axios from 'Axios';
import Cookies from 'js-cookie';
import './MainHeader.less';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    // boxShadow: '0 -10px 50px #888',
    // marginBottom: 15,
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
@observer
class MainHeader extends Component {
  to = (url) => {
    const { history } = this.props;
    history.push(url);
  }
  signOut = () => {
    Cookies.remove('token');
    // 退出登录，刷新页面
    window.location.reload();
  }
  render() {
    const { AppState } = this.props;
    const { name, url } = AppState.userInfo;
    console.log('get', name, url);
    const account = (
      <div style={{ width: 190 }}>
        <div style={{ textAlign: 'center' }}>
          <img
            style={styles.headIconBig}
            src={url}
            alt=""
          />
          <div style={{ marginTop: 10 }}>{name}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
          <Button style={{ fontSize: 12 }} onClick={() => { this.to('/account'); }}>个人中心</Button>
          <Button style={{ fontSize: 12 }} type="primary" onClick={this.signOut}>退出登录</Button>
        </div>
      </div>
    );
    return (
      <div style={styles.container} className="header">
        <div
          role="none"
          className="to-mainPage"
          style={{
            userSelect: 'none',
            cursor: 'pointer',
            height: '100%',
            width: 80,
            marginLeft: 20,
            textAlign: 'center',
            lineHeight: '50px',
          }}
          onClick={() => { this.to('/'); }}
        >
          <Icon type="home" />  主页
        </div>

        <div className="flex-space" />
        {AppState.userAuth ?
          <Popover placement="bottomRight" title={null} content={account} trigger="click">
            <img
              style={styles.headIcon}
              src={url}
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


export default withRouter(MainHeader);
