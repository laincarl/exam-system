/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 16:46:26 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-03 17:33:03
 * @Feature: 一个大题  
 */

import React, { Component } from 'react';
import Constants from 'Constants';
import NumberToChinese from '../../util/NumberToChinese';
import OneQuestionBlock from './OneQuestionBlock';

class OneShowPart extends Component {
  render() {
    const { part, index } = this.props;
    const {
      type, questions,
    } = part;
    return (
      <div>
        {`${NumberToChinese(index + 1)}、${Constants[type]}`}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
        >
          {questions.map((question, i) =>
            <OneQuestionBlock id={question.id} num={i + 1} />)}
        </div>

      </div>
    );
  }
}


export default OneShowPart;
