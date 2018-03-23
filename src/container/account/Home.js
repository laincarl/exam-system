/*
 * @Author: LainCarl 
 * @Date: 2018-03-14 14:03:36 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 17:06:40
 */

import React, { Component } from 'react';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'Axios';


function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('只能上传图片文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过2MB!');
  }
  return isJPG && isLt2M;
}

const styles = {
  headIconBig: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
};
@inject('AppState')
@observer
class Home extends Component {
  handleUpload = (e) => {
    if (beforeUpload(e.target.files[0])) {
      console.log(e.target.files[0]);
      const { AppState } = this.props;
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post('/api/user/head', formData).then((data) => {
        AppState.setUserInfo({ url: data.url });
      }).catch((error) => {
        if (error.response) {
          message.error(error.response.data.message);
        } else {
          console.log(error);
        }
      });
    }
  }
  render() {
    const { AppState } = this.props;
    const { name, url } = AppState.userInfo;

    return (
      <div style={{ margin: '20px 100px', padding: 20, boxShadow: '0 1px 6px rgba(0, 0, 0, .2)' }}>
        <h2>个人中心</h2>
        <div>{name}</div>
        <div style={{ width: 100, height: 100, position: 'relative' }}>
          <input
            type="file"
            title="更换头像"
            className="input-upload"
            onChange={this.handleUpload}
            style={{
              position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
            }}
          />
          <img
            style={styles.headIconBig}
            src={url}
            alt=""
          />
        </div>
      </div>
    );
  }
}


export default Home;
