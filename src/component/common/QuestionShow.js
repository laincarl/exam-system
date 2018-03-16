import React, { Component } from 'react';
import { Icon } from 'antd';


const radioStyle = {
  height: '30px',
  lineHeight: '30px',
};

class QuestionShow extends Component {
  state = {
    hover: false,
  }
  render() {
    // <Icon type="check-circle" />
    const { hover } = this.state;
    const { num, data } = this.props;
    const {
      title, selects, answers,
    } = data;
    return (
      <div
        style={{ margin: '18px 0', position: 'relative', paddingRight: 50 }}
        onMouseEnter={() => { this.setState({ hover: true }); }}
        onMouseLeave={() => { this.setState({ hover: false }); }}
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
          {Object.keys(selects).map((key, i) => (
            <div style={{ display: 'flex', alignItems: 'center', color: answers.includes(key) && '#52c41a' }}>
              <div style={{ width: '30px', overflow: 'hidden', fontWeight: 'bold' }}>{String.fromCharCode(65 + i)} . </div>
              {/* {answers.includes(key) && <Icon type="check-circle" />} */}
              <div style={radioStyle} >{selects[key]}</div>
            </div>))
          }
        </div>

      </div>
    );
  }
}


export default QuestionShow;
