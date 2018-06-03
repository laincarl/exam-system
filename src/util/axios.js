import axios from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';
import Config from 'config';

const accessTokens = Cookies.get('token');
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = Config.server;
// history.go(0);
// http request 拦截器);
axios.interceptors.request.use(
  (config) => {
    const newConfig = config;
    newConfig.headers['Content-Type'] = 'application/json';
    newConfig.headers.Accept = 'application/json';
    newConfig.headers.Authorization = `${accessTokens}`;
    return newConfig;
  },
  (err) => {
    const error = err;
    return Promise.reject(error);
  },
);
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 204) {
      return Promise.resolve(response);
    }
    // continue sending response to the then() method
    console.log(response);
    const { data, success, type } = response.data;
    const Message = response.data.message;
    if (success !== undefined && success === false) {
      message.error(`${type} : ${Message}`);
      return Promise.reject(response.data);
    } else if (success !== undefined && success === true) {
      console.log('true');
      return Promise.resolve(data);
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { status } = response;
      switch (status) {
        // case 403: {
        //   message.error('权限不足');
        //   break;
        // }
        case 500: {
          message.error('服务器内部错误');
          break;
        }
        case 504: {
          message.error('服务器内部错误');
          break;
        }
        default:
          break;
      }
    }
    // request is rejected and will direct logic to the catch() method
    return Promise.reject(error);
  },
);
export default axios;
