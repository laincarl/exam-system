/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 16:46:26 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-03 17:08:18
 * @Feature: 一个大题  
 */

import React, { Component } from 'react';
import { questionType } from 'Constants';
import SelectQuestion from '../exam/SelectQuestion';
import QuestionShow from './QuestionShow';
import ResultShow from '../exam/ResultShow';
import OneQuestionBlock from '../exam/OneQuestionBlock';
import NumberToChinese from '../../util/NumberToChinese';

class OnePart extends Component {
  render() {
    const { part, index, mode } = this.props;
    console.log(mode);
    const {
      type, questions, score, num,
    } = part;
    let show = null;
    switch (mode) {
      case 'exam':
        show = questions.map((question, i) =>
          <SelectQuestion mode={mode} part={index} index={i} num={i + 1} data={question} />);
        break;
      case 'side':
        show = questions.map((question, i) =>
          <OneQuestionBlock id={question.id} num={i + 1} />);
        break; 
      case 'result':
        show = questions.map((question, i) =>
          <ResultShow id={question.id} num={i + 1} data={question} />);
        break;
      default:
        show = questions.map((question, i) =>
          <QuestionShow part={index} index={i} num={i + 1} data={question} />);
        break;
    }
    return (
      <div>
        {mode === 'side'
          ? `${NumberToChinese(index + 1)}、${questionType[type]}`
          : `${NumberToChinese(index + 1)}、${questionType[type]}（本大题共${num}小题，每题${score}分，共${num * score}分）`
        }
        <div style={{
          display: mode === 'side' && 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
        >
          {show}
        </div>    
      </div>
    );
  }
}


export default OnePart;
