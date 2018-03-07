import React, { Component } from 'react';

import { Radio } from 'antd';

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
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    }
    render() {
      const { num, data } = this.props;
      const { title, choices } = data;
      return (
        <div style={{ margin: '18px 0' }}>
          <div><span style={{ fontWeight: 'bold' }}>{num}.</span> {title}</div>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <div style={{ marginTop: '8px' }}>
              {choices.map((one, i) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{String.fromCharCode(65 + i)} . </div>
                  <Radio style={radioStyle} value={i + 1}>{one}</Radio>
                </div>))              
              }
            </div>
          </RadioGroup>
        </div>
      );
    }
}


export default SelectQuestion;
