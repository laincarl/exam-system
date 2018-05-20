/*
 * @Author: LainCarl 
 * @Date: 2018-05-07 11:24:11 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-07 11:24:39
 * @Feature: 单个多选题的组件，包括答题，展示以及结果展示 
 */

import React, { Component } from 'react';
import { Checkbox } from 'antd';
import ExamStore from 'store/exam/ExamStore';

const styles = {
  keyStyle: {
    width: '30px',
    lineHeight: '30px',
    fontWeight: 'bold',
  },
  radioStyle: {
    flex: 1,
    display: 'block',
    // height: '30px',
    lineHeight: '30px',
  },
  showStyle: {
    flex: 1,
    lineHeight: '30px',
  },
};
class SelectMulti extends Component {
  onChange = (checkedValues) => {
    const { part, index } = this.props;
    const { id } = this.props.data;

    console.log(id, part, index, checkedValues);
    ExamStore.setAnswer(id, part, index, checkedValues);
  }
  render() {
    console.log('render');
    let right = false;
    const { num, data, mode } = this.props;
    const {
      id,
      title, selects, answers, user_answer,
    } = data;
    const { keyStyle, radioStyle, showStyle } = styles;
    let oneQuestion;
    switch (mode) {
      case 'exam':
        oneQuestion = (<div
          style={{ margin: '18px 0', position: 'relative' }}
        >
          <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
          <Checkbox.Group onChange={this.onChange}>
            <div style={{ marginTop: '8px' }}>
              {Object.keys(selects).map(key => (
                <div style={{ display: 'flex' }}>
                  <div style={keyStyle}>{key} . </div>
                  {/* {answers.includes(key) && <Icon type="check-circle" />} */}
                  <Checkbox key={`${id}${key}`} style={radioStyle} value={key}>{selects[key]}</Checkbox>
                </div>))
              }
            </div>
          </Checkbox.Group>
        </div>);
        break;
      case 'result':
        right =
          user_answer && user_answer.length === answers.length &&
          user_answer.every(one => answers.includes(one));
        oneQuestion = (<div
          style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
        >
          <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
          {!user_answer ? <div style={{ color: 'red', marginTop: 5 }}>未作答</div> : null}
          <div style={{ marginTop: '8px' }}>
            {Object.keys(selects).map(key => (
              <div style={{
                display: 'flex',           
                // 正确答案绿色
                color: answers.includes(key) && '#52c41a',
              }
              }
              >
                <div style={keyStyle}>{key} . </div>
                {/* {answers.includes(key) && <Icon type="check-circle" />} */}
                <div style={radioStyle} >{selects[key]}</div>
              </div>))
            }
            {
              user_answer && <div style={{ marginTop: 10, color: !right && 'red' }}>你的答案：{user_answer.join('、')}</div>
            }            
          </div>

        </div>);
        break;
      case 'show':
        oneQuestion = (<div
          style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
        >
          <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
          <div style={{ marginTop: '8px' }}>
            {Object.keys(selects).map(key => (
              <div style={{ display: 'flex', color: answers.includes(key) && '#52c41a' }}>
                {/* 选项key */}
                <div style={keyStyle}>{key} . </div>
                {/* {answers.includes(key) && <Icon type="check-circle" />} */}
                {/* 选项内容 */}
                <div style={showStyle}>{selects[key]}</div>
              </div>))
            }
          </div>
        </div>);
        break;
      default:
        break;
    }
    return oneQuestion;
  }
}


export default SelectMulti;
