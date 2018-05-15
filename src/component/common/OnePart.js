/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 16:46:26 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-03 17:08:18
 * @Feature: 一个大题  
 */
  
import React, { Component } from 'react';
import { questionType } from 'Constants';
import { Blank, SelectSingle, SelectMulti } from './question';
// import SelectQuestion from '../exam/SelectQuestion';
// import QuestionShow from './QuestionShow';
// import ResultShow from '../exam/ResultShow';
import OneQuestionBlock from '../exam/OneQuestionBlock';
import NumberToChinese from '../../util/NumberToChinese';

class OnePart extends Component {
  render() {
    const { part, index, mode } = this.props;
    console.log(mode);
    const {
      type, questions, score, num, 
    } = part;
    let Question = SelectSingle;
    switch (type) {
      case 'select_single':
        Question = SelectSingle;
        break;
      case 'select_multi':
        Question = SelectMulti;
        break;
      case 'blank':
        Question = Blank;
        break;
      default:
        break;
    }
    let show = null;
    if (mode === 'side') {
      show = questions.map((question, i) =>
        <OneQuestionBlock id={question.id} num={i + 1} />);
    } else {
      show = questions.map((question, i) =>
        (<Question 
          key={Math.random()}
          mode={mode}
          part={index}
          index={i}
          num={i + 1}
          data={question}
        />));
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
