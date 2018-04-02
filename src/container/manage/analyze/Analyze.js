/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 21:54:40 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-02 22:16:47
 * @Feature: 数据统计图 
 */

import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Header from 'Header';

export default class Analyze extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => ({ option: this.getOption() });
  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  }

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  }
  getOption = () => ({
    title: {
      text: 'Hello Echarts-for-react-',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['最新成交价', '预购队列'],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom: 30,
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0'],
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function () {
          let now = new Date();
          const res = [];
          let len = 50;
          while (len -= 1) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(now - 2000);
          }
          return res;
        }()),
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function () {
          const res = [];
          let len = 50;
          while (len -= 1) {
            res.push((50 - len) + 1);
          }
          return res;
        }()),
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '价格',
        max: 20,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
      {
        type: 'value',
        scale: true,
        name: '预购量',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        name: '预购队列',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          },
        },
        animationEasing: 'elasticOut',
        animationDelay(idx) {
          return idx * 10;
        },
        animationDelayUpdate(idx) {
          return idx * 10;
        },
        data: (function () {
          const res = [];
          let len = 50;
          while (len -= 1) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        }()),
      },
      {
        name: '最新成交价',
        type: 'line',
        data: (function () {
          const res = [];
          let len = 0;
          while (len < 50) {
            res.push(((Math.random() * 10) + 5).toFixed(1) - 0);
            len += 1;
          }
          return res;
        }()),
      },
    ],
  });

  fetchNewDate = () => {
    const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
    const { option } = this.state;
    option.title.text = `Hello Echarts-for-react.${new Date().getSeconds()}`;
    const data0 = option.series[0].data;
    const data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push(((Math.random() * 10) + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(this.count += 1);
    this.setState({ option });
  };


  timeTicket = null;
  count = 51;
  render() {
    return (
      <div className="examples">
        <Header
          hasBack
          title="统计信息"          
        />
        <div className="parent">
          <ReactEcharts
            option={this.state.option}
            style={{ height: 400 }}
          />
        </div>
      </div>
    );
  }
}
