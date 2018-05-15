/*
 * @Author: LainCarl 
 * @Date: 2018-05-07 11:23:10 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-07 11:23:39
 * @Feature: 单个填空题的组件，包括展示，答题，结果展示 
 */

import React, { Component } from 'react';
import ExamStore from 'store/exam/ExamStore';

// const showStyle = {
//   height: '30px',
//   lineHeight: '30px',
// };
const styles = {
  input: {
    width: 100,
    margin: 5,
    border: 'none',
    borderBottom: '1px solid gray',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};
class Blank extends Component {
  onChange = (i, e) => {
    const { part, index } = this.props;
    const { id } = this.props.data;

    console.log(id, part, index, e.target.value, i);
    let answer = ExamStore.answers[id];
    if (!ExamStore.answers[id]) {
      answer = Array(this.amount);
    }    
    answer[i] = e.target.value;
    ExamStore.setAnswer(id, part, index, answer);
    // console.log('radio checked', e.target.value);
    // this.setState({
    //   value: e.target.value,
    // });
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
    console.log(this.props);
    this.amount = 0;
    const { num, data, mode } = this.props;
    const {
      // id,
      title, selects, answers, user_answer,
    } = data;
    let oneQuestion;
    const arr = [];
    let pre = 0;
    // 将问题分开，找去空的位置
    for (let i = 0; i < title.length; i += 1) {
      if (title[i] === '{' && title[i + 1] === '}' && title[i - 1] !== '}') {
        arr.push(title.substring(pre, i));
        arr.push('{}');
        this.amount += 1;
        pre = i + 2;
      } else if (title[i] === '{' && title[i + 1] === '}' && title[i - 1] === '}') {
        arr.push('{}');
        this.amount += 1;
        pre = i + 2;
      }
    }
    // console.log(title, arr);
    // console.log(title, title.split(/{}/));
    if (mode === 'exam') {
      let current = 0;
      const blank = arr.map((one) => {
        if (one === '{}') {
          current += 1;
          return <input type="text" style={styles.input} onChange={this.onChange.bind(this, current - 1)} />;
        } else {
          return one;
        }
      });
      oneQuestion = (<div
        style={{ margin: '18px 0', position: 'relative' }}
      >
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {blank}</div>

      </div>);
    } else if (mode === 'result') {
      oneQuestion = (<div
        style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
      >
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
        {!user_answer ? <div style={{ color: 'red', marginTop: 5 }}>未作答</div> : null}
        <div style={{ marginTop: '8px' }}>
          {Object.keys(selects).map(key => (
            <div style={{
            display: 'flex',
            alignItems: 'center',
            color: this.returnRightColor(key, user_answer, answers),
          }
          }
            >
              <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{key} . </div>

            </div>))
        }
        </div>

      </div>);
    } else if (mode === 'show') {
      let current = 0;
      const blank = arr.map((one) => {
        if (one === '{}') {
          current += 1;
          return <input type="text" title={answers[current - 1]} style={{ ...styles.input, ...{ textAlign: 'center' } }} readOnly="readonly" value={answers[current - 1]} />;
        } else {
          return one;
        }
      });
      oneQuestion = (<div
        style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
      >
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {blank}</div>
      </div>);
    }
    
    return oneQuestion;
  }
}
export default Blank;