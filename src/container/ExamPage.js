/*
 * @Author: LainCarl 
 * @Date: 2018-03-06 16:03:55 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:32:36
 */
/*eslint-disable */
import React, { Component } from 'react';
import MainHeader from 'MainHeader';
import axios from 'Axios';
import SelectQuestion from '../component/exam/SelectQuestion';
import QuestionShow from '../component/common/QuestionShow';

const questions = [{
  title: '在网页中，必须使用（）标记来完成超级链接。',
  choices: ['<a>…</a>', '<p>…</p>', '<link>…</link>', '<li>…</li>'],
}, {
  title: '下面语句中，（B）将HTML页面的标题设置为“HTML练习”',
  choices: ['<HEAD> HTML练习</HEAD>', '<TITLE> HTML练习</TITLE>', '<H> HTML练习</H>', '<T> HTML练习</T>'],
}, {
  title: '根据以下的HTML代码片段：<h1 style="font-style:italic;color:limegreen;font-size=30";> hello!Nice to meet you! </h1> <h1>  this is the default display of an h1 element </h1> 以下描述不正确是（）',
  choices: ['第一个h1设置了特定的属性', '第二个h1用了系统默认的属性', '“hello!Nice to meet you!”的字体颜色是浅绿色', 'this is the default display of an h1 element”的字体大小为30'],
}];
class ExamPage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    }
  }
  componentDidMount() {
    axios.get('/api/questions').then(questions => {
      console.log(questions);
      this.setState({
        questions
      })
    })
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <MainHeader />
        <div style={{
          width: '700px',
          margin: '20px auto',
          padding: '20px 40px',
          boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
        }}
        >
          {
            // questions.map((one, i) => <SelectQuestion num={i + 1} data={one} />)
            questions.map((one, i) => <QuestionShow num={i + 1} data={one} />)
          }
        </div>
      </div>

    );
  }
}


export default ExamPage;
