/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 17:07:35
 */
import { observable, action } from 'mobx';

class ExamStore {
  @observable questions = [];
  @observable results = [];
  @action
  setAnswer(id, answer) {
    const len = this.questions.length;
    for (let i = 0; i < len; i += 1) {
      if (this.questions[i].id === id) {
        if (!this.questions[i].answers.includes(answer)) {
          this.questions[i].answers = [answer];
        }
        break;
      }
    }
    // this.questions.push({ id, answer });
    // console.log(this.answers);
  }
  @action
  setQuestions(questions) {
    this.questions = questions;
  }
}
const examStore = new ExamStore();
export default examStore;
