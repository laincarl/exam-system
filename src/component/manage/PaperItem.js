/*
 * @Author: LainCarl 
 * @Date: 2018-03-26 15:52:03 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-26 16:03:46
 * @Feature: 一张试卷的一个题型 
 */

import React, { Component } from 'react';

const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

class PaperItem extends Component {
  render() {
    const { index, title } = this.props;
    return (
      <div>
        <div>{chinese[index]}、{title}</div>
      </div>
    );
  }
}


export default PaperItem;
