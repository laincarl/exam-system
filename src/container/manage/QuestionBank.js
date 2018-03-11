/*
 * @Author: LainCarl 
 * @Date: 2018-03-11 15:34:18 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-11 15:46:34
 */

import React, { Component } from 'react';
import { Icon } from 'antd';
import SecHeader from 'SecHeader';
import Bank from '../../component/manage/Bank';


const test = [{
  id: 1,
  title: '测试001',
}, {
  id: 2,
  title: '测试002',
}, {
  id: 3,
  title: '测试003',
}, {
  id: 4,
  title: '测试004',
}, {
  id: 5,
  title: '测试005',
}, {
  id: 6,
  title: '测试006',
}, {
  id: 7,
  title: '测试007',
}];
class QuestionBank extends Component {
  render() {
    return (
      <div>
        <SecHeader
          title="题库管理"
          prefix={<Icon type="file-add" />}
          text="新建题库"
          onClick={() => {
            console.log('headerclick');
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            test.map(one => <Bank data={one} />)
          }
        </div>
      </div>
    );
  }
}


export default QuestionBank;
