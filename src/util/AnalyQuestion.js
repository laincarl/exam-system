/*
 * @Author: LainCarl 
 * @Date: 2018-04-17 14:49:45 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-17 14:51:12
 * @Feature: 试题分析函数，包括单选，多选，判断，填空 
 */


const Regs = {
  select_single: {
    // 试题格式示例 数字加顿号开头，选项大写，正确答案前面星号
    // 1、下面哪个是属性而不是标记（  ）。
    // A、IMG    B、FORM     *C、 HREF   D、TD
    // 将问题分割成单个问题
    question: /[0-9]+、([^]*?)(?=[0-9]+、|$)/g,
    // 从单个问题找题目
    title: /[0-9]+、([^]*?)\*?[A-Z]+、/g,
    // 找到选项
    selects: /([A-Z])+、([^]*?)(?=\*?[A-Z]+、|$)/g,
    // 找到答案
    answers: /\*([A-Z])+、/g,
  },
};
/**
 * 
 * 
 * @export
 * @param {Object} origin 初始数据
 * @param {Number} bankId 题库id
 * @param {String} type 题型
 * @returns 
 */
export default function AnalyQuestion(origin, bankId, type) {
  return new Promise((resolve, reject) => {
    // 当传过来的试题类型不存在，返回空数组
    const Reg = Regs[type];
    if (!Reg) { resolve([]); }
    // 以下开始匹配问题以及答案

    // 将问题分割成单个问题
    const questionReg = Reg.question;
    // 从单个问题找题目
    const titleReg = Reg.title;
    // 找到选项
    const selectsReg = Reg.selects;
    // 找到答案
    const answersReg = Reg.answers;
    let result;
    const questions = [];
   
    while (result = questionReg.exec(origin)) {
      // console.log(result[1], regex2.lastIndex);
      // console.log(result);
      const question = {
        type: 'select_single',
        bankId,
        title: null,
        answers: [],
        selects: {},
      };
      let answer;
      while (answer = answersReg.exec(result[0])) {
        // console.log(answer, regex2.lastIndex);
        // console.log(answer[1].trim());
        question.answers.push(answer[1].trim());
      }
      let select;
      while (select = selectsReg.exec(result[0])) {
        // console.log(answer, regex2.lastIndex);
        // console.log(select[1].trim());
        question.selects[select[1].trim()] = (select[2].trim());
      }
      let title;
      while (title = titleReg.exec(result[0])) {
        // console.log(answer, regex2.lastIndex);
        // console.log('title', title);
        question.title = title[1].trim();
      }
      // 单个试题解析完成后开始判断
      if (!question.title || !question.selects.length === 0 || question.answers.length === 0) {
        console.log(question);
        reject(Error(null, '部分试题解析错误，请检查格式'));
      } else {
        questions.push(question);
      }
    }
    // 解析完成后开始判断
    resolve(questions);
  });
}
