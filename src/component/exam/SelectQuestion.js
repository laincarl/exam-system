import React, { Component } from 'react';
import { Radio } from 'antd';
import ExamStore from '../../store/exam/ExamStore';

const RadioGroup = Radio.Group;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class SelectQuestion extends Component {
  state = {
    value: 0,
  }
  onChange = (e) => {
    const { id } = this.props.data;

    console.log(id, e.target.value);
    ExamStore.setAnswer(id, e.target.value);
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { num, data } = this.props;
    const {
      id,
      title, selects,
    } = data;
    return (
      <div
        style={{ margin: '18px 0', position: 'relative' }}
      >
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <div style={{ marginTop: '8px' }}>
            {Object.keys(selects).map(key => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{key} . </div>
                {/* {answers.includes(key) && <Icon type="check-circle" />} */}
                <Radio key={`${id}${key}`} style={radioStyle} value={key}>{selects[key]}</Radio>
              </div>))
            }
          </div>
        </RadioGroup>
      </div>
    );
  }
}


export default SelectQuestion;
