/*
 * @Author: LainCarl 
 * @Date: 2018-03-22 14:20:44 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-23 15:54:38
 * @Feature:展示单个问题考试结果  
 */

import React, { Component } from 'react';

const radioStyle = {
  height: '30px',
  lineHeight: '30px',
};

class ResultShow extends Component {
  returnRightColor = (key, choices, answers) => {
    let color = '';
    if (choices.includes(key)) {
      color = 'red';
    }
    if (answers.includes(key)) {
      color = '#52c41a';
    }
    return color;
  }
  render() {
    const { num, data } = this.props;
    const {
      title, selects, answers, choices,
    } = data;
    return (
      <div
        style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}       
      >
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
        {choices.length === 0 || !choices[0] ? <div style={{ color: 'red', marginTop: 5 }}>未作答</div> : null}
        <div style={{ marginTop: '8px' }}>
          {Object.keys(selects).map(key => (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: this.returnRightColor(key, choices, answers),
            }
            }
            >
              <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{key} . </div>
              {/* {answers.includes(key) && <Icon type="check-circle" />} */}
              <div style={radioStyle} >{selects[key]}</div>
            </div>))
          }
        </div>

      </div>
    );
  }
}


export default ResultShow;
