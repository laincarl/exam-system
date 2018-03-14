/*
 * @Author: LainCarl 
 * @Date: 2018-03-14 14:03:36 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 16:08:22
 */

import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'Axios';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

const styles = {
  headIconBig: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
};
@inject('AppState')
@observer
class Home extends Component {
  state = {
    loading: false,
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  handleUpload = (info) => {
    const { AppState } = this.props;
    const formData = new FormData();
    formData.append('file', info.file);
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
  render() {
    const { AppState } = this.props;
    const { name, url } = AppState.userInfo;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        个人中心
        <div>{name}</div>
        <img
          style={styles.headIconBig}
          src={url}
          alt=""
        />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/api/user/head"
          customRequest={this.handleUpload}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
        </Upload>
      </div>
    );
  }
}


export default Home;
