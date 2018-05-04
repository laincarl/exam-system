/*
 * @Author: LainCarl 
 * @Date: 2018-03-28 13:11:28 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 13:36:28
 * @Feature: 单个题库的详情 
 */

import React, { Component } from 'react';
import { Button } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Spin from 'Spin';
import { questionType } from 'Constants';


class BankDetail extends Component {
  state = {
    bank: {},
    loading: true,
  }
  componentDidMount() {
    this.getBank();
  }

  getBank = () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    axios.get(`/api/banks/bank?id=${id}`).then((bank) => {
      console.log(bank);
      this.setState({
        bank,
        loading: false,
      });
    });
  }
  toImport = () => {
    const { history, match } = this.props;
    const { id } = match.params;
    console.log(history, match);
    history.push(`/manage/bank/import/${id}`);
  }
  render() {
    const { loading, bank } = this.state;
    const { title, type, count } = bank;
    return (
      <div>
        <Header
          hasBack
          title="题库详情"
        />
        <Spin spinning={loading}>
          <div style={{ width: 500 }}>
            <div>
              名称：{title}
            </div>
            <div>
              类型：{questionType[type]}
            </div>
            <div>
              题数:{count}
            </div>
            <Button onClick={this.toImport}>导入试题</Button>
          </div>
        </Spin>
      </div>
    );
  }
}


export default BankDetail;
