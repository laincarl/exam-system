import React, { Component } from 'react';
import { Icon } from 'antd';
import { observer } from 'mobx-react';
import QuestionStore from '../../store/manage/bank/QuestionStore';
import './QuestionShow.css';

const radioStyle = {
  height: '30px',
  lineHeight: '30px',
};
@observer
class QuestionShow extends Component {
  state = {
    hover: false,
  }
  handleChange=(e) => {
    QuestionStore.setQuestion(e.target.value, 0);
  }
  render() {
    console.log('render');
    // <Icon type="check-circle" />
    const { hover } = this.state;
    const { num, index } = this.props;
    const question = QuestionStore.questions[index];
    const {
      title, selects, answers,
    } = question;
    return (
      <div
        style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
        // onMouseEnter={() => { this.setState({ hover: true }); }}
        // onMouseLeave={() => { this.setState({ hover: false }); }}
      >
        {
          hover && <Icon
            type="edit"
            style={{
              cursor: 'pointer', fontWeight: 'bold', position: 'absolute', top: 0, right: 30,
            }}
          />
        }
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
        <div style={{ marginTop: '8px' }}>
          {Object.keys(selects).map(key => (
            <div style={{ display: 'flex', alignItems: 'center', color: answers.includes(key) && '#52c41a' }}>
              {/* 选项key */}
              <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{key} . </div>
              {/* {answers.includes(key) && <Icon type="check-circle" />} */}
              {/* 选项内容 */}
              <input className="input_question_edit" style={radioStyle} value={selects[key]} onChange={this.handleChange} />
            </div>))
          }
        </div>

      </div>
    );
  }
}


export default QuestionShow;
