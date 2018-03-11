/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 15:45:41
 */

import React, { Component } from 'react';
import { Button } from 'antd';

class SecHeader extends Component {
  render() {
    const {
      title, text, prefix, onClick, disabled, 
    } = this.props;
    return (
      <div
        style={{
          height: 50, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 18, marginLeft: 10 }}>{title}</div>
        <div style={{ marginLeft: 100 }} />
        <Button
          className="header-btn" 
          style={{
            alignItems: 'center',
            color: disabled ? 'rgba(0, 0, 0, 0.26)' : '#3F51B5',
            pointerEvents: disabled ? 'none' : 'auto',
            display: 'flex',            
            height: '28px',
            fontSize: '14px',
            lineHeight: '24px',
          }}
          onClick={onClick}
        >
          <div>
            {prefix}
            {text}
          </div>
       
        </Button>
      </div>
    );
  }
}


export default SecHeader;
