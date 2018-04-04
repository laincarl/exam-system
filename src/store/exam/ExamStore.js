/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-03 17:35:18
 */
import { observable, action } from 'mobx';

class ExamStore {
  @observable currentExam = { id: null, title: null, parts: [] };
  @observable answers = {};
  @action
  setAnswer(id, part, index, answer) {
    this.answers[id] = answer;
  }
  // @action
  // setanswers(answers) {
  //   this.answers = answers;
  // }
  @action
  setCurrentExam(currentExam) {
    this.currentExam = currentExam;
    const answers = {};
    currentExam.parts.forEach((part) => {
      part.questions.forEach((question) => {
        answers[question.id] = null;
      });
    });
    this.answers = answers;
  }
}
const examStore = new ExamStore();
export default examStore;
