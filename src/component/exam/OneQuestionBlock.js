import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ExamStore from '../../store/exam/ExamStore';

@observer
class OneQuestionBlock extends Component {
  render() {
    console.log('render');
    const { num, id } = this.props;
    const checked = ExamStore.answers[id];
    return (
      <div style={{
        width: 40,
        height: 40,
        boxShadow: '1px 0 0 0 #ddd,0 1px 0 0 #ddd, 1px 1px 0 0 #ddd, 1px 0 0 0 #ddd inset, 0 1px 0 0 #ddd inset',
        lineHeight: '40px',
        textAlign: 'center',
        background: checked && '#52c41a',
        color: checked && 'white',
      }}
      >
        {num}
      </div>
    );
  }
}


export default OneQuestionBlock;
