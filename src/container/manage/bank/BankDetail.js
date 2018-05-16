/*
 * @Author: LainCarl 
 * @Date: 2018-03-28 13:11:28 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-28 13:36:28
 * @Feature: 单个题库的详情 
 */

import React, { Component } from 'react';
import { Button, Icon, Progress } from 'antd';
import Header from 'Header';
import axios from 'Axios';
import Spin from 'Spin';
import { Blank, SelectSingle, SelectMulti } from 'component/common/question';
import { questionType } from 'Constants';

class BankDetail extends Component {
  state = {
    bank: {},
    questions: [],
    buttonLoading: false,
    loading: true,
  }
  componentDidMount() {
    this.init();
  }

  getBank = (page) => {
    const { id } = this.props.match.params;    
    axios.get(`/banks/bank?id=${id}&page=${page || 0}`).then((data) => {
      const { bank } = data;
      let { questions } = data;
      // console.log(data);
      if (page !== 0) {
        questions = [...this.state.questions, ...questions];
      }
      this.setState({
        bank,
        questions,
        loading: false,
        buttonLoading: false,
      });
    });
  }
  init=() => {
    this.setState({ loading: true });
    this.getBank(0);
  }
  loadNextPage=() => {
    this.setState({
      buttonLoading: true,
    });
    const { current_page } = this.state.bank;
    console.log(current_page);
    this.getBank(current_page + 1);
  }
  toImport = () => {
    const { history, match } = this.props;
    const { id } = match.params;
    console.log(history, match);
    history.push(`/manage/bank/import/${id}`);
  }
  render() {
    const {
      loading, buttonLoading, bank, questions,
    } = this.state;
    const {
      title, type, count, current_page, total_page,
    } = bank;
    // console.log(questions);
    let Question = SelectSingle;
    switch (type) {
      case 'select_single':
        Question = SelectSingle;
        break;
      case 'select_multi':
        Question = SelectMulti;
        break;
      case 'blank':
        Question = Blank;
        break;
      default:
        break;
    }
    return (
      <div>
        <Header
          hasBack
          buttons={[
            {
              prefix: <Icon type="file-add" />,
              text: '导入试题',
              onClick: this.toImport,
            },
          ]}
          refresh={this.init}
          title="题库详情"
        />
        <Spin spinning={loading}>
          <div
            style={{
              padding: '10px 24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.87)',
                    fontWeight: 'bold',
                    width: '280px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                  title={title}
                >
                  名称：
                  {title}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.87)',
                    fontWeight: 'bold',
                    width: '280px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                  title={title}
                >
                  类型：{questionType[type]}
                </div>
              </div>
              <div className="flex-space" />
              <Progress type="circle" percent={100} width={80} format={() => `题数:${count}`} />
            </div>
            <div>
              {questions.map((question, i) =>
                <Question mode="show" index={i} num={i + 1} data={question} />)}
            </div>

            {
              current_page + 1 < total_page &&
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <Button loading={buttonLoading} type="primary" onClick={this.loadNextPage}>加载更多</Button>
              </div>
            }
          </div>
        </Spin>
      </div>
    );
  }
}


export default BankDetail;
