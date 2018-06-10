/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 16:42:19 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-02 18:08:40
 * @Feature: 展示试卷详情 
 */


import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'Axios';
import Spin from 'Spin';
import Header from 'Header';
import { message } from 'antd';
import AppState from 'AppState';
import OnePart from 'component/common/OnePart';

@observer
class PaperDetail extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      parts: [],
    };
  }
  componentDidMount() {
    this.getPaper();
  }
  getPaper=() => {
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    axios.get(`/papers/paper?id=${id}`).then((paper) => {
      console.log(paper);
      const { title, parts } = paper;
      this.setState({
        loading: false,
        title,
        parts,
      });
    }).catch((error) => {
      if (error.response) {
        message.error(error.response.data.message);
        AppState.history.goBack();
      } else {
        console.log(error);
      }
    });
  }
  render() {
    const { loading, title, parts } = this.state;
    const score_total = parts.reduce((total, part) => total + (part.score * part.num), 0);
    console.log(parts);
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header
          hasBack
          title="试卷详情"          
          refresh={this.getPaper}
        />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Spin spinning={loading}>
            <div style={{ fontSize: 25, textAlign: 'center', marginTop: 10 }}>{title}</div>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              {`本试卷共${parts.length}大题，总分${score_total}分`}
            </div>
                    
            <div style={{
            width: '700px',
            minHeight: '500px',
            margin: '20px auto',
            padding: '20px 40px',
            // boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
          }}
            >
              {parts.map((part, i) => <OnePart mode="show" index={i} part={part} />)}
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}


export default PaperDetail;
