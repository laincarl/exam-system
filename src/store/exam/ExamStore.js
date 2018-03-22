/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 17:07:35
 */
import { observable, action } from 'mobx';

class ExamStore {
  @observable currentExam = { id: null, title: null, questions: [] };
  // @observable result = {};
  @action
  setAnswer(id, answer) {
    if (this.currentExam.questions) {
      const len = this.currentExam.questions.length;
      for (let i = 0; i < len; i += 1) {
        if (this.currentExam.questions[i].id === id) {
          if (!this.currentExam.questions[i].answers.includes(answer)) {
            this.currentExam.questions[i].answers = [answer];
          }
          break;
        }
      }
    }    
    // this.questions.push({ id, answer });
    // console.log(this.answers);
  }
  // @action
  // setResult(result) {
  //   this.result = result;
  // }
  @action
  setCurrentExam(currentExam) {
    this.currentExam = currentExam;
  }
}
const examStore = new ExamStore();
export default examStore;
