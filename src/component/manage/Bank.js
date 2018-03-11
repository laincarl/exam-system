/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:34:09 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-11 15:34:09 
 */

import React, { Component } from 'react';
import Action from 'Action';
import BankIcon from '../../assets/image/questionbank.png';
import './Bank.css';

class Bank extends Component {
  test = () => {
    console.log('test');
  }
  render() {
    const { data } = this.props;
    const { title } = data;
    return (
      <div
        className="hover-deeper"
        style={{
          boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
          width: 160,
          height: 190,
          margin: 20,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <div style={{ textAlign: 'center', margin: '30px 0 20px 0' }}>
          <img src={BankIcon} alt="" style={{ width: 90 }} />
        </div>
        <div
          style={{ position: 'absolute', top: 5, right: 10 }}
        >
          <Action data={[{
            action: this.test,
            text: 'test',
          }]}
          />
        </div>
        <div 
          className="text-dot" 
          style={{ padding: '15px 10px', fontWeight: 'bold', marginTop: 16 }}
        >
          {title}
        </div>

      </div>
    );
  }
}

Bank.propTypes = {

};

export default Bank;
