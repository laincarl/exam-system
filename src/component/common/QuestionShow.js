import React, { Component } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class QuestionShow extends Component {
  state = {
    value: 0,
  }
  render() {
    const { num, data } = this.props;
    const { title, selects } = data;
    return (
      <div style={{ margin: '18px 0' }}>
        <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
        <RadioGroup value={this.state.value}>
          <div style={{ marginTop: '8px' }}>
            {Object.keys(selects).map((key, i) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{String.fromCharCode(65 + i)} . </div>
                <Radio style={radioStyle} value={i + 1}>{selects[key]}</Radio>
              </div>))
            }
          </div>
        </RadioGroup>
      </div>
    );
  }
}


export default QuestionShow;
