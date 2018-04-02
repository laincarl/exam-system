/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 16:46:26 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-02 17:44:52
 * @Feature: 一个大题  
 */

import React, { Component } from 'react';
import Constants from 'Constants';
import QuestionShow from './QuestionShow';
import NumberToChinese from '../../../util/NumberToChinese';

class OnePart extends Component {
  render() {
    const { part, index } = this.props;
    const {
      type, questions, score, num, 
    } = part;
    return (
      <div>
        {`${NumberToChinese(index)}、${Constants[type]}（本大题共${num}小题，每题${score}分，共${num * score}分）`}    
        {questions.map((question, i) => <QuestionShow num={i + 1} data={question} />)}
      </div>
    );
  }
}


export default OnePart;
