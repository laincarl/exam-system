/*
 * @Author: LainCarl 
 * @Date: 2018-05-07 11:24:58 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-07 11:25:24
 * @Feature: 单个单选题组件，包括答题，展示以及结果展示 
 */

import React, { Component } from 'react';
import { Radio } from 'antd';
import ExamStore from 'store/exam/ExamStore';

const RadioGroup = Radio.Group;

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
class SelectSingle extends Component {
  state = {
    value: 0,
  }
  onChange = (e) => {
    const { part, index } = this.props;
    const { id } = this.props.data;

    console.log(id, part, index, e.target.value);
    ExamStore.setAnswer(id, part, index, e.target.value);
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  returnRightColor = (key, user_answer, answers) => {
    let color = '';
    if (user_answer === key) {
      color = 'red';
    }
    if (answers.includes(key)) {
      color = '#52c41a';
    }
    return color;
  }
  render() {
    console.log('render');
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
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <div style={{ marginTop: '8px' }}>
              {Object.keys(selects).map(key => (
                <div style={{ display: 'flex' }}>
                  <div style={keyStyle}>{key} . </div>
                  {/* {answers.includes(key) && <Icon type="check-circle" />} */}
                  <Radio key={`${id}${key}`} style={radioStyle} value={key}>{selects[key]}</Radio>
                </div>))
              }
            </div>
          </RadioGroup>
        </div>);
        break;
      case 'result':
        oneQuestion = (<div
          style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
        >
          <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
          {!user_answer ? <div style={{ color: 'red', marginTop: 5 }}>未作答</div> : null}
          <div style={{ marginTop: '8px' }}>
            {Object.keys(selects).map(key => (
              <div style={{
                display: 'flex',                
                color: this.returnRightColor(key, user_answer, answers),
              }
              }
              >
                <div style={keyStyle}>{key} . </div>
                {/* {answers.includes(key) && <Icon type="check-circle" />} */}
                <div style={radioStyle} >{selects[key]}</div>
              </div>))
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


export default SelectSingle;
