/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 16:50:48
 */

import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    const {
      hasBack, title, text, prefix, onClick, disabled, history, 
    } = this.props;
    return (
      <div
        style={{
          height: 50, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', width: '100%',
        }}
      >
        {hasBack && <Icon type="arrow-left" style={{ fontSize: 18, marginLeft: 10, cursor: 'pointer' }} onClick={() => { history.goBack(); }} />}
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
            {' '}
            {text}
          </div>
       
        </Button>
      </div>
    );
  }
}


export default withRouter(Header);
