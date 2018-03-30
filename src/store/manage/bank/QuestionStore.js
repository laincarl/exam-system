/*
 * @Author: LainCarl 
 * @Date: 2018-03-28 17:27:18 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 17:34:07
 * @Feature: 存放问题store 
 */

import { observable, action } from 'mobx';

class QuestionStore {
  @observable questions = [];
  @action
  setQuestions(questions) {
    this.questions = questions;
  }
  @action
  setQuestion(value, index) {
    this.questions[index].title = value;
  }
}
const questionStore = new QuestionStore();
export default questionStore;
