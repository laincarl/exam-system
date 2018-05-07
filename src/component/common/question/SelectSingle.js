/*
 * @Author: LainCarl 
 * @Date: 2018-05-07 11:24:58 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-07 11:25:24
 * @Feature: 单个单选题组件，包括答题，展示以及结果展示 
 */

import React, { Component } from 'react';

const radioStyle = {
  height: '30px',
  lineHeight: '30px',
};
class SelectSingle extends Component {
  render() {
    console.log('render');
    const { num, data } = this.props;
    const {
      title, selects, answers,
    } = data;
    return (
      <div
        style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
        // onMouseEnter={() => { this.setState({ hover: true }); }}
        // onMouseLeave={() => { this.setState({ hover: false }); }}
      >
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
        <div style={{ marginTop: '8px' }}>
          {Object.keys(selects).map(key => (
            <div style={{ display: 'flex', alignItems: 'center', color: answers.includes(key) && '#52c41a' }}>
              {/* 选项key */}
              <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{key} . </div>
              {/* {answers.includes(key) && <Icon type="check-circle" />} */}
              {/* 选项内容 */}
              <div style={radioStyle}>{selects[key]}</div>
            </div>))
          }
        </div>

      </div>
    );
  }
}


export default SelectSingle;
