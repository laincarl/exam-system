/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:24 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:34:24 
 */

import { Component } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// progress bar style
class Loading extends Component {
  componentWillMount() {
    NProgress.start();
  }
  
  componentDidMount() {
    NProgress.done();
  }
  
  render() {
    return (null);
  }
}

Loading.propTypes = {

};

export default Loading;
